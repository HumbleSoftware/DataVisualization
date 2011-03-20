/**
 * Dimension Widget
 */
Humble( function () {

    var C_DIMENSION = 'humble-dvc-dimension',
        T_DIMENSION = '<div class="'+C_DIMENSION+'"></div>',
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

            this.titleNode = $(T_TITLE);
            this.totalNode = $(T_TOTAL);
            this.taxesNode = $(T_TAXES);

            node.append(this.titleNode);
            node.append(this.totalNode);
            node.append(this.taxesNode);

            node.hide();

            this.parentNode.append(node);

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
                    that.node.show();
                    that.doHover(key);
                } else {
                    that.node.hide();
                    that.key = null;
                }
            });
        },

        doHover : function (key) {

            var model = this.model,
                total = model.get(key, 'amounti'),
                taxes = model.get(key, 'mycosti'),
                dimensions = Humble.Config.DVZ.budget.dimensions;

            this.titleNode.html(dimensions[key].name);
            this.totalNode.html(total);
            this.taxesNode.html(taxes);

            this.key = key;
        }

    }

    Humble.Dimension = Dimension;
});

