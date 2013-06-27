(function(factory){
	'use strict';
var memo = {};

function parse(expression){
	var fn = memo[expression];

	if(!fn){
		fn = memo[expression] = new Function('context', 'locals', 'with(context){ return ' + expression + '; }');
	}

	return fn;
}

function unwatch(watcher, watchers){
	return function(){
		var index = watchers.indexOf(watcher);

		if(index > -1){
			watchers.splice(index, 1);
		}
	};
}

function Watcher(){
	this.watchers = [];
	this.checking = false;
}

Watcher.prototype.watch = function(context, expression, callback){
	var value, watcher;

	value = typeof expression === 'function' ? function(){
		return expression(context);
	} : parse(expression);

	watcher = {
		value: value,
		context: context,
		last: value(context),
		callback: callback,
		expression: expression
	};

	watcher.callback(watcher.last);
	this.watchers.push(watcher);

	return unwatch(watcher, this.watchers);
};

Watcher.prototype.digest = function(){
	var clean, index, length, watcher, value, iterations = 10;

	if(this.checking){
		throw new Error('Digest phase is already started');
	}

	this.checking = true;

	do{
		clean = true;
		index = -1;
		length = this.watchers.length;

		while(++index < length){
			watcher = this.watchers[index];
			value = watcher.value(watcher.context);

			if(value !== watcher.last){
				watcher.callback(value, watcher.last);
				watcher.last = value;
				clean = false;
			}
		}
	}while(!clean && iterations--);

	if(!iterations){
		throw new Error('Too much iterations per digest');
	}

	this.checking = false;
};

Watcher.parse = parse;
factory('Watcher', Watcher);
})(function(name, object){
	if(typeof define === 'function' && define.amd){
		define(function(){
			return object;
		});
	}else if(typeof window === 'object'){
		window[name] = object;
	}else{
		module.exports = object;
	}
});