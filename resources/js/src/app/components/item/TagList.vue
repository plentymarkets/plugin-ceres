<template>
    <div v-if="tags && tags.length > 0" class="pt-1 pb-1">
        <template v-if="isTagRouteEnabled">
            <a
                v-for="tag in tags"
                :key="tag.id"
                :href="getTagLink(tag)"
                class="badge mr-1"
                :class="[tagAppearance, marginClasses, getTextColorClass(tag.color)]"
                :style="[getStyles(tag), marginInlineStyles]">
                <span>{{ tag.names.name }}</span>
            </a>
        </template>
        <template v-else>
            <span
                v-for="tag in tags"
                :key="tag.id"
                class="badge mr-1"
                :class="[tagAppearance, marginClasses, getTextColorClass(tag.color)]"
                :style="[getStyles(tag), marginInlineStyles]">
                <span>{{ tag.names.name }}</span>
            </span>
        </template>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {

    name: "tag-list",

    props: {
        tagAppearance:
        {
            type: String,
            default: ""
        },
        marginClasses:
        {
            type: String,
            default: ""
        },
        marginInlineStyles:
        {
            type: String,
            default: ""
        },
        enabledRoutes:
        {
            type: Array,
            default: () => []
        }
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed: {
        isTagRouteEnabled()
        {
            return this.enabledRoutes.includes("all") || this.enabledRoutes.includes("tags");
        },

        tags()
        {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];
            return currentVariation && currentVariation.tags;
        }
    },

    methods:
    {
        getTextColorClass(bgColor)
        {
            if (!bgColor)return "badge-primary";
            const color = (bgColor.charAt(0) === "#") ? bgColor.substring(1, 7) : bgColor;
            const red = parseInt(color.substring(0, 2), 16);
            const green = parseInt(color.substring(2, 4), 16);
            const blue = parseInt(color.substring(4, 6), 16);
            const result = (red * 0.299) + (green * 0.587) + (blue * 0.114);

            return (result > 186) ? "text-dark" : "text-light";
        },
        getStyles(tag)
        {
            if (tag.color)
            {
                return {
                    backgroundColor: tag.color
                };
            }
            return {};
        },
        getTagLink(tag)
        {
            return "/" + encodeURIComponent(tag.names.name.toLowerCase()) + "_t" + tag.id;
        }
    }
}
</script>
