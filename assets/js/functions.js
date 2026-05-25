
if($('select').length) {
    $('select').selectpicker();
}

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

    /* Hero swiper */

    document.querySelectorAll('.home-hero').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: false, 
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
            });
        }
    });  

    /* Benefits bar swiper */

    document.querySelectorAll('.benefits-bar').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');

        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 12,
                    },

                    576: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },

                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },

                    1300: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }
            });
        }
    });

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
                loop: false,
                grid: {
                    rows: 2,
                    fill: 'row',
                },
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
                        slidesPerView: 1,
                        spaceBetween: 20,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                    },

                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                    },


                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                        grid: {
                            rows: 2,
                            fill: 'row',
                        },
                    },
                }
            });
        }
    });

    /* Logo swiper */

    document.querySelectorAll('.logo-swiper .swiper').forEach(swiperContainer => {
        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 6.2,
                spaceBetween: 12,
                loop: false,
                pagination: false,
                navigation: false,
                breakpoints: {
                    0: {
                        slidesPerView: 2.1,
                        spaceBetween: 6.6,
                    },

                    768: {
                        slidesPerView: 3.1,
                        spaceBetween: 12,
                    },

                    992: {
                        slidesPerView: 4.2,
                        spaceBetween: 12,
                    },

                    1200: {
                        slidesPerView: 5.2,
                        spaceBetween: 12,
                    },

                    1300: {
                        slidesPerView: 6.2,
                        spaceBetween: 12,
                    },
                }
            });
        }
    });

    /* --- Quantity Selector Logic --- */

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
            slidesPerView: 3,
            spaceBetween: 8,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            navigation: false,
            slideToClickedSlide: true,
    
            breakpoints: {
                0: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                    direction: 'horizontal',
                },
    
                576: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                },

                769: {
                    slidesPerView: 4,
                    spaceBetween: 8,
                },

                992: {
                    slidesPerView: 5,
                    spaceBetween: 8,
                },

                1200: {
                    slidesPerView: 6,
                    spaceBetween: 8,
                },
            }
        });
    
        const mainSwiper = new Swiper('.product-images .swiper-container-main', {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: '.single-product-page .swiper-button-next',
                prevEl: '.single-product-page .swiper-button-prev',
            },
            thumbs: {
                swiper: thumbnailSwiper
            }
        });
    
    }
    
    /* /Single product gallery */


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

    /* Quick order form: Add new row */

   var quickOrder = document.querySelector('.quick-order');

    if (quickOrder) {
        var quickOrderForm = quickOrder.querySelector('.quick-order__form');
        var quickOrderAddRowBtn = quickOrder.querySelector('.quick-order__add-row');
        var quickOrderActions = quickOrder.querySelector('.quick-order__actions');
        
        function quickOrderRemoveRow(e) {
            var quickOrderRow = e.currentTarget.closest('.quick-order__row');
            quickOrderRow.remove();
        }
        
        function quickOrderAddRemoveBtn(row) {
            var quickOrderRemoveBtn = document.createElement('button');
            quickOrderRemoveBtn.type = 'button';
            quickOrderRemoveBtn.className = 'quick-order__remove-row';
            quickOrderRemoveBtn.setAttribute('aria-label', 'Noņemt rindu');
            quickOrderRemoveBtn.addEventListener('click', quickOrderRemoveRow);
            row.appendChild(quickOrderRemoveBtn);
        }
        
        quickOrderAddRowBtn.addEventListener('click', function () {
            var quickOrderFirstRow = quickOrderForm.querySelector('.quick-order__row');
            var quickOrderNewRow = quickOrderFirstRow.cloneNode(true);
            quickOrderNewRow.querySelectorAll('.input-text').forEach(function (input) {
                input.value = '';
            });
            quickOrderAddRemoveBtn(quickOrderNewRow);
            quickOrderForm.insertBefore(quickOrderNewRow, quickOrderActions);
        });
    }

    /* Product search functionality */

    var productSearch = document.querySelector('.product-search');

    if (productSearch) {
        var toggle = productSearch.querySelector('.product-search__toggle');
        var tags = productSearch.querySelector('.product-search__tags');

        toggle.addEventListener('click', function () {
            productSearch.classList.toggle('opened');
        });

        tags.addEventListener('click', function (e) {
            var removeBtn = e.target.closest('.product-search__tag-remove');
            if (!removeBtn) return;

            var tag = removeBtn.closest('.product-search__tag');

            if (tag.classList.contains('product-search__tag--clear-all')) {
                tags.querySelectorAll('.product-search__tag:not(.product-search__tag--clear-all)').forEach(function (t) {
                    t.remove();
                });
                tag.remove();
            } else {
                tag.remove();
            }
        });
    }

    /* Product summary tabs */

    const summaryTabs = document.querySelectorAll('.product-tabs__tab');

    summaryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            if (!target) return;

            summaryTabs.forEach(t => t.classList.remove('product-tabs__tab--active'));
            document.querySelectorAll('.product-tabs__pane').forEach(p => p.classList.remove('product-tabs__pane--active'));

            tab.classList.add('product-tabs__tab--active');
            target.classList.add('product-tabs__pane--active');
        });
    });

    /* Related products swiper */

    document.querySelectorAll('.related-products-swiper .swiper-holder').forEach(holder => {
        const swiperContainer = holder.querySelector('.swiper');
        
        if (swiperContainer) {
            new Swiper(swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 20,
                loop: false,
                pagination: {
                    el: holder.querySelector(".swiper-pagination"),
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },

                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },


                    768: {
                        slidesPerView: 3,
                    },
                    
                    1200: {
                        slidesPerView: 4,
                    },
                }
            });
        }
    });
});
