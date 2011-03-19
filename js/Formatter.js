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

        currency : function (value) {
            value = Math.round(value * 100);
            return (value !== 0) ? value / 100 : value;
        }

    }

    // Namespace Hook
    Humble.Formatter = Formatter;
});
