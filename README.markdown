# jQuery Event Disabler

A simple jQuery plugin for disabling and restoring bound events. This plugin adds two jQuery methods, **disableEvents** and **restoreEvents**.

## Example Usage:

    $(function() {
        $('a').click(function() { alert('YARRR!') });

        $('a').click();
        // > fires our alert('YARRR!');

        $('a').disableEvents().click();
        // > links behave as they would before we bound the alert().

        $('a').restoreEvents().click();
        // > fires alert('YARRR!');

    });

## Compatibility

Unit tested to work with jQuery 1.2.6 through 1.5.2. **Not yet working with 1.6.x.**

## Fine Print

* Should work with any event, not just click().
* Doesn't currently work with events bound with live().
