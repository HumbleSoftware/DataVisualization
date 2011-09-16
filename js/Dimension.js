/**
 * Dimension Widget
 */
Humble( function () {

    var C_DIMENSION = 'humble-dvc-dimension',
        T_DIMENSION = '<div class="'+C_DIMENSION+'"></div>',
        T_SPENDING  = '<div class="'+C_DIMENSION+'-spending"></div>',
        T_TITLE     = '<div class="'+C_DIMENSION+'-title"></div>',
        T_TOTAL     = '<div class="'+C_DIMENSION+'-total"></div>',
        T_TAXES     = '<div class="'+C_DIMENSION+'-taxes"></div>';

    var Dimension = function (node, model) {

        this.parentNode = node;
        this.node = $(T_DIMENSION);
        this.model = model;

        this.render();
    }

    Dimension.prototype = {

        render : function () {

            var node = this.node;

            this.titleNode      = $(T_TITLE);
            this.totalNode      = $(T_TOTAL);
            this.taxesNode      = $(T_TAXES);
            this.spendingNode   = $(T_SPENDING);

            node.append(this.titleNode);
            node.append(this.totalNode);
            node.append(this.taxesNode);
            node.append(this.spendingNode);

            node.hide();

            this.parentNode.append(node);

            // Spending sub widget
            this.spending = new Humble.DVC.Spending(
                this.spendingNode,
                this.model
            );

            this.bind();
        },

        bind : function () {

            var that = this;

            // TODO some timeout for hover outs would be cool?
            this.node.hover(function () {
                Humble.Event.trigger('humble:dvc:dimensionHover', [that.key, true]);
            }, function () {
                Humble.Event.trigger('humble:dvc:dimensionHover', [that.key, false]);
            });

            Humble.Event.bind('humble:dvc:dimensionHover', function (e, key, hover) {
                if (hover) {
                    that.doHover(key);
                } else {
                    that.doHide();
                }
            });

            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                if (!show) {
                    //that.node.show();
                } else {
                    that.doHide();
                }
            });

            if (!navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)) {
                this.parentNode.mousemove(function (e) {

                    var x = e.pageX,
                        y = e.pageY,
                        offset = that.parentNode.offset();

                    x = (x + 28 - offset.left);
                    y = (y - that.node.height()/2 - offset.top);

                    that.node.css({
                        'top' : y,
                        'left' : x
                    });
                });
            }
        },

        doHover : function (key) {

            if (key == this.key) return;

            var model = this.model,
                spending = this.spending,
                total = model.get(key, 'amounti'),
                taxes = model.get(key, 'mycosti'),
                dimensions = Humble.Config.DVC.budget.dimensions;

            this.node.show();

            this.titleNode.html(dimensions[key].name);
            this.totalNode.html('Budget: '+this.model.format.currency(total, true));
            this.taxesNode.html('My Tax: '+this.model.format.currency(taxes));

            this.spending.update(key);

            this.key = key;
        },

        doHide : function () {
            this.node.hide();
            this.key = null;
        }
    }

    Humble.Dimension = Dimension;
});

