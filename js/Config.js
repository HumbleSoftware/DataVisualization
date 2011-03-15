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
            color : '#ff0049'
        },
        _2772 : {
            name  : "International Affairs",
            color : '#f9aa00'
        },
        _2773 : {
            name  : "General Science, Space, and Technology",
            color : '#f9e502'
        },
        _2774 : {
            name  : "Energy",
            color : '#c2d618'
        },
        _2775 : {
            name  : "Natural Resources and Environment",
            color : '#70fb00'
        },
        _2776 : {
            name  : "Agriculture",
            color : '#00c2ff'
        },
//        _2777 : {
//            name  : "Commerce and Housing Credit",
//            color : '#7B88FD'
//        },
        _2778 : {
            name  : "Transportation",
            color : '#0f91ff'
        },
        _2779 : {
            name  : "Community and Regional Development",
            color : '#b537b6'
        },
        _2780 : {
            name  : "Education, Training, Employment, and Social Services",
            color : '#e92192'
        },
        _2781 : {
            name  : "Health",
            color : '#ff0049'
        },
        _2782 : {
            name  : "Medicare",
            color : '#f9aa00'
        },
        _2783 : {
            name  : "Income Security",
            color : '#f9e502'
        },
        _2784 : {
            name  : "Social Security",
            color : '#c2d618'
        },
        _2785 : {
            name  : "Veterans Benefits and Services",
            color : '#70fb00'
        },
        _2786 : {
            name  : "Administration of Justice",
            color : '#00c2ff'
        },
        _2787 : {
            name  : "General Government",
            color : '#0f91ff'
        },
        _2788 : {
            name  : "Net Interest",
            color : '#b537b6'
        },
        _2789 : {
            name  : "Allowances",
            color : '#e92192'
        }
//        _2790 : {
//            name  : "Undistributed Offsetting Receipts",
//            color : '#4DB548'
//        }
    }
}
