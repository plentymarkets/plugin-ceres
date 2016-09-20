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
