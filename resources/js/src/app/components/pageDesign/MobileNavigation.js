import { MediaQueryHelper } from "../../helper/MediaQueryHelper";
import { isNullOrUndefined, isDefined } from "../../helper/utils";
import Vue from "vue";
import { mapState } from "vuex";

Vue.component("mobile-navigation", {

    props: {
        template: {
            default: "#vue-mobile-navigation",
            type: String
        },
        initialCategory: Object,
        breakpoints: {
            type: Array,
            default: () => ["xs", "sm", "md"]
        },
        includeLanguage: Boolean
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
            isNavigationInitialized: false,
            selectedCategory: null
        };
    },

    computed:
    {
        breadcrumbs()
        {
            const breadcrumbs = [];
            let container = this.useFirstContainer ? this.dataContainer2 : this.dataContainer1;

            while (container && container.parent && Object.keys(container.parent).length)
            {
                breadcrumbs.unshift(
                    {
                        name: container.parent.details[0].name,
                        parent: container.parent || null
                    });

                container = container.parent;
            }

            return breadcrumbs;
        },

        ...mapState({
            navigationTree: state => state.navigation.tree
        })
    },

    created()
    {
        this.addEventListener();

        this.$store.commit("setCurrentCategory", this.initialCategory);
    },

    methods:
    {
        addEventListener()
        {
            const QueryHelper = new MediaQueryHelper();
            const breakpoint = QueryHelper.getCurrentBreakpoint();

            QueryHelper.addFunction(this.loadInitialTree, this.breakpoints);

            if (this.breakpoints.includes(breakpoint))
            {
                this.loadInitialTree();
            }
        },

        loadInitialTree()
        {
            if (this.navigationTree.length <= 0)
            {
                const categoryId = this.initialCategory && this.initialCategory.id ? this.initialCategory.id : null;

                this.$store.dispatch("loadPartialNavigationTree", categoryId)
                    .then(response =>
                    {
                        this.$store.commit("setNavigationTree", response);
                        this.initNavigation();
                    });
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
                if (currentCategory.children)
                {
                    this.slideTo(currentCategory);
                }
                else if (currentCategory.parent)
                {
                    this.slideTo(currentCategory.parent);
                }
            }
        },

        slideTo(category, back)
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

        closeNavigation()
        {
            document.querySelector(".mobile-navigation").classList.remove("open");
            document.querySelector("body").classList.remove("menu-is-visible");
        },

        getCategoryUrl(url)
        {
            const trailingSlash = url[0] === "/" ? "" : "/";
            const prefix = this.includeLanguage ? `/${App.language}${trailingSlash}` : "";

            return prefix + url;
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
