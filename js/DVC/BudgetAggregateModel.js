/**
 * Class Humble Model
 */
Humble( function () {

    // Class Constants
    var CHANGE      = 'showChange',
        EXTRA       = 'showExtra',
        FILING      = 'filing',
        GROUP       = 'group',
        INCOME      = 'income',
        SORT        = 'sortdir',
        TYPE        = 'type',
        YEAR        = 'year';

    // Constructor
    var BudgetAggregateModel = function (options) {
        this.fields = Humble.Config.DVZ.budget.fields;
        Humble.DVC.BudgetModel.apply(this, arguments);
    }

    // Methods
    BudgetAggregateModel.prototype = {

        set : function (item, attribute, value) {
            Humble.Model.prototype.set.apply(this, arguments);
            Humble.Event.trigger('humble:dvc:modelUpdate', [item]);
        },

        setXML : function (xml) {

            Humble.Model.prototype.setXML.apply(this, arguments);

            this.ratio = this._getRatio(); 

            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        requestData : function () {
            var data = Humble.DVC.BudgetModel.prototype.requestData.apply(this, arguments);
            data[GROUP]     = 'function';
            return data;
        },

        getRatio : function () {
            return this.ratio;
        },

        getTotalSpending : function () {
            total = Humble.DVC.BudgetModel.prototype.getTotalSpending.apply(this, arguments);
            return total * 1000;
        },

        _getRatio : function () {

            var totalSpending   = this.getTotalSpending(),
                totalTaxes      = this.getTotalTaxes();

            return (totalTaxes) ?
                (totalSpending / totalTaxes) : false;
        }
    };

    Humble.Class.extend(BudgetAggregateModel, Humble.DVC.BudgetModel);

    // Namespace Hook
    Humble.DVC.BudgetAggregateModel = BudgetAggregateModel;
});
