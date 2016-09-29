var ApiService = require( 'services/ApiService' );

Vue.directive( 'place-order', {

    params: ['trigger'],

    bind: function() {
        var trigger = this.params['trigger'] || 'ready';
        var $elem   = trigger === 'ready' ? $( document ) : $( this.elem );

        $elem.on( trigger, function( e )
        {
            e.preventDefault();
            ApiService.post( "/rest/order" );
        });
    }
});