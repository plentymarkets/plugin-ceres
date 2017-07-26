Vue.component("mobile-navigation", {

    props: [
        "template",
        "categoryTreeRaw"
    ],

    data()
    {
        return {
            items: [],
            activeItem: null,
            dataContainer1: [],
            dataContainer2: [],
            useFirstContainer: false,
            categoryTree: [],
            breads: []
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.buildTree(this.categoryTreeRaw);

        this.dataContainer1 = this.categoryTree;
    },

    ready()
    {
        const el = this.$el;

        $(el).on("open", () =>
        {
            $(el).fadeIn();
        });

        $(el).on("close", () =>
        {
            $(el).fadeOut();
        });

        // $(document).keyup(event =>
        // {
        //     if (event.keyCode == 27)
        //     {
        //         // escape key
        //         $(el).trigger("close");
        //     }
        // });

        this.addItem("home", "HOME");

        this.addItem("sub-and-link", "sub-and-link", "home", "/foobar");
        this.addItem("item1", "item1", "sub-and-link", "/item1");
        this.addItem("item2", "item2", "sub-and-link", "/item2");

        this.addItem("sub-only", "sub-only", "home");
        this.addItem("subitem1", "subitem1", "sub-only", "/item1");
        this.addItem("subitem2", "subitem2", "sub-only", "/item2");

        this.addItem("subsub1", "subsub1", "subitem1", "/subsub1");
        this.addItem("subsub2", "subsub2", "subitem1", "/subsub2");

        this.addItem("link-only", "link-only", "home", "/link");

        // REFACTOR!!!
        /*
            - setze das aktuelle auf aktiv
            - trigger menu-activated auf das aktuelle
        */
        setTimeout(() =>
        {
            $(".menu-home").trigger("menu-activated", {back: false});
            this.activeItem = "home";
        }, 1000);
        // ./REFACTOR
    },

    methods: {
        // NEW
        buildBreads()
        {
            this.breads = [];

            const breads = [];
            let root = this.useFirstContainer ? this.dataContainer2[0] : this.dataContainer1[0];

            while (root.parent)
            {
                breads.unshift(
                    {
                        name: root.parent.name,
                        layer: root.parent ? root.parent.children : this.categoryTree
                    });

                root = root.parent;
            }

            this.breads = breads;
        },

        buildTree(currentArray, parent)
        {
            for (const category of currentArray)
            {
                const newCategory =
                    {
                        id: category.id,
                        level: category.level,
                        name: category.details[0].name,
                        url: parent ? parent.url + "/" + category.details[0].nameUrl : "/" + category.details[0].nameUrl,
                        parent: parent,
                        children: []
                    };

                if (parent)
                {
                    parent.children.push(newCategory);
                }
                else
                {
                    this.categoryTree.push(newCategory);
                }

                if (category.children)
                {
                    this.buildTree(category.children, newCategory);
                }
            }
        },

        navigateToNew(children, back)
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
            this.buildBreads();
        },
        // ./NEW
        getItemById(id)
        {
            for (const key in this.items)
            {
                if (this.items[key].id === id)
                {
                    return this.items[key];
                }
            }
            return null;
        },

        itemHasChildren({id: id})
        {
            const items = this.items.filter(item =>
            {
                return item.parent === id;
            });

            return items.length > 0;
        },

        getBreadcrumbItems(itemId)
        {
            const items = [];
            let tmp = this.getItemById(itemId);

            while (tmp)
            {
                items.unshift(tmp);
                tmp = this.getItemById(tmp.parent);
            }

            return items;
        },

        getGroupedMenus()
        {
            const groupedMenus = {};

            for (const key in this.items)
            {
				// skip root item
                if (this.items[key].parent === "-root")
                {
                    continue;
                }
                if (!groupedMenus[this.items[key].parent])
                {
                    groupedMenus[this.items[key].parent] = [];
                }

                groupedMenus[this.items[key].parent].push(this.items[key]);
            }

            return groupedMenus;
        },
        addItem(id, title, parent, url)
        {
            this.items.push({
                id: id,
                title: title,
                parent: parent ? parent : "-root",
                url: url
            });
        },

        directTo(item)
        {
            // REFACTOR!!!
            window.location.href = item.url;
        },

        navigateTo(item, goBack)
        {
            // REFACTOR!!!
            // if (itemHasNoChildren?)
            // {
            //     return;
            // }

            if (this.activeItem)
            {
                $(".menu-" + this.activeItem).trigger("menu-deactivated", {back: !!goBack});
            }

            $(".menu-" + item.id).trigger("menu-activated", {back: !!goBack});

            this.activeItem = item.id;
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
