import { isNullOrUndefined } from "../../helper/utils";
import { findParent } from "../../helper/dom";
import Vue from "vue";
import Popper from "popper.js";

const ModalService        = require("../../services/ModalService");

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
        },
        popoverClass: {
            type: String,
            default: ""
        },
        bodyClass: {
            type: String,
            default: ""
        },
        bodyStyle: {
            type: String,
            default: ""
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (!isNullOrUndefined(this.$refs.node) && !isNullOrUndefined(this.$refs.handle))
            {
                const node = this.$refs.node;

                if (!App.isShopBuilder)
                {
                    node.parentElement.removeChild(node);
                    document.body.appendChild(node);
                }

                this.popper = new Popper(
                    (this.$refs.handle.firstElementChild || this.$refs.handle),
                    node,
                    {
                        placement: this.placement,
                        modifiers: {
                            arrow: {
                                element: this.$refs.arrow
                            }
                        },
                        removeOnDestroy: true
                    }
                );

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

            const parentModal = findParent(this.$el, ".modal");

            if (!isNullOrUndefined(parentModal))
            {
                ModalService.findModal(parentModal)
                    .on("hide.bs.modal", () =>
                    {
                        this.hidePopper();
                    });
            }

        });
    },

    destroyed()
    {
        this.popper.destroy();
    },

    data()
    {
        return {
            isVisible: false,
            popper: null
        };
    },

    computed:
    {
        classNames()
        {
            return this.popoverClass + (!this.isVisible ? " d-none" : "");
        }
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
            this.isVisible = true;
            this.update();
        },

        hidePopper()
        {
            this.isVisible = false;
            this.update();
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
