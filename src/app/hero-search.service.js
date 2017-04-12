var HeroSearchService = ng.core.Class({
	constructor: [ng.http.Http, function(Http) {
		this.http = Http;
	}],
	search: function(term) {
		var x = this.http
			.get(`app/heroes/?name=${term}`)
			.map(function(response) {
				return response.json().data
			})
		return x;
	}
});