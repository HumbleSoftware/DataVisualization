/**
 * DVC Build Config
 */

var PREFIX_JS   = '../js/',
    PREFIX_CSS  = '../css/'

// Minifiy Groups
exports.groups = {};

// DVC StyleSheets
exports.groups.stylesheet = [
    PREFIX_CSS + 'stylesheet.css',
    '../lib/jquery-ui/css/ui-lightness/jquery-ui-1.8.10.custom.css'
];

// DVC JavaScript
exports.groups.dvc = [
    PREFIX_JS + 'Humble.js',
    PREFIX_JS + 'Application.js',
    PREFIX_JS + 'Config.js',
    PREFIX_JS + 'Controls.js',
    PREFIX_JS + 'DataSource.js',
    PREFIX_JS + 'Dimension.js',
    PREFIX_JS + 'Formatter.js',
    PREFIX_JS + 'Model.js',
    PREFIX_JS + 'Sliders.js',
    PREFIX_JS + 'Visual.js',
    PREFIX_JS + 'DVC/BudgetPie.js',
    PREFIX_JS + 'DVC/BudgetModel.js',
    PREFIX_JS + 'DVC/BudgetAccountModel.js',
    PREFIX_JS + 'DVC/BudgetAggregateModel.js',
    PREFIX_JS + 'DVC/BudgetVisualBlock.js',
    PREFIX_JS + 'DVC/BudgetVisualPie.js',
    PREFIX_JS + 'DVC/BudgetAccount.js',
    PREFIX_JS + 'DVC/Splash.js',
    PREFIX_JS + 'DVC/SpendingPie.js'
];
