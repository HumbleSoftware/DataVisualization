/**
 * Controls Widget
 */
Humble( function () {

    var C_CONTROLS      = 'humble-dvc-controls',
        T_CONTROLS      = '<div class="'+C_CONTROLS+'"></div>',
        T_INCOME_INPUT  = '<input id="'+C_CONTROLS+'-income" type="text"></input>',
        T_INCOME_LABEL  = '<label for="'+C_CONTROLS+'-income">Income</label>',
        T_FILING_INPUT  = '<select id="'+C_CONTROLS+'-filing"></select>',
        T_FILING_LABEL  = '<label for="'+C_CONTROLS+'-filing">Filing Status</label>',
        T_SELF_INPUT    = '<input id="'+C_CONTROLS+'-self" type="checkbox"></input>',
        T_SELF_LABEL    = '<label for="'+C_CONTROLS+'-self">Self Employed</label>',
        T_RESET     	= '<a id="'+C_CONTROLS+'-reset">Reset</a>';

    var FILING_OPTIONS  = [
        'Single',
        'Married Filing Jointly',
        'Married Filing Separately',
        'Head of Household'
    ]

    var Controls = function (node, model) {

        this.parentNode = node;
        this.node = $(T_CONTROLS);
        this.model = model;

        this.render();
    };

    Controls.prototype = {

        render : function () {

            var node = this.node;

            this._income    = $(T_INCOME_INPUT);
            this._filing    = $(T_FILING_INPUT);
            this._self      = $(T_SELF_INPUT);
    		this._reset		= $(T_RESET);

            _.each (FILING_OPTIONS, function (option, value) {
                this._filing.append('<option value="'+value+'">'+option+'</option>');
            }, this);

            node.append(T_INCOME_LABEL);
            node.append(this._income);
            node.append(T_FILING_LABEL);
            node.append(this._filing);
            node.append(T_SELF_LABEL);
            node.append(this._self);
            node.append(this._reset);

            this.parentNode.append(node);

            this.bind();
        },

        bind : function () {

        },

        incomeChange : function (callback) {
            this._income.change(callback);
        },

    	resetXML : function (callback)	{
    		this._reset.click(callback);
    	},
    	
        update : function () {
        }

    };

    Humble.Controls = Controls;

});
