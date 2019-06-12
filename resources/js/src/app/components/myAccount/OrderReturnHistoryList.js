import { isNullOrUndefined } from "../../helper/utils";

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
        returnsPerPage: {
            type: Number,
            default: 5
        },
        initialData:
        {
            type: Object,
            default: null
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
        if (!isNullOrUndefined(this.initialData))
        {
            this.returnsList = this.initialData;
        }
        else
        {
            this.setPage(1);
        }
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
