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
                this.initializePopper();
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
        window.removeEventListener("resize", this.eventListener);
    },

    data()
    {
        return {
            isVisible: false,
            popper: null,
            eventListener: null
        };
    },

    computed:
    {
        classNames()
        {
            // in the shopbuilder we need to hide the popper completely, to hide the dropzone
            const hideClass = App.isShopBuilder ? " d-none" : " hidden";

            return this.popoverClass + (!this.isVisible ? hideClass : "");
        }
    },

    methods:
    {
        initializePopper()
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

            this.addEventListeners();
        },
        
        addEventListeners()
        {
            this.eventListener = window.addEventListener("resize", () =>
            {
            // popper's position needs to be reset after a resize, to prevent the overflow, after switching from landscape to normal
                this.hidePopper();

                setTimeout(() => {
                    this.$refs.node.style.transform = "";
                }, 0);
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
