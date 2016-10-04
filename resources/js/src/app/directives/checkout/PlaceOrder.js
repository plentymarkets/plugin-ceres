var ApiService = require( 'services/ApiService' );

Vue.directive( 'place-order', {

    params: ['trigger'],

    bind: function() {
        /**
         * TODO
         */
        $elem.click(function (e) {
            e.preventDefault();

            $elem.on(trigger, function (e) {
                e.preventDefault();
                ApiService.post("/rest/order");
            });
        });
    }
});