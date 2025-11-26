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
        
        // Get all tab components and check which should be visible
        const allTabs = this.tabComponents;
        const visibleTabsSet = new Set(
            allTabs.filter(tab => 
                isDefined(tab) && 
                isDefined(tab.$slots.default) && 
                (this.renderEmpty || !this.isHydrated || this.isTabVisible(tab))
            )
        );

        if (allTabs.length > 0)
        {
            // Create nav items for all tabs, but hide empty ones with v-show
            const navElements = allTabs.map((tab, index) =>
            {
                const isVisible = visibleTabsSet.has(tab);
                
                return createElement(
                    TabNavItem,
                    {
                        key: tab._uid,
                        directives: [
                            {
                                name: 'show',
                                value: isVisible
                            }
                        ],
                        props: {
                            tab: tab,
                            tabIndex: index
                        },
                        on: {
                            click: evt =>
                            {
                                if (!tab.localActive && isVisible)
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
            isHydrated: false
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

    mounted()
    {
        // Mark as hydrated after initial mount to enable filtering
        // This prevents hydration mismatch when SSR is enabled
        this.$nextTick(() =>
        {
            this.isHydrated = true;
            this.ensureActiveTab();
        });
    },

    updated()
    {
        // Ensure there's an active tab after DOM updates
        this.$nextTick(() => {
            this.ensureActiveTab();
        });
    },

    methods:
    {
        isTabVisible(tab)
        {
            // Check if tab content contains text or media
            return tab.$el.textContent.trim().length > 0 || 
                   tab.$el.querySelector("img, iframe, picture");
        },

        ensureActiveTab()
        {
            // Get visible tabs
            const visibleTabs = this.tabComponents.filter(tab => 
                isDefined(tab) && 
                isDefined(tab.$slots.default) && 
                (this.renderEmpty || !this.isHydrated || this.isTabVisible(tab))
            );

            // Check if there's an active tab among visible tabs
            const hasActiveVisibleTab = visibleTabs.some(tab => tab.localActive);

            // If no active visible tab, activate the first visible one
            if (!hasActiveVisibleTab && visibleTabs.length > 0)
            {
                this.activateTab(visibleTabs[0]);
            }
        },

        activateTab(tab)
        {
            const activeTab = this.tabComponents.find(tab => tab.localActive);

            tab.setActive(true);

            if (activeTab && activeTab.setActive && tab !== activeTab)
            {
                activeTab.setActive(false);
            }
        }
    }
}
</script>
