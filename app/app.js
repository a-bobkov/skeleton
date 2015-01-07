define(['angular', '../modules/users/main'], function(angular, User) {
    var user = new User('Mark');

    console.log('Hello ' + user.name);
});