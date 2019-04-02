import { isDefined } from "../../helper/utils";

const TabNavItem = {
    name: "tab-nav-item",

    render(createElement)
    {
        const anchor = createElement(
            "a",
            {
                staticClass: "nav-link",
                attrs: {
                    role: "tab"
                }
            },
            "Title" + this.tabIndex
        );

        return createElement(
            "li",
            {
                staticClass: "nav-item"
            },
            [anchor]
        );
    },

    props: {
        tab:
        {
            default: null
        },
        tabIndex:
        {
            default: null
        }
    }
};

Vue.component("tab-list", {
    render(createElement)
    {
        const navElements = this.tabs.map((tab, index) =>
        {
            return createElement(
                TabNavItem,
                {
                    props: {
                        tab: tab,
                        tabIndex: index
                    }
                });
        });

        const content = createElement(
            "div",
            {},
            [this.$slots.default]
        );

        return createElement(
            "div",
            {},
            [
                navElements,
                content
            ]
        );
    },

    props: {
    },

    data()
    {
        return {
            tabs: []
        };
    },

    computed: {
    },

    created()
    {
        this.$nextTick(() =>
        {
            this.updateTabs();
        });
    },

    methods:
    {
        getTabs()
        {
            const tabs = (this.$slots.default || []);

            const tabComps = tabs.map(function(vnode)
            {
                return vnode.componentInstance;
            });

            return tabComps.filter(tab => isDefined(tab));
        },

        updateTabs()
        {
            this.tabs = this.getTabs();
        }
    }
});
