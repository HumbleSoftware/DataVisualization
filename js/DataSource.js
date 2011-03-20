/**
 * Class Humble Model
 */
Humble( function () {

    // Class Constants
    var CHANGE      = 'showChange',
        DATA_TYPE   = 'dataType',
        EXTRA       = 'showExtra',
        FILING      = 'filing',
        GROUP       = 'group',
        INCOME      = 'income',
        SORT        = 'sortdir',
        SUCCESS     = 'success',
        TYPE        = 'type',
        URL         = 'url',
        YEAR        = 'year';

    var DEFAULT_OPTIONS = {
        dataType : 'jsonp'
    }

    // Constructor
    var DataSource = function (options) {
        this.options = _.extend(DEFAULT_OPTIONS, options);
    }

    // Methods
    DataSource.prototype = {

        request : function (config) {

            var config = (config ? config : {});
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

            config = _.extend(this.options, config);
            config.data = (
                config.data ? _.extend(data, config.data) : data
            );

            jQuery.ajax(config);
        }
    };

    // Namespace Hook
    Humble.DataSource = DataSource;
});
