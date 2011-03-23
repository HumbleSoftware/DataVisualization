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
        this.budgetAccountModel = this._buildModel();

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
                var id = that.model.get(key, 'dimensionID'),
                    income = that.model.getIncome(),
                    data = {'function' : id, income : income};
                that.budgetAccountModel.setData(data);
            });
        },

        renderAccounts : function () {

        },

        _buildModel : function () {

            var model, options;

            options = {
                url  : Humble.Config.DVZ.url+'getBudgetAccount'
            };

            model = new Humble.DVC.BudgetAggregateModel(options);

            return model;
        }
    }

    Humble.DVC.BudgetAccount = BudgetAccount;
});
