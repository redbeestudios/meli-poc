var app = app || {};

var Items = Backbone.Collection.extend({
	model: app.Item,
	url: "https://api.mercadolibre.com/sites/MLA/search?q=ipod#json",  // URL to web api
	initialize: function(){
		console.log("collection Items creada");
	},
	'getItems':function(){
		this.fetch({
			success: function(model,response){
				for(var i=0; i< response.results.length; i++){
					model.add(response.results[i]);
					//console.log	(response.results[i]);
				}
				model.remove(model.at(0));
			}
		});
	}
});

app.items = new Items();