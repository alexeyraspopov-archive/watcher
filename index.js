!function(a){"use strict";function b(a){var b=e[a];return b||(b=e[a]=new Function("context","locals","with(context){ return "+a+"; }")),b}function c(a,b){return function(){var c=b.indexOf(a);c>-1&&b.splice(c,1)}}function d(){this.watchers=[],this.checking=!1}var e={};d.prototype.watch=function(a,d,e){var f,g;return f="function"==typeof d?function(){return d(a)}:b(d),g={value:f,context:a,last:f(a),callback:e,expression:d},g.callback(g.last),this.watchers.push(g),c(g,this.watchers)},d.prototype.digest=function(){var a,b,c,d,e,f=10;if(this.checking)throw new Error("Digest phase is already started");this.checking=!0;do for(a=!0,b=-1,c=this.watchers.length;++b<c;)d=this.watchers[b],e=d.value(d.context),e!==d.last&&(d.callback(e,d.last),d.last=e,a=!1);while(!a&&f--);if(!f)throw new Error("Too much iterations per digest");this.checking=!1},d.parse=b,a("Watcher",d)}(function(a,b){"function"==typeof define&&define.amd?define(function(){return b}):"object"==typeof module&&"object"==typeof module.exports?module.exports=b:window[a]=b});