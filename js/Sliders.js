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

            var dimensions  = Humble.Config.DVZ.budget.dimensions,
                sliders     = {},
                node        = this.node;

            _.each(dimensions, function (name, key) {
                var slider = this._renderSlider(name);
                node.append(slider);
                slider.data('key', key);
                sliders[key] = slider;
            }, this);

            this._sliders = sliders;
        },

        _renderSlider : function (name) {

            var slider = $('<div class="slider"></div>'),
                widget = $('<div></div>'),
                value  = 0,
                title  = name,
                config;

            slider.append('<div class="value mycosti">$'+value+'</div>');
            slider.append('<div class="title">'+title+'</div>');
            slider.append(widget);

            config = {
                max : 1000,
                value : value
            };

            widget.slider(config);

            return slider;
        },

        bind : function () {
            this.node.delegate('.slider', 'slide', {this : this}, this._onSlide);
        },

        update : function () {

            var sliders = this._sliders;

            var items   = this.model.getItems(),
                node    = this.node;

            _.each(sliders, function (slider, key) {

                var value = items[key]['mycosti'];

                slider = slider.find('.ui-slider');
                value  = this._translate(value);

                $(slider).slider('value', [value]);

            }, this);

            this.bind();
        },

        _onSlide : function (e, ui) {

            var key     = $(this).data('key'),
                sliders = e.data.this;

            $(this).find('.mycosti').html('$'+ui.value);
            sliders.model.set(key, 'mycosti', ui.value);
        },

        /**
         * Slider Value
         *
         * Slider goes from 0 to 100
         */
        _translate : function (value) {

            // Income
            var max = 50000;

            value = (value / max) * 1000;

            return value;
        }
    }

    Humble.Sliders = Sliders;
});
