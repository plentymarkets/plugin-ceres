Vue.component("mobile-navigation", {

    props: [
        "template",
        "currentCategoryId",
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

        if (this.currentCategoryId)
        {
            this.$store.dispatch("setCurrentCategoryById", {categoryId: this.currentCategoryId});
            this.initialSlide(this.$store.state.navigation.currentCategory);
        }

        this.dataContainer1 = this.navigationTree;
    },

    methods:
    {
        initialSlide(currentCategory)
        {
            if (currentCategory)
            {
                if (currentCategory.children && currentCategory.showChildren)
                {
                    this.slideTo(currentCategory.children);
                }
                else if (currentCategory.parent)
                {
                    this.slideTo(currentCategory.parent.children);
                }
            }
        },

        navigateTo(category)
        {
            this.closeNavigation();

            if (!App.isCategoryView)
            {
                window.open(category.url, "_self");
            }
            else
            {
                this.$store.dispatch("selectCategory", {category});

                if (category.children && category.showChildren)
                {
                    this.slideTo(category.children);
                }
            }
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
