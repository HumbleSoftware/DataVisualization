/**
 * Config
 */

Humble.Config = {}
Humble.Config.DVZ = {};
Humble.Config.DVZ.url = 'http://www.whatwepayfor.com/api/';
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
        _2771 : "National Defense",
        _2772 : "International Affairs",
        _2773 : "General Science, Space, and Technology",
        _2774 : "Energy",
        _2775 : "Natural Resources and Environment",
        _2776 : "Agriculture",
//        _2777 : "Commerce and Housing Credit",
        _2778 : "Transportation",
        _2779 : "Community and Regional Development",
        _2780 : "Education, Training, Employment, and Social Services",
        _2781 : "Health",
        _2782 : "Medicare",
        _2783 : "Income Security",
        _2784 : "Social Security",
        _2785 : "Veterans Benefits and Services",
        _2786 : "Administration of Justice",
        _2787 : "General Government",
        _2788 : "Net Interest",
        _2789 : "Allowances"//,
//        _2790 : "Undistributed Offsetting Receipts"
    }
}
