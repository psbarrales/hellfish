# Hellfish Bootstrap Ionic

Load app files with few settings

### Requirements

* npm
* gulp

### Preparation

* `npm install`

### Building

* `gulp build` 

### Documentation

* To use hellfish library just install with bower `bower install hellfishjs --save`

#### Settings

Put on your www a folder app with this files

```
www
└───app
    │   app.json
    │   routes.json
    └───locale
           │   es.json
           │   en.json
```
	   
#### Bootstrap

On your app.js

Load the module Hellfish
`angular.module('myCoolApp', ['ionic', 'hellfish']);`
and create the Hellfish App
```
// Add this line
var App = new Hellfish.App();
```

#### Controllers, Services and Directives

```
 App.Controller("HomeCtrl", function($scope, $ionicSideMenuDelegate, $cordovaStatusbar){
 if (window.StatusBar) $cordovaStatusbar.styleHex('#5469AD');
 	$scope.toggleMenu = function(){
 		$ionicSideMenuDelegate.toggleLeft();
 	}
 });
```
