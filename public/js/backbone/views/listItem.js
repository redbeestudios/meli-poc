var app = app || {};

app.ListItem = Backbone.View.extend({
	el: "#myApp",
	initialize:function(){
		
		var container = document.getElementById('example1');
		app.hot = new Handsontable(container, {
		    data: app.items.models,
		    dataSchema: this.makeItem,
		    contextMenu: true,
		    columns: [
				this.attr('title'),
				this.attr('price'),
				this.attr('id')
		    ],
		    colHeaders: ['title', 'price', 'id']
		    // minSpareRows: 1 //see notes on the left for `minSpareRows`
		});
	    app.items.on('add', function () {
	      app.hot.render();
	      console.log(app.items);
	    });
		this.listenTo(app.items, 'add', this.mostrarItem);
		app.items.getItems();	
	},
	'makeItem':function(){
		return new app.Item();
	},
	// normally, you'd get these from the server with .fetch()
   'attr':function(attr) {
    // this lets us remember `attr` for when when it is get/set
	    return {data: function (car, value) {
	      if (_.isUndefined(value)) {
	        return car.get(attr);
	      }
	      car.set(attr, value);
	    }};
  	},
	mostrarItem: function(modelo){
		var vista = new app.MostrarItemView({model:modelo});
		$(".listItem").append(vista.render().$el);
		app.hot.render();
	},
	render: function(){
		this.$el.html("<li class='item'>item</li>");
	}
});

app.MostrarItemView = Backbone.View.extend({
	template:_.template($('#tplMostrarItem').html()),
	tagName: 'tr',
	events: {
		'click td': 'detalleItem'
	},
	initialize: function() {
		var self = this;
		
		app.route.on('route:listItems', function(){
			self.render();
		});
		app.route.on('route:detalleItem', function(){
			self.render();
		});
	},
	render: function(){
		//this.$el.html(this.template(this.model.toJSON()));
		var self = this;
		if(window.stade === "items"){
			$('#detalle-item').hide();
			$('#myModal').modal('hide');
			this.$el.html( this.template( this.model.toJSON() ) );
		}else if(window.stade === "detalle"){
			$('#detalle-item').show();
			if(this.model.get('id') === window.itemId){
				new app.DetalleItemView({model:this.model});
			}
		}


		return this;
	}, 
	detalleItem: function() {
		Backbone.history.navigate('items/' + this.model.get('id'), {trigger: true});
	}
});


app.DetalleItemView = Backbone.View.extend({
	el: '#detalle-item',
	template: _.template($('#tpldetalleItem').html()),	

	events: {
		'click .atrasLibros': 'atrasLibros'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		$('#myModal').modal();
	},

	atrasLibros: function(){
		Backbone.history.navigate('items', {trigger: true});	
	}
});
