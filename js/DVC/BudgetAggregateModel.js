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

    // Other Constants
    var INCOME_TAX_RECEIPT = 935771000000;

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
            this._getIncomeTaxReceiptRatio();
            this.itemsCache = this._getItems(this.xmlDoc);

            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        requestData : function () {
            var data = Humble.DVC.BudgetModel.prototype.requestData.apply(this, arguments);
            data[GROUP]     = 'function';
            return data;
        },

        getRatioSpending : function (key) {

            var item    = this.itemsCache[key],
                amount0 = item['amounti'],
                amounti = this.items[key]['amounti'],
                ratio   = amounti / amount0;

            return ratio;
        },

        getRatioTaxes : function (key) {

            var item    = this.itemsCache[key],
                mycost0 = item['mycosti'],
                mycosti = this.items[key]['mycosti'],
                ratio   = mycosti / mycost0;

            return ratio;
        },

        getRatio : function () {
            return this.ratio;
        },

        _getRatio : function () {

            var totalSpending   = this.getTotalSpending(),
                totalTaxes      = this.getTotalTaxes();

            return (totalTaxes) ?
                (totalSpending / totalTaxes) : false;
        },

        getIncomeTaxReceiptRatio : function () {
            return this._incomeTaxReceiptRatio;
        },

        _getIncomeTaxReceiptRatio : function () {
            var ratio = INCOME_TAX_RECEIPT / this.getTotalSpending();
            this._incomeTaxReceiptRatio = ratio;
        }

    };

    Humble.Class.extend(BudgetAggregateModel, Humble.DVC.BudgetModel);

    // Namespace Hook
    Humble.DVC.BudgetAggregateModel = BudgetAggregateModel;
});
