function Application () {

    var TEMPLATE_APPLICATION    = '<div id="application"></div>',
        TEMPLATE_SLIDERS        = '<div id="sliders"></div>';
        TEMPLATE_VISUAL         = '<div id="visual"></div>';

    var rootNode = $(TEMPLATE_APPLICATION),
        sliderNode = $(TEMPLATE_SLIDERS);
        visualNode = $(TEMPLATE_VISUAL);

    $('body').append(rootNode);
    rootNode.append(sliderNode);
    rootNode.append(visualNode);

    dataSource();

    function onDataSuccess (data) {

        var model  = new Humble.Model(data),
            values = model.getItems(),
            slider = new Humble.Sliders(sliderNode, model),
            visual = new Humble.Visual(visualNode, model);

        sliderNode.delegate('.slider', 'slide', function (e, ui) {
            var key = $(this).data('key');
            visual.update(key, ui.value);
        });

    }

    function dataSource () {

        var callback = {};

        callback.success = onDataSuccess;

        var dataSource = new Humble.DataSource();
        dataSource.request({callback : callback});
    }
}

Application();
