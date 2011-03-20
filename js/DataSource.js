/**
 * Class Humble Model
 */
Humble( function () {

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

            var config = (config ? config : {}),
                c = {},
                d = {};

            _.extend(d, this.options.data, config.data);
            _.extend(c, this.options, config);
            c.data = d;

            jQuery.ajax(c);
        }
    };

    // Namespace Hook
    Humble.DataSource = DataSource;
});
