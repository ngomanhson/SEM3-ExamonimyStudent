; (function ($) {
    "use strict";

    $(document).ready(function () {

        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function (e) {
            e.preventDefault();
        })
       
        /*-------------------------------------
            menu
        -------------------------------------*/
        $('.navbar-area .menu').on('click', function() {
            $(this).toggleClass('open');
            $('.navbar-area .navbar-collapse').toggleClass('sopen');
        });
    
        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');
            $('<i class="fas fa-chevron-right"></i>').insertAfter("");

            $(".menu-item-has-children a").on('click', function(e) {
                // e.preventDefault();

                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }

        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');
        
        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });

        /*--------------------------------------------------
            select onput
        ---------------------------------------------------*/
        if ($('.single-select').length){
            $('.single-select').niceSelect();
        }

        /* --------------------------------------------------
            isotop filter 
        ---------------------------------------------------- */
        var $Container = $('.isotop-filter-area');
        if ($Container.length > 0) {
            $('.property-filter-area').imagesLoaded(function () {
                var festivarMasonry = $Container.isotope({
                    itemSelector: '.project-filter-item', // use a separate class for itemSelector, other than .col-
                    masonry: {
                        gutter: 0
                    }
                });
                $(document).on('click', '.isotop-filter-menu > button', function () {
                    var filterValue = $(this).attr('data-filter');
                    festivarMasonry.isotope({
                        filter: filterValue
                    });
                });
            });
            $(document).on('click','.isotop-filter-menu > button' , function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            });
        }

        /*--------------------------------------------
            Search Popup
        ---------------------------------------------*/
        var bodyOvrelay =  $('#body-overlay');
        var searchPopup = $('#td-search-popup');

        $(document).on('click','#body-overlay',function(e){
            e.preventDefault();
        bodyOvrelay.removeClass('active');
            searchPopup.removeClass('active');
        });
        $(document).on('click','.search-bar',function(e){
            e.preventDefault();
            searchPopup.addClass('active');
        bodyOvrelay.addClass('active');
        });

        /* -----------------------------------------------------
            Variables
        ----------------------------------------------------- */
        var leftArrow = '<i class="fa fa-angle-left"></i>';
        var rightArrow = '<i class="fa fa-angle-right"></i>';

        /*------------------------------------------------
            intro-slider
        ------------------------------------------------*/
        $('.intro-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            smartSpeed: 1500,
            autoplay:true,
            autoplayTimeout:2000,
            responsive: {
                0: {
                    items: 1
                },
                575: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1025: {
                    items: 4
                },
            }
        });

        $('.intro-slider-2').owlCarousel({
            loop: true,
            margin: 5,
            nav: false,
            dots: false,
            smartSpeed: 1500,
            autoplay:true,
            autoplayTimeout:3500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                992: {
                    items: 3
                },
            }
        });


        /*------------------------------------------------
            testimonial-slider
        ------------------------------------------------*/
        $('.testimonial-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            smartSpeed: 1500,
            autoplay:true,
            autoplayTimeout:2500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                992: {
                    items: 2
                },
            }
        });



        /*------------------------------------------------
            client-slider
        ------------------------------------------------*/
        $('.client-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            smartSpeed: 1500,
            autoplay:true,
            autoplayTimeout:2500,
            responsive: {
                0: {
                    items: 2
                },
                575: {
                    items: 3
                },
                992: {
                    items: 5
                },
            }
        });
        

        /*------------------------------------------------
            Magnific JS
        ------------------------------------------------*/
        $('.video-play-btn').magnificPopup({
            type: 'iframe',
            removalDelay: 260,
            mainClass: 'mfp-zoom-in',
        });
        $.extend(true, $.magnificPopup.defaults, {
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/Wimkqo8gDZ0'
                    }
                }
            }
        });

        /* -----------------------------------------
            fact counter
        ----------------------------------------- */
        $('.counter').counterUp({
            delay: 15,
            time: 2000
        });


        /*----------------------------------------
           back to top
        ----------------------------------------*/
        $(document).on('click', '.back-to-top', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000);
        });

    });

    $(window).on("scroll", function() {
        /*---------------------------------------
            back-to-top
        -----------------------------------------*/
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }

        /*---------------------------------------
            sticky-active
        -----------------------------------------*/
        var scroll = $(window).scrollTop();
        if (scroll < 445) {
            $(".navbar").removeClass("sticky-active");
        } else {
            $(".navbar").addClass("sticky-active");
        }

    });


    $(window).on('load', function () {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();

        /*---------------------
            Cancel Preloader
        ----------------------*/
        $(document).on('click', '.cancel-preloader a', function (e) {
            e.preventDefault();
            $("#preloader").fadeOut(2000);
        });

    });


    /****cursor effect****/
    var
    cursor = $(".cursor"),
    follower = $(".follower"),
    cWidth = 8, //カーソルの大きさ
    fWidth = 10, //フォロワーの大きさ
    delay = 10, //数字を大きくするとフォロワーがより遅れて来る
    mouseX = 0, //マウスのX座標
    mouseY = 0, //マウスのY座標
    posX = 0, //フォロワーのX座標
    posY = 0; //フォロワーのX座標

    //カーソルの遅延アニメーション
    //ほんの少ーーーしだけ遅延させる 0.001秒
    TweenMax.to({}, .001, {
    repeat: -1,
    onRepeat: function() {
        posX += (mouseX - posX) / delay;
        posY += (mouseY - posY) / delay;
        
        TweenMax.set(follower, {
            css: {    
            left: posX - (fWidth / 2),
            top: posY - (fWidth / 2)
            }
        });
        
        TweenMax.set(cursor, {
            css: {    
            left: mouseX - (cWidth / 2),
            top: mouseY - (cWidth / 2)
            }
        });
    }
    });

    //マウス座標を取得
    $(document).on("mousemove", function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });

    $("a").on({
    "mouseenter": function() {
        cursor.addClass("is-active");
        follower.addClass("is-active");
    },
    "mouseleave": function() {
        cursor.removeClass("is-active");
        follower.removeClass("is-active");
    }
    });

    /*****text animation*****/
    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
      
        var that = this;
        var delta = 300 - Math.random() * 100;
      
        if (this.isDeleting) {
          delta /= 2;
        }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
      
        setTimeout(function () {
          that.tick();
        }, delta);
      };
      
      window.onload = function () {
        var elements = document.getElementsByClassName("txt-rotate");
        for (var i = 0; i < elements.length; i++) {
          var toRotate = elements[i].getAttribute("data-rotate");
          var period = elements[i].getAttribute("data-period");
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
    };

    


})(jQuery);