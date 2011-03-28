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
        // Ratio of my vs amount
        this.ratio      = null;
        // Construct formatter
        this.format     = new Humble.Formatter();
        this.dataSource = this._buildDataSource();
    }

    // Methods
    Model.prototype = {

        set : function (item, attribute, value) {

            if (this.setters[attribute]) {
                this.setters[attribute].apply(this, [item, attribute, value]);
            }

            // Set attribute
            this._set(item, attribute, value);
        },

        setXML : function (xml) {
            this.xml        = xml;
            this.xmlDoc     = this._parse(xml);
            this.items      = this._getItems(this.xmlDoc);
            this.keys       = _.keys(this.items);
        },

		reset : function()	{
			this.setXML(this.xml);
		},
		
        get : function (key, attribute) {

            var items = this.items,
                item,
                value;

            // Existential insanity
            item  = (key in items ? items[key] : false);
            value = (attribute && attribute in item ? item[attribute] : false);

            return (value !== false ? value : item);
        },

        getURL : function () {
            return this.url;
        },

        getKey : function (index) {
            return (this.keys[index] ? this.keys[index] : false);
        },

        getIndex : function (key) {
            return _.indexOf(this.keys, key);
        },

        getItems : function () {
            return this.items;
        },

        getItemCount : function () {
            return _.size(this.items);
        },

        requestData : function () {
            return false;
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
                var $item = $(item);
               newItems.push($item); 
            }, this);

            return newItems;
        },

        _getItems : function (xmlDoc) {

            var items  = this._parseItems(xmlDoc),
                values = {};

            _.each(items, function (item, key) {

                var value = {},
                    id    = item.attr(this.key);

                // Fill Value Object
                _.each(this.fields, function (field, key) {
                    var attr = item.attr(key);
                    if (this.parsers[key]) {
                        attr = this.parsers[key].apply(this, [attr]);
                    }
                    value[key] = attr;
                }, this);

                // Cache
                values['_'+id] = value;
            }, this);

            return values;
        },

        _getTotalNumeric : function (field) {

            var values = this.getItems(),
                total  = 0;

            _.each(values, function (value, key) {
                total += value[field];
            }, this);

            total = this.format.currencyNumeric(total);

            return total;
        },

        _set : function (item, attribute, value) {
            this.items[item][attribute] = value;
        },

        _buildDataSource : function () {

            var that = this,
                options,
                dataSource,
                onSuccess;


            onSuccess = function (data) {
                that.setXML(data);
            }

            options = {
                data    : this.requestData(),
                success : onSuccess,
                url     : this.getURL()
            }

            dataSource = new Humble.DataSource(options);

            return dataSource;
        }
    };

    // Namespace Hook
    Humble.Model = Model;
});
