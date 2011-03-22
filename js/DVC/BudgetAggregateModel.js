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
        Humble.DVC.BudgetModel.apply(this, arguments);
    }

    // Methods
    BudgetAggregateModel.prototype = {

        set : function () {
            Humble.Model.prototype.set.apply(this, arguments);
            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        setXML : function (xml) {

            Humble.Model.prototype.setXML.apply(this, arguments);

            this.ratio = this._getRatio(); 

            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        getRatio : function () {
            return this.ratio;
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
