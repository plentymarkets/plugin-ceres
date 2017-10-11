Vue.directive("item-total-price",
    {
        bind()
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
                    this.el.innerHTML = event.detail;

                    $(this.el).fadeTo(100, 0.1).fadeTo(400, 1.0);
                }
            });
        }
    });
