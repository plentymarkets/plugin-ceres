import TranslationService from "../../services/TranslationService";
import NotificationService from "../../services/NotificationService";
import { isNullOrUndefined } from "../../helper/utils";
import Vue from "vue";
import OrderHistoryListItem from "./OrderHistoryListItem";

const ApiService = require("../../services/ApiService");

export default Vue.component("order-history-list", {

    components:
    {
        OrderHistoryListItem
    },

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-history-list"
        },
        ordersPerPage:
        {
            type: Number,
            default: 5
        },
        allowPaymentProviderChange:
        {
            type: Boolean,
            default: false
        },
        allowReturn:
        {
            type: Boolean,
            default: true
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
            orderList: {},
            page: 1
        };
    },

    created()
    {
        if (!isNullOrUndefined(this.initialData))
        {
            this.orderList = this.initialData;
        }
        else
        {
            this.setPage(1);
        }
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
