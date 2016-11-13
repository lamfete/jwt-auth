(function() {
	'use strict';

	var app = angular.module('authApp');
	app.controller('userController', UserController);

	function UserController($http, $auth, $state, $rootScope) {
		var vm = this;

		vm.users;
		vm.error;

		vm.getUsers = function() {
			//this request will hit the index method in the AuthenticateController
			//on the laravel side and will return the list of the users
			$http.get('api/authenticate').success(function(users){
				vm.users = users;
			}).error(function(error){
				vm.error = error;
			});
		}

		/*
		*  We would normally put the logout method in the same
		*  spot as the login method, ideally extracted out into
		*  a service. For this simpler example we'll leave it here
		*/
		vm.logout = function() {
			$auth.logout().then(function() {
				//remove the authenticated user from local storage
				localStorage.removeItem('user');

				//flip authenticated to false so that we no longer
				//show UI elements dependant on the user being logged in
				$rootScope.authenticated = false;

				//remove the current user info from rootscope
				$rootScope.currentUser = null;

				//go to login page
				$state.go('auth');
			});
		}
	}
})();