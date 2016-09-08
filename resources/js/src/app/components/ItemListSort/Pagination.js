var ApiService = require( 'services/ApiService' );
var PaginationService = require( 'services/PaginationService' );

Vue.component( 'item-list-pagination', 
{
    template: '#vue-item-list-pagination',

    props: 
    [
        'paginationPosition',
        'position',
        'itemList',
        'maxCount'
    ],

    data: function()
    {
        return {
            currentPaginationEntry  : 1,
            currentURL              : "",
            numberOfEntries         : 1
        }
    },

    ready: function()
    {
        this.currentPaginationEntry         = this.getQueryStringValue( "page" );
        var url                             = window.location.href;
        this.currentURL                     = url.replace( "&page=" + this.currentPaginationEntry, "" );
        this.currentPaginationEntry         = parseInt( this.currentPaginationEntry ) || 1;

        this.numberOfEntries = this.calculateMaxPages();

        if ( this.currentPaginationEntry < 0 )
        {
            this.currentPaginationEntry = 1;
        }
        else if ( this.currentPaginationEntry > this.numberOfEntries )
        {
            this.currentPaginationEntry = this.numberOfEntries;
        }
    },

    methods: 
    {
        getQueryStringValue: function( key )
        {
            return decodeURI( window.location.search.replace( new RegExp( "^(?:.*[&\\?]" + encodeURI( key ).replace( /[\.\+\*]/g, "\\$&" ) + "(?:\\=([^&]*))?)?.*$", "i" ), "$1" ) );
        },
        
        calculateMaxPages: function()
        {
            var pages           = ( this.maxCount / PaginationService.itemsPerPage );
            var roundedPages    = pages.toString().split( '.' );

            if( roundedPages[1] > 0 )
            {
                roundedPages[0] = parseInt( roundedPages[0] ) + 1;
            }

            return roundedPages[0];
        },

        updateItemCategoryList: function(page)
        {
            if(this.currentURL.split( '?' ).length > 0)
            {
                this.currentURL = this.currentURL.split( '?' )[0];
            }

            var url  = this.currentURL + "?page=" + page + "&items_per_page=" + PaginationService.itemsPerPage;

            window.open( url, "_self" );
        },

        showPagination: function()
        {
            return this.paginationPosition.includes( this.position );
        },

        showFirstPaginationEntry: function()
        {
            var show = true;

            if ( this.currentPaginationEntry <= 2 )
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

            if ( this.currentPaginationEntry < this.numberOfEntries - 1 )
            {
                show = true;
            }

            return show;
        },

        previousPaginationEntry: function()
        {
            var previousPage = this.currentPaginationEntry - 1;

            if ( previousPage <= 1 )
            {
                previousPage = 1;
            }

            return previousPage;
        },

        nextPaginationEntry: function()
        {
            var nextPage = this.currentPaginationEntry + 1;

            if ( nextPage >= this.numberOfEntries )
            {
                nextPage = this.numberOfEntries;
            }

            return nextPage;
        },

        showDotsLeft: function()
        {
            var show = true;

            if ( this.currentPaginationEntry <= 3 )
            {
                show = false;
            }

            return show;
        },

        showDotsRight: function()
        {
            var show     = true;

            if ( this.currentPaginationEntry >= this.numberOfEntries - 2 )
            {
                show = false;
            }

            return show;
        },

        showArrowsLeft: function()
        {
            var show = false;

            if ( this.currentPaginationEntry  > 1 )
            {
                show = true;
            }

            return show;
        },

        showArrowsRight: function()
        {
            var show = true;

            if ( this.currentPaginationEntry  == this.numberOfEntries )
            {
                show = false;
            }

            return show;
        }
    }
} );
