$(document).ready(function() {
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.multiple-items').slick({
        dots: true,

        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    $('.one-time').slick({
        dots: true,
        infinite: false,
        placeholders: false,
        speed: 300,
        slidesToShow: 5,
        touchMove: false,
        slidesToScroll: 1
    });
    $('.uneven').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('.filtering_view').slick({
      infinite: false,

        speed: 300,
        centerMode: true,
        centerPadding: '30px',
        slidesToShow: 1,
     
        slidesToScroll: 1

       
       
    });



    $('.lazy').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1
    });



    $('.autoplay').slick({
        speed: 300,

        slidesToShow: 1,
        slidesToScroll: 1,
        
        autoplay: true,
        autoplaySpeed: 4000
    });

 $('.autoplay_event').slick({
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
       
        autoplay: true,
        autoplaySpeed: 4000
    });


    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        slide: 'div',
        cssEase: 'linear'
    });

    $('.add-remove').slick({
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    var slideIndex = 1;
    $('.js-add-slide').on('click', function() {
        slideIndex++;
        $('.add-remove').slickAdd('<div><h3>' + slideIndex + '</h3></div>');
    });

    $('.js-remove-slide').on('click', function() {
        $('.add-remove').slickRemove(slideIndex - 1);
        if (slideIndex !== 0){
            slideIndex--;
        } 
    });

    $('.filtering').slick({
        //dots: true,
        slidesToShow: 6,
        slidesToScroll: 6,
         responsive: [{
            breakpoint: 768,
            settings: {
               
                slidesToShow: 6,
                   slidesToShow: 6,
                    slidesToScroll: 6
                 
            }
        }, {
            breakpoint: 400,
            settings: {
               
                slidesToShow: 4,
                
                    slidesToShow: 4,
                    slidesToScroll: 4
                 
            }
        }]
    });
    var filtered = false;
    $('.js-filter').on('click', function() {
        if (filtered === false) {
            $('.filtering').slickFilter(':even');
            $(this).text('Unfilter Slides');
            filtered = true;
        } else {
            $('.filtering').slickUnfilter();
            $(this).text('Filter Slides');
            filtered = false;
        }
    });

    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 166) {
            $('.fixed-header').show();
        } else {
            $('.fixed-header').hide();
        }
    });

    $('ul.nav a').on('click', function(event) {
        event.preventDefault();
        var targetID = $(this).attr('href');
        var targetST = $(targetID).offset().top - 48;
        $('body, html').animate({
            scrollTop: targetST + 'px'
        }, 300);
    });





    //Cal click .item-tab (fix bug auto height)   
    $( ".item-tab:first" ).trigger( "click" );


});


