/**
 * Controls Widget
 */
Humble( function () {

    var C_CONTROLS      = 'humble-dvc-controls',
        T_CONTROLS      = '<div class="'+C_CONTROLS+'"></div>',
        T_INCOME        = '<div class="'+C_CONTROLS+'-income"></div>',
        T_INCOME_INPUT  = '<input id="' +C_CONTROLS+'-income" type="text"></input>',
        T_INCOME_LABEL  = '<label for="'+C_CONTROLS+'-income">Income $</label>',
        T_FILING        = '<div class="'+C_CONTROLS+'-filing"></div>',
        T_FILING_INPUT  = '<select id="'+C_CONTROLS+'-filing"></select>',
        T_FILING_LABEL  = '<label for="'+C_CONTROLS+'-filing">Filing Status</label>',
        T_SELF          = '<div class="'+C_CONTROLS+'-self"></div>',
        T_SELF_INPUT    = '<input id="' +C_CONTROLS+'-self" type="checkbox"></input>',
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

            var filingNode  = $(T_FILING);
                incomeNode  = $(T_INCOME);
                selfNode    = $(T_SELF);

            _.each (FILING_OPTIONS, function (option, value) {
                this._filing.append('<option value="'+value+'">'+option+'</option>');
            }, this);

            incomeNode.append(T_INCOME_LABEL);
            incomeNode.append(this._income);

            filingNode.append(T_FILING_LABEL);
            filingNode.append(this._filing);

            selfNode.append(T_SELF_LABEL);
            selfNode.append(this._self);

            node.append(incomeNode);
            node.append(filingNode);
            node.append(selfNode);
            node.append(this._reset);

            this.parentNode.append(node);

            this.bind();
        },

        bind : function () {

            var that = this;

            this._reset.click(function () {
                that.model.reset();
            });

            // Income
            this._income.change(function (e, ui) { 
                that.model.setData({
                    income : e.target.value
                });
            });

            // Filing
            this._filing.change(function (e, ui) { 
                that.model.setData({
                    filing : e.target.value
                });
            });

            // Check
            this._self.change(function (e, ui) {
                var selfEmployed = (e.target.value ? '1' : 0);
                that.model.setData({
                    selfEmployed : selfEmployed
                });
            });

            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                if (!show) {
                    that.node.show();
                } else {
                    that.node.hide();
                }
            });
        },

        update : function () {
            var income = this.model.getData('income');
            this._income.attr({'value' : income});
        }
    };

    Humble.Controls = Controls;

});
