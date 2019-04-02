
Vue.component("tab-item", {

    render(createElement)
    {
        return createElement(
            "div",
            {
                staticClass: "tab-pane",
                class: {
                    active: this.localActive
                },
                attrs: {
                    role: "tabpanel"
                }
            },
            [this.$slots.default]
        );
    },

    props: {
        active:
        {
            type: Boolean,
            default: false
        },
        title:
        {
            type: String,
            default: null
        }
    },

    data()
    {
        return {
            localActive: this.active
        };
    },

    computed: Vuex.mapState({

    }),

    created()
    {

    },

    methods:
    {
        setActive(isActive)
        {
            this.localActive = isActive;
        }
    }
});
