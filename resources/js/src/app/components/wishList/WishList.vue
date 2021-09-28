<template>
    <div>
		<transition-group name="list-transition" tag="div">
			<wish-list-item v-for="wishListItem in wishListItems" :key="wishListItem.id" :wish-list-item-raw="wishListItem" :item-details-data="itemDetailsData"></wish-list-item>
		</transition-group>

		<p class="h4 text-muted text-center my-5" v-if="!isLoading && (!wishListItems || wishListItems.length === 0)">Du hast noch keine Artikel in deiner Wunschliste.</p>
		<loading-animation v-if="isLoading"></loading-animation>
		<hr>
		<last-seen-item-list :items-per-page="4" :max-items="4" v-cloak v-if="!isLoading && (!wishListItems || wishListItems.length === 0)" class="bordered-item-list">
			<template #heading>
				<div class="widget-caption bg-appearance widget-item-list-caption mb-3">
					<div>
						<h2>Zuletzt angesehen</h2>
					</div>
				</div>
			</template>
		</last-seen-item-list>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WishListItem from "./WishListItem.vue";

export default {

    name: "wish-list",

    components:
    {
        WishListItem
    },

    props:
    {
        itemDetailsData:
        {
            type: Array,
            default: () => ["wishListItem.variation.availability"]
        }
    },

    computed: mapState({
        wishListItems: state => state.wishList.wishListItems,
        isLoading: state => state.wishList.isLoading
    }),

    created()
    {
        this.initWishListItems();
    },

    methods:
    {
        ...mapActions([
            "initWishListItems"
        ])
    }
}
</script>