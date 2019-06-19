import { get } from "lodash";
import { isDefined, isNullOrUndefined } from "../../helper/utils";

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
        }
    },

    computed:
    {
        ...Vuex.mapState({
            currentVariation: state => state.item.variation.documents[0].data
        })
    },

    methods:
    {
        isCheckedAndNotEmpty(key, path)
        {
            if (isNullOrUndefined(path))
            {
                return this.itemInformation.includes(key) && get(this.currentVariation, key) !== "";
            }

            let isNotEmpty;

            if (Array.isArray(path))
            {
                path.forEach(element =>
                {
                    if (isNullOrUndefined(get(this.currentVariation, element)) && get(this.currentVariation, element) !== "")
                    {
                        isNotEmpty = true;
                    }
                    else
                    {
                        isNotEmpty = false;
                    }
                });
            }
            else
            {
                isNotEmpty = isDefined(get(this.currentVariation, path)) && get(this.currentVariation, path) !== "";
            }

            return this.itemInformation.includes(key) && isNotEmpty;
        }
    }
});
