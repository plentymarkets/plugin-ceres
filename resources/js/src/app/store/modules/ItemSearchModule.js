import { isNullOrUndefined } from "../../helper/utils";
import ApiService from "../../services/ApiService";
// import Vue from "vue";

const state =
    {
        autocompleteRequest: null,
        autocompleteResult: []
    };

const mutations =
    {
        setAutocompleteRequest(state, request)
        {
            state.autocompleteRequest = request;
        },

        setAutocompleteResult(state, result = [])
        {
            state.autocompleteResult = result;
        }
    };

const actions =
    {
        loadItemSearchAutocomplete({ state, commit }, searchString)
        {
            if (!isNullOrUndefined(state.autocompleteRequest) && typeof state.autocompleteRequest.abort === "function")
            {
                state.autocompleteRequest.abort();
            }

            const newRequest = ApiService.get(
                "/rest/io/item/search/autocomplete",
                {
                    template: "Ceres::ItemList.Components.ItemSearch",
                    query: searchString
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
