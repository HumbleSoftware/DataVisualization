/**
 * Spending Widget
 */
Humble( function () {

    var C_SPENDING  = 'humble-dvc-spending',
        T_SPENDING  = '<div class="'+C_SPENDING+'"></div>',
        T_TITLE     = '<div class="'+C_SPENDING+'-title">Spending:</div>',
        T_PIE       = '<div class="'+C_SPENDING+'-pie"></div>',
        T_LEGEND    = '<div class="'+C_SPENDING+'-legend"></div>';

    var Spending = function (node, model) {

        this.parentNode = node;
        this.node = $(T_SPENDING);
        this.model = model;

        this.render();
    }

    Spending.prototype = {

        render : function () {

            var node = this.node,
                spendingColors = Humble.Config.DVZ.spendingColors;

            this.parentNode.append(node);

            var title = $(T_TITLE);
            this.pieNode    = $(T_PIE);
            this.legendNode = $(T_LEGEND);

            this.legendNode.html(this._getLegendHTML());

            // Do legend colors
            _.each(spendingColors, function (color, key) {
                var c = '.'+C_SPENDING+'-'+key+' .'+C_SPENDING+'-legend-block';
                this.legendNode.find(c).css({'background' : color});
            }, this);

            node.append(title);
            node.append(this.pieNode);
            node.append(this.legendNode);
        },

        _renderPaper : function () {

            var node    = this.pieNode,
                domNode = node.get(0),
                width   = node.width(),
                height  = node.height(),
                paper   = Raphael(domNode, width, height);

            this.pieConfig = {
                x : width / 2,
                y : height / 2,
                r : width / 2 - 2
            }

            return paper;
        },

        update : function (key) {
            this.drawPie(key);
        },

        drawPie : function (key) {

            if (!this.paper) this.paper = this._renderPaper();

            this.deletePie();

            var paper   = this.paper,
                data    = this._getData(key),
                config  = this.pieConfig,
                colors0 = this._getRaphaelColors(),
                colors  = [],
                spendingColors = Humble.Config.DVZ.spendingColors;
                
            colors.push(spendingColors.deficit);
            colors.push(spendingColors.income);
            colors.push(spendingColors.other);

            this._setRaphaelColors(colors);
            this.pie = paper.g.piechart(config.x, config.y, config.r, data);
            this._setRaphaelColors(colors0);
        },

        deletePie : function () {

            if (this.pie) {
                this.pie.remove();
                delete this.pie;
            }
        },

        _getLegendHTML : function () {

            var html = '';

            html += '<div class="'+C_SPENDING+'-legend-item '+C_SPENDING+'-deficit">';
            html += '<div class="'+C_SPENDING+'-legend-block"></div>';
            html += '<div class="'+C_SPENDING+'-legend-label">Deficit Spending</div>';
            html += '</div>';
            html += '<div class="'+C_SPENDING+'-legend-item '+C_SPENDING+'-income">';
            html += '<div class="'+C_SPENDING+'-legend-block"></div>';
            html += '<div class="'+C_SPENDING+'-legend-label">Income Taxes</div>';
            html += '</div>';
            html += '<div class="'+C_SPENDING+'-legend-item '+C_SPENDING+'-other">';
            html += '<div class="'+C_SPENDING+'-legend-block"></div>';
            html += '<div class="'+C_SPENDING+'-legend-label">Other Taxes</div>';
            html += '</div>';

            return html;
        },
        _getData : function (key) {

            var model   = this.model,
                deficit = model.getDeficitSpending(key),
                other   = model.getOtherTaxSpending(key),
                total   = model.get(key, 'amounti'),
                income  = total - other - deficit,
                data;

            data = [
                deficit,
                income,
                other
            ]

            return data;
        },
        _setRaphaelColors : function (colors) {
            this.paper.g.colors = colors;
        },
        _getRaphaelColors : function (colors) {
            return _.clone(this.paper.g.colors);
        }
    }

    Humble.DVC.Spending = Spending;
});

