const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import TranslationService from "services/TranslationService";
import { isDefined } from "../../helper/utils";

Vue.component("order-return-history", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-return-history"
        },
        itemsPerPage:
        {
            type: Number,
            default: 5
        },
        showFirstPage:
        {
            type: Boolean,
            default: true
        },
        showLastPage:
        {
            type: Boolean,
            default: true
        }
    },

    data()
	{
        return {
            waiting: false,
            returnsList: { page: 1 },
            isUserLoggedIn: false
        };
    },

    computed: Vuex.mapState({
        userData: state => state.user.userData
    }),

    created()
	{
        this.$options.template = this.template;
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
    },

    watch:
    {
        userData(newVal)
        {
            if (isDefined(newVal) && !this.isUserLoggedIn)
            {
                this.isUserLoggedIn = true;
                this.setPage(1);
            }
        }
    }
});
