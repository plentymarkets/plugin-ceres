<template>
  	<div>
		<div class="popper-handle" ref="handle">
			<slot name="handle">
				<!--Element to trigger popper -->
                <button class="btn btn-icon btn-secondary btn-sm">
                    <i class="fa fa-info"></i>
                </button>
			</slot>
		</div>

		<div ref="node" class="popover bs-popover-auto" :class="classNames">
			<h3 class="popover-header">
				<slot name="title">
					<!-- {# Title to display in the popper #} -->
				</slot>
			</h3>
			<div class="popover-body" :class="bodyClass" :style="bodyStyle">
				<slot name="content">
					<!-- {# Content to display in the popper #} -->
				</slot>
			</div>
			<div class="arrow" ref="arrow"></div>
		</div>
	</div>
</template>

<script>
import { isNullOrUndefined } from "../../helper/utils";
import { findParent } from "../../helper/dom";
import { findModal } from "../../services/ModalService";
import Vue from "vue";
import Popper from "popper.js";

export default {
    props: {
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
                findModal(parentModal)
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
}
</script>