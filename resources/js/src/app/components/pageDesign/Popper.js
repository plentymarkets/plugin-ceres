import {isNullOrUndefined}from "../../helper/utils";

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
            if (!isNullOrUndefined(this.$refs.node) && !isNullOrUndefined(this.$refs.handle))
            {
                const node = this.$refs.node;

                node.parentElement.removeChild(node);
                document.body.appendChild(node);

                this.popper = new Popper(this.$refs.handle, node, {
                    placement: this.placement,
                    modifiers: {
                        arrow: {
                            element: this.$refs.arrow
                        }
                    }
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
            }
        });
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
            this.update();
        },

        showPopper()
        {
            if (!this.isVisible)
            {
                this.isVisible = true;
                this.update();
            }
        },

        hidePopper()
        {
            if (this.isVisible)
            {
                this.isVisible = false;
                this.update();
            }
        },

        update()
        {
            if (!isNullOrUndefined(this.popper))
            {
                this.popper.scheduleUpdate();
            }
        }
    }
});
