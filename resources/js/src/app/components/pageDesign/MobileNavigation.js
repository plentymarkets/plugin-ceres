import { MediaQueryHelper } from "../../helper/MediaQueryHelper";
import { isNullOrUndefined, isDefined } from "../../helper/utils";

Vue.component("mobile-navigation", {

    props: {
        template: {
            default: "#vue-mobile-navigation",
            type: String
        },
        initialCategory: Object
    },

    data()
    {
        return {
            dataContainer1: {
                parent: {},
                categories: []
            },
            dataContainer2: {
                parent: {},
                categories: []
            },
            useFirstContainer: false,
            breadcrumbs: [],
            isNavigationInitialized: false,
            selectedCategory: null
        };
    },

    computed:
    {
        parentCategories()
        {
            const dataContainer = this.useFirstContainer ? this.dataContainer2 : this.dataContainer1;

            if (dataContainer.categories.length && dataContainer.parent)
            {
                if (dataContainer.parent.parent)
                {
                    // returns upper level
                    return dataContainer.parent.parent.children;
                }

                // return highest level of navigation
                return this.navigationTree;
            }

            return false;
        },

        currentCategories()
        {
            return this.useFirstContainer ? this.dataContainer2.categories : this.dataContainer1.categories;
        },

        ...Vuex.mapState({
            navigationTree: state => state.navigation.tree
        })
    },

    created()
    {
        this.addEventListener();
    },

    methods:
    {
        addEventListener()
        {
            const categoryId = this.initialCategory && this.initialCategory.id ? this.initialCategory.id : null;
            const QueryHelper = new MediaQueryHelper();
            const breakpoint = QueryHelper.getCurrentBreakpoint();
            const onMobileBreakpoint = () =>
            {
                if (this.navigationTree.length <= 0)
                {
                    this.$store.dispatch("loadPartialNavigationTree", categoryId)
                        .then(response =>
                        {
                            this.$store.commit("setNavigationTree", response);
                            this.initNavigation();
                        });
                }
            };

            QueryHelper.addFunction(onMobileBreakpoint, ["xs", "md", "sm"]);

            if (breakpoint === "md" ||
                breakpoint === "sm" ||
                breakpoint === "xs")
            {
                onMobileBreakpoint();
            }
        },

        initNavigation()
        {
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

            this.dataContainer1.parent = null;
            this.dataContainer1.categories = this.navigationTree;
            this.isNavigationInitialized = true;
        },

        initialSlide(currentCategory)
        {
            if (currentCategory)
            {
                if (currentCategory.children && currentCategory.showChildren)
                {
                    this.slideTo2(currentCategory);
                }
                else if (currentCategory.parent)
                {
                    this.slideTo2(currentCategory.parent);
                }
            }
        },

        // eslint-disable-next-line complexity
        slideTo(children, back)
        {
            console.log("slide to: ", children);

            const clickedCategory = children[0].parent;
            const clickedCategoryId = clickedCategory ? clickedCategory.id : null;

            this.loadPartialTree(clickedCategoryId);

            this.selectedCategory = clickedCategory;
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

        // eslint-disable-next-line complexity
        slideTo2(category, back)
        {
            const children = isDefined(category) ? category.children : this.navigationTree;
            const categoryId = isDefined(category) ? category.id : null;

            this.loadPartialTree(categoryId);
            this.selectedCategory = category;

            if (this.useFirstContainer)
            {
                this.dataContainer1.parent = category;
                this.dataContainer1.categories = children || [];

                $("#menu-2").trigger("menu-deactivated", { back: !!back });
                $("#menu-1").trigger("menu-activated", { back: !!back });
            }
            else
            {
                this.dataContainer2.parent = category;
                this.dataContainer2.categories = children || [];

                $("#menu-1").trigger("menu-deactivated", { back: !!back });
                $("#menu-2").trigger("menu-activated", { back: !!back });
            }

            this.useFirstContainer = !this.useFirstContainer;
            this.buildBreadcrumbs();
        },

        loadPartialTree(categoryId)
        {
            // eslint-disable-next-line eqeqeq
            if (this.selectedCategory != categoryId ||
                (isDefined(this.selectedCategory) && this.selectedCategory.id !== categoryId))
            {
                this.$store.dispatch("loadPartialNavigationTree", categoryId)
                    .then(response =>
                    {
                        if ((isNullOrUndefined(this.selectedCategory) && isNullOrUndefined(categoryId)) ||
                            (isDefined(this.selectedCategory) && this.selectedCategory.id === categoryId))
                        {
                            this.$store.commit("setNavigationTree", response);
                            this.updateDataContainers(categoryId);
                        }
                    });
            }
        },

        updateDataContainers(categoryId)
        {
            const containers = ["dataContainer1", "dataContainer2"];
            const category = this.getCategoryById(categoryId, this.navigationTree);

            for (const container of containers)
            {
                if (category)
                {
                    this[container].parent = category;
                    this[container].categories = category.children;
                }
                else
                {
                    // root level
                    this[container].parent = null;
                    this[container].categories = this.navigationTree;
                }
            }
        },

        getCategoryById(categoryId, tree)
        {
            for (const cat of tree)
            {
                if (categoryId === cat.id)
                {
                    return cat;
                }
                else if (cat.children)
                {
                    const foundCat = this.getCategoryById(categoryId, cat.children);

                    if (foundCat)
                    {
                        return foundCat;
                    }
                }
            }

            return null;
        },

        buildBreadcrumbs()
        {
            this.breadcrumbs = [];

            let root = this.useFirstContainer ? this.dataContainer2.categories : this.dataContainer1.categories;

            while (root && root.parent)
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
