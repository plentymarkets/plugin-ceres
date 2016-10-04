new Vue({
    el: 'body'
});

// Frontend end scripts

(function($, window, document, undefined) {

    function CallistoMain() {

        $(window).scroll(function() {
            if($( ".wrapper-main" ).hasClass( "isSticky" )) {
                if ($(this).scrollTop() > 1){
                    $('.wrapper-main').addClass("sticky");
                }
                else{
                    $('.wrapper-main').removeClass("sticky");
                }
            }
        });

        // Sticky sidebar single item
        if (window.matchMedia('(min-width: 768px)').matches) {
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

        var $toggleBasketPreview = $('#toggleBasketPreview, #closeBasketPreview');

        $toggleBasketPreview.on('click', function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            $('body').toggleClass('open-right');
        });

        $(document).on('click', 'body.open-right', function (evt)
        {
          if($("body").hasClass("open-right"))
          {
            if((evt.target != $('.basket-preview')) && ($(evt.target).parents(".basket-preview").length <= 0))
            {
              evt.preventDefault();
              $('body').toggleClass('open-right');
            }
          }

        });

        var $toggleListView = $('.toggle-list-view');

        $toggleListView.on('click', function(evt) {
            evt.preventDefault();

            //toggle it's own state
            $toggleListView.toggleClass('grid');

            //toggle internal style of thumbs
            $('.product-list, .cmp-product-thumb').toggleClass('grid');
        });

        $('#mainNavbarCollapse').collapse('hide');

        //Add click listener outside the navigation to close it
        $('#mainNavbarCollapse').on('show.bs.collapse', function() {
            $('.main').one('click', closeNav);
        })

        $('#mainNavbarCollapse').on('hide.bs.collapse', function() {
            $('.main').off('click', closeNav)
        })

        function closeNav() {
            $('#mainNavbarCollapse').collapse('hide');
        }

    }

    window.CallistoMain = CallistoMain;

    new CallistoMain();

})(jQuery, window, document);
