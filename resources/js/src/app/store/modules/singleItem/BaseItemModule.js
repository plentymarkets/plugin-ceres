import ApiService from "../../../services/ApiService";
import ItemModule from "./ItemModule";
import VariationSelectModule from "../VariationSelectModule";

const state =
    {
        isSetLoading: false,
        previewItemId: 0,
        setComponentIds: []
    };

const mutations =
    {
        setIsSetLoading(state, isSetLoading)
        {
            state.isSetLoading = isSetLoading;
        },

        setPreviewItemId(state, itemId)
        {
            state.previewItemId = itemId;
        },

        addComponent(state, itemId)
        {
            state.setComponentIds = state.setComponentIds || [];
            state.setComponentIds.push(itemId);
        }
    };

const actions =
    {
        initVariation({ commit, dispatch }, variation)
        {
            // register a nested module for the main item
            dispatch("registerItem", variation.documents[0]);

            // rest call for sets if set comps are set
            const setComponentIds = variation.documents[0].data.setComponentVariationIds;

            if (!App.isShopBuilder && setComponentIds && setComponentIds.length)
            {
                commit("setIsSetLoading", true);

                ApiService.get("/rest/io/variations", { variationIds: setComponentIds, resultFieldTemplate: "SingleItem" })
                    .done(components =>
                    {
                        commit("setIsSetLoading", false);

                        for (const component of components.documents)
                        {
                            const itemId = component.data.item.id;

                            // register a module for every set item
                            dispatch("registerItem", component);
                            commit(`${itemId}/setPleaseSelectVariationId`, itemId);
                            commit("addComponent", itemId);
                        }
                    });
            }
        },

        registerItem({ commit }, item)
        {
            const itemId = item.data.item.id;
            // extend the structur of the object to match the old objects
            const extendedData = { documents: [item] };

            ceresStore.registerModule(["items", itemId], ItemModule);
            ceresStore.registerModule(["items", itemId, "variationSelect"], VariationSelectModule);
            commit(`${itemId}/setVariation`, extendedData);
        }
    };

const getters =
    {
        itemSetTotalPrice(state, getters)
        {
            let totalPrice = 0;

            for (const itemId of state.setComponentIds)
            {
                const price = getters[`${ itemId }/variationTotalPrice`];

                totalPrice += price;
            }

            return totalPrice;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
