function Application (applicationNode) {

    // DOM Templates
    var T_APPLICATION   = '<div class="humble-dvc-application"></div>',
        T_CONTROLS      = '<div class="humble-dvc-controls"></div>',
        T_DIMENSION     = '<div class="humble-dvc-dimension"></div>',
        T_SUBFUNCTION   = '<div class="humble-dvc-subfunction"></div>',
        T_VISUAL        = '<div class="humble-dvc-visual"></div>';

    // DOM Nodes
    var rootNode        = $(T_APPLICATION),
        controlsNode    = $(T_CONTROLS),
        dimensionNode   = $(T_DIMENSION),
        subfunctionNode = $(T_SUBFUNCTION),
        visualNode      = $(T_VISUAL);

    // Build that DOM
    rootNode.append(controlsNode);
    rootNode.append(dimensionNode);
    rootNode.append(subfunctionNode);
    rootNode.append(visualNode);
    $(applicationNode).append(rootNode);

    // Build Objects
    var dataSource  = new Humble.DataSource(),
        model       = new Humble.Model(),
        controls    = new Humble.Controls(controlsNode, model),
        dimension   = new Humble.Dimension(dimensionNode, model),
        sliders     = new Humble.Sliders(rootNode, model),
        subfunction = new Humble.Subfunction(subfunctionNode, model),
        visual      = new Humble.Visual(visualNode, model);

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
