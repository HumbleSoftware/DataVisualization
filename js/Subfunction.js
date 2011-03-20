/**
 * Dimension Widget
 */
Humble( function () {

    var C_SUBFUNCTION = 'humble-dvc-subfunction';

    var Subfunction = function (node, model) {

        this.node = node;
        this.model = model;

        this.render();
    }

    Subfunction.prototype = {

        render : function () {
            this.bind();
        },

        bind : function () {

            var that = this;

            Humble.Event.bind('humble:dvc:dimensionDetail', function (e, key, show) {
                console.log('showDimension', key);
            });
        },

        doHover : function (key) {

        }
    }

    Humble.Subfunction = Subfunction;
});

