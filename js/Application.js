function Application (applicationNode) {

    // DOM Templates
    var T_APPLICATION   = '<div class="humble-dvc-application"></div>',
        T_CONTROLS      = '<div class="humble-dvc-controls"></div>';
        T_SLIDERS       = '<div class="humble-dvc-sliders"></div>';
        T_VISUAL        = '<div class="humble-dvc-visual"></div>';

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

    // Colors (override raphael default colors)
    var colors = [
        '#FF282E',
        '#B79949',
        '#121F97',
        '#6FFE67',
        '#B7484B',
        '#9A730B',
        '#7B88FD',
        '#9FFE9A',
        '#9A0B0E',
        '#FFD668',
        '#A7AFFD',
        '#32FC28',
        '#FF686C',
        '#FFE49B',
        '#4455F9',
        '#12980B',
        '#FF9B9D',
        '#FFC528',
        '#565EB3',
        '#4DB548'
    ];
    Raphael.fn.g.colors = colors;

    // Build Objects
    var dataSource  = new Humble.DataSource(),
        model       = new Humble.Model(),
        controls    = new Humble.Controls(controlsNode, model),
        sliders     = new Humble.Sliders(sliderNode, model, {colors : colors}),
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

    // Fucking callback
    var callback = {
        success : onDataSuccess
    }
    dataSource.request({callback : callback});
    model.setIncome(50000);

    // Update Shit
    sliderNode.delegate('.slider', 'slide', function (e, ui) {

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
