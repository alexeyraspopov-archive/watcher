describe('watcher', function(){
	var scope, firstCall;

	beforeEach(function(){
		scope = new Watcher();
		firstCall = true;
	});

	it('should call callback immediately and each times after digest phase', function(){
		var object = {
				name: 'Alexey'
			};

		scope.watch(object, 'name', function(value, last){
			if(firstCall){
				expect(value).toBe('Alexey');
				expect(last).toBe();
				firstCall = false;
			}else{
				expect(value).toBe('Ruslana');
				expect(last).toBe('Alexey');
			}
		});

		object.name = 'Ruslana';

		scope.digest();
	});

	it('should works with complex expressions', function(){
		var object = {
				nested: {
					animal: 'cat'
				}
			};

		scope.watch(object, 'nested.animal', function(value){
			if(firstCall){
				expect(value).toBe('cat');
				firstCall = false;
			}else{
				expect(value).toBe('dog');
			}
		});

		object.nested.animal = 'dog';

		scope.digest();
	});

	it('should receive function as expression', function(){
		var object = {
				animal: 'cat'
			};

		scope.watch(object, function(context){
			expect(context).toBe(object);
			return 'value';
		}, function(value){
			expect(value).toBe('value');
		});
	});
});