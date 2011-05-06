/**
 * Dimension Widget
 */
Humble( function () {

    var C_BUDGET_ACCOUNT = 'humble-dvc-subfunction',
        T_BUDGET_ACCOUNT = '<div class="'+C_BUDGET_ACCOUNT+'"></div>',
        T_BACK           = '<div class="'+C_BUDGET_ACCOUNT+'-back"><a>Go Back</a> ></div>',
        T_TITLE          = '<div class="'+C_BUDGET_ACCOUNT+'-title">Top Ten:</div>',
        T_TAXES          = '<div class="'+C_BUDGET_ACCOUNT+'-taxes"></div>',
        T_BUDGET         = '<div class="'+C_BUDGET_ACCOUNT+'-budget"></div>',
        T_ACCOUNTS       = '<div class="'+C_BUDGET_ACCOUNT+'-accounts"></div>',
        T_BUDGETPIE      = '<div class="'+C_BUDGET_ACCOUNT+'-budgetpie"></div>',
        T_SPENDING       = '<div class="'+C_BUDGET_ACCOUNT+'-spending"></div>';

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
            this.budget = $(T_BUDGET);
            this.taxes = $(T_TAXES);
            var spending = $(T_SPENDING),
                budgetpie = $(T_BUDGETPIE);

            this.node.append(
                this.back,
                this.title,
                this.budget,
                this.taxes,
                spending,
                budgetpie,
                this.accountsNode
            );
            this.node.hide();

            this.parentNode.append(this.node);

            // Spending sub widget
            this.spending = new Humble.DVC.Spending(
                spending,
                this.model
            );

            // Budget
            this.budgetpie = new Humble.DVC.BudgetPie(
                budgetpie,
                this.model
            );

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

            var model   = this.model,
                id      = model.get(key, 'dimensionID'),
                income  = model.getData('income'),
                data    = {'function' : id, income : income},
                title   = model.get(key, 'dimensionName');
                budget  = model.get(key, 'amounti');
                taxes   = model.get(key, 'mycosti');

            this.spending.update(key);
            this.budgetpie.update(key);
            this.dimension = key;
            this.title.html(title);
            this.budget.html('Budget: ' + (model.format.currency(budget, true)));
            this.taxes.html('My Taxes: ' + (model.format.currency(taxes)));
            this.budgetAccountModel.setData(data);
            this.node.show();
        },

        hideDimensionDetail : function () {

            this.dimension = null;

            this.node.hide();

            // Remove old content
            this.accountsNode.empty();
        },

        update : function () {

            var items = this.budgetAccountModel.getItems(),
                count = 0,
                node,
                list;

            node = '<div class="'+C_BUDGET_ACCOUNT+'-thead">';
            node += '<div class="humble-dvc-subfunction-account">Top 10 Accounts:</div>',
            node += '<div class="humble-dvc-subfunction-account-budget">Budget:</div>',
            node += '<div class="humble-dvc-subfunction-tax">My Tax:</div>',
            node += '</div>';

            this.accountsNode.append(node);

            list = _.sortBy(items, function (item) {
                return -item.amounti;
            }); 

            _.each(list, function (item, key) {

                if (count >= 10 || item['mycosti'] < 0) return;

                var node = this._renderAccount(item);
                this.accountsNode.append(node);
                count++;

            }, this);
        },

        _renderAccount : function (account) {

            var amounti = account['amounti'],
                mycosti = account['mycosti'],
                ratioSpending = this.model.getRatioSpending(this.dimension),
                ratioTaxes = this.model.getRatioTaxes(this.dimension),
                node;

            // Apply ratios
            amounti = ratioSpending * amounti;
            mycosti = ratioTaxes * mycosti;

            node = '<div>';
            node += '<div class="humble-dvc-subfunction-account">'+account['account']+'</div>';
            node += '<div class="humble-dvc-subfunction-account-budget">'+this.model.format.currency(amounti, true)+'</div>';
            node += '<div class="humble-dvc-subfunction-tax">'+this.model.format.currency(mycosti)+'</div>';
            node += '</div>';

            return node;
        },

        _buildModel : function () {

            var model, options;

            options = {
                url : Humble.Config.DVC.url+'getBudgetAccount',
                key : 'accountID'
            };

            model = new Humble.DVC.BudgetAccountModel(options);

            return model;
        }
    }

    Humble.DVC.BudgetAccount = BudgetAccount;
});
