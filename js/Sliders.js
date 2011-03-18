/**
 * Class Sliders
 */
Humble( function () {

    var Sliders = function (node, model, options) {

        this.colors     = options.colors;
        this.model      = model;
        this.node       = node;
        this.sliders    = {};

        this.render();
    }

    Sliders.prototype = {

        render : function () {

            var dimensions  = Humble.Config.DVZ.budget.dimensions,
                sliders     = {},
                node        = this.node,
                count       = 0;

            _.each(dimensions, function (name, key) {
                var slider = this._renderSlider(name, count);
                node.append(slider);
                slider.data('key', key);
                sliders[key] = slider;
                count++;
            }, this);

            this._sliders = sliders;

            this.bind();
        },

        _renderSlider : function (name, count) {

            var value  = 0,
                color  = this.colors[count],
                label  = $('<div class="value mycosti">$'+value+'</div>'),
                slider = $('<div class="slider"></div>'),
                widget = $('<div></div>'),
                title  = $('<div class="title">'+name+'</div>'),
                legend = $('<div class="legend" style="background: '+color+';"></div>'),
                config;

            slider.append(label);
            slider.append(title);
            slider.append(widget);
            slider.append(legend);

            config = {
                max : 1000,
                value : value
            };

            widget.slider(config);

            return slider;
        },

        bind : function () {
            this.node.delegate('.slider', 'slide', {sliders : this}, this._onSlide);
        },

        update : function () {

            var sliders = this._sliders;

            var items   = this.model.getItems(),
                node    = this.node;

            _.each(sliders, function (slider, key) {
                var value = items[key]['mycosti'];
                this._updateSlider(slider, value); 
            }, this);
        },

        _onSlide : function (e, ui) {

            var sliders = e.data.sliders,
                key     = $(this).data('key'),
                label   = $(this).find('.mycosti'),
                value   = sliders.translateB(ui.value);

            sliders.model.set(key, 'mycosti', value);
            sliders.update();
        },

        _updateSlider : function (slider, value) {

            var widget = slider.find('.ui-slider'),
                label  = slider.find('.mycosti');

            widget.slider('value', [this._translate(value)]);
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

            if (value < 1) return 0;

            var income = 50000;
            
            value = Math.log(value)/Math.log(income)
            value = value * 1000;

            return value;
        },

        translateB : function (value) {

            var income = 50000;

            value = value / 1000;
            value = Math.exp(value * Math.log(50000));
            value = Math.round(value*100)/100;
            return value;
        }
    }

    Humble.Sliders = Sliders;
});
