var filterArray = [],
    toggleArray = [];
$(document).ready(function() {

    //To show the inner menu of each search items
    $('.sort-header').on('click', function(event) {
        event.stopPropagation();
        var innerMenu = $(this).siblings('ul');
        $('.sort-criteria h2').removeClass('expanded');
        if ($(innerMenu).css('display') == 'none') {
            $('.sort-criteria ul').slideUp('slow');
            $(innerMenu).slideDown('slow');
            $(this).addClass('expanded');
        } else {
            $(innerMenu).slideUp('slow');
        }
    });

    //To close all inner menus on clicking outside
    $(window).click(function() {
        $('.sort-criteria ul').slideUp('slow');
        $('.sort-criteria h2').removeClass('expanded');
    });

    //To add inner menu item to Filter area
    $('.sort-inner-menu').on('click', 'li', function() {
        event.stopPropagation();
        var filterText = $(this).html();
        addToSortArea(filterText);
        addToToggleArea(filterText);
        recalculateFilters();
        $(this).toggleClass('pointer-none');
    });

    //Close button click on each filter
    $('.filter-container').on('click', '.close-button', function(event) {
        event.stopPropagation();
        var siblingFilter = $(this).closest('.each-filter'),
            filterName = $(this).siblings('.filter-name').html();

        //To remove from DOM
        $(siblingFilter).remove();

        //To remove from Array
        removeFilter(filterName);
        recalculateFilters();

        //Toggle value in Toggle phase
        toggleInArray(filterName);
    });

    //To clear all the filter criterias from Filter Area
    $('.filter-container').on('click', '.clear-all-filter', function(event) {
        event.stopPropagation();
        $('.filter-container li').remove();
        filterArray = [];
    });

    //To toggle item in filter area
    $('.filter-add-section').on('click', 'li', function() {
        var toggleText = $(this).html();
        $(this).toggleClass('disabled');
        toggleArrayAndDom(toggleText);
    })
});

function toggleArrayAndDom(filterText) {
    toggleArray.forEach(function(item) {
        if (item.name == filterText) {
            if (item.key == false) {
                item.key = true;
                addToSortArea(filterText);
            }
            else {
                removeFromDom(filterText)
                removeFilter(filterText);
                toggleInArray(filterText)
            }
            recalculateFilters();
        }
    })
}
function removeFromDom(filterText) {
    var filterArr = $('.filter-container .each-filter');
    $(filterArr).each(function(index) {
        var el = $(filterArr)[index];
        if ($(el).find('.filter-name').html() == filterText) {
            $(el).remove();
        }
    })
}

function toggleInArray(filterText) {
    toggleArray.forEach(function(item) {
        if (item.name == filterText) {
            item.key = false;
            toggleInDom(filterText);
        }
    })
}

function toggleInDom(filterText) {
    var toggler = $('.filter-add-section ul li');
    $(toggler).each(function(index) {
        var el = $(toggler)[index];
        if ($(el).html() == filterText) {
            $(el).removeClass('disabled');
        }
    })
}

function addToSortArea(filterText) {
    if (filterArray.indexOf(filterText) == -1) {
        filterArray.push(filterText);
    }
    $('.filter-container').prepend('<li class="each-filter"><span class="filter-name">' + filterText + '</span><span class="close-button">x</span></li>');
}

function addToToggleArea(filterText) {
    var flag = 0;
    if (toggleArray.length > 0) {
        toggleArray.forEach(function(item) {
            if (item.name == filterText) {
                flag = 1;
            }
        });
    }
    if (flag == 0) {
        toggleArray.push({
            "name": filterText,
            "key": true
        })
    }
    $('.filter-add-section ul').append('<li class="each-filter disabled">' + filterText + '</li>');
}

function recalculateFilters() {
    var noC = $('.filter-container li:not(.clear-all-filter)').length;
    if (noC > 0) {
        if (!$('.filter-container li').hasClass('clear-all-filter')) {
            $('.filter-container').append('<li class="clear-all-filter">Clear All Filters</li>')
        }
    } else {
        $('.filter-container .clear-all-filter').remove();
    }
}

function removeFilter(removeItem) {
    filterArray = jQuery.grep(filterArray, function(value) {
        return value != removeItem;
    });
}
