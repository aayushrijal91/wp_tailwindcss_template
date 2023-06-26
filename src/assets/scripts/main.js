// // ie: Engine.ui.misc();
// jQuery(function ($) {
//     "use strict";
//     var Engine = {
//         ui: {
//             misc: function () {
//                 // AOS.init({
//                 //     duration: 1500,
//                 // });
//                 // $(() => {
//                 //     $("#banner_gallery_slider").slick({
//                 //         slidesToShow: 1,
//                 //         arrows: false,
//                 //         dots: true,
//                 //         autoplay: true,
//                 //     });

//                 //     $('#section_3_work_slider').slick({
//                 //         slidesToShow: 3,
//                 //         slidesToScroll: 1,
//                 //         centerMode: true,
//                 //         centerPadding: '120px',
//                 //         dots: true,
//                 //         autoplay: true,
//                 //     });
//                 // });
//             }, // end misc
//         }, // end ui
//         //utils: {

//         //}, // end utils
//     };
//     Engine.ui.misc();
//     //Engine.utils.sliders();
// });

$(window).on('scroll', () => {
    if ($(this).scrollTop() >= 600) {
        $('#return-to-top').fadeIn(300);
    } else {
        $('#return-to-top').fadeOut(300);
    }
});

$('#return-to-top').on('click', () => {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
});