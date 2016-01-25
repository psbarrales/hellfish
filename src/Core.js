(function(Hellfish){
	'use strict';
	// Definitions
	var app, $injector, $http, $q, startDelay;
	var files = {
		controllers: [],
		services: [],
		directives: []
	};

	var removeStringArray = function(stack, needle){
		var index = stack.indexOf(needle);
		if(index >= 0){
			stack.splice(index, 1);
		}
		return stack;
	};

	// On Ionic Ready
	var onIonicReady = function(){
		ionic.Platform.ready(function() {
			__injector();
			__bootstrap();
		});
	};

	var _config = function(){
		//  Load config file of app;
		$http.get("app/app.json").success(function(res){
			angular.extend(Hellfish, res);
			app = Hellfish;
			_Constant('APP', res);
			startDelay.notify('app', true);
			//  App file loaded!
			//  Controllers now!
			_files(["controllers", "directives", "services"]);
			_routes();
			_locale();
			//_modules();
		});
	};

	var _files = function(kinds){
		for(var i in kinds) {
			var kind = kinds[i];
			for (var j in app[kind]) {
				files[kind].push(Hellfish.folder[kind] + "/" + app[kind][i]);
				var fileScript = document.createElement("script");
				fileScript.src = "js/" + Hellfish.folder[kind] + "/" + app[kind][i] + ".js";
				document.head.appendChild(fileScript);
			}
			if(files[kind].length == 0){
				startDelay.notify(kind, true);
			}
		}
	};

	var _routes = function(){
		$http.get("app/routes.json").success(function(res){
			// Provider Routes
			_Provider('routes', function(){
				var provider = {};
				provider.routes = res;
				provider.$get = function(){};
				return provider;
			});
			startDelay.notify('routes', true);
		});
	};

	var _locale = function(){
		var lang = Hellfish.lang;
		// Locale
		var locale = function(lang){
			$http.get('app/locale/'+lang+".json").success(function(res){
				_Constant('LOCALE', res);
				startDelay.notify('locale', true);
			}).error(function(){
				lang = "en";
				locale(lang);
			});
		};
		if(navigator.globalization){
			navigator.globalization.getLocaleName(function(res){
				if(res.value.indexOf('es-') >= 0) lang = 'es';
				if(res.value.indexOf('en-') >= 0) lang = 'en';
				if(res.value.indexOf('pt-') >= 0) lang = 'en';
				locale(lang);
			})
		}else{
			locale(lang);
		}
	};

	// Finally Boostrap AngularJS
	var __bootstrap = function(){
		startDelay = $q.defer();
		_config();
		var modulesNotified = 0;
		startDelay.promise.then(function(){
			//  When all is loaded
			angular.bootstrap(document, [app.name]);
		}, function(){

		}, function(data){
			//  ¿Notified everything?
			modulesNotified++;
			if(modulesNotified == 6){
				angular.bootstrap(document, [app.name]);
			}
		});
	};

	var __injector = function(){
		$injector = angular.injector(['ng', Hellfish.core.name+Hellfish.core.core]);
		$http = $injector.get('$http');
		$q = $injector.get('$q');
	};

	// Public Methods
	var _Controller = function(name, func){
		angular.module(Hellfish.core.name+'.controllers').controller(name, func);
		var controllers = removeStringArray(files["controllers"], Hellfish.folder['controllers']+"/"+name);
		if(controllers.length == 0){
			startDelay.notify("controllers", true);
		}
	};

	var _Service = function(name, func, factory){
		if(factory) {
			angular.module(Hellfish.core.name + '.services').factory(name, func);
		}else{
			angular.module(Hellfish.core.name + '.services').service(name, func);
		}
		var services = removeStringArray(files["services"], Hellfish.folder['services']+"/"+name);
		if(services.length == 0){
			startDelay.notify("services", true);
		}
	};

	var _Factory = function(name, func){
		_Service(name, func, true);
	};

	var _Directive = function(name, func){
		angular.module(Hellfish.core.name+'.directives').directive(name, func);
		var directives = removeStringArray(files["directives"], Hellfish.folder['directives']+"/"+name);
		if(directives.length == 0){
			startDelay.notify("directives", true);
		}
	};

	var _Provider = function(name, func){
		angular.module(Hellfish.core.name+Hellfish.core.core).provider(name, func);
	};

	var _Constant = function(name, mix){
		angular.module(Hellfish.core.name+Hellfish.core.core).constant(name, mix);
	};

	Hellfish.version = function(){
		return Hellfish.core.name + " - " + Hellfish.version;
	};

	Hellfish.factory = {
		Controller: _Controller,
		Service: _Service,
		Factory: _Factory,
		Directive: _Directive,
		Provider: _Provider,
		Constant: _Constant
	};

	Hellfish.__run = function(){
		onIonicReady();
	}

})(Hellfish);