/**
 * Splash Widget
 */
Humble( function () {

    var C_SPLASH        = 'humble-dvc-splash',
        T_SPLASH        = '<div class="'+C_SPLASH+'"></div>',
        T_COPY          = '<div class="'+C_SPLASH+'-copy">What if you could move your taxes?</div>',
        T_CONTROLS      = '<div class="'+C_SPLASH+'-controls"></div>',
        T_BUTTON        = '<div class="'+C_SPLASH+'-button"><a>Move My Taxes &gt;</a></div>',
        T_INCOME_INPUT  = '<input id="' +C_SPLASH+'-income" class="'+C_SPLASH+'-income" type="text"></input>',
        T_INCOME_LABEL  = '<label for="'+C_SPLASH+'-income" class="'+C_SPLASH+'-label"><div class="'+C_SPLASH+'-label-income">My Income:</div> $</label>';

    var Splash = function (node, model) {

        this.parentNode = node;
        this.node = $(T_SPLASH);
        this.model = model;

        this.render();
    }

    Splash.prototype = {

        render : function () {

            var node = this.node,
                label = $(T_INCOME_LABEL),
                input = $(T_INCOME_INPUT),
                button = $(T_BUTTON),
                controls = $(T_CONTROLS),
                copy = $(T_COPY);

            controls.append(label, input, button);

            node.append(copy);
            node.append(controls);

            this.input = input;
            this.button = button;

            this.parentNode.append(node);

            this.input.focus();

            this.bind();
        },

        bind : function () {

            var that = this;

            this.button.click(function () { that.splash() });
            this.input.keypress(function (e) {
                if (e.keyCode == 13) {
                    that.splash();
                }
            });
        },

        splash : function () {

            var input = this.input,
                value = input.attr('value'),
                value = value.replace(',',''),
                valid = ((value - 0) == value && value.length > 0);

            if (!valid) {
                input.css({'backgroundColor' : '#ffaaaa'});
                input.animate({'backgroundColor' : '#ffffff'},1000);
            } else {
                this.hide();
                Humble.Event.trigger('humble:dvc:splash');
                this.model.setData({'income' : value});
            }
        },

        hide : function () {
            this.node.hide();
        }
    }

    Humble.DVC.Splash = Splash;
});


