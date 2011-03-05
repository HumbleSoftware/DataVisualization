/**
 * Class Humble Model
 */
Humble( function () {

    // Constructor
    var Model = function (xml) {

        var xmlDoc  = this._parse(xml),
            items   = this._getItems(xmlDoc),
            ratio   = this._getRatio();

        this.xml        = xml;
        this.xmlDoc     = xmlDoc;
        this.items      = items;
        this.itemCount  = 0;
        this.ratio      = ratio;    // Ratio of my vs amount
    }

    // Methods
    Model.prototype = {

        set : function (item, attribute, value) {
            this.itemsValues[item][attribute] = value;
        },

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

        getRatio : function () {
            return ratio;
        },

        getItems : function () {
            return this.items;
        },

        getItemCount : function () {
            return _.size(this.items);
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

        _parseItems : function (xmlDoc) {

            var items    = xmlDoc.find('item'),
                newItems = [];

            _.each(items, function (item) {

                var $item = $(item),
                    keep  = ($item.attr('mycosti') > 0 ? true : false);

                if (keep) {
                    newItems.push($item);
                }
            });

            return newItems;
        },
        _getItems : function (xmlDoc) {

            var items  = this._parseItems(xmlDoc),
                values = {};

            _.each(items, function (item, key) {

                var value = {},
                    id    = item.attr('dimensionID');

                // Fill Value Object
                _.each(Humble.Config.DVZ.budget.fields, function (field, key) {
                    value[key] = item.attr(key);
                });

                // Cache
                values[id] = value;
            });

            return values;
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
