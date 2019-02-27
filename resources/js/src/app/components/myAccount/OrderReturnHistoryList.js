const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import TranslationService from "services/TranslationService";

Vue.component("order-return-history-list", {

    props: {
        template:
        {
            type: String,
            default: "#vue-order-return-history-list"
        },
        appearance:
        {
            type: String,
            default: "primary"
        },
        returnsPerPage: {
            type: Number,
            default: 5
        },
        itemsPerList: {
            type: Number,
            default: 5
        },
        showFirstPage: {
            type: Boolean
        },
        showLastPage: {
            type: Boolean
        }
    },

    data()
	{
        return {
            waiting: false,
            returnsList: { page: 1 }
        };
    },

    created()
	{
        this.$options.template = this.template;
        this.setPage(1);
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

                ApiService.get("/rest/io/customer/order/return", { page: page, items: this.returnsPerPage })
                .done(response =>
                {
                    this.waiting = false;
                    this.returnsList = response;
                })
                .fail(response =>
                {
                    this.waiting = false;
                    this.returnsList.page = lastPage;
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.returnHistoryOops")
                    );
                });
            }
        }
    }
});
