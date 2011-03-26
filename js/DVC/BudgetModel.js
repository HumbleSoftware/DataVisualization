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
        SELF        = 'selfEmployed',
        SORT        = 'sortdir',
        SORTBY      = 'sortby',
        TYPE        = 'type',
        YEAR        = 'year';

    // Constructor
    var BudgetModel = function (options) {

        if (options) {
            this.url = options.url;
            this.key = options.key;
        }

        Humble.Model.apply(this, arguments);
        this.setters = {
            'mycosti' : this._setMycosti
        }
        this.parsers = {
            'amounti' : function (value) {
                return parseFloat(value) * 1000;
            },
            'mycosti' : parseFloat
        }
    }

    // Methods
    BudgetModel.prototype = {

        _setMycosti : function (item, attribute, value) {

            var income  = this.getData('income'),
                total   = this.getTotalTaxes(),
                current = this.items[item][attribute];

            if (total - current + value > income) {
                value = income - total + current;
            }

            // Update amounti
            var amounti = this._calculateAmountI(value);
            this._set(item, 'amounti', amounti);
        },

        /**
         * @todo Refactor this with requestData.
         */
        setData : function (data) {
            _.each(data, function (value, key) {
                this.data[key] = value;
            }, this);
            this.dataSource.request({data : this.data});
        },

        getData : function (key) {
            return (this.data[key] ? this.data[key] : false);
        },

        getTotalTaxes : function () {
            return this._getTotalNumeric('mycosti');
        },

        getTotalSpending : function () {
            return this._getTotalNumeric('amounti');
        },

        getMaxSpending : function () {

            var values = this.getItems(),
                max    = 0,
                field  = 'amounti';

            _.each(values, function (value, key) {
                max = Math.max(max, value[field]);
            }, this);

            return max;
        },

        requestData : function () {

            var data = {};

            // Data
            data[YEAR]      = 2010;
            data[TYPE]      = 0;
            data[SORT]      = 0;
            data[SORTBY]    = 0;
            data[SELF]      = 0;
            data[INCOME]    = 50000;
            data[FILING]    = 0;
            data[CHANGE]    = 0;
            data[EXTRA]     = 0;

            this.data = data;

            return data;
        },

        _getRatio : function () {

            var totalSpending   = this.getTotalSpending(),
                totalTaxes      = this.getTotalTaxes();

            return (totalTaxes) ?
                (totalSpending / totalTaxes) : false;
        },

        _calculateAmountI : function (mycosti) {
            return this.getRatio() * mycosti;
        }
    };

    Humble.Class.extend(BudgetModel, Humble.Model);

    // Namespace Hook
    Humble.DVC.BudgetModel = BudgetModel;
});
