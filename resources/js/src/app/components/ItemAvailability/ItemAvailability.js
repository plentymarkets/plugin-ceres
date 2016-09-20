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
