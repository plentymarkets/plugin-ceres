import ApiService from "../../../services/ApiService";
import ItemModule from "./ItemModule";
import VariationSelectModule from "./VariationSelectModule";

const state =
    {
        isItemSet: false,
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

        setIsItemSet(state, isItemSet)
        {
            state.isItemSet = !!isItemSet;
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
                commit("setIsItemSet", true);
                commit("setIsSetLoading", true);

                ApiService.get("/rest/io/variations", { variationIds: setComponentIds, resultFieldTemplate: "SingleItem", setPriceOnly: true })
                    .done(components =>
                    {
                        commit("setIsSetLoading", false);

                        for (const component of components.documents)
                        {
                            const itemId      = component.data.item.id;
                            const variationId = component.data.variation.id;

                            // register a module for every set item
                            dispatch("registerItem", component);
                            commit(`${itemId}/setPleaseSelectVariationId`, variationId);
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
        },

        itemSetAllVariationSelected(state)
        {
            let allVariationSelected = true;

            for (const itemId of state.setComponentIds)
            {
                const isSelected = state[itemId].variationSelect.isVariationSelected;

                allVariationSelected = allVariationSelected && isSelected;
            }

            return allVariationSelected;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
