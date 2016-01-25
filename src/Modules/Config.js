(function(Hellfish){
	// Configurations
	angular.module(Hellfish.getName()+'.config', [])
		.config(function($animateProvider) {
			$animateProvider.classNameFilter(/^(?:(?!no-anim).)*$/);
		})

		.config(function($ionicConfigProvider) {
			$ionicConfigProvider.tabs.position('bottom');
			$ionicConfigProvider.platform.android.navBar.alignTitle('center');
			$ionicConfigProvider.platform.android.views.transition('ios');
		});

})(Hellfish);