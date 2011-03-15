function Application (applicationNode) {

    // DOM Templates
    var T_APPLICATION   = '<div id="application"></div>',
        T_CONTROLS      = '<div id="controls"></div>';
        T_SLIDERS       = '<div id="sliders"></div>';
        T_VISUAL        = '<div id="visual"></div>';

    // DOM Nodes
    var rootNode        = $(T_APPLICATION),
        controlsNode    = $(T_CONTROLS),
        sliderNode      = $(T_SLIDERS),
        visualNode      = $(T_VISUAL);

    // Build that DOM
    rootNode.append(controlsNode);
    rootNode.append(sliderNode);
    rootNode.append(visualNode);
    $(applicationNode).append(rootNode);

    // Build Objects
    var dataSource  = new Humble.DataSource(),
        model       = new Humble.Model(),
        controls    = new Humble.Controls(controlsNode, model),
        sliders     = new Humble.Sliders(sliderNode, model),
        visual      = new Humble.Visual(visualNode, model);

    // Controller
    controls.incomeChange(function (e, ui) {
        
    });

    // Fucking callback
    var callback = {
        success : onDataSuccess
    }
    dataSource.request({callback : callback});

    // Update Shit
    sliderNode.delegate('.slider', 'slide', function (e, ui) {

        var key   = $(this).data('key'),
            value = sliders.translateB(ui.value);

        visual.update(key, value);
    });

    /**
     * Handle Data Source Success
     */
    function onDataSuccess (data) {

        model.setXML(data);

        controls.update();
        sliders.update();
        visual.draw();
    }
}

Application('body');
