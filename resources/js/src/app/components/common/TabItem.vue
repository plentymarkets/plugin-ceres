<script>
export default {

    name: "tab-item",

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
        },
        dataBuilderClickable:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            localActive: this.active
        };
    },

    methods:
    {
        setActive(isActive)
        {
            this.localActive = isActive;
        }
    }
}
</script>