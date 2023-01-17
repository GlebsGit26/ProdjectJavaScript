$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        center: true,
        nav: false,
        dots: true,
        navText: [
            '<img src="Img/icons/left.png" alt="left">',
            '<img src="Img/icons/right.png" alt="right">'
        ],
        dotsContainer: '.dots',
        navSpeed: 1500,
        dotsSpeed: 1500,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplaySpeed: 1500,
        autoplayHoverPause: true,
        responsive:{
            0:{
                items: 1,
            },
            500:{
                items: 2,
                center: false,
                dotsEach: true,
            },
            600:{
                items: 3,
            },
            1100:{
                nav: true
            }
        }
    });
});