Humble( function () {

    var C_VISUAL = 'humble-dvc-visual',
        T_VISUAL = '<div class="'+C_VISUAL+'"></div>';

    var BudgetVisualBlock = function (node, model) {

        this.parentNode = node;
        this.node  = $(T_VISUAL);
        this.model = model;
        this.bars  = {};
        this.colors = false;

        this.render();
    };

    BudgetVisualBlock.prototype = {

        render : function () {

            this.parentNode.append(this.node);

            var node    = this.node,
                width   = node.width(),
                height  = node.height(),
                paper   = Raphael(node.get(0), width, height),
                totalPadding;

            this.paper = paper;

            this.bind();
        },

        bind : function () {
            that = this;
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

        draw : function () {

            var model = this.model,
                paper = this.paper,
                total = model.getTotalSpending(),
                items = model.getItems(),
                dimensions = Humble.Config.DVZ.budget.dimensions,
                data  = [];

            var x0 = x = 2,
                y = 2,
                width = 18,
                height = 18,
                totalWidth = this.node.width(),
                padding = 3;


            var sets = {};

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            var that = this;

            this.timeout = setTimeout ( function () {

            paper.clear();

            _.each(dimensions, function (dimension, key) {

                var item   = items[key],
                    amount = item['amounti'],
                    pieces = Math.ceil(amount/10000000),
                    set    = paper.set();

                for (i = 0; i < pieces; i++) {
                    var r = paper.rect(x, y, width, height);
                    set.push(r);

                    if ((x + width + padding + width) > totalWidth) {
                        x = x0;
                        y += height + padding;
                    } else {
                        x += width + padding;
                    }
                }

                set.attr({
                    'cursor' : 'pointer',
                    'fill' : dimensions[key].color,
                    'stroke' : '#333',
                    'stroke-width' : '1px'
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

            });

            that.sets = sets;

            });

        },

        updateSets : function (updateKey) {

            var model = this.model,
                paper = this.paper,
                sets = this.set;

            _.each(sets, function (set, key) {
                if (key == updateKey) {
                    console.log('here');
                }
            }, this);
        },

        highlight : function (key) {
            var set = this.sets[key];
            set.stop();
            set.attr({
                'stroke-opacity' : 0
            });
            set.animate({scale : [1.25, 1.25]}, 500, 'bounce');
        },

        unHighlight : function (key) {
            var set = this.sets[key];
            set.stop();
            set.animate({
                'stroke' : '#333',
                'stroke-opacity' : 1,
                'stroke-width' : '1px',
                scale : [1, 1]
            }, 500, 'bounce');
        },

        update : function (key) {


            this.draw();
            /*
            if (!key || !this.sets) {
            } else {
                this.updateSets(key);
            }
            */
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
