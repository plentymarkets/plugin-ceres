Vue.component("add-item-confirm", {

    props: [
        "basketItem",
        "baseUrl",
        "quantity"
    ],

    template: "#vue-add-item-confirm",

    methods: {

        /**
         * TODO
         * @returns {string}
         */
        getImage: function()
        {
            var path = "";

            for (var i = 0; i < this.basketItem.variationImageList.length; i++)
            {
                if (this.basketItem.variationImageList[i].path !== "")
                {
                    path = this.basketItem.variationImageList[i].path;
                }
            }
            return this.baseUrl + "/" + path;
        }

    }
});
