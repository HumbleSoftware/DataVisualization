/**
 * Dimension Widget
 */
Humble( function () {

    var C_BUDGET_ACCOUNT = 'humble-dvc-subfunction',
        T_BUDGET_ACCOUNT = '<div class="'+C_BUDGET_ACCOUNT+'"></div>';

    var BudgetAccount = function (node, model) {

        this.parentNode = node;
        this.node = $(T_BUDGET_ACCOUNT);
        this.model = model;
        this.dataSource = this.buildDataSource();

        this.render();
    }

    BudgetAccount.prototype = {

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

    Humble.DVC.BudgetAccount = BudgetAccount;
});

