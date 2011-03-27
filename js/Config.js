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

Humble.Config.DVZ.spendingColors = {
deficit : '#dd1111',
income  : '#ffffff',
other   : '#111111'
}
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
            color : Color[0]
        },
        _2782 : {
            name  : "Medicare",
            color : Color[1]
        },
        _2783 : {
            name  : "Income Security",
            color : Color[2]
        },
        _2784 : {
            name  : "Social Security",
            color : Color[3]
        },
        _2785 : {
            name  : "Veterans Benefits and Services",
            color : Color[4]
        },
        _2786 : {
            name  : "Administration of Justice",
            color : Color[5]
        },
        _2787 : {
            name  : "General Government",
            color : Color[6]
        },
        _2788 : {
            name  : "Net Interest",
            color : Color[7]
        },
        _2789 : {
            name  : "Allowances",
            color : Color[8]
        }
//        _2790 : {
//            name  : "Undistributed Offsetting Receipts",
//            color : '#4DB548'
//        }
    }
}
