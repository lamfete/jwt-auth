(function(){
	'use strict';

	var app = angular.module('authApp');
	app.controller('authController', AuthController);

	function AuthController($auth, $state, $http, $rootScope) {
		var vm = this;

		vm.loginError = false;
		vm.loginErrorText;

		vm.login = function() {
			var credentials = {
				email: vm.email,
				password: vm.password
			}

			//use Satellizer's $auth service to login
			$auth.login(credentials).then(function(){
				//return an $http request for the now authenticated
				//user so that we can flatten the promise chain
				return $http.get('api/authenticate/user');

			//handle errors
			}, function(error) {
				vm.loginError = true;
				vm.loginErrorText = error.data.error;

			//because we returned the $http.get request in the $auth.login
			//promise, we can chain the next promise to the end here
			}).then(function(response){
				//stringify the returned data to prepare it
				//to go into local storage
				var user = JSON.stringify(response.data.user);

				//set the stringified user data into local storage
				localStorage.setItem('user', user);

				//the user's authenticated state gets flipped to
				//true so we can now show parts of the UI that rely
				//on the user being logged in
				$rootScope.authenticated = true;

				//putting the user's data on $rootScope allows
				//us to access it anywhere across the app
				$rootScope.currentUser = response.data.user;

				//everything worked out so we can now redirect to
				//the users state to view the data
				$state.go('users');
			});
		}
	}
})();