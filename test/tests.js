$(function() {

    test("Click event for single element is disabled and then restored.", function() {
        var foo = false;
        var $link = $('#single-link');
        $link.click(function() { foo = true; return false; });

        $link.disableEvents();
        $link.click();
        equal(foo, false, 'foo should still be false, since we disabled the bound event that would make it true.');

        $link.restoreEvents();
        $link.click();
        equal(foo, true, 'foo should now be true, since we restored the events.');
    });

    test("Click event for multiple elements are disabled and then restored.", function() {
        var foo = 0;
        var $elements = $('#multiple-elements').children();
        $elements.click(function() { foo++; return false; });

        $elements.disableEvents();
        $elements.click();
        equal(foo, 0, 'foo should still be zero since we disabled the bound events that would make it 3.');

        $elements.restoreEvents();
        $elements.click();
        equal(foo, 3, 'foo should now be 3 since we restored the events to three elements.');

        $elements.restoreEvents();
        $elements.click();
        equal(foo, 6, 'foo should now be 6 after a second round of click events. We also called restoreEvents which had no effect.');
    });

    test("Elements without IDs now have unique IDs after calling disableEvents on them", function() {
        var $elements = $('#multiple-elements').children();

        $elements.each(function() {
            var id = $(this).attr('id');
            equal(id, '', 'This element has no id.');

            $(this).disableEvents();
            id = $(this).attr('id');
            equal(id.match(/^event_disabler_/).length, 1, 'This element has an id now.');
            equal($('#' + id).length, 1, 'This is a unique id.')
        });
    });

    test("Multiple events for single element are disabled and then restored in order.", function() {
        var foo = '';
        var $link = $('#single-link');
        $link.click(function() { foo += 'a' });
        $link.click(function() { foo += 'b' });
        $link.click(function() { foo += 'c' });

        $link.disableEvents();
        $link.click();
        equal(foo, '', 'Click events are disabled.');

        $link.click(function() { foo += 'd' });
        $link.click();
        equal(foo, 'd', 'Only the new click event should fire.');

        $link.restoreEvents();
        $link.click();
        equal(foo, 'dabc', 'Original click events fired correctly and in order. Restored events replace interim event.');
    });

});
