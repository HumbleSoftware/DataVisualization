/**
 * Class Humble Formatter
 *
 * Helper class to format values.
 */
Humble( function () {

    // Constructor
    var Formatter = function () {

    }

    // Methods
    Formatter.prototype = {

        currencyNumeric : function (value) {
            value = Math.round(value * 100);
            return (value !== 0) ? value / 100 : value;
        },

        currency : function (value) {
            if (value != 0) {
                value = value.toString();
                valueParts = value.split('.');
                if (!valueParts[1]) {
                    value = value+'.00';
                } else 
                if (valueParts[1].length < 2) {
                    value = value+'0';
                }

            }
            return '$'+value;
        }


    }

    // Namespace Hook
    Humble.Formatter = Formatter;
});
