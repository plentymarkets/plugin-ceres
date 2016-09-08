var ApiService = require( 'services/ApiService' );

Vue.directive( 'place-order', function()
{
    var $elem = $( this.el );
    $elem.click( function( e )
    {
        e.preventDefault();

        ApiService.post( "/rest/order" )
            .done(function( response )
            {
                var target = $elem.attr( 'href' ) || $elem.parents( 'form' ).attr( 'action' );
                window.location.assign( target );
            });

    });

});
