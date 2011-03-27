/**
 * Splash Widget
 */
Humble( function () {

    var C_SPLASH    = 'humble-dvc-splash',
        T_SPLASH    = '<div class="'+C_SPLASH+'"></div>',
        T_TITLE     = '<div class="'+C_SPLASH+'-title">Move My Taxes</div>',
        T_CONTROLS  = '<div class="'+C_SPLASH+'-controls"></div>';

    var Splash = function (node, model) {

        this.parentNode = node;
        this.node = $(T_SPLASH);
        this.model = model;

        this.render();
    }

    Splash.prototype = {

        render : function () {

            var node = this.node;

            this.titleNode      = $(T_TITLE);
            this.controlsNode   = $(T_CONTROLS);

            node.append(this.titleNode);
            node.append(this.controlsNode);

            this.parentNode.append(node);

            var controls = new Humble.Controls(this.controlsNode, this.model);

            this.bind();
        },

        bind : function () {

        },

        doHide : function () {

        }
    }

    Humble.DVC.Splash = Splash;
});


