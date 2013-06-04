describe('watcher', function(){
	it('should be', function(){
		expect(true).toBe(true);
	});

	it('should call callback immediately and each times after digest phase', function(){
		var object = {
				name: 'Alexey'
			}, scope = new Watcher(object), firstCall = true;

		scope.watch('name', function(value, last){
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
			}, scope = new Watcher(object), firstCall = true;

		scope.watch('nested.animal', function(value){
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
});