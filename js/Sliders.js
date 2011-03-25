/**
 * Class Sliders
 *
 * @todo Refactor out slider widget.
 */
Humble( function () {

    // Sliders constants
    var C_SLIDERS       = 'humble-dvc-sliders',
        T_SLIDERS_TITLE = '<div class="'+C_SLIDERS+'-title">My Taxes:</div>',
        T_SLIDERS       = '<div class="'+C_SLIDERS+'"></div>',
        T_TAXES         = '<div class="'+C_SLIDERS+'-taxes"></div>';

    // Slider constants
    var C_SLIDER        = 'humble-dvc-slider',
        C_SLIDER_LEGEND = C_SLIDER+'-legend',
        T_VALUE         = '<div class="'+C_SLIDER+'-value"></div>',
        T_LEGEND        = '<div class="'+C_SLIDER_LEGEND+'"></div>',
        T_SLIDER        = '<div class="'+C_SLIDER+'"></div>',
        T_TITLE         = '<div class="'+C_SLIDER+'-title"></div>';

    var Sliders = function (node, model, options) {

        this.model      = model;
        this.parentNode = node;
        this.node       = $(T_SLIDERS);
        this.sliders    = {};

        node.append(this.node);

        this.render();
    }

    Sliders.prototype = {

        render : function () {

            var dimensions  = Humble.Config.DVZ.budget.dimensions,
                sliders     = {},
                node        = this.node,
                taxes       = $(T_TAXES),
                title       = $(T_SLIDERS_TITLE);

            node.append(title);
            node.append(taxes);

            _.each(dimensions, function (dimension, key) {
                var slider = this._renderSlider(dimension);
                node.append(slider);
                slider.data('key', key);
                sliders[key] = slider;
            }, this);

            this._sliders = sliders;
            this._taxes   = taxes;

            this.bind();
        },

        _renderSlider : function (dimension) {

            var value  = this.model.format.currency(0),
                name   = dimension.name,
                color  = dimension.color,
                value  = $(T_VALUE).html(value),
                slider = $(T_SLIDER),
                widget = $('<div></div>'),
                title  = $(T_TITLE).html(name),
                legend = $(T_LEGEND).css('background', color),
                config;

            slider.append(value);
            slider.append(title);
            slider.append(widget);
            slider.append(legend);

            config = {
                animate : true,
                max : 1000,
                value : value
            };

            widget.slider(config);

            return slider;
        },

        bind : function () {

            // Slide Event
            this.node.delegate('.'+C_SLIDER, 'slide', {sliders : this}, this._onSlide);

            // Mouse Over
            this.node.delegate('.'+C_SLIDER_LEGEND, 'mouseover', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, true]);
            }).delegate('.'+C_SLIDER_LEGEND, 'mouseout', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, false]);
            });

            // Click
            this.node.delegate('.'+C_SLIDER_LEGEND, 'click', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionDetail', [key, true]);
            });

            var that = this;
            Humble.Event.bind('humble:dvc:dimensionHover', function (e, key, hover) {
                if (hover) {
                    that.highlight(key);
                } else {
                    that.unHighlight(key);
                }
            });
            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                if (!show) {
                    that.node.show();
                } else {
                    that.node.hide();
                }
            });
        },

        update : function (key) {

            var sliders = this._sliders,
                items   = this.model.getItems(),
                total   = this.model.getTotalTaxes();
                node    = this.node;

            if (key) {
                this._updateSliderLabel(sliders[key], items[key]['mycosti']);
            } else {
                _.each(sliders, function (slider, key) {
                    var value = items[key]['mycosti'];
                    this._updateSlider(slider, value); 
                }, this);
            }

            this.setTotal(total);
        },

        setTotal : function (total) {
            total = this.model.format.currency(total, true);
            this._taxes.html(total);
        },

        highlight : function (key) {
            var slider = this._sliders[key];
            slider.find('.'+C_SLIDER_LEGEND).addClass('hover');
        },

        unHighlight : function (key) {
            var slider = this._sliders[key];
            slider.find('.'+C_SLIDER_LEGEND).removeClass('hover');
        },

        _onSlide : function (e, ui) {

            var sliders = e.data.sliders,
                key     = $(this).data('key'),
                label   = $(this).find('.'+C_SLIDER+'-value'),
                value   = sliders.translateB(ui.value);

            sliders.model.set(key, 'mycosti', value);
        },

        _updateSlider : function (slider, value) {

            var widget = slider.find('.ui-slider');

            widget.slider('value', [this._translate(value)]);
            this._updateSliderLabel(slider, value);
        },

        _updateSliderLabel : function (slider, value) {

            var label = slider.find('.'+C_SLIDER+'-value');

            value = this.model.format.currency(value);
            label.html(value);
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
