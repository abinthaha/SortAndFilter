var filterArray = [],
    allfilterArray = [];
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

    $('.filter-add-section').on('click', '.each-filter', function() {
        var filterName = $(this).html();
        $(this).toggleClass('disabled');
        var itemCheck = checkIfItemExist(filterName);
        toggleItemInFilter(filterName);
        
        allfilterArray.forEach(function(item) {
            if (item.name == filterName) {
                var index = allfilterArray.indexOf(item);
                allfilterArray[index].key = !allfilterArray[index].key;
            }
        })
    })

    //To add inner menu item to Filter area
    $('.sort-criteria .sort-inner-menu li').click(function(event) {
        event.stopPropagation();
        var filterText = $(this).html();
        toggleItemInFilter(filterName);
    });

    //To remove filter item from Filter Area
    $('.filter-container').on('click', '.close-button', function(event) {
        event.stopPropagation();
        var siblingFilter = $(this).closest('.each-filter'),
            filterName = $(this).siblings('.filter-name').html();

        //To remove from DOM
        $(siblingFilter).remove();

        //To remove from Array
        removeFilter(filterName);
        recalculateFilters();
    });

    //To clear all the filter criterias from Filter Area
    $('.filter-container').on('click', '.clear-all-filter', function(event) {
        event.stopPropagation();
        $('.filter-container li').remove();
        filterArray = [];
    });
})

function toggleItemInFilter(filterName) {
    if (filterArray.indexOf(filterText) == -1) {
        $('.filter-container').prepend('<li class="each-filter"><span class="filter-name">' + filterText + '</span><span class="close-button">x</span></li>')
        filterArray.push(filterText);
    }
    else {
        filterArray.pop(filterName);
    }
    addFilterAll(filterText);
    recalculateFilters();
}

function checkIfItemExist(filterName) {
    allfilterArray.forEach(function(item) {
        if (item.name == filterName) {
            return true;
        }
        else {
            return false;
        }
    })
}

function addFilterAll(filterText) {
    if (allfilterArray.length != 0) {
        var flag = 0;
        allfilterArray.forEach(function(item) {
            if ((item.name == filterText) && (item.key == false)) {
                flag = 1;
                var index = allfilterArray.indexOf(item);
                allfilterArray[index].key = true;
            }
        })
        if (flag == 0) {
            $('.filter-add-section ul').append('<li class="each-filter disabled">' + filterText + '</li>');
            pushToAllFilterArray(filterText)
        }
    } else {
        $('.filter-add-section ul').append('<li class="each-filter disabled">' + filterText + '</li>');
        pushToAllFilterArray(filterText)
    }
}

function pushToAllFilterArray(filterText) {
    allfilterArray.push({
        'name': filterText,
        'key': true
    });
}

function removeFilter(removeItem) {
    filterArray = jQuery.grep(filterArray, function(value) {
        return value != removeItem;
    });
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
