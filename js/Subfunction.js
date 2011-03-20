/**
 * Dimension Widget
 */
Humble( function () {

    var C_SUBFUNCTION = 'humble-dvc-subfunction',
        T_SUBFUNCTION = '<div class="'+C_SUBFUNCTION+'"></div>';

    var Subfunction = function (node, model) {

        this.parentNode = node;
        this.node = $(T_SUBFUNCTION);
        this.model = model;
        this.dataSource = this.buildDataSource();

        this.render();
    }

    Subfunction.prototype = {

        render : function () {
            this.parentNode.append(this.node);
            this.bind();
        },

        bind : function () {

            var that = this;

            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                that.dataSource.request({
                    success : function () {
                        console.log('request made!');
                    }
                });

            });
        },

        buildDataSource : function () {

            var dataSource, options;

            options = {
                url  : 'http://www.whatwepayfor.com/api/getBudgetAccount'
            };

            dataSource = new Humble.DataSource(options);

            return dataSource;
        }
    }

    Humble.Subfunction = Subfunction;
});

