Vue.directive("basket-item-sum",
    {
        update(sum)
        {
            this.el.innerHTML = Vue.filter("currency").apply(Object, [sum]);
        }
    });
