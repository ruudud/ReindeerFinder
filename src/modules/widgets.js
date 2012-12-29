(function (W, REIN) {
    W.Views.List = REIN.View.extend({
        tagName: 'ul',
        className: 'list',
        _listItems: [],
        collection: {},
        itemTemplate: REIN.templates.area,

        render: function () {
            _.each(this.collection, function (item, id) {
                var listItem = new W.Views.ListItem(_.extend(this.options, {
                    app: this,
                    model: this.getModel(id, item),
                    template: this.itemTemplate
                }));
                this.$el.append(listItem.render().el);
                this._listItems.push(listItem);
            }.bind(this));
            return this;
        },

        reset: function () {
            this.$('.selected').removeClass('selected');
            _.each(this._listItems, function (item) {
                item.reset();
            });
        },

        getModel: function (id, item) {
            return _.extend({ id: id }, item);
        }
    });

    W.Views.ListItem = REIN.View.extend({
        tagName: 'li',
        className: 'item',
        _active: false,
        events: {
            'click': '_onClick'
        },

        render: function () {
            this.$el.html(this.options.template({
                m: this.model
            }));
            return this;
        },

        reset: function () {
            this._active = false;
        },

        _onClick: function (event) {
            event.preventDefault();
            this.$el.addClass('selected').siblings('.selected').removeClass('selected');
            this.options.app.trigger('item:click', parseInt(this.model.id, 10));
            return;
        }
    });
}(REIN.module('widget'), REIN));
