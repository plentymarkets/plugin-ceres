const Popper = require("popper.js");

Vue.component("popper", {

    delimiters: ["${", "}"],

    props: {
        template: {
            type: String,
            default: "#vue-popper"
        },
        placement: {
            type: String,
            default: "auto"
        },
        trigger: {
            type: String,
            default: "click"
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
	{
        this.$nextTick(() =>
        {
            const node = this.$refs.node;

            node.parentElement.removeChild(node);
            document.body.appendChild(node);

            this.popper = new Popper(this.$refs.handle, this.$refs.node, {
                placement: this.placement,
                modifiers: {
                    arrow: {
                        element: this.$refs.arrow
                    }
                }
            });
        });

        const handle = this.$refs.handle.firstElementChild || this.$refs.handle;

        if (this.trigger === "focus")
        {
            handle.addEventListener("focus", () =>
            {
                this.showPopper();
            });
            handle.addEventListener("blur", () =>
            {
                this.hidePopper();
            });
        }
        else
        {
            handle.addEventListener(this.trigger, () =>
            {
                this.togglePopper();
            });
        }
    },

    data()
    {
        return {
            isVisible: false,
            popper: null
        };
    },

    methods:
    {
        togglePopper()
		{
            this.isVisible = !this.isVisible;

            this.popper.scheduleUpdate();
        },

        showPopper()
        {
            if (!this.isVisible)
            {
                this.isVisible = true;
                this.popper.scheduleUpdate();
            }
        },

        hidePopper()
        {
            if (this.isVisible)
            {
                this.isVisible = false;
                this.popper.scheduleUpdate();
            }
        }
    }
});
