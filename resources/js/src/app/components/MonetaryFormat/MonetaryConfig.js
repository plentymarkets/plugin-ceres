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
