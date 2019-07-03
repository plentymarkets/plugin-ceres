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
        const tabListElements = [];

        if (this.tabs.length > 0)
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

            tabListElements.push(nav);
        }

        const content = createElement(
            "div",
            {
                staticClass: "tab-content"
            },
            [this.$slots.default]
        );

        tabListElements.push(content);

        return createElement(
            "div",
            {},
            tabListElements
        );
    },

    props: {
        appearance:
        {
            type: String,
            default: "none"
        },
        renderEmpty:
        {
            type: Boolean,
            default: false
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

            return tabComps.filter((tab) =>
            {
                return isDefined(tab) &&
                       isDefined(tab.$slots.default) &&
                       (this.renderEmpty || this.filterContent(tab));
            });
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
        },
        // checks if tab content contains img tag or text.
        filterContent(tab)
        {
            const imgPattern = new RegExp(/<img([\w\W]+?)>/);

            if (imgPattern.test(tab.$el.innerHTML))
            {
                return true;
            }
            if (tab.$el.textContent.trim().length > 0)
            {
                return true;
            }
            return false;
        }
    }
});
