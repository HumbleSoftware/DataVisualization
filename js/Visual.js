Humble( function () {

    var Visual = function (node, model) {

        this.node  = node;
        this.model = model;
        this.render();
    };

    Visual.prototype = {

        render : function () {

            var node    = this.node,
                width   = node.width(),
                height  = node.height(),
                paper   = Raphael(document.getElementById(node.attr('id')), width, height),
                totalPadding;

            this.paper = paper;

            this.draw();
        },

        draw : function () {

            var model   = this.model,
                paper   = this.paper,
                width   = paper.width,
                height  = paper.height,
                items   = model.getItems(),
                count   = model.getItemCount(),
                total   = model.getTotalSpending(),
                max     = model.getMaxSpending(),
                padding = 4,
                totalPadding,
                offset,
                drawWidth;

            offset          = padding;
            totalPadding    = (count+2) * padding;
            drawWidth       = width - totalPadding;

            _.each(items, function (item, key) {

                var r, rWidth, rHeight, rX, rY;

                rWidth  = Math.floor((item['amounti']/total)*drawWidth);
                rHeight = Math.floor((item['amounti']/max)*height);
                rX      = offset;
                rY      = height - rHeight + padding;

                r = paper.rect(rX, rY, rWidth, rHeight, 1);
                r.attr({fill : '#bbbbff'});

                offset += padding + rWidth;
            });
        }
    }

    Humble.Visual = Visual;
});
