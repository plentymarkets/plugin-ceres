(function ($) {

    var OWL_CONFIG = {
        SINGLE: {
            singleItem: true,
            slideSpeed: 1000,
            navigation: true,
            navigationText: [
                "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
                "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
            ],
            pagination: false,
            responsiveRefreshRate: 200
        },
        PREVIEW: {
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
            responsiveRefreshRate: 100
        }
    };


    var ResourceService = require('services/ResourceService');

    Vue.component('variation-image-list', {

        template: '#vue-variation-image-list',

        data: function()
        {
            return {
                currentVariation: {},
                currentItem: 0
            };
        },

        ready: function()
        {
            ResourceService.watch( "currentVariation", function( newValue ) {
                this.currentVariation = newValue;

                this.initCarousel( this.$els.single, OWL_CONFIG.SINGLE );
                this.initCarousel( this.$els.preview, OWL_CONFIG.PREVIEW );
            }.bind(this) );
        },

        methods:
        {
            initCarousel: function( el, config )
            {
                var self = this;
                config.afterAction = function()
                {
                    // 'this' points to owl carousel instance
                    self.currentItem = this.currentItem;
                };

                var owl = $( el ).data( 'owlCarousel' );
                if( !!owl )
                {
                    owl.destroy();
                }

                Vue.nextTick( function() {
                    $( el ).owlCarousel( config );
                }.bind( this ) );
            },

            goTo: function( index )
            {
                var owl = $( this.$els.single ).data( 'owlCarousel' );
                if( !!owl )
                {
                    owl.goTo( index );
                }
            }
        }

    });

})( jQuery );