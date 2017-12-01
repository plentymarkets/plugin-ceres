import ExceptionMap from "exceptions/ExceptionMap";

const NotificationService = require("services/NotificationService");

Vue.component("add-to-basket", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-add-to-basket"
        },
        item: Object,
        itemUrl: String,
        showQuantity:
        {
            type: Boolean,
            default: false
        },
        useLargeScale:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            quantity: 1,
            buttonLockState: false,
            waiting: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.checkMinMaxOrderQuantity();
        });
    },

    methods:
    {
        /**
         * add an item to basket-resource
         */
        addToBasket()
        {
            if (this.item.filter.isSalable)
            {
                this.waiting = true;

                const basketObject =
                    {
                        variationId             :   this.variationId,
                        quantity                :   this.quantity,
                        basketItemOrderParams   :   this.item.properties
                    };

                this.$store.dispatch("addBasketItem", basketObject).then(
                    response =>
                    {
                        this.waiting = false;
                        this.openAddToBasketOverlay(basketObject.quantity);
                    },
                    error =>
                    {
                        this.waiting = false;
                        NotificationService.error(Translations.Template[ExceptionMap.get(error.data.exceptionCode.toString())]).closeAfter(5000);
                    });
            }
        },

        directToItem()
        {
            window.location.assign(this.itemUrl);
        },

        handleButtonState(value)
        {
            this.buttonLockState = value;
        },

        /**
         * open the AddItemToBasketOverlay
         */
        openAddToBasketOverlay(stashedQuantity)
        {
            const latestBasketEntry =
                {
                    item: this.item,
                    quantity: stashedQuantity
                };

            this.$store.commit("setLatestBasketEntry", latestBasketEntry);
        },

        /**
         * update the property quantity of the current instance
         * @param value
         */
        updateQuantity(value)
        {
            this.quantity = value;
        },

        /**
         * Check min - max order quantity
         */
        checkMinMaxOrderQuantity()
        {
            this.item.variation.minimumOrderQuantity = this.item.variation.minimumOrderQuantity === 0 || this.item.variation.minimumOrderQuantity === 1 ? null : this.item.variation.minimumOrderQuantity;
            this.item.variation.maximumOrderQuantity = this.item.variation.maximumOrderQuantity === 0 ? null : this.item.variation.maximumOrderQuantity;
        }

    },

    computed:
    {
        variationId()
        {
            return this.item.variation.id;
        },

        hasChildren()
        {
            return this.item.filter && this.item.filter.hasChildren && App.isCategoryView;
        }
    },

    watch:
    {
        quantity(newValue, oldValue)
        {
            this.$store.commit("setVariationOrderQuantity", newValue);
        }
    }
});
