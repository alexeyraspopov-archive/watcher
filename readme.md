# Watcher

Simple watcher pattern implementation based on 'dirty checking' algorithm

## Import

Simple browser import via HTML

```HTML
<script src="path/to/component/watcher.min.js"></script>
```

Require AMD module (require.js)

```javascript
require.config({
	paths: {
		watcher: 'path/to/component/watcher.min.js'
	}
});

define(['watcher'], function(Watcher){
	var watcher = new Watcher();
});
```

via Node.js

```bash
npm install git@github.com:alexeyraspopov/watcher.git
```

```javascript
var Watcher = require('watcher');
```

## Using

Create scope

```javascript
var scope = new Watcher();
```

Watch some keypath in object

```javascript
var object = { name: 'Jack' };

scope.watch(object, 'name', function(value){});
```

Callback will be executed after the addition of the listener

Also you can use function instead of expression

```javascript
scope.watch(object, function(context){
	// some work which returns some value
}, function(value){
	// and the processing values goes here
});
```

If you want to unwatch some expression you can use the result of 'watch' method

```javascript
var unwatch = scope.watch(...);

// when you want to delete create watcher
unwatch();
```

Use 'digest' method for starting checking cycle

```javascript
scope.digest();
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License) (c) Alexey Raspopov