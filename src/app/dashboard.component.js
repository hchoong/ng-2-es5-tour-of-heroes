(function(app) {
  app.DashboardComponent = ng.core.Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css'],
  })
  .Class({
    constructor: [HeroService, function(HeroService) {
      this.heroes = [];

      this.heroService = HeroService;
    }],
    ngOnInit: function() {
      this.heroService.getHeroes().then(function(heroes) {
        this.heroes = heroes.slice(1, 5);
      }.bind(this));
    }
  });
})(window.app || (window.app = {}));
