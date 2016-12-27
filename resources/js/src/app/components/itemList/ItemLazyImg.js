Vue.component("item-lazy-img", {

    template: "#vue-item-lazy-img",

    props: [
        "imageUrl"
    ],

    ready: function()
    {
        var self = this;

        setTimeout(function()
        {
            $(self.$els.lazyImg).show().lazyload({
                effect: "fadeIn"
            });
        }, 1);
    }
});
