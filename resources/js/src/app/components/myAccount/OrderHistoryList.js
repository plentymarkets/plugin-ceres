import TranslationService from "../../services/TranslationService";
import NotificationService from "../../services/NotificationService";
import { isNullOrUndefined, isDefined } from "../../helper/utils";
import Vue from "vue";

const ApiService = require("../../services/ApiService");

Vue.component("order-history-list", {

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

    computed:
    {
        showTrackingColumn()
        {
            if (isDefined(this.orderList.entries))
            {
                return this.orderList.entries.filter(entry => !!entry.trackingURL).length;
            }
            return false;
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
