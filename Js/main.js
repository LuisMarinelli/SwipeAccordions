// GET CURRENT YEAR
const year = document.getElementById("currentYear");
const currentYear = new Date();
year.innerHTML = currentYear.getFullYear();

// BACK PAGE FOWARD
function goBack() {
    window.history.back();
}

// SEARCH
document.getElementById('searchBox').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const items = document.querySelectorAll('.accordion-item');

    items.forEach(item => {
        const number = item.querySelector('.col-custom-number .data-value').textContent.toLowerCase();
        const tecnic = item.querySelector('.col-custom-tecnic .data-value').textContent.toLowerCase();

        if (number.includes(filter) || tecnic.includes(filter)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

// PAGINATIONS
$(document).ready(function() {
    const $accordions = $('.accordion-item');
    let itemsPerPage = parseInt($('#itemsPerPageSelect').val()); 
    let currentPage = 1;
    let totalPages = Math.ceil($accordions.length / itemsPerPage);

    function showPage(page, direction) {
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

    $('#itemsPerPageSelect').on('change', function() {
        itemsPerPage = parseInt($(this).val());
        totalPages = Math.ceil($accordions.length / itemsPerPage);
        currentPage = 1;
        showPage(currentPage, 'next');
    });

    $('#prev-page').on('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage, 'prev');
        }
    });

    $('#next-page').on('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, 'next');
        }
    });

    showPage(currentPage, 'next');
});

// SCRIPT TO DETECT SWIPES AND TOUCHES ON SCREEN
$(document).ready(function() {
    let startX, startY;
    const swipeThreshold = 50;

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

    $('#accordion-container').on('touchstart', function(event) {
        const touch = event.originalEvent.touches[0];
        startX = touch.pageX;
        startY = touch.pageY;
        console.log('Toque iniciado');
        //event.preventDefault();
    });

    $('#accordion-container').on('touchmove', function(event) {        
        event.preventDefault();
    });

    $('#accordion-container').on('touchend', function(event) {
        const touch = event.originalEvent.changedTouches[0];
        const endX = touch.pageX;
        const endY = touch.pageY;

        const deltaX = endX - startX;
        const deltaY = endY - startY;

        console.log('Toque terminado');
        logSwipeDirection(deltaX, deltaY);
    });
});
