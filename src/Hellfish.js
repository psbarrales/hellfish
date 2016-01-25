var Hellfish = {
	name: 'hellfish',
	version: '1.0.0',
	lang: "en",
	folder: {
		controllers: 'controllers',
		services: 'services',
		directives: 'directives'
	},
	core: {
		name: 'hellfish',
		core: '.core'
	},
	__setup: function(){
		angular.module(this.core.name+this.core.core, []);
		angular.module(this.core.name+'.controllers', []);
		angular.module(this.core.name+'.directives', []);
		angular.module(this.core.name+'.services', []);

		// Prepare modules
		angular.module(this.core.name, ["ionic", this.core.name+".config", this.core.name+".filters", this.core.name+".routes", this.core.name+".controllers", this.core.name+".services", this.core.name+".directives"]);
	},
	getName: function(){
		return this.core.name;
	},
	getCoreName: function(){
		return this.core.name+this.core.core;
	},
	App: function(){
		Hellfish.__setup();
		Hellfish.__run();
		angular.extend(this, Hellfish.factory);

	}
};