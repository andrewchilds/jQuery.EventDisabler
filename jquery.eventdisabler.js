/**
 * jQuery Event Disabler
 * by Andrew Childs
 *
 * Disable and restore standard bound events to jQuery elements.
 * Doesn't work on events bound with live().
 */
;(function($) {

    var event_storage = {};
    var id_prefix = 'event_disabler_';
    var version = $().jquery;

    $.fn.disableEvents = function() {
        return this.each(function() {
            var $me = $(this);
            var cid = $.expando ? $me.attr($.expando) : 0;
            var cache = $.cache[cid];
            var id = ($me.attr('id').length) ? $me.attr('id') : generateUniqueId();

            $me.attr('id', id);

            // If there are no bound events, there's nothing to do here
            if ($.expando && !cache) {
                return;
            }

            event_storage[id] = $me.data('events');
            if (version >= '1.5') {
                $.cache[cid][$.expando].events = {};
            }
            else {
                $me.data('events', {});
            }
        });
    };

    $.fn.restoreEvents = function() {
        return this.each(function() {
            var $me = $(this);
            var id = $me.attr('id');

            if (id.length && event_storage[id]) {
                var cid = $.expando ? $me.attr($.expando) : 0;

                if (version >= '1.5') {
                    $.cache[cid][$.expando].events = event_storage[id];
                }
                else {
                    $me.data('events', event_storage[id]);
                }
                delete event_storage[id];
            }
        });
    };

    function generateUniqueId() {
        return id_prefix + Math.ceil(Math.random() * 999999999 + 100000000);
    }

})(jQuery);
