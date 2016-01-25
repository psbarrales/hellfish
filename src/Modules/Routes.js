(function(Hellfish){
	angular.module(Hellfish.getName()+'.routes', [Hellfish.getCoreName()])
		.config(function($stateProvider, $urlRouterProvider, routesProvider) {
			var routes = routesProvider.routes;
			$urlRouterProvider.otherwise(routes["otherwise"]);
			for(var route in routes){
				if(route != "otherwise") {
					$stateProvider.state(route, routes[route]);
				}
			}
		});

})(Hellfish);