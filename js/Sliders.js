/**
 * Class Sliders
 *
 * @todo Refactor out slider widget.
 */
Humble( function () {

    // Sliders constants
    var C_SLIDERS       = 'humble-dvc-sliders',
        T_SLIDERS_TITLE = '<div class="'+C_SLIDERS+'-title">My Taxes:</div>',
        T_LOADING       = '<div class="'+C_SLIDERS+'-loading"></div>',
        T_SLIDERS       = '<div class="'+C_SLIDERS+'"></div>',
        T_CONTAINER     = '<div class="'+C_SLIDERS+'-container"></div>',
        T_TAXES         = '<div class="'+C_SLIDERS+'-taxes"></div>';

    // Slider constants
    var C_SLIDER        = 'humble-dvc-slider',
        C_SLIDER_LEGEND = C_SLIDER+'-legend',
        C_SLIDER_TITLE  = C_SLIDER+'-title',
        T_VALUE         = '<div class="'+C_SLIDER+'-value"></div>',
        T_LEGEND        = '<div class="'+C_SLIDER_LEGEND+'"></div>',
        T_SLIDER        = '<div class="'+C_SLIDER+'"></div>',
        T_TITLE         = '<div class="'+C_SLIDER_TITLE+'"></div>';

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

            var dimensions  = Humble.Config.DVC.budget.dimensions,
                sliders     = {},
                node        = this.node,
                taxes       = $(T_TAXES),
                title       = $(T_SLIDERS_TITLE),
                container   = $(T_CONTAINER),
                loading     = $(T_LOADING);

            loading.hide();

            node.append(title);
            node.append(taxes);
            node.append(container);
            container.append(loading);

            _.each(dimensions, function (dimension, key) {
                var slider = this._renderSlider(dimension);
                container.append(slider);
                slider.data('key', key);
                sliders[key] = slider;
            }, this);

            this._sliders = sliders;
            this._taxes   = taxes;
            this._loading = loading;

            loading.height(container.height());
            loading.width(container.width()+12);

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
            this.node.delegate('.'+C_SLIDER, 'slidestop', {sliders : this}, this._onSlide);

            // Mouse Over
            this.node.delegate('.'+C_SLIDER_LEGEND, 'mouseover', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, true]);
            }).delegate('.'+C_SLIDER_LEGEND, 'mouseout', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, false]);
            });
            this.node.delegate('.'+C_SLIDER_TITLE, 'mouseover', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, true]);
            }).delegate('.'+C_SLIDER_TITLE, 'mouseout', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, false]);
            });

            // Click
            this.node.delegate('.'+C_SLIDER_LEGEND, 'click', function (e, ui) {
                var key = $(this).closest('.'+C_SLIDER).data('key');
                Humble.Event.trigger('humble:dvc:dimensionDetail', [key, true]);
            });
            this.node.delegate('.'+C_SLIDER_TITLE, 'click', function (e, ui) {
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
            Humble.Event.bind('humble:dvc:modelRequest', function (e) {
                that.showLoading();
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

            this.hideLoading();

            this.setTotal(total);
        },

        setTotal : function (total) {
            //rawTotal = total;
            total = this.model.format.currency(total, true);
            /*
            if(rawTotal > this.model.getData('income'))
                this._taxes.css({'color' : '#ff0049'});
            else
                this._taxes.css({'color' : '#111122'});
            */
            this._taxes.html(total);
        },

        pingTotal : function () {

            var taxes = this._taxes,
                color = '#112';

            taxes.stop();
            taxes.css({'color' : '#ffaaaa'});
            taxes.animate({'color' : color},1000);
        },

        highlight : function (key) {
            var slider = this._sliders[key];
            slider.find('.'+C_SLIDER_LEGEND).addClass('hover');
        },

        unHighlight : function (key) {
            var slider = this._sliders[key];
            slider.find('.'+C_SLIDER_LEGEND).removeClass('hover');
        },

        showLoading : function () {
            this._loading.show();
        },
        hideLoading : function () {
            this._loading.hide();
        },

        _onSlide : function (e, ui) {

            var sliders = e.data.sliders,
                model   = sliders.model,
                key     = $(this).data('key'),
                label   = $(this).find('.'+C_SLIDER+'-value'),
                widget  = $(this).find('.ui-slider'),
                value   = sliders.translateB(ui.value),
                old     = model.get(key, 'mycosti'),
                total   = model.getTotalTaxes(),
                income  = model.getData('income');

            if (total - old + value > income) {
                value = income - total + old;
                widget.slider('option', 'value', sliders._translate(value));
                sliders.pingTotal();
            }

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
         * Slider goes from 0 to 1000
         */
        _translate : function (payment) {

            var value,
                maxValue,
                income = this.model.getData('income');
                           
            value = this.normalize(payment, income);
            maxValue = this.normalize(income, income);
            value = (value / maxValue) * 1000;
            return value;
        },

        translateB : function (value) {

            var payment,
                income = this.model.getData('income');
                
            payment = value / 1000;
            payment = payment * this.normalize(income,income);
            payment = this.inverseNormalize(payment,income);
            payment = Math.round(payment*100)/100;
            return payment;    
        },
        
        normalize : function(value,max) {

            var lowEnd = Math.PI * -0.25,
                highEnd = 30 * Math.PI,
                range = highEnd - lowEnd,
                normalized;
                
            normalized = ((value/max)*range) + lowEnd;
            normalized = Math.atan(normalized);
            normalized = normalized - (Math.atan(lowEnd));
            return normalized;
        },
        
        inverseNormalize : function(value,max)  {
       
            var lowEnd = Math.PI * -0.25,
                highEnd = 30 * Math.PI,
                range = highEnd - lowEnd,
                inverted;

            inverted = Math.tan(value + Math.atan(lowEnd));            
            inverted = ((inverted - lowEnd) / range) * max;
            return inverted;
        }
         
    }

    Humble.Sliders = Sliders;
});
