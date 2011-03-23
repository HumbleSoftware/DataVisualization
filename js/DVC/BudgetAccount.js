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
                if (show) {
                    that.showDimensionDetail(key);
                } else {
                    that.hideDimensionDetail(key);
                }
            });

            Humble.Event.bind('humble:dvc:accountModelUpdate', function () {
                that.update();
            });
        },

        showDimensionDetail : function (key) {
            var id = this.model.get(key, 'dimensionID'),
                income = this.model.getIncome(),
                data = {'function' : id, income : income};
            this.budgetAccountModel.setData(data);
            this.node.show();
        },

        hideDimensionDetail : function (key) {
            this.node.hide();
        },

        update : function () {
            var items = this.budgetAccountModel.getItems();

            this.node.empty();

            _.each(items, function (item, key) {

                if (item['mycosti'] < 0) return;

                var node = '<div>';
                node += item['function'],
                node += item['subfunction'],
                node += item['bureau'],
                node += item['agency'],
                node += item['account'],
                node += '</div>';

                this.node.append(node);

            }, this);
        },

        renderAccounts : function () {

        },

        _buildModel : function () {

            var model, options;

            options = {
                url : Humble.Config.DVZ.url+'getBudgetAccount',
                key : 'accountID'
            };

            model = new Humble.DVC.BudgetAccountModel(options);

            return model;
        }
    }

    Humble.DVC.BudgetAccount = BudgetAccount;
});
