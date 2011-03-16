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
    var DataSource = function () {

    }

    // Methods
    DataSource.prototype = {

        request : function (options) {

            var config = {},
                data   = {};

            // Data
            data[YEAR]      = 2010;
            data[TYPE]      = 0;
            data[SORT]      = 0;
            data[INCOME]    = 50000;
            data[FILING]    = 0;
            data[GROUP]     = 'function';
            data[CHANGE]    = 0;
            data[EXTRA]     = 0;

            // Config
            config = {
                url : 'http://www.whatwepayfor.com/api/getBudgetAggregate',
                dataType : 'jsonp',
                data : data
            };

            // Options
            if ('callback' in options) {
                if ('success' in options.callback) {
                    config.success = options.callback.success;
                }
            }
            if ('income' in options) {
                config.data[INCOME] = options.income;
            }

            jQuery.ajax(config);
        }
    };

    // Namespace Hook
    Humble.DataSource = DataSource;
});
