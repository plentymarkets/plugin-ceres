import ExceptionMap from "exceptions/ExceptionMap";
import TranslationService from "services/TranslationService";

const NotificationService = require("services/NotificationService");

Vue.component("basket-list-item", {

    delimiters: ["${", "}"],

    props: [
        "basketItem",
        "size",
        "language",
        "template"
    ],

    data()
    {
        return {
            waiting: false,
            waitForDelete: false,
            deleteConfirmed: false,
            deleteConfirmedTimeout: null,
            itemCondition: ""
        };
    },

    computed:
    {
        image()
        {
            const img = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview")[0];

            return img;
        },

        altText()
        {
            const altText = this.image && this.image.alternate ? this.image.alternate : this.$options.filters.itemName(this.basketItem.variation.data);

            return altText;
        },

        isInputLocked()
        {
            return this.waiting || this.isBasketLoading;
        },

        ...Vuex.mapState({
            isBasketLoading: state => state.basket.isBasketLoading
        })
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods: {

        /**
         * Delete item from basket
         */
        deleteItem()
        {
            if (!this.deleteConfirmed)
            {
                this.deleteConfirmed = true;
                this.deleteConfirmedTimeout = window.setTimeout(
                    () =>
                    {
                        this.resetDelete();
                    },
                    5000
                );
            }
            else
            {
                this.waitForDelete = true;
                this.waiting = true;

                this.$store.dispatch("removeBasketItem", this.basketItem.id).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemRemoved", {detail: this.basketItem}));
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.resetDelete();
                        this.waitForDelete = false;
                        this.waiting = false;
                    });
            }
        },

        /**
         * Update item quantity in basket
         * @param quantity
         */
        updateQuantity(quantity)
        {
            if (this.basketItem.quantity !== quantity)
            {
                this.waiting = true;

                const origQty = this.basketItem.quantity;

                this.$store.dispatch("updateBasketItemQuantity", {basketItem: this.basketItem, quantity: quantity}).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemQuantityUpdated", {detail: this.basketItem}));
                        this.waiting = false;
                    },
                    error =>
                    {
                        this.basketItem.quantity = origQty;

                        if (this.size === "small")
                        {
                            this.$store.dispatch(
                                "addBasketNotification",
                                {
                                    type: "error",
                                    message: TranslationService.translate(
                                        "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString())
                                    )
                                }
                            );
                        }
                        else
                        {
                            NotificationService.error(
                                TranslationService.translate(
                                    "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString())
                                )
                            ).closeAfter(5000);
                        }

                        this.waiting = false;
                    });
            }
        },

        /**
         * Cancel delete
         */
        resetDelete()
        {
            this.deleteConfirmed = false;
            if (this.deleteConfirmedTimeout)
            {
                window.clearTimeout(this.deleteConfirmedTimeout);
            }
        }
    }
});
