new Vue({
  el: 'body'
});



// Frontend end scripts

(function($, window, document, undefined){

	function CallistoMain(){

		// Sticky sidebar single item
		if(window.matchMedia('(min-width: 768px)').matches) {
        $(".single-rightside").stick_in_parent({

			});
			$('.single-rightside')
			.on('sticky_kit:bottom', function(e) {
			    $(this).parent().css('position', 'static');
			})
			.on('sticky_kit:unbottom', function(e) {
			    $(this).parent().css('position', 'relative');
			});
        }



		var sync1 = $("#single-big-image");
		var sync2 = $("#single-carousel");

		  sync1.owlCarousel({
		    singleItem : true,
		    slideSpeed : 1000,
		    navigation: true,
        autoWidth: true,
		    navigationText: [
		      "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
		      "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
		    ],
		    pagination:false,
		    afterAction : syncPosition,
		    responsiveRefreshRate : 200,
		  });

		  sync2.owlCarousel({
		    items : 8,
		    itemsDesktop      : [1199,8],
		    itemsDesktopSmall     : [979,8],
		    itemsTablet       : [768,6],
		    itemsMobile       : [479,4],
		    navigation: true,
		    navigationText: [
		      "<i class='fa fa-chevron-left' aria-hidden='true'></i>",
		      "<i class='fa fa-chevron-right' aria-hidden='true'></i>"
		    ],
		    pagination:false,
		    responsiveRefreshRate : 100,
		    afterInit : function(el){
		      el.find(".owl-item").eq(0).addClass("synced");
		    }
		  });

		  function syncPosition(el){
		    var current = this.currentItem;
		    $("#single-carousel")
		      .find(".owl-item")
		      .removeClass("synced")
		      .eq(current)
		      .addClass("synced")
		    if($("#single-carousel").data("owlCarousel") !== undefined){
		      center(current)
		    }
		  }

		  $("#single-carousel").on("click", ".owl-item", function(e){
		    e.preventDefault();
		    var number = $(this).data("owlItem");
		    sync1.trigger("owl.goTo",number);
		  });

		  function center(number){
		    var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		    var num = number;
		    var found = false;
		    for(var i in sync2visible){
		      if(num === sync2visible[i]){
		        var found = true;
		      }
		    }

		    if(found===false){
		      if(num>sync2visible[sync2visible.length-1]){
		        sync2.trigger("owl.goTo", num - sync2visible.length+2)
		      }else{
		        if(num - 1 === -1){
		          num = 0;
		        }
		        sync2.trigger("owl.goTo", num);
		      }
		    } else if(num === sync2visible[sync2visible.length-1]){
		      sync2.trigger("owl.goTo", sync2visible[1])
		    } else if(num === sync2visible[0]){
		      sync2.trigger("owl.goTo", num-1)
		    }

		  }




		$('#toggleBasketPreview').on('click', function( evt ){
			evt.preventDefault();
			$('body').addClass('open-right');
      $('.wrapper-main').one('click', closeNav);
		});

    $('#closeBasketPreview').on('click', function( evt ){
			evt.preventDefault();
			closeBasketPreview();
		});

    function closeBasketPreview(){
			$('body').removeClass('open-right');
      $('.wrapper-main').off('click', closeNav);
		}

		var $toggleListView = $('.toggle-list-view');

		$toggleListView.on('click', function( evt ){
			console.log('toggle-list-view click');
			evt.preventDefault();

			//toggle it's own state
			$toggleListView.toggleClass('grid');

			//toggle internal style of thumbs
			$('.product-list, .cmp-product-thumb').toggleClass('grid');
		});

		$('#mainNavbarCollapse').collapse('hide');

		//Add click listener outside the navigation to close it
		$('#mainNavbarCollapse').on('show.bs.collapse', function () {
			$('.main').one('click', closeNav);
		})

		$('#mainNavbarCollapse').on('hide.bs.collapse', function () {
			$('.main').off('click', closeNav)
		})

		function closeNav(){
			$('#mainNavbarCollapse').collapse('hide');
		}

	}

	window.CallistoMain = CallistoMain;

	new CallistoMain();

})(jQuery, window, document);
