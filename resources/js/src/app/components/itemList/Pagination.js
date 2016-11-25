Vue.component("pagination", {

    template: "#vue-pagination",

    data: function()
    {
        return {
            page: 1,
            pageMax: 5,
            showFirstPage: true,
            showLastPage: true
        };
    },

    created: function()
    {
    },

    ready: function()
    {
    },

    methods:
    {
        setPage: function(page)
        {
            this.page = page;
            console.log("setPage(" + page + ")");
        }
    }
});
