Vue.directive("basket-item-quantity",
    {
        update(quantity)
        {
            this.el.innerHTML = quantity;
        }
    });
