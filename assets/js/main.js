$(function () {
    var sliderWrapper = $("#slider");
    var sliderList = $("#slide-list");
    var sliderItems = $(".calendar");
    var buttons = $(".button");
    var imageWidth = sliderItems.width();

    var imageCount = sliderItems.length;


    var animateSlider = function (shift, duration) {

         
        sliderList.stop(true, true).animate({

                "margin-left": "+=" + shift + "px"


            },
            duration);
    };

    var isAtStart = function () {

        return parseInt(sliderList.css("margin-left"), 10) > -imageWidth;

    };

    var isAtEnd = function () {



        var maxMargin = -1 * (imageWidth * (imageCount - 2));

        return parseInt(sliderList.css("margin-left"), 10) < maxMargin;



        /*
                        return parseInt(sliderList.css("margin-left"), 10) === -680;
        */


    };






    buttons.on("click", function () {

        var $this = $(this);

        var isBackBtn = $this.hasClass("back");
        if ((isBackBtn && isAtStart()) || (!isBackBtn && isAtEnd())) {
            return;
        }

        animateSlider((isBackBtn ? imageWidth : (-1) * imageWidth), 1000);

    });


    /*
        console.log(imageWidth);
    */
/*
    console.log($(".carousel-indicators li.active").index());
*/
    var active_position = 0; 
    
    
    $(".carousel-indicators li").on("click", function () {
        $(".carousel-indicators li").removeClass("active");
        $(this).addClass("active")

        /*console.log($(this).index() - active_position);*/
        var shift = active_position - $(this).index();
        active_position = $(".carousel-indicators li.active").index();
        
        animateSlider(shift * imageWidth, 1000);
/*
        animateSlider(340, 1000);
*/
    });

});