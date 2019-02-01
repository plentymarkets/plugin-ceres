export const exceptionMap = new Map(
    [
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
        ["301", "notificationRemoveCouponMinimumOrderValueIsNotReached"],
        ["401", "notificationsCalculateShippingFailed"]
    ]
);

export default exceptionMap;

