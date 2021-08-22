(function($) {

    'use strict';

    $(window).on("load", function() {
        initPreloader();
        $(".preloader").delay(500).fadeOut("slow");
    });


    $(window).on("load resize", function(e) {
        var $container = $('.isotope'),
            colWidth = function() {
                var w = $container.width(),
                    columnNum = 1,
                    columnWidth = 0;

                if ($('#even-grid').length > 0) {
                    if (w > 1040) {
                        columnNum = 4;
                    } else if (w > 850) {
                        columnNum = 4;
                    } else if (w > 768) {
                        columnNum = 2;
                    } else if (w > 480) {
                        columnNum = 2;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                } else if ($('#masonry-grid-3').length > 0) {
                    if (w > 1040) {
                        columnNum = 3;
                    } else if (w > 850) {
                        columnNum = 3;
                    } else if (w > 768) {
                        columnNum = 2;
                    } else if (w > 480) {
                        columnNum = 2;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                } else if ($('#masonry-grid-4').length > 0) {
                    if (w > 1040) {
                        columnNum = 4;
                    } else if (w > 850) {
                        columnNum = 4;
                    } else if (w > 768) {
                        columnNum = 2;
                    } else if (w > 480) {
                        columnNum = 2;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                } else if ($('#even-grid-5').length > 0) {
                    if (w > 1040) {
                        columnNum = 5;
                    } else if (w > 850) {
                        columnNum = 5;
                    } else if (w > 768) {
                        columnNum = 4;
                    } else if (w > 480) {
                        columnNum = 2;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                } else if ($('#even-grid-3').length > 0) {
                    if (w > 1040) {
                        columnNum = 3;
                    } else if (w > 850) {
                        columnNum = 3;
                    } else if (w > 768) {
                        columnNum = 2;
                    } else if (w > 480) {
                        columnNum = 2;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                } else if ($('#masonry-grid-5').length > 0) {
                    if (w > 1040) {
                        columnNum = 5;
                    } else if (w > 850) {
                        columnNum = 5;
                    } else if (w > 768) {
                        columnNum = 4;
                    } else if (w > 480) {
                        columnNum = 2;
                    } else if (w > 300) {
                        columnNum = 1;
                    }
                }

                columnWidth = Math.floor(w / columnNum);

                $container.find('.item').each(function() {
                    var $item = $(this),
                        width = columnWidth,
                        height = columnWidth;
                    $item.css({
                        width: width,
                        height: height
                    });
                });

                $container.find('.width2').each(function() {
                    var $item = $(this),
                        width = columnWidth * 2,
                        height = columnWidth;
                    if (w <= 480) width = columnWidth;
                    $item.css({
                        width: width,
                        height: height
                    });
                });

                $container.find('.height2').each(function() {
                    var $item = $(this),
                        width = columnWidth,
                        height = columnWidth * 2;
                    $item.css({
                        width: width,
                        height: height
                    });
                });

                $container.find('.width2.height2').each(function() {
                    var $item = $(this),
                        width = columnWidth * 2,
                        height = columnWidth * 2;
                    $item.css({
                        width: width,
                        height: height
                    });
                });
                return columnWidth;
            },

            $container = $('.isotope').isotope({
                resizable: true,
                itemSelector: '.item',
                masonry: {
                    columnWidth: colWidth(),
                    gutterWidth: 10
                }
            });

        $('.pf-filter').on('click', 'li', function() {
            $('.pf-filter li').removeClass('active');
            $(this).addClass('active');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({
                filter: filterValue
            });
        });

    });

    /*
      Animación de carga usando modernizr
    */

    var support = {
            animations: Modernizr.cssanimations
        },
        container = document.getElementById('ip-container'),
        header = container.querySelector('.ip-header'),
        loader = new PathLoader(document.getElementById('ip-loader-circle')),
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },

        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    function initPreloader() {
        var onEndInitialAnimation = function() {
            if (support.animations) {
                this.removeEventListener(animEndEventName, onEndInitialAnimation);
            }
            startLoading();
        };

        classie.add(container, 'loading');
        if (support.animations) {
            container.addEventListener(animEndEventName, onEndInitialAnimation);
        } else {
            onEndInitialAnimation();
        }
    }

    function startLoading() {
        var simulationFn = function(instance) {
            var progress = 0,
                interval = setInterval(function() {
                    progress = Math.min(progress + Math.random() * 0.1, 1);
                    instance.setProgress(progress);
                    if (progress === 1) {
                        classie.remove(container, 'loading');
                        classie.add(container, 'loaded');
                        clearInterval(interval);
                        var onEndHeaderAnimation = function(ev) {
                            if (support.animations) {
                                if (ev.target !== header) return;
                                this.removeEventListener(animEndEventName, onEndHeaderAnimation);
                            }
                        };
                        if (support.animations) {
                            header.addEventListener(animEndEventName, onEndHeaderAnimation);
                        } else {
                            onEndHeaderAnimation();
                        }
                    }
                }, 80);
        };
        loader.setProgressFn(simulationFn);
    }

    var win_ht = $(window).height();
    ;
    (function() {
        $('.extra-page-win-ht').css({
            'height': win_ht,
            'position': 'relative'
        });
    })();

    function mainNav60() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) {
            $('.sticky-navigation').stop().animate({
                "top": '0'
            });
        } else {
            $('.sticky-navigation').stop().animate({
                "top": '0'
            });
        }
    }

    function mainNav120() {
        var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        if (top > 40) {
            $('.sticky-navigation').stop().animate({
                "top": '0'
            });
        } else {
            $('.sticky-navigation').stop().animate({
                "top": '0'
            });
        }
    }

    if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
        $(window).on("scroll",function() {
            mainNav60();
        });
    }

    if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
        $(window).on("scroll",function() {
            mainNav120();
        });
    }

    $(document).on("ready", function() {

        if (matchMedia('(min-width: 992px), (max-width: 767px)').matches) {
            mainNav60();
        }
        if (matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
            mainNav120();
        }

        if ($('#slideShow').length > 0) {
            $('#slideShow').ayaSlider({
                easeIn: 'easeOutBack',
                easeOut: 'linear',
                delay: 4000,
                timer: $('#timer'),
                previous: $('.prev'),
                next: $('.next'),
                list: $('.slideControl')
            });
        }

        if ($('.flexslider').length > 0) {
            $('.flexslider').flexslider({
                animation: "fade",
                directionNav: false,
            });
        }

        $('.portfolio-hover .lightbox').nivoLightbox({
            effect: "slideUp", // El efecto que se utilizará al mostrar la caja de luz.
            theme: "default", // El tema de lightbox a usar
            keyboardNav: true, // Habilitar / deshabilitar la navegación por teclado (izquierda / derecha / escape)
            clickOverlayToClose: true, // Si es falso, hacer clic en el botón "cerrar" será la única forma de cerrar la caja de luz.
            errorMessage: "The requested content cannot be loaded. Please try again later." // Mensaje de error cuando el contenido no se puede cargar
        });

        if ($(".rotate").length > 0) {
            $(".rotate").textrotator({
                animation: "dissolve",
                separator: ",",
                speed: 2000
            });
        }
    });
    
    var allPanels = $(".accordion > dd").hide();
    allPanels.first().slideDown("easeOutExpo");
    $(".accordion").each(function() {
        $(this).find("dt > a").first().addClass("active").parent().next().css({
            display: "block"
        });
    });
    $(".accordion > dt > a").on( "click", function() {
        var current = $(this).parent().next("dd");
        $(this).parents(".accordion").find("dt > a").removeClass("active");
        $(this).addClass("active");
        $(this).parents(".accordion").find("dd").slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");
        return false;
    });

})(jQuery) 