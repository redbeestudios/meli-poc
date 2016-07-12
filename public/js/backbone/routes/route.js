var app = app || {};

var Route = Backbone.Router.extend({
	routes: {
		'items': 'listItems',
		'items/:id': 'detalleItem'
	},
	listItems: function(){
		console.log("estoy en listItems");
		window.stade = "items";
	},
	detalleItem: function(id){
		console.log("estoy en detalleItems - " + id);
		window.stade = "detalle";
		window.itemId = id;
	},
});

app.route = new Route();
