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
    var INCOME_TAX_RECEIPT  = 935771000000,
        TOTAL_RECEIPTS      = 2165119000000;

    // Constructor
    var BudgetAggregateModel = function (options) {
        this.fields = Humble.Config.DVC.budget.fields;
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
            this._getDeficitRatio();
            this._getOtherTaxesRatio();
            this.itemsCache = this._getItems(this.xmlDoc);

            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        setData : function () {
            Humble.Event.trigger('humble:dvc:modelRequest');
            Humble.DVC.BudgetModel.prototype.setData.apply(this, arguments);
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
        },

        getOtherTaxesRatio : function () {
            return this._otherTaxesRatio;
        },

        _getOtherTaxesRatio : function () {
            var ratio = (TOTAL_RECEIPTS - INCOME_TAX_RECEIPT) / this.getTotalSpending();
            this._otherTaxesRatio = ratio;
        },

        getDeficitRatio : function (key) {
            return this._deficitRatio;
        },

        _getDeficitRatio : function () {
            var ratio = 1 - TOTAL_RECEIPTS / this.getTotalSpending();
            this._deficitRatio = ratio;
        },

        getDeficitSpending : function (key) {

            var item        = this.itemsCache[key],
                amount0     = item['amounti'],
                ratio       = this.getDeficitRatio(),
                spending    = ratio * amount0;

            return spending;
        },

        getOtherTaxSpending : function (key) {

            var item        = this.itemsCache[key],
                amount0     = item['amounti'],
                ratio       = this.getOtherTaxesRatio(),
                spending    = ratio * amount0;

            return spending;
        }
    };

    Humble.Class.extend(BudgetAggregateModel, Humble.DVC.BudgetModel);

    // Namespace Hook
    Humble.DVC.BudgetAggregateModel = BudgetAggregateModel;
});
