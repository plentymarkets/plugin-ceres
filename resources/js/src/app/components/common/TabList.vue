<script>
import { isDefined } from "../../helper/utils";

const TabNavItem = {
    
    name: "tab-nav-item",

    render(createElement)
    {
        const anchorAttrs = {
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
                attrs: {role: "tab"},
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

export default {

    name: "tab-list",

    render(createElement)
    {
        const tabListElements = [];
        const tabs = this.getVisibleTabs();

        if (tabs.length > 0)
        {
            const navElements = tabs.map((tab, index) =>
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
            [(this.$slots.default || [])
                .filter(tab => !!tab.componentOptions)]
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
            tabComponents: [],
            tabsHash: ""
        };
    },

    created()
    {
        this.$nextTick(() =>
        {
            // get all child tab components
            this.tabComponents = (this.$slots.default || [])
                .map((vnode) => vnode.componentInstance)
                .filter((entry) => !!entry);
        });
    },

    updated()
    {
        const tabs = this.getVisibleTabs();
        const hash = tabs.map((component) => component._uid).join("_");

        // need to check if visible tabs have been changed after rendering
        if (this.tabsHash !== hash)
        {
            // visible tabs changed => need to re-render component
            this.tabsHash = hash;
            this.$forceUpdate();

            // check for active tab
            if (!tabs.some(tab => tab.active) && tabs.length > 0)
            {
                this.activateTab(tabs[0]);
            }
        }
    },

    methods:
    {
        getVisibleTabs()
        {
            // filter visible tabs
            return this.tabComponents.filter((tab) =>
            {
                return isDefined(tab) &&
                    isDefined(tab.$slots.default) &&
                    (this.renderEmpty || this.filterContent(tab));
            });
        },

        activateTab(tab)
        {
            const activeTab = this.tabComponents.find(tab => tab.localActive);

            tab.setActive(true);

            if (activeTab && activeTab.setActive && tab !== activeTab)
            {
                activeTab.setActive(false);
            }
        },

        /**
         * Checks if tab content contains text or img or iframe element.
         * @param {*} tab
         */
        filterContent(tab)
        {
            return tab.$el.textContent.trim().length > 0 || tab.$el.querySelector("img, iframe, picture");
        }
    }
}
</script>
