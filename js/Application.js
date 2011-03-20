function Application (applicationNode) {

    // DOM Templates
    var T_APPLICATION = '<div class="humble-dvc-application"></div>',
        node          = $(T_APPLICATION);

    $(applicationNode).append(node);

    // Build Objects
    var dataSource  = new Humble.DataSource(),
        model       = new Humble.Model(),
        controls    = new Humble.Controls(node, model),
        dimension   = new Humble.Dimension(node, model),
        sliders     = new Humble.Sliders(node, model),
        subfunction = new Humble.Subfunction(node, model),
        visual      = new Humble.Visual(node, model);

    // Controller
    controls.incomeChange(function (e, ui) {

        var income = e.target.value,
            config = {};

        config = {
            callback : callback,
            income   : income
        }
        dataSource.request(config);
        model.setIncome(income);
    });
    
	controls.resetXML(function (e, ui) {
        model.reset();
        controls.update();
        sliders.update();
        visual.update();
    });

    // Fucking callback
    var callback = {
        success : onDataSuccess
    }
    dataSource.request({callback : callback});
    model.setIncome(50000);

    // Update Shit
    sliders.node.delegate('.slider', 'slide', function (e, ui) {

        var key   = $(this).data('key'),
            value = sliders.translateB(ui.value);

        model.set(key, 'mycosti', value);
        visual.update();
        controls.update();
    });

    /**
     * Handle Data Source Success
     */
    function onDataSuccess (data) {

        model.setXML(data);

        controls.update();
        sliders.update();
        visual.update();
    }
}
