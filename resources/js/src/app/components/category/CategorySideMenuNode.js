Vue.component("category-side-menu-node", {

    props: [
        "template",
        "node",
        "nodeList",
        "url"
    ],

    data: function()
    {
        return {
            isActive: false
        };
    },

    created: function()
    {
        this.url += "/" + this.node.details[0].nameUrl;

        this.nodeList.push(this.node.id);

        this.$options.template = this.template;

        // when url of this node matches the browser pathname; the tree will be actualized
        if (this.url === window.location.pathname)
        {
            this.sendCategoryHierarchy();
        }
    },

    methods:
    {
        nodeClicked: function()
        {
            this.sendCategoryHierarchy();
        },

        /*
         * triggers the event 'category-node-clicked' upward to all components;
         * is used to tell CategorySideMenu that the tree must be updated
         */
        sendCategoryHierarchy: function()
        {
            this.$dispatch("category-node-activated", {nodeList: this.nodeList, node: this.node});
        }
    },

    events:
    {
        /*
         * listens to the event 'update-nodes' and forward it to all downward components;
         * used to iterate through the children nodes of current instance, to check if the category-node is active
         */
        "update-nodes": function(nodeList)
        {
            this.isActive = nodeList.indexOf(this.node.id) >= 0;

            this.$broadcast("update-nodes", nodeList);
        }
    }
});
