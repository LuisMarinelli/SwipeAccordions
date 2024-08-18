$(document).ready(function () {
    let itemsPerPage = parseInt($('#itemsPerPageSelect').val());
    let totalItems = $('.accordion-item').length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    let currentPage = 0;

    function showPage(page) {
        let startItem = page * itemsPerPage;
        let endItem = startItem + itemsPerPage;
        
        $('.accordion-item').hide().slice(startItem, endItem).show();
    }

    function updatePagination() {
        $('.prev-page').prop('disabled', currentPage === 0);
        $('.next-page').prop('disabled', currentPage === totalPages - 1);
    }

    // Initial Setup
    showPage(currentPage);
    updatePagination();

    // Handle Next Page
    $('.next-page').click(function () {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
            updatePagination();
        }
    });

    // Handle Previous Page
    $('.prev-page').click(function () {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            updatePagination();
        }
    });

    // Handle items per page change
    $('#itemsPerPageSelect').change(function () {
        itemsPerPage = parseInt($(this).val());
        totalPages = Math.ceil(totalItems / itemsPerPage);
        currentPage = 0;
        showPage(currentPage);
        updatePagination();
    });
});