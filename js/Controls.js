/**
 * Controls Widget
 */
Humble( function () {

    var C_CONTROLS      = 'humble-dvc-controls',
        T_CONTROLS      = '<div class="'+C_CONTROLS+'"></div>',
        T_INCOME_INPUT  = '<input id="humble-dvc-controls-input" type="text"></input>',
        T_INCOME_LABEL  = '<label for="humble-dvc-controls-input">Income</input>',
        T_TOTAL_TAXES   = '<div class="humble-dvc-controls-total"></div>',
        T_TOTAL_BUDGET  = '<div class="humble-dvc-controls-total"></div>',
        T_RESET     	= '<a id="humble-dvc-controls-reset">Reset</a>';

    var Controls = function (node, model) {

        this.parentNode = node;
        this.node = $(T_CONTROLS);
        this.model = model;

        this.render();
    };

    Controls.prototype = {

        render : function () {

            var node = this.node;

            this._income    = $(T_INCOME_INPUT);
            this._total     = $(T_TOTAL_TAXES);
            this._budget    = $(T_TOTAL_BUDGET);
    		this._reset		= $(T_RESET);

            node.append(T_INCOME_LABEL);
            node.append(this._income);
            node.append(this._total);
            node.append(this._budget);
            node.append(this._reset);

            this.parentNode.append(node);

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
    		this._reset.click(callback);
    	},
    	
        update : function () {
            var total = this.model.getTotalTaxes();
            this.setTotal(total);
        },

        setTotal : function (total) {
            total = this.model.format.currency(total);
            this._total.html('Total Taxes: '+total);
        },
        setBudget : function (budget) {
            budget= this.model.format.currency(budget);
            this._budget.html('Federal Budget: '+budget);
        }

    };

    Humble.Controls = Controls;

});
