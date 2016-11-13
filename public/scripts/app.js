(function(){
	'use strict';

	angular
		.module('authApp', ['ui.router', 'satellizer'])
		.config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide){

			function redirectWhenLoggedOut($q, $injector) {
				return {
					responseError: function(rejection) {
						//need to use $injector.get to bring in $state or else we get
						//a circular dependency error
						var state = $injector.get('$state');

						/*
						*  instead of checking for status code of 400 which might be user
						*  for other reasons in laravel, we check for the specific rejection
						*  reasons to tell us if we need to redirect to the login state
						*/
						var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

						//loop through each rejection reason and redirect to the login
						//state of one is encountered
						angular.forEach(rejectionReasons, function(value, key) {
							if(rejection.data.error === value) {
								/*
								*  if we get a rejection corresponding to one of the reasons
								*  in our array, we know we need to authenticate the user so
								*  we can remove the current user from local storage
								*/
								localStorage.removeItem('user');

								//send the user to the auth state so they can login
								$state.go('auth');
							}
						});

						return $q.reject(rejection);
					}
				}
			}

			//setup for the $httpInterceptor
			$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

			//push the new factory onto the $http interceptor array
			$httpProvider.interceptors.push('redirectWhenLoggedOut');

			/*
			*  satellizer configuration that specifies which API
			*  route the JWT should be retrieved from
			*/
			$authProvider.loginUrl = '/api/authenticate';

			/*
			*  redirect to the auth state if any other states
			*  are requested other than users
			*/ 
			$urlRouterProvider.otherwise('/auth');

			$stateProvider
				.state('auth', {
					url: '/auth',
					templateUrl: '../views/authView.html',
					controller: 'authController as auth'
				})
				.state('users', {
					url: '/users',
					templateUrl: '../views/userView.html',
					controller: 'userController as user'
				});
		});
})();