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

            var value  = 0,
                label  = $('<div class="value mycosti">$'+value+'</div>'),
                slider = $('<div class="slider"></div>'),
                widget = $('<div></div>'),
                title  = $('<div class="title">'+name+'</div>'),
                config;

            slider.append(label);
            slider.append(title);
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
                this._updateSlider(slider, value); 
            }, this);

            this.bind();
        },

        _onSlide : function (e, ui) {

            var key     = $(this).data('key'),
                label   = $(this).find('.mycosti');
                sliders = e.data.this;

            sliders.model.set(key, 'mycosti', ui.value);
            this._updateSliderLabel(label, value); 
        },

        _updateSlider : function (slider, value) {

            var widget = slider.find('.ui-slider'),
                label  = slider.find('.mycosti');

            value  = this._translate(value);

            widget.slider('value', [value]);
            this._updateSliderLabel(label, value);
        },

        _updateSliderLabel : function (label, value) {
            label.html('$'+value);
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
