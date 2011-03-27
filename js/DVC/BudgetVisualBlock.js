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
        T_LEGEND_BLOCK  = '<div class="'+C_VISUAL+'-legend-block"></div>',
        T_LEGEND_VALUE  = '<div class="'+C_VISUAL+'-legend-value"></div>';

    var BudgetVisualBlock = function (node, model) {

        this.parentNode = node;
        this.node       = $(T_VISUAL);
        this.model      = model;
        this.bars       = {};
        this.colors     = false;
        this.unit       = 10000000000;

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
            that = this;
            Humble.Event.bind('humble:dvc:dimensionHover', function (e, key, hover) {
                if (hover) {
                    that.highlight(key);
                } else {
                    console.log(that);
                    if (that.doNotHoverHide) {
                        that.doNotHoverHide = false;
                    } else {
                        that.unHighlight(key);
                    }
                }
            });
            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                if (!show) {
                    that.node.show();
                } else {
                    var set = that.sets[key];
                    set.attr({
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
                total = model.getTotalSpending(),
                items = model.getItems(),
                itemCount = model.getItemCount();
                dimensions = Humble.Config.DVZ.budget.dimensions,
                data  = [];

            var x0 = x = 2.5,
                y = 2,
                width = 18,
                height = 18,
                totalWidth = this.paper.width,
                totalHeight = this.paper.height,
                padding = 3,
                unit = this.unit;

            var sets = {};

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

                    if ((x + width + padding + width) > totalWidth) {
                        x = x0;
                        y += height + padding;
                        if (y > totalHeight) {
                            totalHeight = y + height + padding;
                            paper.setSize(totalWidth, totalHeight);
                        }
                    } else {
                        x += width + padding;
                    }
                }
		

                // Makes half of the dimensions opaque; need desaturating->hex function		
                var opacity = 1;
		if(itemCount > 9 && itemCounter <= 9)	{
                    opacity = .8;
                }

                set.attr({
                    'cursor' : 'pointer',
                    'fill' : dimensions[key].color,
                    'stroke' : '#333',
                    'fill-opacity' : opacity
                });

                $(set).css('cursor', 'pointer');

                set.click(function () {
                    Humble.Event.trigger('humble:dvc:dimensionDetail', [key, true]);
                });

                set.hover(function () {
                    Humble.Event.trigger('humble:dvc:dimensionHover', [key, true]);
                }, function () {
                    Humble.Event.trigger('humble:dvc:dimensionHover', [key, false]);
                });

                sets[key] = set;
                
                itemCounter++;

            });

            that.sets = sets;

            });

        },

        updateSets : function (updateKey) {

            var model = this.model,
                paper = this.paper,
                sets = this.sets,
                set = sets[updateKey],
                items = model.getItems();

            var width = 18,
                height = 18,
                totalWidth = paper.width,
                totalHeight = paper.height,
                padding = 3,
                x0 = 2;

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

                    var xa = r.x || r.attr('x'),
                        ya = r.y || r.attr('y');
                }

                var newEnd = set[(set.length-1)];
                set.x = newEnd.attr('x');
                set.y = newEnd.attr('y');

                this.cancel = false;
                var cancel = this.cancel;
                oldSet.animate({
                    scale : 0
                    /*
                    width : 0,
                    height: 0,
                    x : (r.attr('x') + width/2),
                    y : (r.attr('y') + height/2)
                    */
                }, 250, function () {
                    oldSet.remove();
                    if (!cancel) {
                        that._movePieces(xa, ya, updateKey, true);
                    }
                });
            } else if (pieces > length) {

                this.scroll(updateKey);

                delta = pieces - length;

                var end = set[(set.length -1)];

                x = set.x;
                y = set.y;

                var fill = end.attr('fill'),
                    stroke = end.attr('stroke');

                for (var i = 0; i < delta; i++) {

                    if ((x + width + padding + width) > totalWidth) {
                        x = x0;
                        y += height + padding;
                        if (y > totalHeight) {
                            totalHeight = y + height + padding;
                        }
                    } else {
                        x += width + padding;
                    }

                    set.x = x;
                    set.y = y;

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
                        Humble.Event.trigger('humble:dvc:dimensionHover', [updateKey, true]);
                    }, function () {
                        Humble.Event.trigger('humble:dvc:dimensionHover', [updateKey, false]);
                    });
                    r.animate({scale : 1}, 250);
                    set.push(r);
                }

                if ((x + width + padding + width) > totalWidth) {
                    x = x0;
                    y += height + padding;
                    if (y > totalHeight) {
                        totalHeight = y + height + padding;
                    }
                } else {
                    x += width + padding;
                }

                this.cancel = true;
                this._movePieces(x, y, updateKey);
            }
        },

        _movePieces : function (x, y, startKey, resize) {

            var sets = this.sets,
                paper = this.paper,
                start = false,
                x0 = 2,
                width = 18,
                height = 18,
                totalWidth = paper.width,
                totalHeight = paper.height,
                padding = 3;

            _.each(sets, function (set, key) {
                if (start) {
                    for (var i = 0; i < set.length; i++) {
                        var r = set[i];
                        r.attr({
                            x : x,
                            y : y
                        });
                        set.x = x;
                        set.y = y;

                        if ((x + width + padding + width) > totalWidth) {
                            x = x0;
                            y += height + padding;
                            if (y > totalHeight) {
                                totalHeight = y + height + padding;
                            }
                        } else {
                            x += width + padding;
                        }
                    }
                }
                if (key == startKey) {
                    start = true;
                };
            });
            paper.setSize(totalWidth, (y + height + padding));
        },

        highlight : function (key) {

            var set = this.sets[key];

            this.scroll(key);

            set.stop();
            set.attr({
                'stroke-opacity' : 0
            });
            set.attr({scale : [1.25, 1.25]});//, 250);

            if (set.length > 20) {
                set.attr({fill: '#fff'});
            }
        },

        unHighlight : function (key) {
            var set = this.sets[key];
            set.stop();
            set.animate({
                'stroke' : '#333',
                'stroke-opacity' : 1,
                'stroke-width' : '1px',
                scale : [1, 1]
            }, 250);
        },

        scroll : function (key) {

            var set = this.sets[key],
                y   = set[0].attr('y');

            this.canvas.stop();
            this.canvas.animate({'scrollTop' : y});
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
                dimensions = Humble.Config.DVZ.budget.dimensions;

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
