import { isDefined } from "../../helper/utils";

const TabNavItem = {
    name: "tab-nav-item",

    render(createElement)
    {
        const anchorAttrs = {
            role: "tab",
            href: ""
        };

        if (this.tab.dataBuilderClickable)
        {
            anchorAttrs["data-builder-clickable"] = "";
        }

        const anchor = createElement(
            "a",
            {
                staticClass: "nav-link text-appearance",
                class: {
                    active: this.tab.localActive
                },
                attrs: anchorAttrs,
                on: {
                    click: evt =>
                    {
                        evt.preventDefault();
                        this.$emit("click", evt);
                    }
                }
            },
            [this.tab.$slots.title || this.tab.title]
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
            type: Object,
            default: null
        },
        tabIndex:
        {
            type: Number,
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
                    },
                    on: {
                        click: evt =>
                        {
                            if (!tab.localActive)
                            {
                                this.activateTab(tab, evt);
                            }
                        }
                    }
                });
        });

        const nav = createElement(
            "ul",
            {
                staticClass: "nav nav-tabs",
                class: ["widget-" + this.appearance],
                attrs: {
                    role: "tablist"
                }
            },
            [navElements]
        );

        const content = createElement(
            "div",
            {
                staticClass: "tab-content"
            },
            [this.$slots.default]
        );

        return createElement(
            "div",
            {},
            [
                nav,
                content
            ]
        );
    },

    props: {
        appearance:
        {
            type: String,
            default: "none"
        }
    },

    data()
    {
        return {
            tabs: []
        };
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

            return tabComps.filter(tab => isDefined(tab) && isDefined(tab.$slots.default));
        },

        updateTabs()
        {
            this.tabs = this.getTabs();
        },

        activateTab(tab, event)
        {
            const activeTab = this.tabs.find(tab => tab.localActive);

            tab.setActive(true);

            if (tab !== activeTab)
            {
                activeTab.setActive(false);
            }
        }
    }
});
