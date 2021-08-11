/**
 * Mixin for reading and writing uids to the components dataset.
 * This mixin is used to synchronize uids between server and client in an ssr environment.
 */

import Vue from "vue";

Vue.mixin({
    created()
    {
        // Root elements, early exit
        if(!this.$options._componentTag && !this?.$vnode?.tag) {
            return;
        }

        this.componentKey = "uid_";

        let node = this;
        let prevNode = undefined;
        while (node !== undefined)
        {
            // Break on root component
            if(node === node.$root)
            {
                //break;
            }

            if(prevNode !== undefined)
            {
                this.componentKey += node.$children.indexOf(prevNode)
                this.componentKey += "_"
            }

            if(node.$options._componentTag) {
                this.componentKey += node.$options._componentTag;
            }

            prevNode = node;
            node = node.$parent;
        }
    }
});
