(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BasketService       = require('services/BasketService');
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

Vue.component('add-to-basket', {

    template: '#vue-add-to-basket',

    props: [
        "basketItem",
        "baseUrl"
    ],

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods: {

        addToBasket: function(quantity)
        {
            var addItemModal = ModalService.findModal($(this.$el.parentElement));
            addItemModal.setTimeout(10000);

            $(".wrapper-bottom").append(addItemModal.getModalContainer());

            BasketService.addBasketItem({
                variationId: this.basketItem.variationBase.id,
                quantity   : this.quantity
            }).done(function()
            {
                addItemModal.show();
            })
                .fail(function()
                {
                    NotificationService.error('Der Artikel konnte leider nicht hinzugefügt werden').closeAfter(10000);
                });
        },

        quantityPlus: function()
        {
            this.quantity++;
        },

        quantityMinus: function()
        {
            if (this.quantity > 1)
            {
                this.quantity--;
            }
        }
    }
});

},{"services/ApiService":42,"services/BasketService":43,"services/ModalService":47,"services/NotificationService":49}],2:[function(require,module,exports){
Vue.component('address-input-group', {

    template: '#vue-address-input-group',

    props: [
        'addressData',
        'locale'
    ],

    created: function()
    {
        if (!this.addressData)
        {
            this.addressData = {};
        }

        this.locale = "DE";
    }
});

},{}],3:[function(require,module,exports){
var ModalService = require('services/ModalService');

Vue.component('address-select', {

    template: '#vue-address-select',

    props: [
        'addressList',
        'addressType',
        'selectedAddressId'
    ],

    data: function()
    {
        return {
            selectedAddress: {},
            addressModal   : {},
            modalType      : "",
            headline       : "",
            addressToEdit  : {},
            addressModalId : ""
        };
    },

    created: function()
    {
        if (!this.isAddressListEmpty())
        {
            for (var index in this.addressList)
            {
                if (this.addressList[index].id == this.selectedAddressId)
                {
                    this.selectedAddress = this.addressList[index];
                }
            }
        }
        else
        {
            this.addressList = [];
        }

        this.addressModalId = "addressModal" + this._uid;
    },

    ready: function()
    {
        this.addressModal = ModalService.findModal(document.getElementById(this.addressModalId));
    },

    methods: {
        onAddressChanged: function(index)
        {
            this.selectedAddress = this.addressList[index];

            this.$dispatch('address-changed', this.selectedAddress);
        },

        isAddressListEmpty: function()
        {
            return !(this.addressList && this.addressList.length > 0);
        },

        showNameStrong: function()
        {
            return !this.selectedAddress.name1 || this.selectedAddress.name1.length == 0;
        },

        showAdd: function()
        {
            this.modalType     = "create";
            this.addressToEdit = {};
            this.updateHeadline();

            $(".wrapper-bottom").append($("#" + this.addressModalId));
            this.addressModal.show();
        },

        showEdit: function(address)
        {
            this.modalType     = "update";
            this.addressToEdit = address;
            this.updateHeadline();

            $(".wrapper-bottom").append($("#" + this.addressModalId));
            this.addressModal.show();
        },

        close: function()
        {
            this.addressModal.hide();
        },

        updateHeadline: function()
        {
            var headline  = (this.addressType == "2") ? " Lieferadresse" : " Rechnungsadresse";
            headline += (this.modalType == "update") ? " bearbeiten" : " anlegen";
            this.headline = headline;
        }

    }
});

},{"services/ModalService":47}],4:[function(require,module,exports){
var AddressService    = require('services/AddressService');
var ValidationService = require('services/ValidationService');

Vue.component('create-update-address', {

    template: '#vue-create-update-address',

    props: [
        "addressData",
        "addressModal",
        "addressList",
        "modalType",
        "addressType"
    ],

    methods: {
        validate: function()
        {
            var self = this;
            ValidationService.validate($('#my-form'))
                .done(function()
                {
                    self.saveAddress();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });

        },

        saveAddress: function()
        {
            if (this.modalType === "create")
            {
                this.createAddress()
            }
            else if (this.modalType === "update")
            {
                this.updateAddress()
            }
        },

        updateAddress: function()
        {
            AddressService
                .updateAddress(this.addressData, this.addressType)
                .done(function()
                {
                    this.addressModal.hide();
                    for (var key in this.addressList)
                    {
                        var address = this.addressList[key];
                        if (address.id == this.addressData.id)
                        {
                            address = this.addressData;
                            break;
                        }
                    }
                }.bind(this));
        },

        createAddress: function()
        {
            AddressService
                .createAddress(this.addressData, this.addressType, true)
                .done(function()
                {
                    this.addressModal.hide();
                    this.addressList.push(this.addressData);
                }.bind(this));
        }
    }

});

},{"services/AddressService":41,"services/ValidationService":52}],5:[function(require,module,exports){
var CheckoutService = require('services/CheckoutService');

Vue.component('invoice-address-select', {

    template: '<address-select v-on:address-changed="addressChanged" address-type="1" :address-list="addressList" :selected-address-id="selectedAddressId"></address-select>',

    props: ['addressList', 'selectedAddressId'],

    created: function()
    {
        this.addEventListener();
        CheckoutService.init();
    },

    methods: {
        addEventListener: function()
        {
            //listen on APIService events and handle new data
        },

        addressChanged: function(selectedAddress)
        {
            CheckoutService.setBillingAddressId(selectedAddress.id);
        }
    }
});

},{"services/CheckoutService":44}],6:[function(require,module,exports){
var CheckoutService = require('services/CheckoutService');

Vue.component('shipping-address-select', {

    template: '<address-select v-on:address-changed="addressChanged" address-type="2" :address-list="addressList" :selected-address-id="selectedAddressId"></address-select>',

    props: ['addressList', 'selectedAddressId'],

    created: function()
    {
        this.addEventListener();
    },

    methods: {
        addEventListener: function()
        {
            //listen on APIService events and handle new data
        },

        addressChanged: function(selectedAddress)
        {
            CheckoutService.setDeliveryAddressId(selectedAddress.id);
        }
    }
});

},{"services/CheckoutService":44}],7:[function(require,module,exports){
var BasketService         = require('services/BasketService');
var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-button', {

    ready: function()
    {
        ResourceService.bind( "basket", this );
    },

    template: '#vue-basket-button',

    props: [
        "basketData"
    ],

    data: function()
    {
        return {
            basket: {}
        };
    },

    computed: {
        basketItemSum: function()
        {
            return MonetaryFormatService.formatMonetary(this.basket.itemSum, "EUR");
        }
    }

});

},{"services/BasketService":43,"services/MonetaryFormatService":48,"services/ResourceService":51}],8:[function(require,module,exports){
var BasketService         = require('services/BasketService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-item-list', {

    template: '#vue-basket-item-list',

    props: [
        "baseUrl"
    ],

    data: function()
    {
        return {
            basket     : {},
            basketItems: [],
            items      : {}
        };
    },

    activate: function(done)
    {
        var self = this;
        BasketService.watch(function(data)
        {
            self.$set('basket', data.basket);
            self.$set('basketItems', data.basketItems);
            self.$set('items', data.items);
        });
        BasketService.init().done(function()
        {
            done();
        });
    },

    methods: {
        deleteItem       : function(basketItem)
        {
            $(".art-" + basketItem.variationId).toggleClass('wait');

            BasketService.deleteBasketItem(basketItem);
        },

        calcPrice        : function(basketItem)
        {
            var currency = this.items[basketItem.variationId].variationRetailPrice.currency;
            var priceSum = basketItem.quantity * this.items[basketItem.variationId].variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary(priceSum, currency);
        },

        formatRetailPrice: function(basketItem)
        {
            var currency    = this.items[basketItem.variationId].variationRetailPrice.currency;
            var retailPrice = this.items[basketItem.variationId].variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary(retailPrice, currency);
        },

        checkName        : function(basketItem, name)
        {
            if (name !== '')
            {
                return name + " " + this.items[basketItem.variationId].variationBase.variationName;
            }
            else
            {
                return this.items[basketItem.variationId].itemDescription.name1 + " " + this.items[basketItem.variationId].variationBase.variationName;
            }
        },

        setLinkToItem: function(basketItem)
        {
            var urlContent = this.items[basketItem.variationId].itemDescription.urlContent.split("/");
            var i          = urlContent.length - 1;

            return "/" + urlContent[i] + "/" + this.items[basketItem.variationId].itemBase.id + "/" + this.items[basketItem.variationId].variationBase.id;
        },

        getImage: function(image)
        {
            return this.baseUrl + "/" + image;
        }
    }
});

},{"services/BasketService":43,"services/ModalService":47,"services/MonetaryFormatService":48}],9:[function(require,module,exports){
var BasketService         = require('services/BasketService');
var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview', {

    template: '#vue-basket-preview',

    props: [
        "basketData",
        "baseUrl"
    ],

    ready: function()
    {
        ResourceService.bind( "basket", this );
        ResourceService.bind( "basketItems", this );
    },

    data: function()
    {
        return {
            basket: {},
            basketItems: []
        };
    },

    computed:
    {
        itemTotalSum: function ()
        {
            return MonetaryFormatService.formatMonetary(this.basket.itemSum, "EUR");
        },
        basketTotalSum: function ()
        {
            return MonetaryFormatService.formatMonetary(this.basket.basketAmount, "EUR");
        },
        shippingTotalSum: function ()
        {
            return MonetaryFormatService.formatMonetary(this.basket.shippingAmount, "EUR");
        }
    },

    methods:
    {

    }
});

},{"services/BasketService":43,"services/ModalService":47,"services/MonetaryFormatService":48,"services/ResourceService":51}],10:[function(require,module,exports){
var BasketService         = require('services/BasketService');
var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview-item', {

    template: '#vue-basket-preview-item',

    props: [
        "baseUrl"
    ],

    data: function()
    {
        return {
            basket     : {},
            basketItems: [],
            items      : {}
        };
    },

    ready: function()
    {
        var self = this;
        //BasketService.watch(function(data)
        //{
        //    self.$set('basket', data.basket);
        //    self.$set('basketItems', data.basketItems);
        //    self.$set('items', data.items);
        //});
        //BasketService.init().done(function()
        //{
        //    done();
        //});

        ResourceService.bind( "basket", this );
        ResourceService.bind( "basketItems", this );
    },

    methods: {
        calcPrice: function(basketItem)
        {
            var currency = basketItem.variation.variationRetailPrice.currency;
            var price    = basketItem.quantity * basketItem.variation.variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary(price, currency);
        },

        getBasePrice: function(basketItem)
        {
            var currency = basketItem.variation.variationRetailPrice.currency;
            var price    = basketItem.variation.variationRetailPrice.basePrice;

            return MonetaryFormatService.formatMonetary(price, currency);
        },

        deleteItem: function(basketItem, event)
        {
            var _self = this;

            if ($(event.currentTarget).hasClass('btn-link'))
            {
                this.toggleDeleteBtnClass(event.currentTarget);
                $(event.currentTarget).find('.message').text('Jetzt löschen');
            }
            else
            {
                $('.previewItem-' + basketItem.variationId).toggleClass('wait');

                BasketService.deleteBasketItem(basketItem);
            }
        },

        toggleDeleteBtnClass: function(element)
        {
            $(element).toggleClass('btn-link');
            $(element).toggleClass('btn-danger');
        },

        getImage: function(variationId)
        {
            var path = '';

            // TODO: check for occurences
            //for (var i = 0; i < this.items[variationId].variationImageList.length; i++)
            //{
            //    if (this.items[variationId].variationImageList[i].path !== '')
            //    {
            //        path = this.items[variationId].variationImageList[i].path;
            //    }
            //}
            return this.baseUrl + "/" + path;
        },

        updateBasketItemQuantity: function(basketItem, value)
        {
            var _self = this;

            if (basketItem.quantity > 1 || value == 1)
            {
                basketItem.quantity = basketItem.quantity + value;
                $(this.$el.nextElementSibling).toggleClass('wait');

                BasketService.updateBasketItem(basketItem)
                    .done(function()
                    {
                        $(_self.$el.nextElementSibling).toggleClass('wait');
                    });
            }
        },

        checkName: function(variationId, name)
        {
            // TODO: check for occurences
            //if (name !== '')
            //{
            //    return name + " " + this.items[variationId].variationBase.variationName;
            //}
            //return this.items[variationId].itemDescription.name1 + " " + this.items[variationId].variationBase.variationName;
            return "";
        },

        setLinkToItem: function(variationId)
        {
            // TODO: check for occurences
            //var urlContent = this.items[variationId].itemDescription.urlContent.split("/");
            //var i          = urlContent.length - 1;
            //
            //return "/" + urlContent[i] + "/" + this.items[variationId].itemBase.id + "/" + this.items[variationId].variationBase.id;
        }
    }
});

},{"services/BasketService":43,"services/ModalService":47,"services/MonetaryFormatService":48,"services/ResourceService":51}],11:[function(require,module,exports){
var BasketService  = require('services/BasketService');
var CountryService = require('services/CountryService');

Vue.component('basket-shipping-country', {

    template: '#vue-basket-shipping-country',

    props: [
        "countryData",
        "countryNameData"
    ],

    data: function()
    {
        return {
            shippingCountries: [],
            select           : {}
        }
    },

    methods: {
        updateShippingCountry: function()
        {
            var basket               = BasketService.getBasket().basket;
            basket.shippingCountryId = this.select.id;
            console.log("updateShippingCountry", JSON.stringify(this.select));
            BasketService.updateShippingCountry(basket);
        },

        initSelected: function()
        {
            var nothingSelected = true;
            for (var key in this.countryList)
            {
                var country = countryList[key];
                if (country.selected)
                {
                    this.select     = country;
                    nothingSelected = false;
                    break;
                }
            }
            if (nothingSelected)
            {
                this.shippingCountries[0].selected = true;
                this.select                        = this.shippingCountries[0];
            }
        }
    },
    ready  : function()
    {

        var shippingId         = BasketService.getBasket().basket.shippingCountryId;
        this.shippingCountries = CountryService.parseShippingCountries(this.countryData, shippingId);
        this.initSelected();
        CountryService.translateCountryNames(this.countryNameData, this.shippingCountries);
        CountryService.sortCountries(this.shippingCountries);
    }

});

},{"services/BasketService":43,"services/CountryService":45}],12:[function(require,module,exports){
var BasketService         = require('services/BasketService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-total-sum', {

    props: [
        "basketData",
        "showFull"
    ],

    activate: function(done)
    {
        var self = this;
        BasketService.watch(function(data)
        {
            self.$set('basket', data.basket);
        });
        BasketService.init(jQuery.parseJSON(this.basketData)).done(function()
        {
            done();
        });
    },

    template: '#vue-basket-total-sum',

    data: function()
    {
        return {
            basket: {}
        };
    },

    methods: {
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        }
    }

});

},{"services/BasketService":43,"services/MonetaryFormatService":48}],13:[function(require,module,exports){
var BasketService       = require('services/BasketService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

Vue.component('category-list-item', {

    template: '#vue-category-list-item',

    props: [
        "item",
        "baseUrl"
    ],

    methods: {

        addToBasket: function()
        {
            var addItemModal = ModalService.findModal(this.$el);
            addItemModal.setTimeout(10000);

            $(".wrapper-bottom").append(addItemModal.getModalContainer());

            BasketService.addBasketItem({
                variationId: this.item.variationBase.id,
                quantity   : 1
            })
                .done(function()
                {
                    addItemModal.show();
                    NotificationService.success('Der Artikel wurde erfolgreich in den Warenkorb gelegt').closeAfter(7000);
                })
                .fail(function()
                {
                    NotificationService.error('Der Artikel konnte leider nicht hinzugefügt werden').closeAfter(7000);
                });
        },

        getImage: function()
        {
            for (var i = 0; i < this.item.variationImageList.length; i++)
            {
                if (this.item.variationImageList[i].path !== '')
                {
                    return this.baseUrl + "/" + this.item.variationImageList[i].path;
                }
            }
            return null;
        },

        checkName: function(name)
        {
            if (name !== '')
            {
                return name + " " + this.item.variationBase.variationName;
            }
            else
            {
                return this.item.itemDescription.name1 + " " + this.item.variationBase.variationName;
            }
        },

        setLinkToItem: function()
        {
            var urlContent = this.item.itemDescription.urlContent.split("/");
            var i          = urlContent.length - 1;

            return "/" + urlContent[i] + "/" + this.item.itemBase.id + "/" + this.item.variationBase.id;
        }
    }
});

},{"services/BasketService":43,"services/ModalService":47,"services/NotificationService":49}],14:[function(require,module,exports){
var BasketService         = require('services/BasketService');
var ApiService            = require('services/ApiService');
var NotificationService   = require('services/NotificationService');
var ModalService          = require('services/ModalService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('add-item-confirm', {

    props: [
        "basketItem",
        "baseUrl",
        "quantity"
    ],

    template: '#vue-add-item-confirm',

    methods: {

        getImage: function()
        {
            var path = '';

            for (var i = 0; i < this.basketItem.variationImageList.length; i++)
            {
                if (this.basketItem.variationImageList[i].path !== '')
                {
                    path = this.basketItem.variationImageList[i].path;
                }
            }
            return this.baseUrl + "/" + path;
        }

    }
});

},{"services/ApiService":42,"services/BasketService":43,"services/ModalService":47,"services/MonetaryFormatService":48,"services/NotificationService":49}],15:[function(require,module,exports){
var CountryService = require('services/CountryService');

Vue.component('country-select', {

    template: '#vue-country-select',

    props: [
        'countryData',
        'countryNameMap',
        'selectedCountryId',
        'selectedStateId'
    ],

    data: function()
    {
        return {
            countryList: [],
            stateList  : []
        };
    },

    created: function()
    {
        this.countryList = CountryService.parseShippingCountries(this.countryData, this.selectedCountryId ? this.selectedCountryId : 1);

        CountryService.translateCountryNames(this.countryNameMap, this.countryList);
        CountryService.sortCountries(this.countryList);
    },

    methods: {
        countryChanged: function()
        {
            this.selectedStateId = null;
        }
    },

    watch: {
        'selectedCountryId': function()
        {
            this.countryList = CountryService.parseShippingCountries(this.countryData, this.selectedCountryId);
            this.stateList   = CountryService.parseShippingStates(this.countryData, this.selectedCountryId);
        }
    }
});

},{"services/CountryService":45}],16:[function(require,module,exports){
Vue.component('coupon', {

    template: '#vue-coupon'

});

},{}],17:[function(require,module,exports){
var BasketService = require('services/BasketService');

Vue.component('delete-from-basket', {

    template: '#vue-delete-from-basket',

    props: [
        'basketItem'
    ],

    methods: {

        deleteItem: function()
        {
            BasketService.deleteBasketItem(this.basketItem);
        }

    }

});

},{"services/BasketService":43}],18:[function(require,module,exports){
Vue.component('item-availability-text', {

    template: '<span class="availability-text">${ availabilityText }</span>',

    props: [
        'availability'
    ],

    computed: {
        availabilityText: function()
        {
            switch (this.availability)
            {
                case '1':
                    return 'Auf Lager';
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    return 'In Kürze verfügbar';
                case '10':
                    return 'Liefertermin auf Anfrage';
                default:
                    return 0;
            }
        }
    }

});

},{}],19:[function(require,module,exports){
var BasketService = require('services/BasketService');

Vue.component('item-count-to-basket', {

    template: '#vue-item-count-to-basket',

    props: [
        'basketItem',
        'quantity'
    ],

    methods: {

        quantityPlus: function()
        {
            this.quantity++;

            this.basketItem.quantity = this.quantity;
            BasketService.updateBasketItem(this.basketItem);
        },

        quantityMinus: function()
        {
            if (this.quantity > 1)
            {
                this.quantity--;

                this.basketItem.quantity = this.quantity;
                BasketService.updateBasketItem(this.basketItem);
            }
        }
    }
});

},{"services/BasketService":43}],20:[function(require,module,exports){
var PaginationService = require('services/PaginationService');
var LoadItemsService  = require('services/LoadItemsService');

Vue.component("infinite-scroll-item-list", {

    props: {
        infiniteConfig: {
            limit     : 20,           // count of items to load.
            offset    : 0,           // amount of items we want to skip on following call.
            isLastPage: false
        }
    },

    directives: {
        'infinite-scroll': require('vue-infinite-scroll').infiniteScroll
    },

    data: function()
    {
        return {
            isBusy: false      // if infinite scroll is busy, load event is disabled.
        };
    },

    methods: {
        loadMoreItems: function(categoryID)
        {
            var self    = this;
            var data    = {
                limit : self.infiniteConfig.limit,
                offset: self.infiniteConfig.offset,
                page  : self.infiniteConfig.offset / self.infiniteConfig.limit
            };
            self.isBusy = true;

            if (!self.isLastPage)
            {
                LoadItemsService().loadItems(categoryID, data, this.$el, function(response)
                {
                    if (response.data)
                    {
                        response = response.data;
                    }

                    if (response.isLastPage || response.entries.length <= 0)
                    {
                        self.isBusy     = true;
                        self.isLastPage = response.isLastPage;
                        // TODO remove log and add "All elements loaded" event
                        console.log("All items loaded. No more items to get.");

                        // update pagination indicator
                        var currentItemAmount = (self.infiniteConfig.offset - parseInt(PaginationService.itemsPerPage) + response.entries.length);

                        if ($(".product-count").find("span:not('.text-muted')"))
                        {
                            $(".product-count").find("span:not('.text-muted')").html("1 - " + currentItemAmount);
                        }
                        return;
                    }
                    self.appendItems(self.$el, response.entries);
                    self.infiniteConfig.offset += parseInt(PaginationService.itemsPerPage);
                    self.isBusy = false;

                    // update pagination indicator
                    if ($(".product-count").find("span:not('.text-muted')"))
                    {
                        $(".product-count").find("span:not('.text-muted')").html("1 - " + self.infiniteConfig.offset);
                    }
                });
            }
        },

        appendItems: function(el, itemList)
        {
            /**
             * Append more items to item list.
             *
             * @type {any}
             */
            var isGridView = $(this.$el).hasClass("grid");
            var newNode;
            var item;
            var att;

            for (var i = 0, length = itemList.length; i < length; i++)
            {
                item              = itemList[i];
                newNode           = document.createElement('li');
                newNode.innerHTML = '<category-list-item :item=\'' + JSON.stringify(item) + '\' base-url=""></category-list-item>';
                newNode           = el.appendChild(newNode);

                // compile new added (directive) element
                this.$compile(newNode);

                // setting up new elements for grid or list view.
                if (isGridView)
                {
                    $(newNode).find("article").addClass("grid");
                }
                else
                {
                    $(newNode).find("article").removeClass("grid");
                }

                newNode = null;
            }
        }
    }
});
},{"services/LoadItemsService":46,"services/PaginationService":50,"vue-infinite-scroll":57}],21:[function(require,module,exports){
var PaginationService = require('services/PaginationService');

Vue.component('item-list-sort', {

    template: '#vue-item-list-sort',

    props: {
        sortedDataList    : String,
        defaultSorting    : String,
        topCell           : String,
        itemAsc           : String,
        itemDesc          : String,
        nameAsc           : String,
        nameDesc          : String,
        priceAsc          : String,
        priceDesc         : String,
        releaseAsc        : String,
        releaseDesc       : String,
        storeSpecialAsc   : String,
        storeSpecialDesc  : String,
        idDesc            : String,
        random            : String,
        paginationPosition: String,
        defaultItemPerPage: String,
        position          : String
    },

    data: function()
    {
        return {
            sortingList         : [],
            itemPerPageList     : [],
            itemsPerPageSelected: 0
        };
    },

    methods: {
        initPropsValues: function()
        {
            this.sortedDataList = JSON.parse(this.sortedDataList);

            if (this.sortedDataList)
            {
                this.topCell          = this.sortedDataList.indexOf("top_cell") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.itemAsc          = this.sortedDataList.indexOf("item_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.itemDesc         = this.sortedDataList.indexOf("item_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.nameAsc          = this.sortedDataList.indexOf("name_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.nameDesc         = this.sortedDataList.indexOf("name_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.priceAsc         = this.sortedDataList.indexOf("price_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.priceDesc        = this.sortedDataList.indexOf("price_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.releaseAsc       = this.sortedDataList.indexOf("release_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.releaseDesc      = this.sortedDataList.indexOf("release_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.storeSpecialAsc  = this.sortedDataList.indexOf("store_special_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.storeSpecialDesc = this.sortedDataList.indexOf("store_special_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.idDesc           = this.sortedDataList.indexOf("id_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.random           = this.sortedDataList.indexOf("random") > -1 || this.sortedDataList.indexOf("all") > -1;
            }
        },

        getQueryStringValue: function(key)
        {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },

        currentURL: function()
        {
            var url = window.location.href.split('?')[0];
            return url;
        },

        showPagination: function()
        {
            var show = this.paginationPosition != "infinityScroll";
            return show;
        },

        updateSelectedItemsPerPage: function()
        {
            PaginationService.itemsPerPage = this.itemsPerPageSelected;
        },

        initSortingList: function()
        {
            var defaultSortingOptions = [];

            if (this.topCell == true)
            {
                defaultSortingOptions.push({value: "top_cell", selected: "top_cell" == this.defaultSorting, name: "Top Seller"});
            }
            if (this.itemAsc == true)
            {
                defaultSortingOptions.push({value: "item_asc", selected: "item_asc" == this.defaultSorting, name: "Positionsnummer aufsteigend"});
            }
            if (this.itemDesc == true)
            {
                defaultSortingOptions.push({value: "item_desc", selected: "item_desc" == this.defaultSorting, name: "Positionsnummer absteigend"});
            }
            if (this.nameAsc == true)
            {
                defaultSortingOptions.push({value: "name_asc", selected: "name_asc" == this.defaultSorting, name: "Name aufsteigend"});
            }
            if (this.nameDesc == true)
            {
                defaultSortingOptions.push({value: "name_desc", selected: "name_desc" == this.defaultSorting, name: "Name absteigend"});
            }
            if (this.priceAsc == true)
            {
                defaultSortingOptions.push({value: "price_asc", selected: "price_asc" == this.defaultSorting, name: "Preis aufsteigend"});
            }
            if (this.priceDesc == true)
            {
                defaultSortingOptions.push({value: "price_desc", selected: "price_desc" == this.defaultSorting, name: "Preis absteigend"});
            }
            if (this.releaseAsc == true)
            {
                defaultSortingOptions.push({value: "release_asc", selected: "release_asc" == this.defaultSorting, name: "Erscheinungsdatum aufsteigend"});
            }
            if (this.releaseDesc == true)
            {
                defaultSortingOptions.push({value: "release_desc", selected: "release_desc" == this.defaultSorting, name: "Erscheinungsdatum absteigend"});
            }
            if (this.storeSpecialAsc == true)
            {
                defaultSortingOptions.push({value: "store_special_asc", selected: "store_special_asc" == this.defaultSorting, name: "Shopaktion aufsteigend"});
            }
            if (this.storeSpecialDesc == true)
            {
                defaultSortingOptions.push({value: "store_special_desc", selected: "store_special_desc" == this.defaultSorting, name: "Shopaktion absteigend"});
            }
            if (this.idDesc == true)
            {
                defaultSortingOptions.push({value: "id_desc", selected: "id_desc" == this.defaultSorting, name: "Artikel ID aufsteigend"});
            }
            if (this.random == true)
            {
                defaultSortingOptions.push({value: "random", selected: "random" == this.defaultSorting, name: "Zufällige Sortierung"});
            }

            return defaultSortingOptions;
        },

        initItemPerPageList: function()
        {
            var defaultItemPerPageOptions = [];

            defaultItemPerPageOptions.push({value: 20, selected: 20 == this.defaultItemPerPage});
            defaultItemPerPageOptions.push({value: 50, selected: 50 == this.defaultItemPerPage});
            defaultItemPerPageOptions.push({value: 100, selected: 100 == this.defaultItemPerPage});

            return defaultItemPerPageOptions;
        }
    },

    ready: function()
    {
        this.initPropsValues();

        var itemSorting      = this.getQueryStringValue("itemSorting");
        var listItemsPerPage = this.getQueryStringValue("items_per_page");

        if (itemSorting.length > 0)
        {
            this.defaultSorting = itemSorting;
        }
        if (listItemsPerPage.length > 0)
        {
            this.defaultItemPerPage   = listItemsPerPage;
            this.itemsPerPageSelected = this.defaultItemPerPage;
        }
        else
        {
            this.itemsPerPageSelected = this.defaultItemPerPage;
        }

        PaginationService.itemsPerPage = this.itemsPerPageSelected;

        this.sortingList     = this.initSortingList();
        this.itemPerPageList = this.initItemPerPageList();
    }
});

},{"services/PaginationService":50}],22:[function(require,module,exports){
var ApiService        = require('services/ApiService');
var PaginationService = require('services/PaginationService');

Vue.component('item-list-pagination', {

    template: '#vue-item-list-pagination',

    props: [
        'paginationPosition',
        'position',
        'itemList',
        'maxCount'
    ],

    data: function()
    {
        return {
            currentPaginationEntry: 1,
            currentURL            : "",
            numberOfEntries       : 1
        };
    },

    ready: function()
    {
        this.currentPaginationEntry = this.getQueryStringValue("page");
        var url                     = window.location.href;
        this.currentURL             = url.replace("&page=" + this.currentPaginationEntry, "");
        this.currentPaginationEntry = parseInt(this.currentPaginationEntry) || 1;

        this.numberOfEntries = this.calculateMaxPages();

        if (this.currentPaginationEntry < 0)
        {
            this.currentPaginationEntry = 1;
        }
        else if (this.currentPaginationEntry > this.numberOfEntries)
        {
            this.currentPaginationEntry = this.numberOfEntries;
        }
    },

    methods: {
        getQueryStringValue: function(key)
        {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },

        calculateMaxPages: function()
        {
            var pages        = ( this.maxCount / PaginationService.itemsPerPage );
            var roundedPages = pages.toString().split('.');

            if (roundedPages[1] > 0)
            {
                roundedPages[0] = parseInt(roundedPages[0]) + 1;
            }

            return roundedPages[0];
        },

        updateItemCategoryList: function(page)
        {
            if (this.currentURL.split('?').length > 0)
            {
                this.currentURL = this.currentURL.split('?')[0];
            }

            var url = this.currentURL + "?page=" + page + "&items_per_page=" + PaginationService.itemsPerPage;

            window.open(url, "_self");
        },

        showPagination: function()
        {
            return this.paginationPosition.includes(this.position);
        },

        showFirstPaginationEntry: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 2)
            {
                show = false;
            }

            return show;
        },

        getLastPaginationEntry: function()
        {
            return this.numberOfEntries;
        },

        showLastPaginationEntry: function()
        {
            var show = false;

            if (this.currentPaginationEntry < this.numberOfEntries - 1)
            {
                show = true;
            }

            return show;
        },

        previousPaginationEntry: function()
        {
            var previousPage = this.currentPaginationEntry - 1;

            if (previousPage <= 1)
            {
                previousPage = 1;
            }

            return previousPage;
        },

        nextPaginationEntry: function()
        {
            var nextPage = this.currentPaginationEntry + 1;

            if (nextPage >= this.numberOfEntries)
            {
                nextPage = this.numberOfEntries;
            }

            return nextPage;
        },

        showDotsLeft: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 3)
            {
                show = false;
            }

            return show;
        },

        showDotsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry >= this.numberOfEntries - 2)
            {
                show = false;
            }

            return show;
        },

        showArrowsLeft: function()
        {
            var show = false;

            if (this.currentPaginationEntry > 1)
            {
                show = true;
            }

            return show;
        },

        showArrowsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry == this.numberOfEntries)
            {
                show = false;
            }

            return show;
        }
    }
});

},{"services/ApiService":42,"services/PaginationService":50}],23:[function(require,module,exports){
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var HTMLCache           = require('services/VariationsHTMLCacheService');
var BasketService       = require('services/BasketService');

/**
 * possible preselection values:
 * undefined || false
 * true
 * variantID
 */
Vue.component('item-variation-select', {

    template: '#vue-item-variation-select',

    props   : [
        "itemId",
        "preselection",
        "itemIsInBasket"
    ],

    data    : function()
    {
        return {
            variationAttributes     : {},
            variantionSelectionModel: [],
            oldAttributeValueList   : [],
            basketItems             : [],
            attributeNames          : []
        };
    },

    created : function()
    {
        this.oldVariationId = this.preselection;
        this.loadVariationAttributes();
        this.variations = {};
        this.initWindowEventHandling();
    },

    activate: function(done)
    {
        var self = this;
        BasketService.watch(function(data)
        {
            self.$set('basketItems', data.basketItems);
        });
        BasketService.init().done(function()
        {
            done();
        });
    },

    methods : {
        loadVariationAttributes: function()
        {
            var self = this;
            // request item variations
            ApiService.get("/rest/item_variation_select/" + this.itemId)
                .done(function(response)
                {
                    // catch possible empty response
                    if (!response
                        || (response && response.data === null)
                        || (response && response["selectionValues"].length === 0))
                    {
                        return;
                    }
                    self.variationAttributes = response["selectionValues"];
                    self.variations          = response["variations"];
                    self.attributeNames      = response["attributeNames"];

                    var attributes          = Object.keys(self.variationAttributes);
                    var setOnInitialization = {};

                    // where the magic begins
                    if (!self.preselection)
                    {
                        return;
                    }
                    else
                    {
                        // if preselection is true, select first entries for all attributes
                        if (typeof self.preselection === 'boolean')
                        {
                            for (var attribute in self.variationAttributes)
                            {
                                self.variantionSelectionModel.push({
                                    attributeId     : attribute,
                                    attributeValueId: Object.keys(self.variationAttributes[attribute])[0]
                                });
                            }
                        }
                        else
                        {
                            // if preselection not found or there are no variations, initialize select element with
                            // "please take a choice" option
                            if (!self.variations[self.preselection] || self.variations[self.preselection].length <= 0)
                            {
                                self.preselection = false;
                                return;
                            }

                            var variationPreselected = self.variations[self.preselection];
                            // individual selection via variation ID. Searching for values.
                            for (var i = 0, leng = variationPreselected.length; i < leng; i++)
                            {
                                while (self.variantionSelectionModel.length !== leng)
                                {
                                    self.variantionSelectionModel.push({attributeId: null, attributeValueId: null});
                                }
                                // toString() is needed to initialize select element model. Doesn't work with integer.
                                self.variantionSelectionModel[i].attributeId      = variationPreselected[i].attributeId.toString();
                                self.variantionSelectionModel[i].attributeValueId = variationPreselected[i].attributeValueId.toString();
                            }
                        }

                    }

                }).fail(function(error)
            {
                console.warn(error);
                return false;
            });
        },
        matchVariation         : function(currentSelection)
        {
            var hits = 0;
            var currentVariation;
            for (var variationID in this.variations)
            { // iterate all variations
                currentVariation = this.variations[variationID];
                for (var i = 0, leng = currentVariation.length; i < leng; i++)
                {
                    /*
                     Increase "hit" with "variationID", if fitting attribute was found.
                     The amount of this addition divided by length of current variation acn match a variation ID.
                     */
                    if (currentVariation[i].attributeId === currentSelection[i].attributeId
                        && currentVariation[i].attributeValueId === currentSelection[i].attributeValueId)
                    {
                        hits += parseInt(variationID);
                    }
                }
                hits = (hits / leng);
                /*
                 if "hit", divided by length of attributes of one variation, matches the current variation ID,
                 we found our variation
                 */
                if (hits === parseInt(variationID))
                {
                    break;
                }
                else
                {
                    hits = 0;
                }
            }
            return hits;
        },
        onSelectChange         : function()
        {
            var self                = this;
            var convertedAttributes = [];
            // convert attribute values to integer
            for (var attr in this.variantionSelectionModel)
            {
                if (self.variantionSelectionModel[attr] === "-1")
                {
                    return;
                }

                convertedAttributes.push({
                    attributeId     : parseInt(this.variantionSelectionModel[attr].attributeId),
                    attributeValueId: parseInt(this.variantionSelectionModel[attr].attributeValueId)
                });
            }
            var matchingVariationId = this.matchVariation(convertedAttributes);

            if (matchingVariationId > 0)
            {
                if (this.itemIsInBasket)
                {
                    var currentBasketItem;

                    for (var i = 0, len = this.basketItems.length; i < len; i++)
                    {
                        if (this.oldVariationId === this.basketItems[i].variationId)
                        {
                            currentBasketItem = this.basketItems[i];
                        }
                    }

                    if (currentBasketItem)
                    {
                        BasketService.updateBasketItem(
                            {
                                id         : currentBasketItem.id,
                                variationId: matchingVariationId,
                                quantity   : currentBasketItem.quantity
                            });
                    }
                }
                else
                {
                    window.history.replaceState({id: this.oldVariationId, itemId: this.itemId, reload: "true"}, "testitem", "/test/" + this.itemId + "/" + this.oldVariationId);
                    window.history.pushState({id: matchingVariationId, itemId: this.itemId, reload: "true"}, "testitem", "/test/" + this.itemId + "/" + matchingVariationId);

                    this.loadVariation(this.itemId, matchingVariationId)
                }
            }
        },

        loadVariation: function(itemId, variationId)
        {
            // var cachedHTML = HTMLCache.getFromCache(itemId, variationId);
            //
            // if(cachedHTML === undefined)
            // {
            var success =
                    function(response)
                    {
                        var found = $(response).find("#page-body");
                        $("#page-body").html(found);
                        new Vue({el: 'body'});

                        HTMLCache.addToCache(itemId, variationId, found);
                    };

            jQuery.get("/test/" + itemId + "/" + variationId, "", success, "html");
            // }
            // else
            // {
            //     $("#page-body").html(cachedHTML);
            //     new Vue({el: 'body'});
            // }
        }
    }
});

},{"services/ApiService":42,"services/BasketService":43,"services/NotificationService":49,"services/VariationsHTMLCacheService":53}],24:[function(require,module,exports){
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

Vue.component('login', {

        template: '#vue-login',

    props: [
        "modalElement"
    ],

    data: function()
    {
        return {
            password: "",
            username: ""
        };
    },

    methods: {
        showLogin: function()
        {
            ModalService.findModal(document.getElementById(this.modalElement)).show();
        },

        sendLogin: function()
        {
            var component = this;

            ApiService.post("/rest/customer/login", {email: this.username, password: this.password}, {supressNotifications: true})
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(component.modalElement) != null)
                    {
                        ModalService.findModal(document.getElementById(component.modalElement)).hide();
                    }

                    NotificationService.success("Erfolgreich eingeloggt").closeAfter(3000);
                })
                .fail(function(response)
                {
                    switch (response.code)
                    {
                        case 401:
                            NotificationService.error("Anmeldedaten sind ungültig").closeAfter(3000);
                            break;
                    }
                });
        }
    }
});

},{"services/ApiService":42,"services/ModalService":47,"services/NotificationService":49}],25:[function(require,module,exports){
var ApiService = require('services/ApiService');

Vue.component('user-login-handler', {

    template: '#vue-user-login-handler',

    ready: function()
    {
        var self = this;

        ApiService.listen("AfterAccountAuthentication",
            function(userData)
            {
                self.setUserLoggedIn(userData);
            });

        ApiService.listen("AfterAccountContactLogout",
            function()
            {
                self.setUserLoggedOut();
            });
    },

    methods: {
        setUserLoggedIn: function(userData)
        {
            if (userData.accountContact.firstName.length > 0 && userData.accountContact.lastName.length > 0)
            {
                this.$el.innerHTML = this.getUserHTML(userData.accountContact.firstName + " " + userData.accountContact.lastName);
            }
            else
            {
                this.$el.innerHTML = this.getUserHTML(userData.accountContact.options[0].value);
            }

            this.$compile(this.$el);
        },

        setUserLoggedOut: function()
        {
            this.$el.innerHTML = "<a data-toggle=\"modal\" href=\"#login\">Einloggen</a>" +
                "<small>oder</small>" +
                "<a data-toggle=\"modal\" href=\"#signup\">Registieren</a>";
        },

        getUserHTML: function(username)
        {
            return "<a href=\"#\" class=\"dropdown-toggle\" id=\"accountMenuList\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                "Hallo, " + username +
                "</a>" +
                "<div class=\"country-settings account-menu dropdown-menu dropdown-menu-right small\">" +
                "<div class=\"list-group\" aria-labelledby=\"accountMenuList\">" +
                "<a href=\"/my-account\" class=\"list-group-item small\"><i class=\"fa fa-user\"></i> MyAccount</a>" +
                "<a href=\"#\" class=\"list-group-item small\" v-logout><i class=\"fa fa-sign-out\"></i> Logout</a>" +
                "</div>" +
                "</div>";
        }
    }
});

},{"services/ApiService":42}],26:[function(require,module,exports){
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('monetary-config',
    {
        props: [
            "numberDecimals",
            "separatorDecimal",
            "separatorThousands",
            "right",
            "currency"
        ],

        created: function()
        {
            MonetaryFormatService.initOptions(this.numberDecimals, this.separatorDecimal, this.separatorThousands, this.right, this.currency);
        }
    });

},{"services/MonetaryFormatService":48}],27:[function(require,module,exports){
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('monetary-format',
    {
        template: '${ monetary }',

        props: [
            "price",
            "currency"
        ],

        methods: {
            start: function(done)
            {
                var self = this;
                setTimeout(function()
                {
                    self.monetary = MonetaryFormatService.formatMonetary(this.price, this.currency);
                    done();
                }.bind(this), 100);
            }
        },

        activate: function(done)
        {
            this.start(done);
        },

        data: function()
        {
            return {
                monetary: ""
            };
        }
    });

},{"services/MonetaryFormatService":48}],28:[function(require,module,exports){
var ModalService        = require('services/ModalService');
var APIService          = require('services/APIService');
var NotificationService = require('services/NotificationService');

Vue.component('account-settings', {

    template: '#vue-account-settings',

    props: [
        "userData"
    ],

    data: function()
    {
        return {
            newPassword         : '',
            confirmPassword     : '',
            accountSettingsClass: ''
        };
    },

    ready: function()
    {
        this.accountSettingsClass = "accountSettingsModal" + this._uid;
    },

    computed: {
        matchPassword: function()
        {
            if (this.confirmPassword != '')
            {
                return this.newPassword === this.confirmPassword;
            }
            return true;
        }
    },

    methods: {

        showChangeAccountSettings: function()
        {
            var accountModal = ModalService.findModal($('.' + this.accountSettingsClass));

            $(".wrapper-bottom").append($('.' + this.accountSettingsClass));

            accountModal.show();
        },

        saveAccountSettings: function()
        {
            var self = this;
            if (this.newPassword != '' && (this.newPassword === this.confirmPassword))
            {
                APIService.post('/rest/customer/password', {password: this.newPassword})
                    .done(function(response)
                    {
                        self.clearFieldsAndClose();
                        NotificationService.success('Passwort erfolgreich geändert').closeAfter(3000);
                    }).fail(function(response)
                {
                    self.clearFieldsAndClose();
                    NotificationService.eroor('Passwort konnte nicht geändert werden').closeAfter(5000);
                });
            }
        },

        clearFields: function()
        {
            this.newPassword     = '';
            this.confirmPassword = '';
        },

        clearFieldsAndClose: function()
        {
            ModalService.findModal($('.' + this.accountSettingsClass)).hide();
            this.clearFields();
        },

        getEmail: function()
        {
            return this.userData.options[0].value;
        }
    }

});

},{"services/APIService":40,"services/ModalService":47,"services/NotificationService":49}],29:[function(require,module,exports){
var NotificationService = require('services/NotificationService');
var WaitScreenService   = require('services/WaitScreenService');

Vue.component('notifications', {

    template: '#vue-notifications',

    data    : function()
    {
        return {
            notifications: NotificationService.getNotifications().all()
        };
    },

    methods : {
        dismiss: function(notification)
        {
            NotificationService.getNotifications().remove(notification);
        },

        test   : function()
        {
            NotificationService.error('Test').closeAfter(3000);
            WaitScreenService.showWaitScreen();
        }
    }
});

},{"services/NotificationService":49,"services/WaitScreenService":54}],30:[function(require,module,exports){
var ApiService = require('services/ApiService');

Vue.component('order-history', {

    template: '#vue-order-history',

    props: [
        "contactId",
        "orderMaxCountPagination"
    ],

    data: function()
    {
        return {
            //needed for pagination
            currentPaginationEntry: 1,
            numberOfEntries       : 1,
            showItemsOf           : "1-6",
            itemsPerPage          : 6,
            //orderObjectToRender
            orderList             : []
        };
    },

    ready: function()
    {
        this.updateOrderList(1);

        this.numberOfEntries = this.calculateMaxPages();
    },

    methods: {
        //extend this method params for filter handling
        updateOrderList: function(page)
        {
            this.currentPaginationEntry = page;

            var self = this;

            ApiService.get("/rest/order?page=" + page + "&items=" + this.itemsPerPage)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    self.orderList = response["entries"];

                    //calculate the show X - X items
                    this.showItemsOf = (((this.currentPaginationEntry - 1) * this.itemsPerPage) + 1) + " - " + (((this.currentPaginationEntry - 1) * this.itemsPerPage) + this.itemsPerPage);
                })
                .fail(function(response)
                {
                    //todo
                });
        },

        calculateMaxPages: function()
        {
            var pages        = this.orderMaxCountPagination / this.itemsPerPage;
            var roundedPages = Math.floor(pages);

            return roundedPages;
        },

        showFirstPaginationEntry: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 2)
            {
                show = false;
            }

            return show;
        },

        getLastPaginationEntry: function()
        {
            return this.numberOfEntries;
        },

        showLastPaginationEntry: function()
        {
            var show = false;

            if (this.currentPaginationEntry < this.numberOfEntries - 1)
            {
                show = true;
            }

            return show;
        },

        previousPaginationEntry: function()
        {
            var previousPage = this.currentPaginationEntry - 1;

            if (previousPage <= 1)
            {
                previousPage = 1;
            }

            return previousPage;
        },

        nextPaginationEntry: function()
        {
            var nextPage = this.currentPaginationEntry + 1;

            if (nextPage >= this.numberOfEntries)
            {
                nextPage = this.numberOfEntries;
            }

            return nextPage;
        },

        showDotsLeft: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 3)
            {
                show = false;
            }

            return show;
        },

        showDotsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry >= this.numberOfEntries - 2)
            {
                show = false;
            }

            return show;
        },

        showArrowsLeft: function()
        {
            var show = false;

            if (this.currentPaginationEntry > 1)
            {
                show = true;
            }

            return show;
        },

        showArrowsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry == this.numberOfEntries)
            {
                show = false;
            }

            return show;
        }
    }
});

},{"services/ApiService":42}],31:[function(require,module,exports){
var MonetaryFormatService = require('services/MonetaryFormatService');
var APIService            = require('services/APIService');

Vue.component('payment-provider-select', {

        template: '#vue-payment-provider-select',

        props: ['paymentProviderList'],

        data: function()
        {
            return {
                selectedPaymentProvider: {}
            };
        },

        created: function()
        {
            this.addEventListener();
        },

        methods: {
            onPaymentProviderChange: function()
            {
                APIService.put("/rest/payment_method/" + this.selectedPaymentProvider);
            },

            formatPrice: function(price, currency)
            {
                return MonetaryFormatService.formatMonetary(price, currency);
            },

            addEventListener: function()
            {
                //listen on APIService events and handle new data
            }
        }
    });

},{"services/APIService":40,"services/MonetaryFormatService":48}],32:[function(require,module,exports){
Vue.component('price-formatted', {

    template: '<span class="price-formatted">${ priceFormatted }</span>',

    props: [
        'price'
    ],

    computed: {
        priceFormatted: function()
        {
            return (Math.round(parseFloat(this.price) * 100) / 100).toFixed(2);
        }
    }

});

},{}],33:[function(require,module,exports){
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

var ValidationService = require('services/ValidationService');

Vue.component('registration', {

    template: '#vue-registration',

    props: [
        "modalElement",
        "guestMode",
        "isSimpleRegistration"
    ],

    data: function()
    {
        return {
            password      : "",
            passwordRepeat: "",
            username      : "",
            billingAddress: {}
        };
    },

    created: function()
    {
        if (this.guestMode == null || this.guestMode == "")
        {
            this.guestMode = false;
        }
        else
        {
            this.guestMode = true;
        }
    },

    methods: {
        validateRegistration: function()
        {
            var self = this;
            ValidationService.validate($('#registration' + this._uid))
                .done(function()
                {
                    self.sendRegistration()
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendRegistration: function()
        {
            var userObject = this.getUserObject();
            var component  = this;

            ApiService.post("/rest/customer", userObject)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(component.modalElement) != null)
                    {
                        ModalService.findModal(document.getElementById(component.modalElement)).hide();
                    }

                    NotificationService.success("Erfolgreich registriert").closeAfter(3000);
                });

        },

        getUserObject: function()
        {
            // FIXME copy&paste-action? serious?
            if (this.guestMode)
            {
                var userObject =
                    {
                        contact: {
                            referrerId: 1,
                            typeId    : 1,
                            options   : {
                                typeId: {
                                    typeId   : 2,
                                    subTypeId: 4,
                                    value    : this.username,
                                    priority : 0
                                }
                            }
                        }
                    };
            }
            else
            {
                var userObject =
                    {
                        contact: {
                            referrerId: 1,
                            typeId    : 1,
                            password  : this.password,
                            options   : {
                                typeId: {
                                    typeId   : 2,
                                    subTypeId: 4,
                                    value    : this.username,
                                    priority : 0
                                }
                            }
                        }
                    };
            }

            if (!this.isSimpleRegistration)
            {
                userObject.billingAddress = this.billingAddress;
            }

            return userObject;
        }
    }
});

},{"services/ApiService":42,"services/ModalService":47,"services/NotificationService":49,"services/ValidationService":52}],34:[function(require,module,exports){
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('shipping-profile-select', {

    template: '#vue-shipping-profile-select',

    props: ['shippingProfileData'],

    data: function()
    {
        return {
            shippingProfileList    : [],
            selectedShippingProfile: {}
        };
    },

    created: function()
    {
        // use when real data is implemented
        // if(this.shippingProfileData)
        // {
        //     this.shippingProfileList = jQuery.parseJSON(this.shippingProfileData);
        // }

        this.shippingProfileList =
            [
                {id: "1", name: "DHL", price: 3.99},
                {id: "2", name: "Hermes", price: 2.99},
                {id: "3", name: "UPS", price: 5}
            ];

        this.addEventListener();
    },

    methods: {
        onShippingProfileChange: function()
        {
            // TODO remove log
            console.log(this.shippingProfileList);
            console.log(this.selectedShippingProfile);
        },

        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        },

        addEventListener: function()
        {
            //listen on APIService events and handle new data
        }
    }
});

},{"services/MonetaryFormatService":48}],35:[function(require,module,exports){
var NotificationService = require('services/NotificationService');

Vue.component('user-login-watcher', {

        props: [
            "userLoggedIn",
            "route",
            "isUserLoggedIn"
        ],

        ready: function()
        {
            if (this.route.length > 0)
            {
                if (this.userLoggedIn == this.isUserLoggedIn)
                {
                    if (this.userLoggedIn == "false")
                    {
                        NotificationService.error("Bitte einloggen").closeAfter(3000);
                    }
                    else
                    {
                        NotificationService.error("Du bist bereits eingeloggt").closeAfter(3000);
                    }

                    window.location.pathname = this.route;
                }
            }
        }
    });

},{"services/NotificationService":49}],36:[function(require,module,exports){
var WaitScreenService = require('services/WaitScreenService');

Vue.component('wait-screen', {

    template: '#vue-wait-screen',

    data    : function()
    {
        return {
            overlay: WaitScreenService.getOverlay()
        };
    },

    computed: {
        visible: function()
        {
            return this.overlay.count > 0;
        }
    }
});

},{"services/WaitScreenService":54}],37:[function(require,module,exports){
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');

Vue.directive('logout', function()
{

    $(this.el).click(
        function(e)
        {
            ApiService.get("/rest/customer/logout")
                .done(
                    function(response)
                    {
                        NotificationService.success('Sie wurden erfolgreich ausgeloggt').closeAfter(3000);

                        // remove address ids from session after logout
                        ApiService.post('/rest/customer/address_selection/0/?typeId=-1')
                            .fail(function(e)
                            {
                                console.warn(e);
                            });
                    }
                );

            e.preventDefault();

        }.bind(this));

});

},{"services/ApiService":42,"services/NotificationService":49}],38:[function(require,module,exports){
var ApiService = require('services/ApiService');

Vue.directive('place-order', function() {

    var $elem = $(this.el);

    $elem.click(function(e)
    {
        e.preventDefault();

        ApiService.post("/rest/order")
            .done(function(response)
            {
                var target = $elem.attr('href') || $elem.parents('form').attr('action');
                window.location.assign(target);
            });

    });

});

},{"services/ApiService":42}],39:[function(require,module,exports){
var ResourceService = require('services/ResourceService');

Vue.elementDirective('resource', {
    priority: 10000,
    params: [
        'name',
        'route',
        'data'
    ],
    bind: function()
    {
        ResourceService.registerResource(
            this.params.name,
            this.params.route,
            this.params.data
        );
    }
});

Vue.elementDirective('resource-list', {
    priority: 10000,
    params: [
        'name',
        'route',
        'data'
    ],
    bind: function()
    {
        ResourceService.registerResourceList(
            this.params.name,
            this.params.route,
            this.params.data
        );
    }
});

},{"services/ResourceService":51}],40:[function(require,module,exports){
var NotificationService = require('services/NotificationService');
var WaitScreenService   = require('services/WaitScreenService');

module.exports = (function($)
{

    var _token;
    var _eventListeners = {};

    return {
        get     : _get,
        put     : _put,
        post    : _post,
        delete  : _delete,
        send    : _send,
        setToken: _setToken,
        getToken: _getToken,
        listen  : _listen
    };

    function _listen(event, handler)
    {
        _eventListeners[event] = _eventListeners[event] || [];
        _eventListeners[event].push(handler);
    }

    function _triggerEvent(event, payload)
    {
        if (!!_eventListeners[event])
        {
            for (var i = 0; i < _eventListeners[event].length; i++)
            {
                var listener = _eventListeners[event][i];
                if (typeof listener != "function")
                {
                    continue;
                }
                listener.call(null, payload);
            }
        }
    }

    function _get(url, data, config)
    {
        config        = config || {};
        config.method = 'GET';
        return _send(url, data, config);
    }

    function _put(url, data, config)
    {
        config        = config || {};
        config.method = 'PUT';
        return _send(url, data, config);
    }

    function _post(url, data, config)
    {
        config        = config || {};
        config.method = 'POST';
        return _send(url, data, config);
    }

    function _delete(url, data, config)
    {
        config        = config || {};
        config.method = 'DELETE';
        return _send(url, data, config);
    }

    function _send(url, data, config)
    {
        var deferred = $.Deferred();

        config                      = config || {};
        config.data                 = !!data ? JSON.stringify(data) : null;
        config.dataType             = config.dataType || 'json';
        config.contentType          = config.contentType || 'application/json';
        config.doInBackground       = !!config.doInBackground;
        config.supressNotifications = !!config.supressNotifications;

        if (!config.doInBackground)
        {
            WaitScreenService.showWaitScreen();
        }
        $.ajax(url, config)
            .done(function(response)
            {
                if (!config.supressNotifications)
                {
                    printMessages(response);
                }
                for (event in response.events)
                {
                    _triggerEvent(event, response.events[event]);
                }
                deferred.resolve(response.data || response);
            })
            .fail(function(jqXHR)
            {
                var response = !!jqXHR.responseText ? $.parseJSON(jqXHR.responseText) : {};
                if (!config.supressNotifications)
                {
                    printMessages(response);
                }
                deferred.reject(response.error);
            })
            .always(function()
            {
                if (!config.doInBackground)
                {
                    WaitScreenService.hideWaitScreen();
                }
            });

        return deferred;
    }

    function printMessages(response)
    {
        var notification;
        if (!!response.error && response.error.message.length > 0)
        {
            notification = NotificationService.error(response.error);
        }

        if (!!response.success && response.success.message.length > 0)
        {
            notification = NotificationService.success(response.success);
        }

        if (!!response.warning && response.warning.message.length > 0)
        {
            notification = NotificationService.warning(response.warning);
        }

        if (!!response.info && response.info.message.length > 0)
        {
            notification = NotificationService.info(response.info);
        }

        if (!!response.debug && response.debug.class.length > 0)
        {
            notification.trace(response.debug.file + '(' + response.debug.line + '): ' + response.debug.class);
            for (var i = 0; i < response.debug.trace.length; i++)
            {
                notification.trace(response.debug.trace[i]);
            }
        }
    }

    function _setToken(token)
    {
        this._token = token;
    }

    function _getToken()
    {
        return this._token;
    }

})(jQuery);

},{"services/NotificationService":49,"services/WaitScreenService":54}],41:[function(require,module,exports){
var ApiService      = require('services/ApiService');
var CheckoutService = require('services/CheckoutService');

module.exports = (function($)
{

    return {
        createAddress: createAddress,
        updateAddress: updateAddress
    };

    function createAddress(address, addressType, setActive)
    {
        return ApiService.post("rest/customer/address?typeId=" + addressType, address).done(function(response)
        {
            if (!!setActive)
            {
                if (addressType === 1)
                {
                    CheckoutService.setBillingAddressId(response.id);
                }
                else if (addressType === 2)
                {
                    CheckoutService.setDeliveryAddressId(response.id);
                }
            }
        });
    }

    function updateAddress(newData, addressType)
    {
        addressType = addressType || newData.pivot.typeId;
        return ApiService.put("rest/customer/address/" + newData.id + "?typeId=" + addressType, newData);
    }

    function deleteAddress(addressId, addressType)
    {
        return ApiService.delete("rest/customer/address/" + addressId + "?typeId=" + addressType);
    }
})(jQuery);

},{"services/ApiService":42,"services/CheckoutService":44}],42:[function(require,module,exports){
arguments[4][40][0].apply(exports,arguments)
},{"dup":40,"services/NotificationService":49,"services/WaitScreenService":54}],43:[function(require,module,exports){
var ApiService = require('services/ApiService');

module.exports = (function($)
{

    var basket;
    var readyDeferred;
    var loading            = false;
    var watchers           = [];
    var basketItemToDelete = {};

    return {
        init                 : init,
        watch                : watch,
        getBasket            : getBasket,
        addBasketItem        : addBasketItem,
        updateBasketItem     : updateBasketItem,
        deleteBasketItem     : deleteBasketItem,
        updateShippingCountry: updateShippingCountry,
        basketItemToDelete   : basketItemToDelete
    };

    function init(basketData)
    {
        if (!readyDeferred)
        {
            readyDeferred = $.Deferred();
            if (!!basketData)
            {
                basket = basketData;
                notify();
                readyDeferred.resolve();
            }
            else
            {
                ApiService.get('/rest/basket').done(function(response)
                {
                    basket = response;
                    notify();
                    readyDeferred.resolve();
                });
            }

        }

        return readyDeferred;
    }

    function watch(callback)
    {
        watchers.push(callback);
        if (!!basket)
        {
            callback(basket);
        }
    }

    function notify()
    {
        for (var i = 0; i < watchers.length; i++)
        {
            watchers[i](basket);
        }
    }

    function getBasket()
    {
        return basket;
    }

    function addBasketItem(basketItem)
    {
        var self = this;
        return ApiService.post('/rest/basket/items/', basketItem)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

    function updateBasketItem(basketItem)
    {
        var self = this;
        return ApiService.put('/rest/basket/items/' + basketItem.id, basketItem)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

    function updateShippingCountry(basket)
    {
        var id   = basket.shippingCountryId;
        var self = this;
        return ApiService.put('/rest/deliverycountry/' + id, basket)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

    function deleteBasketItem(basketItem)
    {
        var self = this;
        var basketItemId;
        if (typeof basketItem === "number")
        {
            basketItemId = basketItem;
        }
        else
        {
            basketItemId = basketItem.id;
        }

        return ApiService.delete('/rest/basket/items/' + basketItemId)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

})(jQuery);

},{"services/ApiService":42}],44:[function(require,module,exports){
var ApiService = require('services/ApiService');

module.exports = (function($)
{

    var checkout = {};
    var initPromise;

    return {
        init                : init,
        setCheckout         : setCheckout,
        setDeliveryAddressId: setDeliveryAddressId,
        setBillingAddressId : setBillingAddressId,
        setMethodOfPaymentId: setMethodOfPaymentId,
        setShippingCountryId: setShippingCountryId,
        setShippingProfileId: setShippingProfileId
    };

    function init(checkoutData)
    {
        if (!initPromise)
        {
            if (!!checkoutData)
            {
                initPromise = $.Deferred();
                checkout    = checkoutData;
                initPromise.resolve();
            }
            else
            {
                initPromise = ApiService.get("rest/checkout").done(function(response)
                {
                    checkout = response;
                });
            }
        }
        return initPromise;
    }

    function _set(property, value)
    {
        checkout[property] = value;
        return ApiService.post("rest/checkout/", checkout).done(function(response)
        {
            checkout = response;
        });
    }

    function setCheckout(checkoutData)
    {
        var properties = Object.keys(checkoutData);
        for (var i = 0; i < properties.length; i++)
        {
            checkout[properties[i]] = checkoutData[properties[i]];
        }

        return ApiService.post("rest/checkout/", checkout).done(function(response)
        {
            checkout = response;
        });
    }

    function setDeliveryAddressId(deliveryAddressId)
    {
        return _set("deliveryAddressId", deliveryAddressId);
    }

    function setBillingAddressId(billingAddressId)
    {
        return _set("billingAddressId", billingAddressId);
    }

    function setMethodOfPaymentId(methodOfPaymentId)
    {
        return _set("methodOfPaymentId", methodOfPaymentId);
    }

    function setShippingCountryId(shippingCountryId)
    {
        return _set("shippingCountryId", shippingCountryId);
    }

    function setShippingProfileId(shippingProfileId)
    {
        return _set("shippingProfileId", shippingProfileId);
    }

})(jQuery);

},{"services/ApiService":42}],45:[function(require,module,exports){
module.exports = (function($)
{

    return {
        parseShippingCountries: parseShippingCountries,
        parseShippingStates   : parseShippingStates,
        translateCountryNames : translateCountryNames,
        sortCountries         : sortCountries
    };

    function parseShippingCountries(countryData, id)
    {
        var countryList       = JSON.parse(countryData);
        var deliveryCountries = [];

        if (countryList == null)
        {
            return deliveryCountries;
        }

        for (var key in countryList)
        {
            var country     = countryList[key];
            var option      = {id: country.id, name: country.name, locale: country.isoCode2, selected: false};
            option.selected = (id === country.id);
            deliveryCountries.push(option);
        }

        return deliveryCountries;
    }

    function translateCountryNames(countryNameData, countries)
    {
        var countryNames = JSON.parse(countryNameData);

        if (countryNames == null)
        {
            return;
        }
        for (var id in countryNames)
        {
            var name = countryNames[id];
            for (var i = 0, len = countries.length; i < len; i++)
            {
                var country = countries[i];
                if (country.id == id)
                {
                    country.name = name;
                    break;
                }
            }
        }
    }

    function sortCountries(countries)
    {
        countries.sort(function(a, b)
        {
            if (a.name < b.name)
            {
                return -1;
            }
            if (a.name > b.name)
            {
                return 1;
            }
            return 0;
        });
    }

    function parseShippingStates(countryData, countryID)
    {

        var states      = [];
        var countryList = JSON.parse(countryData);
        for (var key in countryList)
        {
            var country = countryList[key];
            if (country.id == countryID)
            {
                states = country.states;
                break;
            }
        }

        return states;
    }

})(jQuery);

},{}],46:[function(require,module,exports){
var ApiService = require('services/ApiService');

module.exports = (function($)
{
    return {
        loadItems: _loadItems
    };

    function _loadItems(categoryID, data, el, callback)
    {
        var url = "/rest/category_items_list/" + categoryID + "/";

        ApiService.get(url, data)
            .done(function(response)
            {
                callback(response);
            }).fail(function(error)
            {
                console.log("error by: ", url, error);
            }
        );
    }
});
},{"services/ApiService":42}],47:[function(require,module,exports){
module.exports = (function($)
{

    var paused  = false;
    var timeout = -1;
    var interval;
    var timeRemaining, timeStart;

    return {
        findModal: findModal
    };

    function findModal(element)
    {
        return new Modal(element);
    }

    function Modal(element)
    {
        var self = this;
        var $bsModal;

        if ($(element).is('.modal'))
        {
            $bsModal = $(element);
        }
        else
        {
            $bsModal = $(element).find('.modal').first();
        }

        return {
            show             : show,
            hide             : hide,
            setTimeout       : setTimeout,
            startTimeout     : startTimeout,
            pauseTimeout     : pauseTimeout,
            continueTimeout  : continueTimeout,
            stopTimeout      : stopTimeout,
            getModalContainer: getModalContainer
        };

        function show()
        {
            $bsModal.modal('show');

            if ($bsModal.timeout > 0)
            {
                startTimeout();
            }

            return self;
        }

        function hide()
        {
            $bsModal.modal('hide');
            return self;
        }

        function getModalContainer()
        {
            return $bsModal;
        }

        function setTimeout(timeout)
        {
            $bsModal.timeout = timeout;

            $bsModal.find('.modal-content').mouseover(function()
            {
                pauseTimeout();
            });

            $bsModal.find('.modal-content').mouseout(function()
            {
                continueTimeout();
            });

            return this;
        }

        function startTimeout()
        {
            timeRemaining = $bsModal.timeout;
            timeStart     = (new Date()).getTime();

            timeout = window.setTimeout(function()
            {
                window.clearInterval(interval);
                hide();
            }, $bsModal.timeout);

            $bsModal.find('.timer').text(timeRemaining / 1000);
            interval = window.setInterval(function()
            {
                if (!paused)
                {
                    var secondsRemaining = timeRemaining - (new Date()).getTime() + timeStart;
                    secondsRemaining     = Math.round(secondsRemaining / 1000);
                    $bsModal.find('.timer').text(secondsRemaining);
                }
            }, 1000);
        }

        function pauseTimeout()
        {
            paused = true;
            timeRemaining -= (new Date()).getTime() - timeStart;
            window.clearTimeout(timeout);
        }

        function continueTimeout()
        {
            paused    = false;
            timeStart = (new Date()).getTime();
            timeout   = window.setTimeout(function()
            {
                hide();
                window.clearInterval(interval);
            }, timeRemaining);
        }

        function stopTimeout()
        {
            window.clearTimeout(timeout);
            window.clearInterval(interval);
        }
    }
})(jQuery);

},{}],48:[function(require,module,exports){
module.exports = (function($)
{
    var options = {
        symbol   : "EUR",
        decimal  : ",",
        thousand : ".",
        precision: 2,
        right    : true
    };

    return {
        formatMonetary: formatMonetary,
        initOptions   : initOptions
    };

    function initOptions(number_decimals, separator_decimal, separator_thousands, right, currency)
    {
        var getSymbolFromCurrency = require('currency-symbol-map').getSymbolFromCurrency;
        var symbol                = getSymbolFromCurrency(currency);

        if (right == "true")
        {
            right  = true;
            symbol = " " + symbol;
        }
        else
        {
            right = false;
        }

        this.options = {
            symbol   : symbol,
            decimal  : separator_decimal,
            thousand : separator_thousands,
            precision: parseFloat(number_decimals),
            right    : right
        };
    }

    function formatMonetary(price, currency)
    {
        if (isNaN(price))
        {
            return price + " " + currency;
        }
        else
        {
            price = parseFloat(price);
        }

        var result = formatNumber(price, this.options.precision, this.options.decimal, this.options.thousand);

        if (this.options.right)
        {
            result += this.options.symbol;
        }
        else
        {
            result = this.options.symbol + result;
        }
        return result;
    }

    function formatNumber(price, p, d, t)
    {

        p = isNaN(p = Math.abs(p)) ? 2 : p,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = price < 0 ? "-" : "",
            i = parseInt(price = Math.abs(+price || 0).toFixed(p)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (p ? d + Math.abs(price - i).toFixed(p).slice(2) : "");
    }

})(jQuery);

},{"currency-symbol-map":55}],49:[function(require,module,exports){
module.exports = (function($)
{

    var notificationCount = 0;
    var notifications     = new NotificationList();

    return {
        log             : _log,
        info            : _info,
        warn            : _warn,
        error           : _error,
        success         : _success,
        getNotifications: getNotifications
    };

    function _log(message, prefix)
    {
        var notification = new Notification(message);

        if (!!App.config.logMessages)
        {
            console.log((prefix || '') + '[' + notification.code + '] ' + notification.message);

            for (var i = 0; i < notification.stackTrace.length; i++)
            {
                _log(notification.stackTrace[i], " + ");
            }
        }

        return notification;
    }

    function _info(message)
    {
        var notification = new Notification(message, 'info');

        if (!!App.config.printInfos)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function _warn(message)
    {
        var notification = new Notification(message, 'warning');

        if (!!App.config.printWarnings)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function _error(message)
    {
        var notification = new Notification(message, 'danger');

        if (!!App.config.printErrors)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function _success(message)
    {
        var notification = new Notification(message, 'success');

        if (!!App.config.printSuccess)
        {
            _printNotification(notification);
        }

        return notification;
    }

    function getNotifications()
    {
        return notifications;
    }

    function _printNotification(notification)
    {
        notifications.add(notification);
        _log(notification);

        return notification;
    }

    function Notification(data, context)
    {
        if (!App.config.printStackTrace)
        {
            data.stackTrace = [];
        }
        var id   = notificationCount++;
        var self = {
            id        : id,
            code      : data.code || 0,
            message   : data.message || data || "",
            context   : context || "info",
            stackTrace: data.stackTrace || [],
            close     : close,
            closeAfter: closeAfter,
            trace     : trace
        };

        return self;

        function close()
        {
            notifications.remove(self);
        }

        function closeAfter(timeout)
        {
            setTimeout(function()
            {
                notifications.remove(self);
            }, timeout);
        }

        function trace(message, code)
        {
            if (!!App.config.printStackTrace)
            {
                self.stackTrace.push({
                    code   : code || 0,
                    message: message
                });
            }
        }
    }

    function NotificationList()
    {
        var elements = [];
        return {
            all   : all,
            add   : add,
            remove: remove
        };

        function all()
        {
            return elements;
        }

        function add(notification)
        {
            elements.push(notification)
        }

        function remove(notification)
        {
            for (var i = 0; i < elements.length; i++)
            {
                if (elements[i].id === notification.id)
                {
                    elements.splice(i, 1);
                    break;
                }
            }
        }
    }

})(jQuery);

},{}],50:[function(require,module,exports){
module.exports = (function($)
{

    var itemsPerPagePrivate = 0;
    var sortModePrivate     = "";

    return {
        itemsPerPage   : itemsPerPagePrivate,
        sortMode       : sortModePrivate,
        setItemsPerPage: setItemsPerPage,
        setSortMode    : setSortMode
    };

    function setItemsPerPage(itemsPerPage)
    {
        this.itemsPerPagePrivate = itemsPerPage;
    }

    function setSortMode(sortMode)
    {
        this.sortModePrivate = sortMode;
    }

})(jQuery);

},{}],51:[function(require,module,exports){
var ApiService = require('services/ApiService');

module.exports = (function( $, global ) {

    var resources = {};
    var queues = {};

    if( !global.registerResource )
    {
        global.registerResource = registerResource;
    }

    if( !global.registerResourceList )
    {
        global.registerResourceList = registerResourceList;
    }

    return {
        registerResource: registerResource,
        registerResourceList: registerResourceList,
        getResource: getResource,
        watch: watch,
        bind: bind
    };

    function registerResource( name, route, initialValue )
    {
        if( !name )
        {
            throw new Error("Cannot register resource. Name is required.");
        }

        if( !route )
        {
            throw new Error("Cannot register resource. Route is required.");
        }

        if( resources.hasOwnProperty( name ) )
        {
            throw new Error("Resource '" + name + "' already exists." );
        }

        var data;
        try
        {
            data = $.parseJSON( initialValue );
        }
        catch( e )
        {
            data = initialValue;
        }

        resources[name] = new Resource( route, data );
    }

    function registerResourceList( name, route, initialValue )
    {
        if( !name )
        {
            throw new Error("Cannot register resource. Name is required.");
        }

        if( !route )
        {
            throw new Error("Cannot register resource. Route is required.");
        }

        if( resources.hasOwnProperty( name ) )
        {
            throw new Error("Resource '" + name + "' already exists." );
        }

        var data;
        try
        {
            data = $.parseJSON( initialValue );
        }
        catch( e )
        {
            data = initialValue;
        }

        resources[name] = new ResourceList( route, data );
    }

    function getResource( name )
    {
        if( !resources[name] )
        {
            throw new Error("Unkown resource: " + name );
        }

        return resources[name];
    }

    function watch( name, callback )
    {
        getResource( name ).watch( callback );
    }

    function bind( name, vue, property )
    {
        property = property || name;
        getResource( name ).bind( vue, property );
    }

    function Observable()
    {
        var _value;
        var _watchers = [];

        return {
            get value()
            {
                return _value;
            },
            set value( newValue )
            {
                for( var i = 0; i < _watchers.length; i++ )
                {
                    var watcher = _watchers[i];
                    watcher.apply( null, [newValue, _value] );
                }
                _value = newValue;
            },
            watch: function( cb )
            {
                _watchers.push( cb );
            }
        }
    }

    function Resource( url, initialValue )
    {
        var data = new Observable();
        var ready = false;

        if( !!initialValue )
        {
            data.value = initialValue;
            ready = true;
        }
        else
        {
            ApiService
                .get( url )
                .done( function( response ) {
                    data.value = response;
                    ready = true;
                } );
        }

        return {
            watch: watch,
            bind: bind,
            val: val,
            set: set
        };

        function watch( cb )
        {
            if( typeof cb !== "function" )
            {
                throw new Error( "Callback expected but got '" + (typeof cb) + "'.");
            }
            data.watch( cb );
            if( ready )
            {
                cb.apply( null, [data.value, null] );
            }
        }

        function bind( vue, property )
        {
            if( !vue )
            {
                throw new Error( "Vue instance not set." );
            }

            if( !property )
            {
                throw new Error( "Cannot bind undefined property." );
            }

            watch( function( newValue ) {
                vue.$set( property, newValue );
            } );
        }

        function val()
        {
            return data.value;
        }

        function set( value )
        {
            return ApiService
                .put( url, value )
                .done( function( response ) {
                    data.value = response;
                } );
        }
    }

    function ResourceList( url, initialValue )
    {
        var data = new Observable();
        var ready = false;

        if( url.charAt( url.length - 1 ) !== "/" )
        {
            url += "/";
        }

        if( !!initialValue )
        {
            data.value = initialValue;
            ready = true;
        }
        else
        {
            ApiService
                .get( url )
                .done( function( response ) {
                    data.value = response;
                    ready = true;
                } );
        }

        return {
            watch: watch,
            bind: bind,
            val: val,
            set: set
        };

        function watch( cb )
        {
            if( typeof cb !== "function" )
            {
                throw new Error( "Callback expected but got '" + (typeof cb) + "'.");
            }
            data.watch( cb );

            if( ready )
            {
                cb.apply( null, [data.value, null] );
            }
        }

        function bind( vue, property )
        {
            if( !vue )
            {
                throw new Error( "Vue instance not set." );
            }

            if( !property )
            {
                throw new Error( "Cannot bind undefined property." );
            }

            watch( function( newValue ) {
                vue.$set( property, newValue );
            } );
        }

        function val()
        {
            return data.value;
        }

        function set( key, value )
        {
            return ApiService
                .put( url + key , value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        function push( value )
        {
            return ApiService
                .post( url, value )
                .done( function( response ) {
                    data.value = response;
                } );
        }

        function remove( key )
        {
            return ApiService
                .delete( url + key )
                .done( function( response ) {
                    data.value = response;
                } );
        }
    }

})( jQuery, window );
},{"services/ApiService":42}],52:[function(require,module,exports){
module.exports = (function($)
{

    var $form;

    return {
        validate         : _validate,
        getInvalidFields : _getInvalidFields,
        markInvalidFields: _markInvalidFields
    };

    function _validate(form)
    {
        var deferred      = $.Deferred();
        var invalidFields = _getInvalidFields(form);
        if (invalidFields.length > 0)
        {
            deferred.rejectWith(form, [invalidFields]);
        }
        else
        {
            deferred.resolveWith(form);
        }

        return deferred;
    }

    function _getInvalidFields(form)
    {
        $form                   = $(form);
        var invalidFormControls = [];

        $form.find('[data-validate]').each(function(i, elem)
        {

            if (!_validateElement($(elem)))
            {
                invalidFormControls.push(elem);
            }
        });

        return invalidFormControls;
    }

    function _markInvalidFields(fields, errorClass)
    {
        errorClass = errorClass || 'has-error';

        $(fields).each(function(i, elem)
        {
            var $elem = $(elem);
            $elem.addClass(errorClass);
            _findFormControls($elem).on('click.removeErrorClass keyup.removeErrorClass change.removeErrorClass', function()
            {
                if (_validateElement($elem))
                {
                    $elem.removeClass(errorClass);
                    if ($elem.is('[type="radio"], [type="checkbox"]'))
                    {
                        var groupName = $elem.attr('name');
                        $('.' + errorClass + '[name="' + groupName + '"]').removeClass(errorClass);
                    }
                    _findFormControls($elem).off('click.removeErrorClass keyup.removeErrorClass change.removeErrorClass');
                }
            });
        });
    }

    function _validateElement(elem)
    {
        var $elem          = $(elem);
        var validationKeys = $elem.attr('data-validate').split('|').map(function(i)
            {
                return i.trim();
            }) || ["text"];
        var hasError       = false;

        _findFormControls($elem).each(function(i, formControl)
        {
            var $formControl  = $(formControl);
            var validationKey = validationKeys[i] || validationKeys[0];

            if (!_isActive($formControl))
            {
                // continue loop
                return true;
            }

            if ($formControl.is('[type="checkbox"], [type="radio"]'))
            {

                if (!_validateGroup($formControl, validationKey))
                {
                    hasError = true;
                }
                return true;
            }

            if ($formControl.is('select'))
            {
                if (!_validateSelect($formControl, validationKey))
                {
                    hasError = true;
                }
                return true;
            }

            if (!_validateInput($formControl, validationKey))
            {
                hasError = true;
            }

        });

        return !hasError;
    }

    function _validateGroup($formControl, validationKey)
    {
        var groupName = $formControl.attr('name');
        var $group    = $form.find('[name="' + groupName + '"]');
        var range     = _eval(validationKey) || {min: 1, max: 1};
        var checked   = $group.filter(':checked').length;

        return checked >= range.min && checked <= range.max;

    }

    function _validateSelect($formControl, validationKey)
    {
        return $.trim($formControl.val()) !== validationKey;
    }

    function _validateInput($formControl, validationKey)
    {
        switch (validationKey)
        {
            case 'text':
                return _hasValue($formControl);
            case 'mail':
                var mailRegExp = /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
                return _hasValue($formControl) && mailRegExp.test($formControl.val());
            case 'number':
                return _hasValue($formControl) && $.isNumeric($.trim($formControl.val()));
            case 'ref':
                return _compareRef($.trim($formControl.val()), $.trim($formControl.attr('data-validate-ref')));
            case 'regex':
                var ref   = $formControl.attr('data-validate-ref');
                var regex = ref.startsWith("/") ? _eval(ref) : new RegExp(ref);
                return _hasValue($formControl) && regex.test($.trim($formControl.val()));
            default:
                console.error('Form validation error: unknown validation property: "' + validationKey + '"');
                return true;
        }
    }

    function _hasValue($formControl)
    {
        return $.trim($formControl.val()).length > 0;
    }

    function _compareRef(value, ref)
    {
        if ($(ref).length > 0)
        {
            ref = $.trim($(ref).val());
        }

        return value === ref;
    }

    function _findFormControls($elem)
    {
        if ($elem.is('input, select, textarea'))
        {
            return $elem;
        }

        return $elem.find('input, select, textarea');
    }

    function _isActive($elem)
    {
        return $elem.is(':visible') && $elem.is(':enabled');
    }

    function _eval(input)
    {
        return (new Function("return " + input))();
    }

})(jQuery);

},{}],53:[function(require,module,exports){
module.exports = (function($)
{

    var cache = {};

    return {
        addToCache  : _addToCache,
        getFromCache: _getFromCache
    };

    function _addToCache(itemId, variationId, html)
    {
        var variationHTML = {'html': html};

        if (cache[itemId] === undefined)
        {
            cache[itemId] = {};
        }

        cache[itemId][variationId] = variationHTML;
    }

    function _getFromCache(itemId, variationId)
    {
        for (var cachedItemId in cache)
        {
            if (cachedItemId == itemId)
            {
                for (var cachedVariationId in cache[itemId])
                {
                    if (cachedVariationId == variationId)
                    {
                        return cache[itemId][variationId].html;
                    }
                }
            }
        }

        return undefined;
    }

})(jQuery);

},{}],54:[function(require,module,exports){
module.exports = (function($)
{

    var overlay = {
        count    : 0,
        isVisible: false
    };

    return {
        getOverlay    : getOverlay,
        showWaitScreen: showWaitScreen,
        hideWaitScreen: hideWaitScreen
    };

    function getOverlay()
    {
        return overlay;
    }

    function showWaitScreen()
    {
        overlay.count = overlay.count || 0;
        overlay.count++;
        overlay.isVisible = true;
    }

    function hideWaitScreen(force)
    {
        overlay.count = overlay.count || 0;
        if (overlay.count > 0)
        {
            overlay.count--;
        }

        if (!!force)
        {
            overlay.count = 0;
        }

        if (overlay.count <= 0)
        {
            overlay.count   = 0;
            overlay.visible = false;
        }

    }

})(jQuery);

},{}],55:[function(require,module,exports){
var currencySymbolMap = require('./map');

var symbolCurrencyMap = {};
for (var key in currencySymbolMap) {
  if (currencySymbolMap.hasOwnProperty(key)) {
    var currency = key;
    var symbol = currencySymbolMap[currency];
    symbolCurrencyMap[symbol] = currency;
  }
}

function getSymbolFromCurrency(currencyCode) {
  if (currencySymbolMap.hasOwnProperty(currencyCode)) {
    return currencySymbolMap[currencyCode];
  } else {
    return undefined;
  }
}

function getCurrencyFromSymbol(symbol) {
  if (symbolCurrencyMap.hasOwnProperty(symbol)) {
    return symbolCurrencyMap[symbol];
  } else {
    return undefined;
  }
}

function getSymbol(currencyCode) {
  //Deprecated
  var symbol = getSymbolFromCurrency(currencyCode);
  return symbol !== undefined ? symbol : '?';
}

module.exports = getSymbol; //Backward compatibility
module.exports.getSymbolFromCurrency = getSymbolFromCurrency;
module.exports.getCurrencyFromSymbol = getCurrencyFromSymbol;
module.exports.symbolCurrencyMap = symbolCurrencyMap;
module.exports.currencySymbolMap = currencySymbolMap;

},{"./map":56}],56:[function(require,module,exports){
module.exports =
{ "ALL": "L"
, "AFN": "؋"
, "ARS": "$"
, "AWG": "ƒ"
, "AUD": "$"
, "AZN": "₼"
, "BSD": "$"
, "BBD": "$"
, "BYR": "p."
, "BZD": "BZ$"
, "BMD": "$"
, "BOB": "Bs."
, "BAM": "KM"
, "BWP": "P"
, "BGN": "лв"
, "BRL": "R$"
, "BND": "$"
, "KHR": "៛"
, "CAD": "$"
, "KYD": "$"
, "CLP": "$"
, "CNY": "¥"
, "COP": "$"
, "CRC": "₡"
, "HRK": "kn"
, "CUP": "₱"
, "CZK": "Kč"
, "DKK": "kr"
, "DOP": "RD$"
, "XCD": "$"
, "EGP": "£"
, "SVC": "$"
, "EEK": "kr"
, "EUR": "€"
, "FKP": "£"
, "FJD": "$"
, "GHC": "₵"
, "GIP": "£"
, "GTQ": "Q"
, "GGP": "£"
, "GYD": "$"
, "HNL": "L"
, "HKD": "$"
, "HUF": "Ft"
, "ISK": "kr"
, "INR": "₹"
, "IDR": "Rp"
, "IRR": "﷼"
, "IMP": "£"
, "ILS": "₪"
, "JMD": "J$"
, "JPY": "¥"
, "JEP": "£"
, "KES": "KSh"
, "KZT": "лв"
, "KPW": "₩"
, "KRW": "₩"
, "KGS": "лв"
, "LAK": "₭"
, "LVL": "Ls"
, "LBP": "£"
, "LRD": "$"
, "LTL": "Lt"
, "MKD": "ден"
, "MYR": "RM"
, "MUR": "₨"
, "MXN": "$"
, "MNT": "₮"
, "MZN": "MT"
, "NAD": "$"
, "NPR": "₨"
, "ANG": "ƒ"
, "NZD": "$"
, "NIO": "C$"
, "NGN": "₦"
, "NOK": "kr"
, "OMR": "﷼"
, "PKR": "₨"
, "PAB": "B/."
, "PYG": "Gs"
, "PEN": "S/."
, "PHP": "₱"
, "PLN": "zł"
, "QAR": "﷼"
, "RON": "lei"
, "RUB": "₽"
, "SHP": "£"
, "SAR": "﷼"
, "RSD": "Дин."
, "SCR": "₨"
, "SGD": "$"
, "SBD": "$"
, "SOS": "S"
, "ZAR": "R"
, "LKR": "₨"
, "SEK": "kr"
, "CHF": "CHF"
, "SRD": "$"
, "SYP": "£"
, "TZS": "TSh"
, "TWD": "NT$"
, "THB": "฿"
, "TTD": "TT$"
, "TRY": ""
, "TRL": "₤"
, "TVD": "$"
, "UGX": "USh"
, "UAH": "₴"
, "GBP": "£"
, "USD": "$"
, "UYU": "$U"
, "UZS": "лв"
, "VEF": "Bs"
, "VND": "₫"
, "YER": "﷼"
, "ZWD": "Z$"
}

},{}],57:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.infiniteScroll = global.infiniteScroll || {})));
}(this, function (exports) { 'use strict';

  var throttle = function throttle(fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line

    var execute = function execute() {
      fn.apply(context, args);
      lastExec = now;
    };

    return function () {
      context = this;
      args = arguments;

      now = Date.now();

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (lastExec) {
        var diff = delay - (now - lastExec);
        if (diff < 0) {
          execute();
        } else {
          timer = setTimeout(function () {
            execute();
          }, diff);
        }
      } else {
        execute();
      }
    };
  };

  var getScrollTop = function getScrollTop(element) {
    if (element === window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }

    return element.scrollTop;
  };

  var getComputedStyle = document.defaultView.getComputedStyle;

  var getScrollEventTarget = function getScrollEventTarget(element) {
    var currentNode = element;
    // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
      var overflowY = getComputedStyle(currentNode).overflowY;
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return window;
  };

  var getVisibleHeight = function getVisibleHeight(element) {
    if (element === window) {
      return document.documentElement.clientHeight;
    }

    return element.clientHeight;
  };

  var getElementTop = function getElementTop(element) {
    if (element === window) {
      return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
  };

  var isAttached = function isAttached(element) {
    var currentNode = element.parentNode;
    while (currentNode) {
      if (currentNode.tagName === 'HTML') {
        return true;
      }
      if (currentNode.nodeType === 11) {
        return false;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  };

  var infiniteScroll = {
    doBind: function doBind() {
      if (this.binded) return; // eslint-disable-line
      this.binded = true;

      var directive = this;
      var element = directive.el;

      directive.scrollEventTarget = getScrollEventTarget(element);
      directive.scrollListener = throttle(directive.doCheck.bind(directive), 200);
      directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

      var disabledExpr = element.getAttribute('infinite-scroll-disabled');
      var disabled = false;

      if (disabledExpr) {
        this.vm.$watch(disabledExpr, function (value) {
          directive.disabled = value;
          if (!value && directive.immediateCheck) {
            directive.doCheck();
          }
        });
        disabled = Boolean(directive.vm.$get(disabledExpr));
      }
      directive.disabled = disabled;

      var distanceExpr = element.getAttribute('infinite-scroll-distance');
      var distance = 0;
      if (distanceExpr) {
        distance = Number(directive.vm.$get(distanceExpr));
        if (isNaN(distance)) {
          distance = 0;
        }
      }
      directive.distance = distance;

      var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
      var immediateCheck = true;
      if (immediateCheckExpr) {
        immediateCheck = Boolean(directive.vm.$get(immediateCheckExpr));
      }
      directive.immediateCheck = immediateCheck;

      if (immediateCheck) {
        directive.doCheck();
      }

      var eventName = element.getAttribute('infinite-scroll-listen-for-event');
      if (eventName) {
        directive.vm.$on(eventName, function () {
          directive.doCheck();
        });
      }
    },

    doCheck: function doCheck(force) {
      var scrollEventTarget = this.scrollEventTarget;
      var element = this.el;
      var distance = this.distance;

      if (force !== true && this.disabled) return; //eslint-disable-line
      var viewportScrollTop = getScrollTop(scrollEventTarget);
      var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

      var shouldTrigger = false;

      if (scrollEventTarget === element) {
        shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
      } else {
        var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

        shouldTrigger = viewportBottom + distance >= elementBottom;
      }

      if (shouldTrigger && this.expression) {
        this.vm.$get(this.expression);
      }
    },

    bind: function bind() {
      var directive = this;
      var element = this.el;

      directive.vm.$on('hook:ready', function () {
        if (isAttached(element)) {
          directive.doBind();
        }
      });

      this.bindTryCount = 0;

      var tryBind = function tryBind() {
        if (directive.bindTryCount > 10) return; //eslint-disable-line
        directive.bindTryCount++;
        if (isAttached(element)) {
          directive.doBind();
        } else {
          setTimeout(tryBind, 50);
        }
      };

      tryBind();
    },

    unbind: function unbind() {
      this.scrollEventTarget.removeEventListener('scroll', this.scrollListener);
    }
  };

  if (window.Vue) {
    window.infiniteScroll = infiniteScroll;
    Vue.use(install);
  }

  function install(Vue) {
    Vue.directive('infiniteScroll', infiniteScroll);
  }

  exports.install = install;
  exports.infiniteScroll = infiniteScroll;

}));
},{}]},{},[2,3,4,5,6,1,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39])


new Vue({
    el: 'body'
});

// Frontend end scripts

(function($, window, document, undefined) {

    function CallistoMain() {

        // Sticky sidebar single item
        if (window.matchMedia('(min-width: 768px)').matches) {
            $(".single-rightside").stick_in_parent({

            });

            $('.single-rightside')
                .on('sticky_kit:bottom', function(e) {
                    $(this).parent().css('position', 'static');
                })
                .on('sticky_kit:unbottom', function(e) {
                    $(this).parent().css('position', 'relative');
                });
        }

        var sync1 = $("#single-big-image");
        var sync2 = $("#single-carousel");

        sync1.owlCarousel({
            singleItem: true,
            slideSpeed: 1000,
            navigation: true,
            navigationText: [
                "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
            ],
            pagination: false,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
        });

        sync2.owlCarousel({
            items: 8,
            itemsDesktop: [1199, 8],
            itemsDesktopSmall: [979, 8],
            itemsTablet: [768, 6],
            itemsMobile: [479, 4],
            navigation: true,
            navigationText: [
                "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
            ],
            pagination: false,
            responsiveRefreshRate: 100,
            afterInit: function(el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        function syncPosition(el) {
            var current = this.currentItem;
            $("#single-carousel")
                .find(".owl-item")
                .removeClass("synced")
                .eq(current)
                .addClass("synced")
            if ($("#single-carousel").data("owlCarousel") !== undefined) {
                center(current)
            }
        }

        $("#single-carousel").on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }

            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num === sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1)
            }

        }

        var $toggleBasketPreview = $('#toggleBasketPreview, #closeBasketPreview');

        $toggleBasketPreview.on('click', function(evt) {
            evt.preventDefault();
            $('body').toggleClass('open-right');
        });

        var $toggleListView = $('.toggle-list-view');

        $toggleListView.on('click', function(evt) {
            evt.preventDefault();

            //toggle it's own state
            $toggleListView.toggleClass('grid');

            //toggle internal style of thumbs
            $('.product-list, .cmp-product-thumb').toggleClass('grid');
        });

        $('#mainNavbarCollapse').collapse('hide');

        //Add click listener outside the navigation to close it
        $('#mainNavbarCollapse').on('show.bs.collapse', function() {
            $('.main').one('click', closeNav);
        })

        $('#mainNavbarCollapse').on('hide.bs.collapse', function() {
            $('.main').off('click', closeNav)
        })

        function closeNav() {
            $('#mainNavbarCollapse').collapse('hide');
        }

    }

    window.CallistoMain = CallistoMain;

    new CallistoMain();

})(jQuery, window, document);

//# sourceMappingURL=plugin-callisto-app.js.map
