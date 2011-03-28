/**
 * Config
 */

Humble.Config = {};
Humble.Config.DVZ = {};
Humble.Config.DVZ.url = 'http://www.whatwepayfor.com/api/';
Humble.Config.DVZ.budgetAccount = {
    name : 'getBudgetAccount',
    fields : {
        account : {},
        agency : {},
        bureau : {},
        'function' : {},
        subfunction : {},
        spendingType : {},
        amounti : {},
        mycosti : {}
    }
};

var Color = [

    '#ff0049',
    '#a53455',
    '#f74e7f',

    '#fe7919',
    '#c65a0a',
    '#fea05c',

    '#feeb17',
    '#cebe0e',
    '#f8ed77',

    '#43ff10',
    '#2db408',
    '#8cfd6d',

    '#0f79fd',
    '#0755fb',
    '#8ebbff',
    
    '#d80ffc',
    '#8f09a7',
    '#e35dfb'
];

/*
var Color  = new Array(
    '#ff0049', //strawberry
    '#fd7100', //red-orange
    '#f9aa00', //orange
    '#f9e502', //yellow
    '#70fb00', //green
    '#00c2ff', //light blue
    '#0f91ff', //blue
    '#b537b6', //purple
    '#e92192'  //fuschia
);
*/

Humble.Config.DVZ.spendingColors = {
    deficit : '#333333',
    other   : '#777777',
    income  : '#cccccc'
};
Humble.Config.DVZ.budget = {
    name : 'getBudget',
    fields : {
        dimensionID : {
            name : "Dimension ID"
        },
        dimensionName : {
            name : " Dimension Name"
        },
        spendingType : {},
        amounti : {},
        mycosti : {}
    },
    dimensions : {
        _2771 : {
            name  : "National Defense",
            color : Color[0]
        },
        _2772 : {
            name  : "International Affairs",
            color : Color[1]
        },
        _2773 : {
            name  : "General Science, Space, and Technology",
            color : Color[2]
        },
        _2774 : {
            name  : "Energy",
            color : Color[3]
        },
        _2775 : {
            name  : "Natural Resources and Environment",
            color : Color[4]
        },
        _2776 : {
            name  : "Agriculture",
            color : Color[5]
        },
//        _2777 : {
//            name  : "Commerce and Housing Credit",
//            color : '#7B88FD'
//        },
        _2778 : {
            name  : "Transportation",
            color : Color[6]
        },
        _2779 : {
            name  : "Community and Regional Development",
            color : Color[7]
        },
        _2780 : {
            name  : "Education, Training, Employment, and Social Services",
            color : Color[8]
        },
        _2781 : {
            name  : "Health",
            color : Color[9]
        },
        _2782 : {
            name  : "Medicare",
            color : Color[10]
        },
        _2783 : {
            name  : "Income Security",
            color : Color[11]
        },
        _2784 : {
            name  : "Social Security",
            color : Color[12]
        },
        _2785 : {
            name  : "Veterans Benefits and Services",
            color : Color[13]
        },
        _2786 : {
            name  : "Administration of Justice",
            color : Color[14]
        },
        _2787 : {
            name  : "General Government",
            color : Color[15]
        },
        _2788 : {
            name  : "Net Interest",
            color : Color[16]
        },
        _2789 : {
            name  : "Allowances",
            color : Color[17]
        }
//        _2790 : {
//            name  : "Undistributed Offsetting Receipts",
//            color : '#4DB548'
//        }
    }
}
