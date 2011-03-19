/**
 * Class Humble Model
 */
Humble( function () {

    // Constructor
    var Model = function () {
        this.xml        = null;
        this.xmlDoc     = null;
        this.items      = null;
        this.keys       = null;
        this.itemCount  = null;
        // Ratio of my vs amount
        this.ratio      = null;
    }

    // Methods
    Model.prototype = {

        set : function (item, attribute, value) {

            // Handle special cases
            switch (attribute) {

                case 'mycosti' : {

                    var income  = this.getIncome(),
                        total   = this.getTotalTaxes(),
                        current = this.items[item][attribute];

                    if (total - current + value > income) {
                        value = income - total + current;
                    }

                    // Update amounti
                    var amounti = this._calculateAmountI(value);
                    this._set(item, 'amounti', amounti);
                }
                default : {}
            }

            // Set attribute
            this._set(item, attribute, value);
        },

        setXML : function (xml) {

            this.xml        = xml;
            this.xmlDoc     = this._parse(xml);
            this.items      = this._getItems(this.xmlDoc);
            this.keys       = _.keys(this.items);
            this.itemCount  = 0;
            this.ratio      = this._getRatio(); 

        },

        setIncome : function (income) {
            this.income = income;
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

        getKey : function (index) {
            return (this.keys[index] ? this.keys[index] : false);
        },

        getIndex : function (key) {
            return _.indexOf(this.keys, key);
        },

        getIncome : function () {
            return this.income;
        },

        getRatio : function () {
            return this.ratio;
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

            var dimensions = {};

            _.each(items, function (item) {

                var $item = $(item),
                    keep  = ($item.attr('mycosti') > 0 ? true : false);

                dimensions[$item.attr('dimensionID')] = $item.attr('dimensionName');

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
                    var attr = item.attr(key);
                    if (key === 'mycosti' || key === 'amounti') {
                        attr = parseFloat(attr);
                    }
                    value[key] = attr;
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
        },

        _getRatio : function () {

            var totalSpending   = this.getTotalSpending(),
                totalTaxes      = this.getTotalTaxes();

            return (totalTaxes) ?
                (totalSpending / totalTaxes) : false;
        },

        _set : function (item, attribute, value) {
            this.items[item][attribute] = value;
        },

        _calculateAmountI : function (mycosti) {
            return this.getRatio() * mycosti;
        }

    };

    // Namespace Hook
    Humble.Model = Model;
});
