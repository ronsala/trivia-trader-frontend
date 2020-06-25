describe("user", function () {
  console.log('in userSpec');
  var user;

  beforeEach(function(){
    user = new User();
  });

  it('should create a user', function() {
    expect(user).toBeDefined()
  });
});