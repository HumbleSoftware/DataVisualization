/**
 * @todo Refactor out the Visualization component into something reusable and 
 * general.  This class should be an implementation of that visualization.
 */
Humble( function () {

    var C_VISUAL        = 'humble-dvc-visual',
        T_VISUAL        = '<div class="'+C_VISUAL+'"></div>',
        T_TITLE         = '<div class="'+C_VISUAL+'-title">My Federal Budget:</div>',
        T_BUDGET        = '<div class="'+C_VISUAL+'-budget"></div>',
        T_CANVAS        = '<div class="'+C_VISUAL+'-canvas"></div>',
        T_LEGEND        = '<div class="'+C_VISUAL+'-legend"></div>',
        T_LEGEND_BLOCK  = '<div class="'+C_VISUAL+'-legend-block">&nbsp;</div>',
        T_LEGEND_VALUE  = '<div class="'+C_VISUAL+'-legend-value"></div>';

    var BudgetVisualBlock = function (node, model) {

        this.parentNode = node;
        this.node       = $(T_VISUAL);
        this.model      = model;
        this.bars       = {};
        this.colors     = false;
        this.unit       = 10000000000;

        this.config = {
            padding : 3,
            height : 18,
            width : 18,
            x : 2.5,
            y : 2.5
        };

        this.render();
    };

    BudgetVisualBlock.prototype = {

        render : function () {

            var node    = this.node,
                title   = $(T_TITLE),
                budget  = $(T_BUDGET),
                legend  = $(T_LEGEND),
                block   = $(T_LEGEND_BLOCK),
                value   = $(T_LEGEND_VALUE),
                canvas  = $(T_CANVAS),
                width   = 320,
                height  = 400,
                paper;

            value.html(this.model.format.currency(this.unit, true));
            legend.append(block, ' &asymp; ', value);

            node.append(title, budget, legend, canvas);
            this.parentNode.append(this.node);

            paper = Raphael(canvas.get(0), width, height);
            this.paper = paper;
            this.canvas = canvas;
            this._budget = budget;
        },

        bind : function () {

            var that = this,
                dimensions = Humble.Config.DVC.budget.dimensions;

            Humble.Event.bind('humble:dvc:dimensionHover', function (e, key, hover) {

                if (hover) {
                    that.highlight(key);
                } else 
                if (that.doNotHoverHide) {
                    that.doNotHoverHide = false;
                } else {
                    that.unHighlight(key);
                }
            });
            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                if (!show) {
                    that.node.show();
                } else {
                    var set = that.sets[key];
                    set.attr({
                        'fill' : dimensions[key].color,
                        'stroke' : '#333',
                        'stroke-opacity' : 1,
                        'stroke-width' : '1px',
                        scale : [1, 1]
                    });
                    that.doNotHoverHide = true;
                    that.node.hide();
                }
            });
        },

        draw : function () {

            var model = this.model,
                paper = this.paper,
                config = this.config,
                total = model.getTotalSpending(),
                items = model.getItems(),
                itemCount = model.getItemCount();
                dimensions = Humble.Config.DVC.budget.dimensions,
                data  = [];

            var x0 = x = config.x,
                y = config.y,
                width = config.width,
                height = config.height,
                padding = config.padding,
                parity = 1,
                unit = this.unit;

            var sets = {};

            // Key for firing hover events
            var tempKey = null;

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            var that = this;

            this.timeout = setTimeout ( function () {

            paper.clear();

            var itemCounter = 1;

            _.each(dimensions, function (dimension, key) {

                var item   = items[key],
                    amount = item['amounti'],
                    pieces = Math.ceil(amount/unit),
                    set    = paper.set();

                for (i = 0; i < pieces; i++) {
                    var r = paper.rect(x, y, width, height);
                    set.push(r);
                    set.x = x;
                    set.y = y;
                    set.parity = parity;

                    var newXY =  that._calculateXY(x, y, parity);
                    x = newXY.x;
                    y = newXY.y;
                    parity = newXY.parity;
                }
    	

                // Makes half of the dimensions opaque; need desaturating->hex function    	
                /*
                var opacity = 1;
                if(itemCount > 9 && itemCounter <= 9) {
                    opacity = .8;
                }
                */

                set.attr({
                    'cursor' : 'pointer',
                    'fill' : dimensions[key].color,
                    'stroke' : '#333',
                    'stroke-width' : '1px'
                 //   'fill-opacity' : opacity
                });

                $(set).css('cursor', 'pointer');

                set.click(function () {
                    Humble.Event.trigger('humble:dvc:dimensionDetail', [key, true]);
                });

                set.hover(function () {
                    that._setHover(key);
                });

                sets[key] = set;
                
                itemCounter++;

            });

            that.sets = sets;

            });

            $(this.paper.canvas).hover(function () {}, function () {
                if (that.tempKey) { 
                    Humble.Event.trigger('humble:dvc:dimensionHover', [that.tempKey, false]);
                    that.tempKey = null;
                }
            });
        },

        _setHover : function (key) {

            if (this.tempKey === key) {
                return;
            } else {
                if (this.tempKey) {
                    Humble.Event.trigger('humble:dvc:dimensionHover', [this.tempKey, false]);
                }
                Humble.Event.trigger('humble:dvc:dimensionHover', [key, true]);
                this.tempKey = key;
            }
        },

        _calculateXY : function (x, y, parity) {

            var config      = this.config,
                paper       = this.paper,
                x0          = config.x,
                width       = config.width,
                height      = config.height,
                padding     = config.padding,
                totalWidth  = paper.canvas.clientWidth || paper.width,
                totalHeight = paper.canvas.clientHeight || paper.height;

            if ((parity === 1 && (x + width + padding + width) > totalWidth) || 
                (parity === -1 && (x - width - padding) < 0)) {

                parity *= -1
                if (parity == 1) {
                x = x0;
                }
                y += height + padding;
                if (y > totalHeight) {
                    totalHeight = y + height + padding;
                    paper.setSize(totalWidth, totalHeight);
                }
            } else {
                x += (width + padding) * parity;
            }

            return {x : x, y : y, parity : parity};
        },

        _calculateNewXY : function (x, y, parity, delta) {

            var config      = this.config,
                paper       = this.paper,
                x0          = config.x,
                width       = config.width,
                height      = config.height,
                padding     = config.padding,
                totalWidth  = paper.canvas.clientWidth,
                totalHeight = paper.canvas.clientHeight;

            for (var i = 0; i < delta; i++) {

                if ((parity === -1 && (x + width + padding + width) > totalWidth) || 
                    (parity === 1 && (x - width - padding) < 0)) {

                    parity *= -1
                    if (parity == -1) {
                        x = x0;
                    }
                    y -= (height + padding);
                } else {
                    x -= (width + padding) * parity;
                }
            }

            return {x : x, y : y, parity : parity};
        },

        updateSets : function (updateKey) {

            var model = this.model,
                paper = this.paper,
                sets = this.sets,
                config = this.config,
                set = sets[updateKey],
                items = model.getItems();

            var width = config.width,
                height = config.height,
                padding = config.padding,
                totalWidth  = paper.canvas.clientWidth,
                totalHeight = paper.canvas.clientHeight,
                x0 = config.x,
                parity;

            var item   = items[updateKey],
                amount = item['amounti'],
                pieces = Math.ceil(amount/this.unit),
                length = set.length,
                delta,
                r;

            var that = this;

            if (pieces < length) {

                this.scroll(updateKey);

                delta = length - pieces;

                var oldSet = paper.set();
                for (var i = 0; i < delta; i++) {
                    r = set.pop();
                    oldSet.push(r);
                }

                var newEndXY = this._calculateNewXY(set.x, set.y, set.parity, delta);
                set.x = newEndXY.x,
                set.y = newEndXY.y,
                set.parity = newEndXY.parity;

                this.cancel = false;
                var cancel = this.cancel;

                var xa = set.x, ya = set.y, paritya = set.parity;

                oldSet.animate({
                    scale : 0
                }, 250, function () {
                    oldSet.remove();
                    if (!cancel) {
                        that._movePieces(xa, ya, paritya, updateKey, true);
                    }
                });
            } else if (pieces > length) {

                this.scroll(updateKey);

                delta = pieces - length;

                var end = set[(set.length -1)];

                x = set.x;
                y = set.y;
                parity = set.parity;

                var fill = end.attr('fill'),
                    stroke = end.attr('stroke');

                for (var i = 0; i < delta; i++) {

                    var newXY = this._calculateXY(x, y, parity);
                    x = newXY.x;
                    y = newXY.y;
                    parity = newXY.parity;

                    set.x = x;
                    set.y = y;
                    set.parity = parity;

                    r = paper.rect(x, y, width, height);
                    r.x = x;
                    r.y = y;
                    r.attr({
                        'cursor' : 'pointer',
                        scale : 0.01,
                        fill : fill,
                        stroke : stroke
                    });
                    r.hover(function () {
                        that._setHover(updateKey);
                    });
                    r.animate({scale : 1}, 250);
                    set.push(r);
                }

                this.cancel = true;
                this._movePieces(x, y, parity, updateKey);
            }
        },

        /**
         * Takes arguments for end position
         */
        _movePieces : function (x, y, parity, startKey, resize) {

            var sets = this.sets,
                paper = this.paper,
                config = this.config,
                start = false,
                x0 = config.x,
                width = config.width,
                height = config.height,
                padding = config.padding,
                totalWidth  = paper.canvas.clientWidth,
                totalHeight = paper.canvas.clientHeight;

            _.each(sets, function (set, key) {
                if (start) {
                    for (var i = 0; i < set.length; i++) {

                        var newXY = this._calculateXY(x, y, parity);
                        x = newXY.x;
                        y = newXY.y;
                        parity = newXY.parity;

                        var r = set[i];
                        r.attr({
                            x : x,
                            y : y
                        });
                        set.x = x;
                        set.y = y;
                        set.parity = parity;
                    }
                }
                if (key == startKey) {
                    start = true;
                };
            }, this);
            paper.setSize(totalWidth, (y + height + padding));
        },

        highlight : function (key) {

            var colors = Humble.Config.DVC.spendingColors,
                set = this.sets[key],
                deficitSpending = this.model.getDeficitSpending(key),
                otherSpending = this.model.getOtherTaxSpending(key),
                deficitBlocks = this.translate(deficitSpending),
                otherBlocks = this.translate(otherSpending),
                i = 0;

            this.scroll(key);

            set.stop();
            set.attr({
                'stroke' : 'none'
            });

            set.attr({scale : [1.25, 1.25]});

            // Apply spending type colors
            for (i; i < deficitBlocks && i < set.length; i++) { 
                set[i].attr({
                    fill : colors.deficit
                });
            }
            for (i; i < (otherBlocks + deficitBlocks) && i < set.length; i++) { 
                set[i].attr({
                    fill : colors.other
                });
            }
            for (i; i < set.length; i++) {
                set[i].attr({
                    fill : colors.income
                });
            }
        },

        unHighlight : function (key) {

            var set = this.sets[key],
                dimensions = Humble.Config.DVC.budget.dimensions;

            set.stop();
            set.attr({
                'fill' : dimensions[key].color,
                'stroke' : '#333',
                'stroke-opacity' : 1,
                'stroke-width' : '1px',
                scale : [1, 1]
            });
        },

        scroll : function (key) {

            var set = this.sets[key],
                y   = set[0].attr('y');

            this.canvas.stop();
            this.canvas.animate({'scrollTop' : y});
        },

        translate : function (value) {
            var blocks = Math.round(value / this.unit);
            return blocks;
        },

        update : function (key) {

            this.setBudget(this.model.getTotalSpending());

            if (!key || !this.sets) {
                var bind = (this.sets ? false : true);
                this.draw();
                if (bind) {
                    this.bind();
                }
            } else {
                this.updateSets(key);
            }
        },

        setBudget : function (budget) {
            budget = this.model.format.currency(budget, true);
            this._budget.html(budget);
        },

        _setRaphaelColors : function () {

            var colors = [],
                model  = this.model,
                paper  = this.paper,
                items  = model.getItems(),
                dimensions = Humble.Config.DVC.budget.dimensions;

            _.each(items, function (value, key) {
                if (key in dimensions) {
                    colors.push(dimensions[key].color);
                }
            }, this);

            this.paper.g.colors = colors;
        }
    }

    Humble.DVC.BudgetVisualBlock = BudgetVisualBlock;
});
