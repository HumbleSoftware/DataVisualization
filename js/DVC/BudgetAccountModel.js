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
    var BudgetAccountModel = function (options) {
        this.fields = Humble.Config.DVZ.budgetAccount.fields;
        Humble.DVC.BudgetModel.apply(this, arguments);
    }

    // Methods
    BudgetAccountModel.prototype = {

        set : function () {
            Humble.Model.prototype.set.apply(this, arguments);
            Humble.Event.trigger('humble:dvc:accountModelUpdate');
        },

        setXML : function (xml) {
            Humble.Model.prototype.setXML.apply(this, arguments);
            Humble.Event.trigger('humble:dvc:accountModelUpdate');
        }
    };

    Humble.Class.extend(BudgetAccountModel, Humble.DVC.BudgetModel);

    // Namespace Hook
    Humble.DVC.BudgetAccountModel = BudgetAccountModel;
});
