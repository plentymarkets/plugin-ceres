Vue.directive("item-total-price",
    {
        bind(el)
        {
            let firstRendering = true;

            document.addEventListener("itemTotalPriceChanged", event =>
            {
                if (firstRendering)
                {
                    firstRendering = false;
                }
                else
                {
                    el.innerHTML = event.detail;

                    $(el).fadeTo(100, 0.1).fadeTo(400, 1.0);
                }
            });
        }
    });
