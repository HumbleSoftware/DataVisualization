Humble( function () {

    var Visual = function (node, model) {

        this.node  = node;
        this.model = model;
        this.bars  = {};

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
            drawWidth       = Math.floor((width - totalPadding) / count);

            _.each(items, function (item, key) {

                var r, rWidth, rHeight, rX, rY;

                rWidth  = drawWidth;
                rHeight = Math.floor((item['amounti']/max)*height);
                rX      = offset;
                rY      = height - rHeight + padding;

                r = paper.rect(rX, rY, rWidth, rHeight, 1);
                r.attr({fill : '#bbbbff'});

                offset += padding + rWidth;

                this.bars[key] = r;
            }, this);
        },

        update : function (key, value) {

            var max         = this.model.getMaxSpending(),
                pHeight     = this.paper.height,
                approxRatio = 286785;    
                rHeight     = Math.floor(((value*approxRatio)/max)*pHeight),
                padding     = 4,
                newY        = pHeight - rHeight + padding;

            this.bars[key].animate({y: newY, height: rHeight}, 500, '>');
        }
    }

    Humble.Visual = Visual;
});
