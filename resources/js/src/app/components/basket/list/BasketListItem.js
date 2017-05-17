var ResourceService       = require("services/ResourceService");
// var ApiService          = require("services/ApiService");
// var NotificationService = require("services/NotificationService");

Vue.component("basket-list-item", {

    props: [
        "basketItem",
        "size",
        "language",
        "template"
    ],

    data: function()
    {
        return {
            waiting: false,
            deleteConfirmed: false,
            deleteConfirmedTimeout: null,
            itemCondition: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {

        /**
         * Delete item from basket
         */
        deleteItem: function()
        {
            var self = this;

            if (!this.deleteConfirmed)
            {
                this.deleteConfirmed = true;
                this.deleteConfirmedTimeout = window.setTimeout(
                    function()
                    {
                        self.resetDelete();
                    },
                    5000
                );
            }
            else
            {
                this.waiting = true;
                ResourceService
                    .getResource("basketItems")
                    .remove(this.basketItem.id)
                    .fail(function()
                    {
                        self.resetDelete();
                        self.waiting = false;
                    });
            }
        },

        /**
         * Update item quantity in basket
         * @param quantity
         */
        updateQuantity: function(quantity)
        {
            if (this.basketItem.quantity === quantity)
            {
                return;
            }

            this.basketItem.quantity = quantity;
            this.waiting = true;

            ResourceService
                .getResource("basketItems")
                .set(this.basketItem.id, this.basketItem)
                .fail(function()
                {
                    this.waiting = false;
                }.bind(this));
        },

        /**
         * Cancel delete
         */
        resetDelete: function()
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
        imageUrl: function()
        {
            var img = this.$options.filters.itemImages(this.basketItem.variation.data.images, "urlPreview")[0];

            return img.url;
        }
    }
});
