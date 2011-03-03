/**
 * Class Sliders
 */
Humble( function () {

    var Sliders = function (node, model) {

        this.model      = model;
        this.node       = node;
        this.sliders    = {};

        this.render();
    }

    Sliders.prototype = {

        render : function () {

            var items   = this.model.getItems(),
                node    = this.node;

            _.each(items, function (item, key) {
                var slider = this._renderSlider(item);
                node.append(slider);
                sliders[key] = slider;
            }, this);

            this.bind();
        },

        _renderSlider : function (item) {

            var slider = $('<div class="slider"></div>'),
                widget = $('<div></div>'),
                total  = this.model.getTotalTaxes(),
                value  = item['mycosti'],
                title  = item['dimensionName'],
                config;

            slider.append('<div class="value mycosti">$'+value+'</div>');
            slider.append('<div class="title">'+title+'</div>');
            slider.append(widget);

            config = {
                max : total,
                value : value
            };

            widget.slider(config);

            return slider;
        },

        bind : function () {
            this.node.delegate('.slider', 'slide', {this : this}, this.changeHandler);
        },

        changeHandler : function (e, ui) {
            $(this).find('.mycosti').html('$'+ui.value);
        }
    }

    Humble.Sliders = Sliders;
});
