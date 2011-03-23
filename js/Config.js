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
        function : {},
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
            color : '#FF282E'
        },
        _2772 : {
            name  : "International Affairs",
            color : '#B79949'
        },
        _2773 : {
            name  : "General Science, Space, and Technology",
            color : '#121F97'
        },
        _2774 : {
            name  : "Energy",
            color : '#6FFE67'
        },
        _2775 : {
            name  : "Natural Resources and Environment",
            color : '#B7484B'
        },
        _2776 : {
            name  : "Agriculture",
            color : '#9A730B'
        },
//        _2777 : {
//            name  : "Commerce and Housing Credit",
//            color : '#7B88FD'
//        },
        _2778 : {
            name  : "Transportation",
            color : '#9FFE9A'
        },
        _2779 : {
            name  : "Community and Regional Development",
            color : '#9A0B0E'
        },
        _2780 : {
            name  : "Education, Training, Employment, and Social Services",
            color : '#FFD668'
        },
        _2781 : {
            name  : "Health",
            color : '#A7AFFD'
        },
        _2782 : {
            name  : "Medicare",
            color : '#32FC28'
        },
        _2783 : {
            name  : "Income Security",
            color : '#FF686C'
        },
        _2784 : {
            name  : "Social Security",
            color : '#FFE49B'
        },
        _2785 : {
            name  : "Veterans Benefits and Services",
            color : '#4455F9'
        },
        _2786 : {
            name  : "Administration of Justice",
            color : '#12980B'
        },
        _2787 : {
            name  : "General Government",
            color : '#FF9B9D'
        },
        _2788 : {
            name  : "Net Interest",
            color : '#FFC528'
        },
        _2789 : {
            name  : "Allowances",
            color : '#565EB3'
        }
//        _2790 : {
//            name  : "Undistributed Offsetting Receipts",
//            color : '#4DB548'
//        }
    }
}
