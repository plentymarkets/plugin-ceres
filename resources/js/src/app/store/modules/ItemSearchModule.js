import { isNullOrUndefined } from "../../helper/utils";
import ApiService from "../../services/ApiService";
import Vue from "vue";

const state =
    {
        autocompleteRequest: null,
        autocompleteResult: [],
        autocompleteSearchString: "",
        // item, category, autocomplete
        autocompleteTypes: new Set()
    };

const mutations =
    {
        setAutocompleteRequest(state, request)
        {
            state.autocompleteRequest = request;
        },

        setAutocompleteResult(state, result = [])
        {
            /**
             * create dummy data for development purpose
             */
            const data = [];
            const itemNameFilter = Vue.options.filters.itemName;
            const itemImagesFilter = Vue.options.filters.itemImages;
            const itemImageFilter = Vue.options.filters.itemImage;
            const itemURLFilter = Vue.options.filters.itemURL;

            for (const item of result)
            {
                data.push({
                    label: itemNameFilter(item.data),
                    image: itemImageFilter(itemImagesFilter(item.data.images, "urlPreview")),
                    url: itemURLFilter(item.data),
                    subtitle: "",
                    count: null
                });
            }
            /**
             * end of dummy data
             */

            Vue.set(state, "autocompleteResult", data);
        },

        setAutocompleteSearchString(state, searchString)
        {
            state.autocompleteSearchString = searchString;
        },

        addAutocompleteType(state, type)
        {
            state.autocompleteTypes.add(type);
        }
    };

const actions =
    {
        loadItemSearchAutocomplete({ state, commit }, searchString)
        {
            commit("setAutocompleteSearchString", searchString);

            if (!isNullOrUndefined(state.autocompleteRequest) && typeof state.autocompleteRequest.abort === "function")
            {
                state.autocompleteRequest.abort();
            }

            const newRequest = ApiService.get(
                "/rest/io/item/search/autocomplete",
                {
                    template: "Ceres::ItemList.Components.ItemSearch",
                    query: searchString,
                    types: [...state.autocompleteTypes]
                }
            );

            commit("setAutocompleteRequest", newRequest);

            newRequest.done(response =>
            {
                commit("setAutocompleteRequest", null);
                commit("setAutocompleteResult", response.documents);
            });
        }
    };

export default
{
    state,
    actions,
    mutations
};
