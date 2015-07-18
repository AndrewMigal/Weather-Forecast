$(function () {
    var active_position = 0;
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
        /*(isBackBtn ? (active_position - 1) : (active_position + 1));*/
        if (isBackBtn) {
            active_position -= 1;
        } else {
            active_position += 1;
        }

        console.log(active_position);

        $(".carousel-indicators li").removeClass("active");
        $(".carousel-indicators li").eq(active_position).addClass("active")

        animateSlider((isBackBtn ? imageWidth : (-1) * imageWidth), 1000);

    });


    /*
        console.log(imageWidth);
    */
    /*
        console.log($(".carousel-indicators li.active").index());
    */



    $(".carousel-indicators li").on("click", function () {
        $(".carousel-indicators li").removeClass("active");
        $(this).addClass("active");

        /*console.log($(this).index() - active_position);*/
        var shift = active_position - $(this).index();
        active_position = $(".carousel-indicators li.active").index();

        animateSlider(shift * imageWidth, 1000);
        /*
                animateSlider(340, 1000);
        */
    });

});


$(function () {



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess);
    }

    function locationSuccess(position) {

        var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + position.coords.latitude +
            '&lon=' + position.coords.longitude + '&&units=metric' + '&callback=?'

        $.getJSON(weatherAPI, function (response) {

            // Store the cache
            localStorage.weatherCache = JSON.stringify({
                timestamp: (new Date()).getTime(), // getTime() returns milliseconds
                data: response
            });
            /*locationSuccess(position);*/

        });

        var cache = JSON.parse(localStorage.weatherCache);
        /*console.log(cache.data.city.name);
        $("#city").html(cache.data.city.name);
        console.log(cache.data.list[0].dt_txt);
        console.log(parseInt(cache.data.list[0].main.temp));
        console.log(cache.data.list[0].weather[0].icon);*/
        //console.log("assets/img/" + cache.data.list[0].weather[0].icon);
/*
        $("#calendar1 .day:first").html(moment(localTime).format('dddd'));
*/
        var d = new Date();
        var offset = -d.getTimezoneOffset() * 60 * 1000;
        var localTime = new Date(cache.data.list[0].dt * 1000 - offset);
        /*console.log(moment(localTime).format('MMMM'));
        console.log(moment(localTime).format('dddd'));
        console.log(moment(localTime).format('D'));
        console.log(moment(localTime).format('h:mm a'));*/
        addWeather(cache, localTime);

    }

    function addWeather(cache, localTime) {
        $("#city").html(cache.data.city.name);
        $("#temperature").html(parseInt(cache.data.list[0].main.temp) + "&deg;"); //&deg;
        $("#time").html(moment(localTime).format('h:mm a'));
        $("#precipitation").attr("src", "assets/img/" + cache.data.list[0].weather[0].icon + ".png");
        $("#calendar_1 .day").html(moment(localTime).format('dddd'));
        $("#calendar_1 .date").html(moment(localTime).format('D'));
        $("#calendar_1 .month").html(moment(localTime).format('MMMM'));


    }

});