configureLogging();

// Initially hide the player elements
$('.player').hide();

function configureLogging() {
    console._error = console.error;
    console.error = function(messages) {
        log('ERROR', Array.prototype.slice.call(arguments));
        console._error.apply(this, arguments);
    }

    console._log = console.log;
    console.log = function(messages) {
        log('INFO', Array.prototype.slice.call(arguments));
        console._log.apply(this, arguments);
    }

    function log(level, messages) {
        var text = '';
        for (message of messages) {
            if (typeof message === 'object') { message = JSON.stringify(message, null, 2); }
            text += ' ' + message;
        }
        $('#logs').append($('<div>').text('[' + level + ']' + text + '\n'));
    }
}

$('.loader').hide();
$('.main').show();
console.log("Page loaded")