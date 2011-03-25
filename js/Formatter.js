/**
 * Class Humble Formatter
 *
 * Helper class to format values.
 */
Humble( function () {

    // Class Constants
    var BILLION     = 1000000000,
        TRILLION    = 1000000000000;

    // Constructor
    var Formatter = function () {

    }

    // Methods
    Formatter.prototype = {

        currencyNumeric : function (value) {
            value = Math.round(value * 100);
            return (value !== 0) ? value / 100 : value;
        },

        currency : function (value, large) {

            if (value > BILLION && large) {
                return this.currencyHuge(value);
            }

            if (value != 0) {
                value = value.toString();
                valueParts = value.split('.');
                if (!large) {
                    if (!valueParts[1]) {
                        value = value+'.00';
                    } else 
                    if (valueParts[1].length < 2) {
                        value = value+'0';
                    }
                } else {
                    value = valueParts[0];
                    value = this.addCommas(value);
                }
            }

            return '$'+value;
        },

        currencyHuge : function (value) {

            if (value > TRILLION) {
                value = value / TRILLION;
                if (value < 10) {
                    value = Math.round(value * 10) / 10;
                } else {
                    value = Math.round(value);
                }

                value = '$' + value.toString() + ' Trillion'
            } else
            if (value > BILLION) {
                value = value / BILLION;
                if (value < 10) {
                    value = Math.round(value * 10) / 10;
                } else {
                    value = Math.round(value);
                }

                value = '$' + value.toString() + ' Billion'
            }

            return value;
        },

        addCommas : function (value) {

            value = value.toString();
            value = this.reverse(value);
            value = value.split(/(\d{3})/);
            value = _.reject(value, function (item) { return (item === ""); });
            value = value.join(',');
            value = this.reverse(value);

            return value;

        },

        reverse : function (value) {
            value = value.toString();
            return value.split('').reverse().join('');
        }


    }

    // Namespace Hook
    Humble.Formatter = Formatter;
});
