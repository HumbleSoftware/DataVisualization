/**
 * Dimension Widget
 */
Humble( function () {

    var C_BUDGET_ACCOUNT = 'humble-dvc-subfunction',
        T_BUDGET_ACCOUNT = '<div class="'+C_BUDGET_ACCOUNT+'"></div>',
        T_BACK           = '<div class="'+C_BUDGET_ACCOUNT+'-back"><button>Go Back</button></div>',
        T_TITLE          = '<div class="'+C_BUDGET_ACCOUNT+'-title">Top Ten:</div>';
        T_ACCOUNTS       = '<div class="'+C_BUDGET_ACCOUNT+'-accounts"></div>';

    var BudgetAccount = function (node, model) {

        this.parentNode = node;
        this.node = $(T_BUDGET_ACCOUNT);
        this.model = model;
        this.budgetAccountModel = this._buildModel();

        this.render();
    }

    BudgetAccount.prototype = {

        render : function () {

            this.accountsNode = $(T_ACCOUNTS);
            this.back = $(T_BACK);
            this.title = $(T_TITLE);

            this.node.append(this.back, this.title, this.accountsNode);
            this.node.hide();

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

            this.back.click(function () {
                Humble.Event.trigger('humble:dvc:dimensionDetail', [null, false]);
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

            // Remove old content
            this.accountsNode.empty();
        },

        update : function () {

            var items = this.budgetAccountModel.getItems(),
                count = 0;

            _.each(items, function (item, key) {

                if (count >= 10 || item['mycosti'] < 0) return;

                var node = '<div>';
                node += item['function'],
                node += item['subfunction'],
                node += item['bureau'],
                node += item['agency'],
                node += item['account'],
                node += '</div>';

                this.accountsNode.append(node);

                count++;

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
