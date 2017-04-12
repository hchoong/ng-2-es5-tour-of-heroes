(function(app) {
  app.HeroSearchComponent = ng.core.Component({
    selector: 'hero-search',
    templateUrl: 'app/hero-search.component.html',
    templatex: `
      <div id="search-component">
        <h4>Hero Search</h4>
        <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
        <div class="search-results-wrapper">
          <div *ngFor="let hero of heroes | async"
               (click)="gotoDetail(hero)"
               class="search-result" >
            {{hero.name}}
          </div>
          <code>promise|async</code>
          <button (click)="clicked()">{{ arrived ? 'Reset' : 'Resolve' }}</button>
          <span>Wait for it... {{ greeting | async }}</span>
        </div>
        <div><code>observable|async</code>: Time: {{ time | async }}</div>
        <h2>Async Hero Message and AsyncPipe</h2>
            <p>Message: {{ message | async }}</p>
            <button (click)="resend()">Resend</button>
      </div>
    `,
  	styleUrls: ['app/hero-search.component.css'],
    providers: [HeroSearchService]
  }).Class({
    constructor: [HeroSearchService, ng.router.Router, function(HeroSearchService, Router) {
      this.heroSearchService = HeroSearchService;
      this.router = Router;

      this.greeting = new Promise();
      this.arrived = false;
      this.resolve = null;
      this.reset();

      this.resend();
      this.time = Rx.Observable.create(function(observer) {
        setInterval(function() {
          return observer.next(new Date().toString())
        }, 1000)
      })
      this.searchTerms = new Rx.Subject();
    }],
    resend: function() {
      var messages = [
        'You are my hero!',
        'You are the best hero!',
        'Will you be my hero?'
      ];
      var mm = this;
      this.message = Rx.Observable.interval(2000)
      .map(function(i) {
        return messages[i]
      })
      .take(messages.length)
    },
    reset: function() {
      this.arrived = false;
      this.greeting = new Promise(function(resolve, reject) {
        this.resolve = resolve;
      }.bind(this))
    },
    clicked: function() {
      if (this.arrived) {
            this.reset();
          } else {
            this.resolve('hi there!');
            this.arrived = true;
          }
    },
    ngOnInit: function() {
      this.heroes = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(function(term) {
          return term
            ? this.heroSearchService.search(term)
            : Rx.Observable.of([])
        }.bind(this))
        .catch(function(error) {
          // TODO: add real error handling
          console.log(error);
          return Rx.Observable.of([]);
        })
    },
    search: function(term) {
      this.searchTerms.next(term);
    },
    gotoDetail: function(hero) {
      var link = ['/detail', hero.id];
      this.router.navigate(link);
    }
  });
})(window.app || (window.app = {}));