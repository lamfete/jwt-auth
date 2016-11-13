var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

require('es6-promise').polyfill();

elixir(function(mix) {
    //mix.sass('app.scss');
    mix.copy('node_modules/bootstrap/dist/css/bootstrap.css', 'public/node_modules/bootstrap/dist/css/bootstrap.css');
    mix.copy('node_modules/angular/angular.js', 'public/node_modules/angular/angular.js');
    mix.copy('node_modules/angular-ui-router/release/angular-ui-router.js', 'public/node_modules/angular-ui-router/release/angular-ui-router.js');
    mix.copy('node_modules/satellizer/dist/satellizer.js', 'public/node_modules/satellizer/dist/satellizer.js');
});
