<template>
    <a class="nav-link" :href="urlWishList" rel="nofollow" :aria-label="$translate('Ceres::Template.wishList')">
        <span class="badge-right mr-1 d-none d-sm-inline">{{ wishListCount }}</span>
        <i class="fa" :class="{'fa-heart-o': !wishListCount, 'fa-heart': wishListCount}" aria-hidden="true"></i>
    </a>
</template>

<script>
export default {
    computed:
    {
        wishListCount()
        {
            return this.$store.getters.wishListCount;
        },

        urlWishList()
        {
            return App.urls.wishList;
        }
    }
}
</script>
