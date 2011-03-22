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

        this.url = options.url;
        this.key = options.key;

        Humble.Model.apply(this, arguments);
        this.setters = {
            'mycosti' : this._setMycosti
        }
        this.parsers = {
            'amounti' : parseFloat,
            'mycosti' : parseFloat
        }
    }

    // Methods
    BudgetAggregateModel.prototype = {

        _setMycosti : function (item, attribute, value) {

            var income  = this.getIncome(),
                total   = this.getTotalTaxes(),
                current = this.items[item][attribute];

            if (total - current + value > income) {
                value = income - total + current;
            }

            // Update amounti
            var amounti = this._calculateAmountI(value);
            this._set(item, 'amounti', amounti);
        },

        set : function () {
            Humble.Model.prototype.set.apply(this, arguments);
            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        setXML : function (xml) {

            Humble.Model.prototype.setXML.apply(this, arguments);

            this.ratio = this._getRatio(); 

            Humble.Event.trigger('humble:dvc:modelUpdate');
        },

        setIncome : function (income) {

            var config;

            this.income = income;

            config = {
                data : { income : income }
            };

            this.dataSource.request(config);
        },

        getIncome : function () {
            return this.income;
        },

        getRatio : function () {
            return this.ratio;
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
            data[INCOME]    = 50000;
            data[FILING]    = 0;
            data[GROUP]     = 'function';
            data[CHANGE]    = 0;
            data[EXTRA]     = 0;

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

    Humble.Class.extend(BudgetAggregateModel, Humble.Model);

    // Namespace Hook
    Humble.DVC.BudgetAggregateModel = BudgetAggregateModel;
});
