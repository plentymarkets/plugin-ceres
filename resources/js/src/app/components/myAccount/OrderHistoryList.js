import ApiService from "services/ApiService";
import TranslationService from "services/TranslationService";
import NotificationService from "services/NotificationService";

Vue.component("order-history-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-history-list"
        },
        appearance:
        {
            type: String,
            default: "primary"
        },
        page:
        {
            type: Number,
            default: 1
        },
        ordersPerPage:
        {
            type: Number,
            default: 5
        },
        hintText:
        {
            type: String,
            default: null
        },
        allowPaymentProviderChange:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            waiting: false,
            orderList: {}
        };
    },

    created()
    {
        this.$options.template = this.template;
        this.setPage(1);
    },

    methods:
    {
        setPage(page = 1)
        {
            if (!this.waiting)
            {
                this.waiting = true;

                const lastPage = this.orderList.page;

                this.orderList.page = page;

                ApiService.get("/rest/io/customer/order/list", { page: page, items: this.ordersPerPage })
                    .done(response =>
                    {
                        this.waiting = false;
                        this.orderList = response;
                    })
                    .fail(response =>
                    {
                        this.waiting = false;
                        this.orderList.page = lastPage;
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.returnHistoryOops")
                        );
                    });
            }
        }
    }
});
