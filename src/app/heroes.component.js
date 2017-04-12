(function(app) {
  app.HeroesComponent = ng.core.Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
  	styleUrls: ['app/heroes.component.css']
  }).Class({
    constructor: [HeroService, ng.router.Router, function(HeroService, Router) {
      this.heroes = [];
      this.selectedHero = null;

      this.heroService = HeroService;
      this.router = Router;
    }],
    getHeroes: function() {
      this.heroService
        .getHeroes()
        .then(function(heroes) {
          this.heroes = heroes;
        }.bind(this));
    },
    add: function(name) {
      name = name.trim();
      if (!name) { return; }
      this.heroService
        .create(name)
        .then(function(hero) {
          this.heroes.push(hero);
          this.selectedHero = null;
        }.bind(this));
    },
    delete: function(hero) {
      this.heroService
        .delete(hero.id)
        .then(function() {
          this.heroes = this.heroes.filter(function(h) {
            return h != hero;
          })
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        }.bind(this))
    },
    ngOnInit: function() {
      this.getHeroes();
    },
    onSelect: function(hero) {
      this.selectedHero = hero;
    },
    goToDetail: function() {
      this.router.navigate(['/detail', this.selectedHero.id]);
    },
  });
})(window.app || (window.app = {}));