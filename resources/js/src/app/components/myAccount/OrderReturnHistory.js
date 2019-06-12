const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import TranslationService from "services/TranslationService";

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
            returnsList: { page: 1 }
        };
    },

    created()
    {
        this.itemsPerPage = this.itemsPerPage || 10;

        vueEventHub.$on("returns-first-opening", () => this.setPage(1));
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

                ApiService.get("/rest/io/customer/order/return", { page: page, items: this.itemsPerPage })
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
