
// if($('select').length) {
//     $('select').selectpicker();
// }

document.addEventListener("DOMContentLoaded", function () {

    Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

    /* Header on scroll */

    const masthead = document.getElementById("masthead");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            masthead.classList.add("on-scroll");
        } else {
            masthead.classList.remove("on-scroll");
        }
    });

    /* Mobile toggle btn */

    const menuToggle = document.querySelector('#masthead .menu-toggle');
        
    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            document.documentElement.classList.toggle('mobile-nav-open');
            this.classList.toggle('opened');

            e.preventDefault();
        });
    }

    /* /Reviews swiper */

    /* Enable tooltips */

    document.querySelectorAll('.partners-reviews-swiper').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: false,
                navigation: {
                    nextEl: holder.querySelector(".swiper-button-next"),
                    prevEl: holder.querySelector(".swiper-button-prev"),
                },

                pagination: false,

            });
        }
    }); 
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    /* Results swiper */

    document.querySelectorAll('.results-swiper').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 2,
                spaceBetween: 8,
                loop: false, 
                pagination: false,
                navigation: {
                    nextEl: holder.querySelector(".swiper-button-next"),
                    prevEl: holder.querySelector(".swiper-button-prev"),
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.1,
                    },

                    576: {
                        slidesPerView: 1.3,
                    },

                    992: {
                        slidesPerView: 2,
                    },
                }
            });
        }
    });  

   
    /* IG output swiper */

    document.querySelectorAll('.ig-output').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView:  5.5,
                spaceBetween: 0,
                loop: true, 
                pagination: false,
                navigation: false,
                breakpoints: {
                    0: {
                        slidesPerView: 2.1,
                    },

                    575: {
                        slidesPerView: 3.2,
                    },

                    992: {
                        slidesPerView: 4.5,
                    },

                    1400: {
                        slidesPerView: 5.5,
                    },

                    1600: {
                        slidesPerView: 6.5,
                    },

                    1880: {
                        slidesPerView: 7.5,
                    },

                    2200: {
                        slidesPerView: 8.5,
                    },

                    2540: {
                        slidesPerView: 9.5,
                    },
                }
            });
        }
    });  

    /* Hero swiper */

    const heroSwiperContainer = document.querySelector('.hero-swiper .swiper');

    if (heroSwiperContainer) {
        new Swiper(heroSwiperContainer, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            pagination: {
            el: '.hero-swiper .swiper-pagination',
            clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1).toString().padStart(2, '0') + '</span>';
                },
            },

            navigation: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });
    }

    /* Mobile menu dropdowns */

    const menuLinks = document.querySelectorAll(`
        .site-header #site-navigation .menu-item-has-children > a, 
        .site-header #site-navigation .has-children > a
    `);

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth < 1121) {
                
                const parentLi = this.parentElement;
                const dropdown = parentLi.querySelector('.dropdown-menu, .submenu');

                if (dropdown) {
                    e.preventDefault();
                    e.stopPropagation(); 
                    
                    toggleDropdown(dropdown, parentLi);
                }
            }
        });
    });

    function toggleDropdown(element, parent) {
        if (!element.classList.contains('is-open')) {
            parent.classList.add('opened'); 

            element.style.display = 'block';
            element.style.overflow = 'hidden';

            element.animate([
                { height: '0px', opacity: 0 },
                { height: element.scrollHeight + 'px', opacity: 1 }
            ], {
                duration: 350,
                easing: 'ease-out'
            }).onfinish = () => {
                element.classList.add('is-open');
                element.style.height = 'auto'; 
            };
        } else {
            parent.classList.remove('opened'); 

            element.animate([
                { height: element.scrollHeight + 'px', opacity: 1 },
                { height: '0px', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-in'
            }).onfinish = () => {
                element.classList.remove('is-open');
                element.style.display = 'none';
                element.style.height = '0px';
            };
        }
    }

   /* Dropdown menu border radius handling */

    const menuList = document.querySelector('.site-header #site-navigation #primary-menu-list');

    if (menuList) {
        menuList.addEventListener('mouseover', (e) => {
            const link = e.target.closest('a');

            if (!link) return;

            const categoryItem = link.closest('.dropdown-menu__categories > li');
            const dropdownMenu = link.closest('.dropdown-menu');

            if (dropdownMenu && categoryItem) {
                if (categoryItem.classList.contains('has-children')) {
                    dropdownMenu.classList.add('no-border-radius');
                } else {
                    dropdownMenu.classList.remove('no-border-radius');
                }
            }
        });

        // Papildomai: nuimame klasę, kai pelė visiškai palieka pagrindinį meniu
        menuList.addEventListener('mouseleave', () => {
            const openDropdowns = document.querySelectorAll('.dropdown-menu.no-border-radius');
            openDropdowns.forEach(menu => menu.classList.remove('no-border-radius'));
        });
    }

    /* Promises swiper */

    const promisesSwiperContainer = document.querySelector('.promises .swiper');

    if (promisesSwiperContainer) {
        new Swiper(promisesSwiperContainer, {
            slidesPerView: 3,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.promises .swiper-pagination',
                clickable: true,
            },
            navigation: false,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },

                769: {
                    slidesPerView: 3,
                },
            }
        });
    }

    /* Footer widget titles toggle on mobile */

    const footerTitles = document.querySelectorAll('#main-footer .widget-title');

    footerTitles.forEach(title => {
        title.addEventListener('click', () => {
            if (window.innerWidth < 769) {
                const parent = title.closest('.menu-col');
                
                if (parent) {
                    parent.classList.toggle('opened');
                }
            }
        });
    });

    /* Header Search Toggle and Scroll Logic */

    const searchToggle = document.querySelector('.site-header .wd-header-search__toggle');
    const searchParent = document.querySelector('.wd-header-search');

    if (searchToggle && searchParent) {
        // Handle the click event to toggle the search form
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchParent.classList.toggle('show-form');
        });

        // Remove the 'show-form' class when the user scrolls
        window.addEventListener('scroll', function() {
            if (searchParent.classList.contains('show-form')) {
                searchParent.classList.remove('show-form');
            }
        }, { passive: true }); // Using passive for better scroll performance
    }

    /* Scoped Search with "Nothing found" message */

    const sidebarWidgets = document.querySelectorAll('.sidebar .widget');

    sidebarWidgets.forEach(widget => {
        const searchField = widget.querySelector('.search-filter');
        const filterList = widget.querySelector('ul[class*="filter-list"]');

        if (searchField && filterList) {
            const listItems = filterList.querySelectorAll('li');

            let noResults = widget.querySelector('.no-results-message');

            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results-message';
                noResults.textContent = 'Nekas netika atrasts.'; 
                noResults.style.display = 'none'; 
                noResults.style.padding = '10px 0';
                noResults.style.color = '#707070';
                
                filterList.parentNode.insertBefore(noResults, filterList.nextSibling);
            }

            searchField.addEventListener('input', function() {
                const query = this.value.toLowerCase().trim();
                let hasMatches = false;

                listItems.forEach(li => {
                    const text = li.textContent.toLowerCase();

                    if (text.includes(query)) {
                        li.style.display = ""; 
                        hasMatches = true; 
                    } else {
                        li.style.display = "none";
                    }
                });


                if (!hasMatches && query !== "") {
                    noResults.style.display = "block";
                } else {
                    noResults.style.display = "none";
                }
            });
        }
    });

    /* Widget Accordion Toggle with Animation */

    const widgets = document.querySelectorAll('.sidebar .widget');

    if (widgets.length > 0) {
        widgets.forEach(widget => {
            const title = widget.querySelector('.widget-title');
            const content = widget.querySelector('.widget__content');

            if (title && content) {
                content.style.maxHeight = content.scrollHeight + "px";

                title.addEventListener('click', () => {
                    widget.classList.toggle('close');

                    if (widget.classList.contains('close')) {
                        content.style.maxHeight = "0px";
                        content.style.opacity = "0";
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        content.style.opacity = "1";
                    }
                });
            }
        });
    }

    /* Products swiper */

    document.querySelectorAll('.products-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');
        
        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 20,
                autoHeight: true,
                loop: false,
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                navigation: {
                    nextEl: holder.querySelector(".swiper-button-next"),
                    prevEl: holder.querySelector(".swiper-button-prev"),
                },

                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }
            });
        }
    });  

    /* --- Quantity Selector Logic --- */

    // Select all quantity containers to handle multiple products (e.g., in Cart)
    const quantityContainers = document.querySelectorAll('.quantity');

    quantityContainers.forEach(container => {
        const input = container.querySelector('.input-text.qty');
        const plusBtn = container.querySelector('.plus');
        const minusBtn = container.querySelector('.minus');

        if (input && plusBtn && minusBtn) {
            // Handle plus button click
            plusBtn.addEventListener('click', () => {
                input.stepUp();
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });

            // Handle minus button click
            minusBtn.addEventListener('click', () => {
                const min = parseFloat(input.getAttribute('min')) || 1;
                const currentValue = parseFloat(input.value) || 0;

                // Prevent decreasing below the minimum value
                if (currentValue > min) {
                    input.stepDown();
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            // Validation: reset to minimum if user types an invalid number manually
            input.addEventListener('blur', function() {
                const min = parseFloat(this.getAttribute('min')) || 1;
                if (parseFloat(this.value) < min || this.value === "") {
                    this.value = min;
                    this.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        }
    });

        /* Single product gallery */

    if (document.querySelector('.single-product-page .product-images')) {
        const thumbnailSwiper = new Swiper('.single-product-page .swiper-container-thumbs', {
            direction: 'vertical',
            slidesPerView: 3,
            spaceBetween: 10,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: 
            {
                nextEl: '.single-product-page .product-images .swiper-button-next',
                prevEl: '.single-product-page .product-images .swiper-button-prev',
            },

            slideToClickedSlide: true,
    
            breakpoints: {
                0: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                    direction: 'horizontal',
                },
    
                576: {
                    direction: 'vertical',
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }
        });
    
        const mainSwiper = new Swiper('.product-images .swiper-container-main', {
            spaceBetween: 10,
            loop: true,
            thumbs: {
                swiper: thumbnailSwiper
            }
        });
    
        // Handle click on thumbnails to sync main swiper and move thumbnails
        thumbnailSwiper.on('click', function () {
            // Check if window size is greater than 1200px
            if (window.innerWidth > 575) {
                const clickedIndex = thumbnailSwiper.clickedIndex;
    
                if (clickedIndex !== undefined) {
                    // Move the main swiper to the clicked thumbnail
                    mainSwiper.slideToLoop(clickedIndex);
    
                    // Move thumbnail swiper to keep the selected thumbnail visible
                    thumbnailSwiper.slideTo(Math.max(0, clickedIndex - 1));
                }
            }
        });
    
        // Ensure thumbnails stay in sync when main swiper changes
        mainSwiper.on('slideChange', function () {
            if (window.innerWidth > 575) {
                const currentMainIndex = mainSwiper.realIndex;
                thumbnailSwiper.slideTo(currentMainIndex);
            }
        });
    }
    
    /* /Single product gallery */


    /* --- Sidebar Toggle Functionality --- */

    // Select elements
    const showSidebarBtns = document.querySelectorAll('.has-aside .wc-shop-tools .show-sidebar, .has-aside .wd-shop-tools .show-sidebar');
    const sidebar = document.querySelector('.has-aside .sidebar');
    const closeSidebarBtn = document.querySelector('.has-aside .sidebar .close-sidebar');

    if (sidebar) {
        showSidebarBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                sidebar.classList.toggle('show-sidebar');
            });
        });

        if (closeSidebarBtn) {
            closeSidebarBtn.addEventListener('click', () => {
                sidebar.classList.remove('show-sidebar');
            });
        }

        document.addEventListener('click', (event) => {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggleBtn = Array.from(showSidebarBtns).some(btn => btn.contains(event.target));

            if (sidebar.classList.contains('show-sidebar') && !isClickInsideSidebar && !isClickOnToggleBtn) {
                sidebar.classList.remove('show-sidebar');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && sidebar.classList.contains('show-sidebar')) {
                sidebar.classList.remove('show-sidebar');
            }
        });
    }
    //     const isRadio = e.target.classList.contains('upsell-radio-input');
    //     const isCheckbox = e.target.type === 'checkbox' && e.target.closest('.upsell-options__item-label');

    //     if (isRadio || isCheckbox) {
    //         const currentInput = e.target;
    //         const parentItem = currentInput.closest('.upsell-options__item-label');

    //         if (parentItem) {
    //             parentItem.classList.add('selected');

    //             if (isRadio) {
    //                 const groupName = currentInput.name;
    //                 const radiosInThisParent = parentItem.querySelectorAll(`input[name="${groupName}"]`);
                    
    //                 radiosInThisParent.forEach(radio => {
    //                     const targetId = radio.getAttribute('data-target');
    //                     if (targetId) {
    //                         const targetBlock = document.getElementById(targetId);
    //                         if (targetBlock) {
    //                             radio.checked ? targetBlock.classList.add('show') : targetBlock.classList.remove('show');
    //                         }
    //                     }
    //                 });
    //             }
    //         }
    //     }
    // });

    /* Cart: Upsell radio / checkbox buttons logic */

    document.addEventListener('change', (e) => {
        const isRadio = e.target.classList.contains('upsell-radio-input');
        const isCheckbox = e.target.type === 'checkbox' && e.target.closest('.upsell-options__item-label');

        if (isRadio || isCheckbox) {
            const currentInput = e.target;
            const parentItem = currentInput.closest('.upsell-options__item-label');

            if (parentItem) {
                const anyChecked = parentItem.querySelectorAll('input:checked').length > 0;

                if (anyChecked) {
                    parentItem.classList.add('selected');
                } else {
                    parentItem.classList.remove('selected');
                }

                if (isRadio) {
                    const groupName = currentInput.name;
                    const allRadiosInGroup = document.querySelectorAll(`input[name="${groupName}"]`);
                    
                    allRadiosInGroup.forEach(radio => {
                        const targetId = radio.getAttribute('data-target');
                        const radioParent = radio.closest('.upsell-options__item-label');

                        if (targetId) {
                            const targetBlock = document.getElementById(targetId);
                            if (targetBlock) {
                                targetBlock.classList.toggle('show', radio.checked);
                            }
                        }

                        if (radioParent) {
                            radioParent.classList.toggle('selected', radio.checked);
                        }
                    });
                }
            }
        }
    });

    document.querySelectorAll('.woocommerce-cart-form .cards-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');
        
        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 5,
                spaceBetween: 10,
                autoHeight: true,
                loop: false,
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                navigation: false,

                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },

                    576: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },

                    769: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },

                    992: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },

                    1140: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                    },

                    1300: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }
            });
        }
    });  

    /* Phone prefix */

    const phoneInputs = document.querySelectorAll(".phone");

    if (phoneInputs.length > 0) {
        phoneInputs.forEach(phoneInput => {
            window.intlTelInput(phoneInput, {
                initialCountry: "lv",
                preferredCountries: ["lv", "lt", "ee"],
                separateDialCode: false,
                showSelectedDialCode: false,
                loadUtils: () => import("/intl-tel-input/js/utils.js?1758116186324"),
                i18n: {
                    searchPlaceholder: "Meklēt...",
                }
            });
        });
    }

    /* Checkout discount coupon toggle */

    const couponToggle = document.querySelector('.woocommerce-form-coupon-toggle .showcoupon');
    const couponForm = document.querySelector('.checkout-coupon');

    if (couponToggle && couponForm) {
        couponToggle.addEventListener('click', (e) => {
            e.preventDefault();
            couponForm.classList.toggle('show');
        });
    }

    /* Show/hide password toggle */

    const passwordToggles = document.querySelectorAll('.show-password-input');

    if (passwordToggles.length > 0) {
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;

            if (input && input.tagName === 'INPUT') {
                input.type = input.type === 'password' ? 'text' : 'password';
                toggle.classList.toggle('active');
            }
            });
        });
    }

    /* Header mini cart toggle */

    const cartTrigger = document.querySelector('#masthead .buttons__cart');
    const cartWidget = document.querySelector('.cart-widget-side');
    const closeTrigger = document.querySelector('.cart-widget-side .close-side-widget');
    const body = document.body;

    if (cartTrigger && cartWidget) {
        cartTrigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            cartWidget.classList.add('wc-opened');
            body.classList.add('mini-cart-opened');
        });
    }

    if (closeTrigger && cartWidget) {
        closeTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            cartWidget.classList.remove('wc-opened');
            body.classList.remove('mini-cart-opened');
        });
    }
});
