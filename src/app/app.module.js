(function(app) {
  app.AppModule = ng.core.NgModule({
    imports: [
    	ng.platformBrowser.BrowserModule,
      ng.forms.FormsModule,
      ng.http.HttpModule,
      ng.inMemoryWebApi.InMemoryWebApiModule.forRoot(InMemoryDataService),
      app.AppRoutingModule
  	],
    declarations: [
      app.AppComponent,
    	app.DashboardComponent,
      app.HeroDetailComponent,
      app.HeroesComponent,
      app.HeroSearchComponent
  	],
    providers: [ HeroService, HeroSearchService ],
    bootstrap: [ app.AppComponent ]
  })
  .Class({
    constructor: function() {}
  });
})(window.app || (window.app = {}));

