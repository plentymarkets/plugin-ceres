import Vue from "vue";
import { mapState } from "vuex";

Vue.component("tag-list", {

    props: {
        template:
        {
            type: String,
            default: "#vue-tag-list"
        },
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
        }
    },
    computed: {
        ...mapState({
            tags: state => state.item.variation.documents[0].data.tags
        })
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

                return (result > 186) ? "text-context-dark" : "text-context-light";
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
});
