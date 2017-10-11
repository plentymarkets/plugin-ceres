Vue.component("basket-list-item", {

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
            deleteConfirmed: false,
            deleteConfirmedTimeout: null,
            itemCondition: ""
        };
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

                this.$store.dispatch("updateBasketItemQuantity", {basketItem: this.basketItem, quantity: quantity}).then(
                    response =>
                    {
                        document.dispatchEvent(new CustomEvent("afterBasketItemQuantityUpdated", {detail: this.basketItem}));
                        this.waiting = false;
                    },
                    error =>
                    {
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
    },

    computed:
    {
        imageUrl()
        {
            const img = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview")[0];

            return img.url;
        }
    }
});
