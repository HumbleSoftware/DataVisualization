function Application (applicationNode) {

    // DOM Templates
    var T_APPLICATION = '<div class="humble-dvc-application"></div>',
        node          = $(T_APPLICATION);

    $(applicationNode).append(node);

    // Build Objects
    var model       = new Humble.Model(),
        controls    = new Humble.Controls(node, model),
        dimension   = new Humble.Dimension(node, model),
        sliders     = new Humble.Sliders(node, model),
        subfunction = new Humble.Subfunction(node, model),
        visual      = new Humble.Visual(node, model),
        dataSource;

    dataSource = buildDataSource();

    // Controller
    controls.incomeChange(function (e, ui) {

        var income = e.target.value,
            config = {};

        config = {
            success : onDataSuccess,
            data : { income : income }
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
    dataSource.request({success : onDataSuccess});
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

    function buildDataSource () {

        var options, dataSource;

        options = {
            data : model.requestData(),
            url  : 'http://www.whatwepayfor.com/api/getBudgetAggregate'
        }

        dataSource = new Humble.DataSource(options);

        return dataSource;
    }
}
