import ApiService from "../../../services/ApiService";
import ItemModule from "./ItemModule";
import VariationSelectModule from "./VariationSelectModule";

const state =
    {
        isItemSet: false,
        itemSetId: 0,
        isSetLoading: false,
        isAddToBasketLoading: 0,
        previewItemId: 0,
        setComponentIds: [],
        mainItemId: null
    };

const mutations =
    {
        setIsSetLoading(state, isSetLoading)
        {
            state.isSetLoading = isSetLoading;
        },

        setIsAddToBasketLoading(state, isAddToBasketLoading)
        {
            state.isAddToBasketLoading = isAddToBasketLoading;
        },

        setIsItemSet(state, isItemSet)
        {
            state.isItemSet = !!isItemSet;
        },

        setItemSetId(state, itemSetId)
        {
            state.itemSetId = itemSetId;
        },

        setPreviewItemId(state, itemId)
        {
            state.previewItemId = itemId;
        },

        addComponent(state, itemId)
        {
            state.setComponentIds = state.setComponentIds || [];
            state.setComponentIds.push(itemId);
        },

        setMainItemId(state, itemId)
        {
            state.mainItemId = itemId;
        }
    };

const actions =
    {
        initVariation({ commit, dispatch }, variation)
        {
            // register a nested module for the main item
            dispatch("registerItem", variation.documents[0]);
            commit("setMainItemId", variation.documents[0].data.item.id);

            // rest call for sets if set comps are set
            const setComponentIds = (variation.documents[0].data.setComponents || []).map(component => component.defaultVariationId);

            if (!App.isShopBuilder && setComponentIds && setComponentIds.length)
            {
                commit("setIsItemSet", true);
                commit("setItemSetId", variation.documents[0].data.item.id);
                commit("setIsSetLoading", true);

                ApiService.get("/rest/io/variations", { variationIds: setComponentIds, resultFieldTemplate: "SingleItem", setPriceOnly: true })
                    .done(components =>
                    {
                        commit("setIsSetLoading", false);

                        for (const component of components.documents)
                        {
                            const itemId      = component.data.item.id;
                            const variationId = component.data.variation.id;

                            const setComponentMeta = variation.documents[0].data.setComponents.find((setComponent) => setComponent.itemId === itemId );

                            if (setComponentMeta.minimumOrderQuantity <= 0)
                            {
                                setComponentMeta.minimumOrderQuantity = 1;
                            }

                            component.data.variation.minimumOrderQuantity = setComponentMeta.minimumOrderQuantity;
                            component.data.variation.maximumOrderQuantity = setComponentMeta.maximumOrderQuantity;

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
            if (!state.isSetLoading)
            {
                let totalPrice = 0;

                for (const itemId of state.setComponentIds)
                {
                    const price = getters[`${ itemId }/variationTotalPrice`] * state[itemId].variationOrderQuantity;

                    totalPrice += price;
                }

                return totalPrice;
            }
            else
            {
                return state[state.itemSetId].variation.documents[0].data.prices.default.price.value;
            }
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
        },

        currentItemVariation(state, getters)
        {
            return getters[`${state.mainItemId}/currentItemVariation`];
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
