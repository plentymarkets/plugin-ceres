/**
 * Mixing for generating unique keys, that can be similarly created on server and clientside.
 * Collisions are possible in theory, be advised that this is an experimental mixin and may be removed in the future.
 */

import { isNullOrUndefined } from "../helper/utils";

const KEYS = {};

if (typeof document !== "undefined")
{
    document.debug_component_ids = KEYS;
}

export const ComponentIdMixin = {
    created()
    {
        // Root elements, early exit
        if (!this.$options._componentTag && !this.$vnode?.tag)
        {
            return;
        }

        this._cid = "";

        let node = this;

        let prevNode = null;

        while (!isNullOrUndefined(node))
        {
            if (!isNullOrUndefined(prevNode))
            {
                if (hasSiblings(node.$children, prevNode))
                {
                    const occurenceIndex = getOwnOccurenceIndex(node.$children, prevNode);

                    this._cid += occurenceIndex;
                }
            }

            this._cid += "_";

            if (node.$options._componentTag)
            {
                this._cid += node.$options._componentTag;
            }

            prevNode = node;
            node = node.$parent;
        }

        if (!KEYS[this._cid])
        {
            KEYS[this._cid] = 0;
        }

        KEYS[this._cid]++;
    }
};

function hasSiblings(potentialSiblings, node)
{
    for (const potentialSibling of potentialSiblings)
    {
        if (potentialSibling.$options._componentTag === node.$options._componentTag && potentialSibling !== node)
        {
            return true;
        }
    }

    return false;
}

function getOwnOccurenceIndex(potentialSiblings, node)
{
    const siblings = potentialSiblings.filter(potentialSibling => potentialSibling.$options._componentTag === node.$options._componentTag);

    return siblings.indexOf(node);
}
