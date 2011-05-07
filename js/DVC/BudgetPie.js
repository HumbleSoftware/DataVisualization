/**
 * Budget Widget
 */
Humble( function () {

    var C_BUDGET  = 'humble-dvc-budgetpie',
        T_BUDGET  = '<div class="'+C_BUDGET+'"></div>',
        T_TITLE     = '<div class="'+C_BUDGET+'-title">Federal Budget:</div>',
        T_PIE       = '<div class="'+C_BUDGET+'-pie"></div>',
        T_LEGEND    = '<div class="'+C_BUDGET+'-legend"></div>';

    var BudgetPie = function (node, model) {

        this.parentNode = node;
        this.node = $(T_BUDGET);
        this.model = model;

        this.render();
    }

    BudgetPie.prototype = {

        render : function () {

            var node = this.node,
                spendingColors = Humble.Config.DVC.spendingColors;

            this.colors = {
                dimension : spendingColors.deficit,
                other : spendingColors.income
            }

            this.parentNode.append(node);

            var title = $(T_TITLE);
            this.pieNode    = $(T_PIE);
            this.legendNode = $(T_LEGEND);

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

            var model = this.model,
                title = model.get(key, 'dimensionName');

            this.drawPie(key);
            this.legendNode.html(this._getLegendHTML(title));

            // Do legend colors
            _.each(this.colors, function (color, key) {
                var c = '.'+C_BUDGET+'-'+key+' .'+C_BUDGET+'-legend-block';
                this.legendNode.find(c).css({'background' : color});
            }, this);
        },

        drawPie : function (key) {

            if (!this.paper) this.paper = this._renderPaper();

            this.deletePie();

            var paper   = this.paper,
                data    = this._getData(key),
                config  = this.pieConfig,
                colors0 = this._getRaphaelColors(),
                colors  = [];
                
            colors.push(this.colors.dimension);
            colors.push(this.colors.budget);

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

        _getLegendHTML : function (title) {

            var html = '';

            html += '<div class="'+C_BUDGET+'-legend-item '+C_BUDGET+'-dimension">';
            html += '<div class="'+C_BUDGET+'-legend-block">&nbsp;</div>';
            html += '<div class="'+C_BUDGET+'-legend-label">'+title+'</div>';
            html += '</div>';
            html += '<div class="'+C_BUDGET+'-legend-item '+C_BUDGET+'-other">';
            html += '<div class="'+C_BUDGET+'-legend-block">&nbsp;</div>';
            html += '<div class="'+C_BUDGET+'-legend-label">Other</div>';
            html += '</div>';

            return html;
        },
        _getData : function (key) {

            var model   = this.model,
                total   = model.get(key, 'amounti'),
                other   = model.getTotalSpending() - total,
                data;

            data = [
                total,
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

    Humble.DVC.BudgetPie = BudgetPie;
});

