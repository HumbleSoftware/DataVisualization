/**
 * Controls Widget
 */
Humble( function () {

    var T_INCOME_INPUT  = '<input id="humble-dvc-input" type="text"></input>',
        T_INCOME_LABEL  = '<label for="humble-dvc-input">Income</input>',
        T_TOTAL_TAXES   = '<div class="humble-dvc-total-taxes"></div>',
        T_TOTAL_BUDGET  = '<div class="humble-dvc-total-budget"></div>',
        T_RESET 		= '<input id="humble-dvc-reset-xml" type="button" value="Reset"></input>';

    var Controls = function (node, model) {

        this.node = node;
        this.model = model;

        this.render();
    };

    Controls.prototype = {

        render : function () {

            this._income    = $(T_INCOME_INPUT);
            this._total     = $(T_TOTAL_TAXES);
            this._budget    = $(T_TOTAL_BUDGET);
			this._reset		= $(T_RESET);

            this.node.append(T_INCOME_LABEL);
            this.node.append(this._income);
            this.node.append(this._total);
            this.node.append(this._budget);
            this.node.append(this._reset);

            this.bind();
        },

        bind : function () {
            var that = this;
            Humble.Event.bind('humble:dvc:modelUpdate', function (e) {
                that.setBudget(that.model.getTotalSpending());
            });
        },

        incomeChange : function (callback) {
            this._income.change(callback);
        },

		resetXML : function (callback)	{
			console.log("resetXML");
			this._reset.click(callback);
		},
		
        update : function () {
            var total = this.model.getTotalTaxes();
            this.setTotal(total);
        },

        setTotal : function (total) {
            this._total.html('Total Taxes: $'+total);
        },
        setBudget : function (budget) {
            this._budget.html('Federal Budget: $'+budget);
        }

    };

    Humble.Controls = Controls;

});
