function Application (applicationNode) {

    // DOM Templates
    var TITLE         = 'Move My Taxes',
        C_APPLICATION = 'humble-dvc-application',
        T_APPLICATION = '<div class="'+C_APPLICATION+'"><div class="'+C_APPLICATION+'-header">'+TITLE+'</div></div>',
        node          = $(T_APPLICATION);

    $(applicationNode).append(node);

    var overwriteColors = function () {

        var dimensions = Humble.Config.DVC.budget.dimensions,
            colors = ['4d','66','7c'];

        _.each(dimensions, function (dimension, key) {
            dimensions[key].color = '#'+colors[Math.floor(Math.random()*3)]+colors[Math.floor(Math.random()*3)]+colors[Math.floor(Math.random()*3)];
        });
    }

    // Use custom colours in Config.js
    //overwriteColors();

    // Model Options
    var modelOptions = {
        url : Humble.Config.DVC.url+'getBudgetAggregate',
        key : 'dimensionID'
    };

    // Build Objects
    var model       = new Humble.DVC.BudgetAggregateModel(modelOptions),
        splash      = new Humble.DVC.Splash(node, model),
        controls    = new Humble.Controls(node, model),
        dimension   = new Humble.Dimension(node, model),
        sliders     = new Humble.Sliders(node, model),
        subfunction = new Humble.DVC.BudgetAccount(node, model),
        visual      = new Humble.DVC.BudgetVisualBlock(node, model),
        dataSource;

    sliders.node.hide();
    visual.node.hide();

    Humble.Event.bind('humble:dvc:splash', function (e) {
        sliders.node.show();
        visual.node.show();
    });

    Humble.Event.bind('humble:dvc:modelUpdate', function (e, key) {
        controls.update();
        sliders.update(key);
        visual.update(key);
    });
}
