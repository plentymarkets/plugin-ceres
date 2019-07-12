Vue.component("mobile-navigation", {

    props: [
        "template",
        "initialCategory"
    ],

    jsonDataFields: [
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

    computed:
    {
        parentCategories()
        {
            const dataContainer = this.useFirstContainer ? this.dataContainer2 : this.dataContainer1;

            if (dataContainer[0] && dataContainer[0].parent)
            {
                if (dataContainer[0].parent.parent)
                {
                    // returns upper level
                    return dataContainer[0].parent.parent.children;
                }

                // return highest level of navigation
                return this.navigationTree;
            }

            return false;
        },

        ...Vuex.mapState({
            navigationTree: state => state.navigation.tree
        })
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initNavigation();
        });
    },

    methods:
    {
        initNavigation()
        {
            this.$store.dispatch("initNavigationTree", this.navigationTreeData);

            if (this.initialCategory && this.initialCategory.id)
            {
                if (this.initialCategory.linklist === "N")
                {
                    this.$store.commit("setCurrentCategory", this.initialCategory);
                }
                else
                {
                    this.$store.dispatch("setCurrentCategoryById", { categoryId: parseInt(this.initialCategory.id) });
                    this.initialSlide(this.$store.state.navigation.currentCategory);
                }
            }

            this.dataContainer1 = this.navigationTree;
        },

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

        slideTo(children, back)
        {
            back = !!back;

            if (this.useFirstContainer)
            {
                this.dataContainer1 = children;

                $("#menu-2").trigger("menu-deactivated", { back: back });
                $("#menu-1").trigger("menu-activated", { back: back });
            }
            else
            {
                this.dataContainer2 = children;

                $("#menu-1").trigger("menu-deactivated", { back: back });
                $("#menu-2").trigger("menu-activated", { back: back });
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
            document.querySelector(".mobile-navigation").classList.remove("open");
            document.querySelector("body").classList.remove("menu-is-visible");
        }
    },

    directives:
    {
        menu: {
            bind(el)
            {
                // add "activated" classes when menu is activated
                $(el).on("menu-activated", (event, params) =>
                {
                    $(event.target).addClass("menu-active");
                    $(event.target).addClass(params.back ? "animate-inFromLeft" : "animate-inFromRight");
                });
                // add "deactivated" classes when menu is deactivated
                $(el).on("menu-deactivated", (event, params) =>
                {
                    $(event.target).removeClass("menu-active");
                    $(event.target).addClass(params.back ? "animate-outToRight" : "animate-outToLeft");
                });
                // this removes the animation class automatically after the animation has completed
                $(el).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", () =>
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
