import CategoryRendererService from "services/CategoryRendererService";

Vue.component("mobile-navigation", {

    props: [
        "template",
        "categoryBreadcrumbs",
        "navigationTreeData"
    ],

    data()
    {
        return {
            dataContainer1: [],
            dataContainer2: [],
            useFirstContainer: false,
            breadcrumbs: []
        };
    },

    computed: Vuex.mapState({
        navigationTree: state => state.navigation.tree
    }),

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.$store.dispatch("initNavigationTree", this.navigationTreeData);

        // (this.categoryBreadcrumbs && this.categoryBreadcrumbs.length) ? this.categoryBreadcrumbs.pop().id : null)

        this.dataContainer1 = this.navigationTree;
    },

    methods: {
        buildTree(currentArray, parent, currentCategoryId)
        {
            let showChildren = false;

            for (const category of currentArray)
            {
                category.parent = parent;

                // hide category if there is no translation
                if (!category.details[0])
                {
                    category.hideCategory = true;

                    if (parent && parent.children && parent.children.length > 1 && !parent.showChildren)
                    {
                        parent.showChildren = false;
                    }
                }
                else
                {
                    if (parent)
                    {
                        category.url = parent.url + "/" + category.details[0].nameUrl;
                    }
                    else
                    {
                        category.url = "/" + category.details[0].nameUrl;
                    }

                    if (category.details.length && category.details[0].name)
                    {
                        showChildren = true;
                    }

                    if (category.children)
                    {
                        this.buildTree(category.children, category, currentCategoryId);
                    }

                    if (category.id === currentCategoryId)
                    {
                        if (category.children && category.showChildren)
                        {
                            this.slideTo(category.children);
                        }
                        else if (category.parent)
                        {
                            this.slideTo(category.parent.children);
                        }
                    }
                }
            }

            if (parent)
            {
                parent.showChildren = showChildren;
            }
        },

        navigateTo(category)
        {
            if (category.children && category.showChildren)
            {
                this.slideTo(category.children);
            }

            this.closeNavigation();
            CategoryRendererService.renderItems(category, this.navigationTree);
        },

        slideTo(children, back)
        {
            back = !!back;

            if (this.useFirstContainer)
            {
                this.dataContainer1 = children;

                $("#menu-2").trigger("menu-deactivated", {back: back});
                $("#menu-1").trigger("menu-activated", {back: back});
            }
            else
            {
                this.dataContainer2 = children;

                $("#menu-1").trigger("menu-deactivated", {back: back});
                $("#menu-2").trigger("menu-activated", {back: back});
            }

            this.useFirstContainer = !this.useFirstContainer;
            this.buildBreadcrumbs();
        },

        buildBreadcrumbs()
        {
            this.breadcrumbs = [];

            let root = this.useFirstContainer ? this.dataContainer2[0] : this.dataContainer1[0];

            while (root.parent)
            {
                this.breadcrumbs.unshift(
                    {
                        name: root.parent.details[0].name,
                        layer: root.parent ? root.parent.children : this.navigationTree
                    });

                root = root.parent;
            }
        },

        closeNavigation()
        {
            $(".mobile-navigation").removeClass("open");
            $("body").removeClass("menu-is-visible");
        }
    },

    directives:
    {
        menu: {
            bind()
            {
				// add "activated" classes when menu is activated
                $(this.el).on("menu-activated", (event, params) =>
                {
                    $(event.target).addClass("menu-active");
                    $(event.target).addClass(params.back ? "animate-inFromLeft" : "animate-inFromRight");
                });
				// add "deactivated" classes when menu is deactivated
                $(this.el).on("menu-deactivated", (event, params) =>
                {
                    $(event.target).removeClass("menu-active");
                    $(event.target).addClass(params.back ? "animate-outToRight" : "animate-outToLeft");
                });
				// this removes the animation class automatically after the animation has completed
                $(this.el).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", () =>
                {
                    $(".mainmenu").removeClass((index, className) =>
                    {
                        return (className.match(/(^|\s)animate-\S+/g) || []).join(" ");
                    });
                });
            }
        }
    }
});
