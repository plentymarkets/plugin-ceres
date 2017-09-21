Vue.component("order-return-history", {

    props: [
        "template",
        "itemsPerPage",
        "showFirstPage",
        "showLastPage",
        "returnsList"
    ],

    data()
	{
        return {
            page: 1,
            pageMax: 1,
            countStart: 0,
            countEnd: 0
        };
    },

    created()
	{
        this.$options.template = this.template;

        console.log(this.returnsList);
    },

    ready()
	{
        this.itemsPerPage = this.itemsPerPage || 10;
        this.pageMax = Math.ceil(this.returnsList.totalsCount / this.itemsPerPage);
    },

    methods:
    {
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
    }
});
