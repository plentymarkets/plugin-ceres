var ResourceService       = require("services/ResourceService");
var ApiService          = require("services/ApiService");
// var NotificationService = require("services/NotificationService");

Vue.component("basket-list-item", {

    template: "#vue-basket-list-item",

    props: [
        "basketItem",
        "size",
        "language"
    ],

    data: function()
    {
        return {
            waiting: false,
            deleteConfirmed: false,
            deleteConfirmedTimeout: null,
            itemAvailability: "",
            itemCondition: ""
        };
    },

    ready: function()
    {
        this.getAvailability();
        this.getItemCondition();
    },

    methods: {

        getAvailability: function()
        {
            var self = this;

            ApiService.get("/rest/item/availability/" + this.basketItem.variation.variationBase.availability)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    for (var i = 0; i < response.languages.length; i++)
                    {
                        if (response.languages[i].language === self.language)
                        {
                            self.itemAvailability = response.languages[i].name;
                        }
                    }

                })
                .fail(function(response)
                {
                    // TODO
                });
        },

        getItemCondition: function()
        {
            var self = this;

            ApiService.get("/rest/item/condition/" + this.basketItem.variation.itemBase.condition)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    self.itemCondition = response;

                })
                .fail(function(response)
                {
                    // TODO
                });
        },

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
                    .done(
                        function()
                        {
                            self.resetDelete();
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
            var self = this;

            ResourceService
                .getResource("basketItems")
                .set(this.basketItem.id, this.basketItem)
                .done(
                    function()
                    {
                        self.waiting = false;
                    });
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
    }
});
