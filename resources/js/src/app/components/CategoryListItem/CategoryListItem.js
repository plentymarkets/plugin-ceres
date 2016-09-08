var BasketService       = require('services/BasketService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

Vue.component( 'category-list-item',
{

    template: '#vue-category-list-item',

    props: [
      "item",
      "baseUrl"
    ],

    methods:
    {

      addToBasket: function ()
      {
        var addItemModal = ModalService.findModal(this.$el);
        addItemModal.setTimeout(10000);

        $(".wrapper-bottom").append(addItemModal.getModalContainer());

        BasketService.addBasketItem({
          variationId: this.item.variationBase.id,
          quantity: 1
        })
        .done( function ()
        {
          addItemModal.show();
          NotificationService.success('Der Artikel wurde erfolgreich in den Warenkorb gelegt').closeAfter(7000);
        })
        .fail( function ()
        {
          NotificationService.error('Der Artikel konnte leider nicht hinzugefügt werden').closeAfter(7000);
        });
      },

      getImage: function ()
      {
        for(var i = 0; i < this.item.variationImageList.length; i++)
        {
          if(this.item.variationImageList[i].path !== '')
          {
             return this.baseUrl +  "/" + this.item.variationImageList[i].path;
          }
        }
        return null;
      },

      checkName: function (name)
      {
        if(name != '' )
        {
          return name + " " + this.item.variationBase.variationName;
        }
        else
        {
          return this.item.itemDescription.name1 + " " + this.item.variationBase.variationName;
        }
      },

      setLinkToItem: function ()
      {
        var urlContent = this.item.itemDescription.urlContent.split("/");
        var i = urlContent.length - 1;

        return "/" + urlContent[i] + "/" + this.item.itemBase.id + "/" + this.item.variationBase.id;
      }
    }
});
