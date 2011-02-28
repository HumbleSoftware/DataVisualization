/**
 * Class Humble Model
 */
Humble( function () {

    // Constructor
    var Model = function (xml) {

        var xmlDoc = this._parse(xml),
            items  = this._getItems(xmlDoc);

        this.xml = xml;
        this.xmlDoc = xmlDoc;
        this.items  = items;
        this.itemValues = false;
        this.itemCount = 0;
    }

    // Methods
    Model.prototype = {

        get : function (key) {

            var items  = this.items,
                values = {};

            items.each(function (key, item) {
                var value = item.attr('dimensionName'),
                    id    = item.attr('dimensionID');
                values[id] = value;
            });

            return values;
        },

        getItems : function () {

            if (this.itemValues) {
                return this.itemValues;
            }

            var items  = this.items,
                values = {};

            items.each(function (key, item) {
                var value = {},
                    id    = item.attr('dimensionID');
                $.each(Humble.Config.DVZ.budget.fields, function (key) {
                    value[key] = item.attr(key);
                });
                values[id] = value;
            });

            this.itemValues = values;

            return values;
        },

        getItemCount : function () {
            return this.items.length;
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

        _parse : function (xml) {
            var xmlDoc = $(jQuery.parseXML(xml));
            return xmlDoc;
        },

        _getItems : function (xmlDoc) {

            var items = xmlDoc.find('item');

            _.each(items, function (item, key) {
                var $item = $(item);
                items[key] = $item;
            });

            return items;
        },
        _getTotalNumeric : function (field) {

            var values = this.getItems(),
                total  = 0;

            _.each(values, function (value, key) {
                total += parseFloat(value[field]);
            }, this);

            total = total * 100;
            total = Math.round(total);
            total = (total !== 0) ? total / 100 : total;

            return total;
        }
    };

    // Namespace Hook
    Humble.Model = Model;
});
