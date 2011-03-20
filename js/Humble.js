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
};
Humble.Class = {
    extend : function (childClass, parentClass) {
        var prototype = childClass.prototype;
        childClass.prototype = new parentClass();
        _.extend(childClass.prototype, prototype);
    } 
};
Humble.DVC = {};
