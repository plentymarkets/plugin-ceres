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
