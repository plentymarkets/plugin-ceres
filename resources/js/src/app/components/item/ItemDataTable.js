import { get } from "lodash";
import { isNullOrUndefined } from "../../helper/utils";

Vue.component("item-data-table", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-data-table"
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        itemInformation:
        {
            type: Array,
            default: () => []
        },
        isPreview: Boolean
    },

    computed:
    {
        showPlaceholder()
        {
            return this.$refs.tableContent.hasChildNodes() && this.isPreview;
        },
        ...Vuex.mapState({
            currentVariation: state => state.item.variation.documents[0].data
        })
    },

    methods:
    {
        isCheckedAndNotEmpty(path, itemDataAccessor, pathList)
        {
            if (isNullOrUndefined(pathList))
            {
                return path === itemDataAccessor && get(this.currentVariation, path) !== "";
            }
            else
            {
                return pathList.some(element => isNullOrUndefined(get(this.currentVariation, element)) && get(this.currentVariation, element) !== "");
            }
        }
    }
});
