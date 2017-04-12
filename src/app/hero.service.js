function handleError(error) {
	console.error('An error occurred', error); // for demo purposes only
  return new Promise.reject(error.message || error);
}

var HeroService = ng.core.Class({
	constructor: [ng.http.Http, function(Http) {
		this.heroesUrl = 'api/heroes';
		this.headers = {'Content-Type': 'application/json'};

		this.http = Http;
	}]
	, getHeroes: function() {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then(function(response) {
				return response.json().data
			})
			.catch(this.handleError);
	}
	, getHero: function(id) {
		var url = `${this.heroesUrl}/${id}`;
		return this.http.get(url)
			.toPromise()
			.then(function(response) {
				return response.json().data
			})
			.catch(this.handleError)
	}
	, delete: function(id) {
		var url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then()
			.catch(this.handleError)
	}
	, create: function(name) {
		return this.http
			.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
			.toPromise()
			.then(function(res) {
				return res.json().data
			})
			.catch(this.handleError);
	}
	, update: function(hero) {
		var url = `${this.heroesUrl}/${hero.id}`;
		return this.http
			.put(url, JSON.stringify(hero), {headers: this.headers})
			.toPromise()
			.then(function() {
				return hero;
			})
			.catch(this.handleError)
	}
});