import { isNullOrUndefined } from "../../helper/utils";
import ApiService from "../../services/ApiService";
import Vue from "vue";

const state = () => ({
    autocompleteRequest: null,
    autocompleteResult: { item: [], category: [], suggestion: [] },
    autocompleteSearchString: "",
    autocompleteTypes: [],
    autocompleteIsLoading: false
});

const mutations =
    {
        setAutocompleteRequest(state, request)
        {
            state.autocompleteRequest = request;
        },

        setAutocompleteResult(state, data)
        {
            Vue.set(state, "autocompleteResult", data);
        },

        setAutocompleteSearchString(state, searchString)
        {
            state.autocompleteSearchString = searchString;
        },

        addAutocompleteType(state, type)
        {
            state.autocompleteTypes.push(type);
        },

        setAutocompleteIsLoading(state, value)
        {
            Vue.set(state, "autocompleteIsLoading", !!value);
        }
    };

const actions =
    {
        loadItemSearchAutocomplete({ state, commit }, searchString)
        {
            commit("setAutocompleteSearchString", searchString);
            commit("setAutocompleteIsLoading", true);

            if (!isNullOrUndefined(state.autocompleteRequest) && typeof state.autocompleteRequest.abort === "function")
            {
                state.autocompleteRequest.abort();
            }

            const newRequest = ApiService.get(
                "/rest/io/item/search/autocomplete",
                {
                    template: "Ceres::ItemList.Components.ItemSearch",
                    query: searchString,
                    types: [...new Set(state.autocompleteTypes)]
                }
            );

            commit("setAutocompleteRequest", newRequest);

            newRequest.done(response =>
            {
                commit("setAutocompleteRequest", null);
                commit("setAutocompleteResult", response);
                commit("setAutocompleteIsLoading", false);
            });
        }
    };

export default
{
    state,
    actions,
    mutations
};
