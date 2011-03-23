function Application (applicationNode) {

    // DOM Templates
    var T_APPLICATION = '<div class="humble-dvc-application"></div>',
        node          = $(T_APPLICATION);

    $(applicationNode).append(node);

    var overwriteColors = function () {

        var dimensions = Humble.Config.DVZ.budget.dimensions,
            colors = ['4d','66','7c'];

        _.each(dimensions, function (dimension, key) {
            dimensions[key].color = '#'+colors[Math.floor(Math.random()*3)]+colors[Math.floor(Math.random()*3)]+colors[Math.floor(Math.random()*3)];
        });
    }

    overwriteColors();

    // Model Options
    var modelOptions = {
        url : Humble.Config.DVZ.url+'getBudgetAggregate',
        key : 'dimensionID'
    };

    // Build Objects
    var model       = new Humble.DVC.BudgetAggregateModel(modelOptions),
        controls    = new Humble.Controls(node, model),
        dimension   = new Humble.Dimension(node, model),
        sliders     = new Humble.Sliders(node, model),
        subfunction = new Humble.DVC.BudgetAccount(node, model),
        visual      = new Humble.DVC.BudgetVisualBlock(node, model),
        dataSource;

    // Controller
    controls.incomeChange(function (e, ui) {
        var income = e.target.value;
        model.setIncome(income);
    });
    
	controls.resetXML(function (e, ui) {
        model.reset();
        controls.update();
        sliders.update();
        visual.update();
    });

    Humble.Event.bind('humble:dvc:modelUpdate', function (e, key) {
        controls.update();
        sliders.update();
        visual.update(key);
    });

    model.setIncome(50000);
}
