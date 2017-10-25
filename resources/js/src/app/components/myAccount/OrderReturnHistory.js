const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

Vue.component("order-return-history", {

    props: [
        "template",
        "itemsPerPage",
        "showFirstPage",
        "showLastPage"
    ],

    data()
	{
        return {
            waiting: false,
            returnsList: {page: 1}
        };
    },

    created()
	{
        this.$options.template = this.template;
    },

    ready()
	{
        this.itemsPerPage = this.itemsPerPage || 10;
    },

    methods:
    {
        setPage(page)
        {
            if (!this.waiting)
            {
                this.waiting = true;

                const lastPage = this.returnsList.page;

                this.returnsList.page = page;

                ApiService.get("/rest/io/customer/order/return", {page: page, items: this.itemsPerPage})
                .done(response =>
                {
                    this.waiting = false;
                    this.returnsList = response;
                })
                .fail(response =>
                {
                    this.waiting = false;
                    this.returnsList.page = lastPage;
                    NotificationService.error(Translations.Template.notFoundOops);
                });
            }
        },

        toggleNaming(element)
        {
            if(document.getElementById(element).innerText == Translations.Template.myAccountReturnShowMore)
            {
                document.getElementById(element).innerText = Translations.Template.myAccountReturnShowLess;
            }
            else
            {
                document.getElementById(element).innerText = Translations.Template.myAccountReturnShowMore;
            } 
        },

        getOriginOrderId(order)
        {
            for (const orderRef of order.orderReferences)
            {
                if (orderRef.referenceType === "parent")
                {
                    return orderRef.referenceOrderId;
                }
            }

            return "-";
        }
    },

    events:
    {
        "returns-first-opening"()
        {
            this.setPage(1);
        }
    }
});
