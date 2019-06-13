export const exceptionMap = new Map(
    [
        ["0", "errorActionIsNotExecuted"],
        ["1", "notificationsItemNotAdded"],
        ["2", "notificationsNotEnoughStockItem"],
        ["3", "notificationsInvalidResetPasswordUrl"],
        ["4", "notificationsCheckPassword"],
        ["5", "notificationsItemBundleSplitted"],
        ["6", "notificationsItemOutOfStock"],
        ["7", "newsletterOptOutSuccessMessage"],
        ["8", "newsletterOptInMessage"],
        ["9", "notificationsBasketItemsRemoved"],
        ["10", "notificationsBasketItemsRemovedForLanguage"],
        ["11", "notificationsNoEmailEntered"],
        ["110", "errorBasketItemVariationNotFound"],
        ["111", "errorBasketItemNotEnoughStockForVariation"],
        ["112", "errorBasketItemMaximumQuantityReachedForItem"],
        ["113", "errorBasketItemMaximumQuantityReachedForVariation"],
        ["114", "errorBasketItemMinimumQuantityNotReachedForVariation"],
        ["115", "errorCreateOrderRetryTimeNotReached"],
        ["301", "notificationRemoveCouponMinimumOrderValueIsNotReached"],
        ["302", "couponNoMatchingItemInBasket"],
        ["401", "notificationsCalculateShippingFailed"]
    ]
);

export default exceptionMap;

