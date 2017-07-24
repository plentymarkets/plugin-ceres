Vue.component("mobile-navigation", {

    props: [
        "template",
        "detlef"
    ],

    data()
    {
        return {
            items: [],
            activeItem: null
        };
    },

    created()
    {
        this.$options.template = this.template;
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
                    $(".menu").removeClass((index, className) =>
                    {
                        return (className.match(/(^|\s)animate-\S+/g) || []).join(" ");
                    });
                });
            }
        }
    }
});
