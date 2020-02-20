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
            Vue.set(state, "autocompleteResult", result);
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
