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
        2771 : "National Defense",
        2772 : "International Affairs",
        2773 : "General Science, Space, and Technology",
        2774 : "Energy",
        2775 : "Natural Resources and Environment",
        2776 : "Agriculture",
        2777 : "Commerce and Housing Credit",
        2778 : "Transportation",
        2779 : "Community and Regional Development",
        2780 : "Education, Training, Employment, and Social Services",
        2781 : "Health",
        2782 : "Medicare",
        2783 : "Income Security",
        2784 : "Social Security",
        2785 : "Veterans Benefits and Services",
        2786 : "Administration of Justice",
        2787 : "General Government",
        2788 : "Net Interest",
        2789 : "Allowances",
        2790 : "Undistributed Offsetting Receipts"
    }
}
