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
