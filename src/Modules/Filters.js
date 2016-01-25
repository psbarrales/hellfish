(function(Hellfish){
	angular.module(Hellfish.getName()+'.filters', [Hellfish.getCoreName()])
		.filter('locale', function($q, $interpolate, $sce, $rootScope, LOCALE) {
				return function(input, kind) {
					var e, error, locales, name, names, now, object, out;
					name = input || '';
					out = input;
					try {
						if (typeof name === 'string') {
							names = name.split('.');
							now = 0;
							locales = LOCALE;
							while (names.length > 0) {
								locales = locales[names[0]];
								now++;
								names.shift();
							}
							out = locales;
						}
					} catch (error) {
						e = error;
						out = name;
					}
					if (typeof out === 'undefined') {
						out = name;
					}
					out = $interpolate(out, false, false, false);
					if (typeof object === 'string') {
						object = object.replace(/'/g, '"');
						object = angular.fromJson(object);
					}
					if (kind === 'html') {
						return $sce.trustAsHtml(out(object || {}));
					} else {
						return out(object || {});
					}
				};
			}
		);
})(Hellfish);