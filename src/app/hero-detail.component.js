(function(app) {
	app.HeroDetailComponent = ng.core.Component({
		selector: 'hero-detail',
		templateUrl: 'app/hero-detail.component.html',
		styleUrls: ['app/hero-detail.component.css']
	}).Class({
		constructor: [HeroService, ng.router.ActivatedRoute, ng.common.Location, function(HeroService, ActivatedRoute, Location) {
			this.heroService = HeroService;
			this.route = ActivatedRoute;
			this.location = Location;
		}],
		ngOnInit: function() {
			this.route.params
				.switchMap(function(params) {
					return this.heroService.getHero(params['id']);
				}.bind(this))
				.subscribe(function(hero) {
					this.hero = hero;
				}.bind(this))
		},
		save: function() {
			this.heroService.update(this.hero)
				.then(this.goBack.bind(this))
		},
		goBack: function() {
			this.location.back();
		}
	});
})(window.app || (window.app = {}));