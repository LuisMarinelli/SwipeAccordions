//GET CURRENT YEAR
const year = document.getElementById("currentYear");
const currentYear = new Date();
year.innerHTML = currentYear.getFullYear();

// BACK PAGE FOWARD
function goBack() {
    window.history.back();
}

// SHOW HEADER MENU WHEN SCROLL
document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var stickyHeader = header.offsetTop;
    var stickyFooter = document.body.offsetHeight - window.innerHeight;
    function checkScroll() {
        if (window.pageYOffset > stickyHeader) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

// Script to detected touch or swipe
$(document).ready(function () {
    let startX, startY;
    const swipeThreshold = 50; // Limiar para considerar um swipe

    // Função para registrar a direção do swipe
    function logSwipeDirection(deltaX, deltaY) {
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0) {
                //console.log('Swipe para a esquerda');
                $("#next-page").click();
            } else {
                //console.log('Swipe para a direita');
                $("#prev-page").click();
            }
            // } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > swipeThreshold) {
            //     if (deltaY < 0) {
            //         console.log('Swipe para cima');
            //     } else {
            //         console.log('Swipe para baixo');
            //     }
            // } else {
            //     console.log('Toque detectado, mas não foi um swipe');
            // }
        }
    }

    $('#accordion-container').on('touchstart', function (event) {
        const touch = event.originalEvent.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        console.log('Toque iniciado');
        //event.preventDefault();
    });

    $('#accordion-container').on('touchmove', function (event) {
        event.preventDefault();
    });

    $('#accordion-container').on('touchend', function (event) {
        const touch = event.originalEvent.changedTouches[0];
        const endX = touch.pageX;
        const endY = touch.pageY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        console.log('Toque terminado');
        logSwipeDirection(deltaX, deltaY);
    });
});


// SEARCH
$('#searchBox').on('input', function () {
    const filter = this.value.toLowerCase();
    const items = $('#native-items-container .accordion-item');
    const filteredItemsContainer = $('#filtered-items-container');
    const nativeItemsContainer = $('#native-items-container');

    let hasVisibleItems = false;

    // Clear filtered items container
    filteredItemsContainer.empty();

    items.each(function () {
        const number = $(this).find('.col-custom-number .data-value').text().toLowerCase();
        const carac = $(this).find('.col-custom-carac .data-value').text().toLowerCase();
        const tecnic = $(this).find('.col-custom-tecnic .data-value').text().toLowerCase();

        if (number.includes(filter) || carac.includes(filter) || tecnic.includes(filter)) {
            hasVisibleItems = true;
            // Clone item and add to filtered items container
            const itemClone = $(this).clone();
            filteredItemsContainer.append(itemClone);
        }
    });

    // Show or hide the appropriate container
    if (hasVisibleItems) {
        filteredItemsContainer.removeClass('hidden').show();
        nativeItemsContainer.addClass('hidden').hide();
    } else {
        filteredItemsContainer.addClass('hidden').hide();
        nativeItemsContainer.removeClass('hidden').show();
    }

    updatePagination();
});

// Refresh pagination
function updatePagination() {
    const $accordions = $('.accordion-item:not(.hidden)');
    let itemsPerPage = parseInt($('#itemsPerPageSelect').val());
    let currentPage = 1;

    function calculateTotalPages() {
        return Math.max(Math.ceil($accordions.length / itemsPerPage), 1);
    }

    let totalPages = calculateTotalPages();

    function showPage(page, direction) {
        if (page < 1 || page > totalPages) {
            return;
        }

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        $accordions.removeClass('slide-in-right slide-in-left').hide();

        const $newItems = $accordions.slice(start, end).show();
        if (direction === 'next') {
            $newItems.addClass('slide-in-right');
        } else if (direction === 'prev') {
            $newItems.addClass('slide-in-left');
        }

        $('#prev-page').prop('disabled', currentPage === 1);
        $('#next-page').prop('disabled', currentPage === totalPages);
    }

    $('#itemsPerPageSelect').on('change', function () {
        itemsPerPage = parseInt($(this).val());
        
        if (itemsPerPage === 8) {  
            itemsPerPage = Number.MAX_SAFE_INTEGER; 
            $('#prev-page').addClass('hidden');
            $('#next-page').addClass('hidden');
        } else {
            $('#prev-page').removeClass('hidden');
            $('#next-page').removeClass('hidden');
        }

        totalPages = calculateTotalPages();
        currentPage = 1;
        showPage(currentPage, 'next');
    });

    $('#prev-page').on('click', function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage, 'prev');
        }
    });

    $('#next-page').on('click', function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, 'next');
        }
    });

    showPage(currentPage, 'next'); 
}

updatePagination();