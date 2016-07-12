var app = app || {};

app.Item = Backbone.Model.extend({
	//urlRoot:"https://api.mercadolibre.com/sites/MLA/search?q=ipod#json",  // URL to web api
	initialize: function(){
		console.log("nuevo Item");

		this.on('change', function(){
			console.log("change item");
		});
	},
	defaults: {
		id:"",
		title:"item",
		price: 0
	}
});