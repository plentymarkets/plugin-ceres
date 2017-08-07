import CategoryRendererService from "services/CategoryRendererService";
const ResourceService = require("services/ResourceService");

Vue.component("mobile-navigation", {

    props: [
        "template",
        "categoryTree"
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

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        const currentCategory = ResourceService.getResource("breadcrumbs").val();

        this.buildTree(this.categoryTree, null, currentCategory[0] ? currentCategory.pop().id : null);

        this.dataContainer1 = this.categoryTree;
    },

    methods: {
        buildTree(currentArray, parent, currentCategoryId)
        {
            let showChilds = false;

            for (const category of currentArray)
            {
                category.parent = parent;

                if (category.details.length && category.details[0].name)
                {
                    showChilds = true;
                }

                if (category.children)
                {
                    this.buildTree(category.children, category, currentCategoryId);
                }

                if (category.id === currentCategoryId)
                {
                    if (category.children)
                    {
                        this.slideTo(category.children);
                    }
                    else if (category.parent)
                    {
                        this.slideTo(category.parent.children);
                    }
                }
            }

            if (parent)
            {
                parent.showChilds = showChilds;
            }
        },

        navigateTo(category)
        {
            if (category.children)
            {
                this.slideTo(category.children);
            }

            this.closeNavigation();
            CategoryRendererService.renderItems(category, this.categoryTree);
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
                        layer: root.parent ? root.parent.children : this.categoryTree
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
