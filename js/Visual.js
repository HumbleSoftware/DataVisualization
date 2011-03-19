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
                paper   = Raphael(node.get(0), width, height),
                totalPadding;

            this.paper = paper;
        },

        draw : function () {

            if (this.pie) {
                this.pie.remove();
                delete this.pie;
            }

            var model = this.model,
                paper = this.paper,
                items = model.getItems(),
                data  = [];

            _.each(items, function (item, key) {
                data.push(item['amounti']);
            }, this);

            this.pie = paper.g.piechart(320, 320, 300, data);

            // Bindings
            var that = this;
            this.pie.hover(function () {
                var index = this.value.order,
                    key   = that.model.getKey(index);
                that.highlight(key);
            }, function () {
                this.sector.animate({scale: [1, 1, this.cx, this.cy]}, 500, "bounce");
            });
        },

        highlight : function (key) {
            var index  = this.model.getIndex(key),
                sector = this.pie.series[index]
            sector.stop();
            sector.scale(1.02, 1.02, 320, 320);
        },

        update : function () {
            this.draw();
        },

        /**
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

            this._drawn = true;
        },

        update : function () {
            if (this._drawn) {
                this.redraw();
            } else {
                this.draw();
            }
        },

        /*
        update : function (key, value) {

            var max         = this.model.getMaxSpending(),
                pHeight     = this.paper.height,
                ratio       = this.model.getRatio(),    
                rHeight     = Math.floor(((value*ratio)/max)*pHeight),
                padding     = 4,
                newY        = pHeight - rHeight + padding;

            if (typeof (this.max) == 'undefined') {
                this.max = max;
            }


            if (this.max === max) {
                this.bars[key].animate({y: newY, height: rHeight}, 500, '>');
            } else {
                this.redraw();
            }

            this.max = max;
        },
        */

                 /*
        redraw : function () {

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

                var r = this.bars[key],
                    rWidth, rHeight, rX, rY;

                rHeight = Math.floor((item['amounti']/max)*height);
                rY      = height - rHeight + padding;

                r.stop();
                //r.animate({y: rY, height: rHeight}, 500, '>');
                r.attr({y: rY, height: rHeight});
                // Implement attr if animation slow
                // r.attr({y: rY, height: rHeight});

                offset += padding + rWidth;

            }, this);

        }
    */
    }

    Humble.Visual = Visual;
});
