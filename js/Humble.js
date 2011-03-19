// Declare Humble Namespace
var Humble = function (callback) {callback.call()};
// Global events, jQuery API.
Humble.Event = {
    hostage : $('<div></div>'),
    trigger : function () {
        this.hostage.trigger.apply(this.hostage, arguments);
    },
    bind : function () {
        this.hostage.bind.apply(this.hostage, arguments);
    }
}
