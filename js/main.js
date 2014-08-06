$(function () {
    var doc = document;
    var win = window;
    var fonts = ['sans-serif', 'serif'];
    var colors = ['darker', 'lighter'];
    var defaultTexts = {
        headerContent: 'My Great Document',
        bodyContent: 'Your text here. Delete me to get started!'
    };

    var $body = $('body');
    var $contentEditable = $('[contenteditable]');
    var $btnToggleContrast = $('.js-toggle-contrast');
    var $btnToggleFonts = $('.js-toggle-fonts');
    var $btnDownload = $('.js-download-content');

    var htmlEntities = function (str) {
        //replaces certain special characters (<, >, & and ")
        return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    };

    var Storage = {
        get: function (val, cb) {
            var val = win.localStorage.getItem(val);
            if (cb) cb();
            return htmlEntities(val);
        },
        set: function (key, val, cb) {
            win.localStorage.setItem(key, val);
            if (cb) cb();
        }
    };

    var toggleColors = function (evt, val) {
        // evt is automatically send when doing
        // $btnToggleContrast.on('click', toggleColors);

        // if a specific color is send, apply it
        // else, juste toggle

        var newColor = val ? val : colors[0];

        // tricky part
        if (!val || val === colors[0]){
            colors.reverse();
        }

        Storage.set('color', newColor, function(){
            $body.attr('data-color', newColor);
        });
    };

    var toggleFonts = function (evt, val) {
        // evt is automatically send when doing
        // $btnToggleFonts.on('click', toggleFonts);

        // if a specific font is send, apply it
        // else, juste toggle

        var newFont = val ? val : fonts[0];

        // tricky part
        if (!val || val === fonts[0]){
            fonts.reverse();
        }

        Storage.set('font', newFont, function(){
            $body.attr('data-font', newFont);
        });
    };


    $btnToggleContrast.on('click', toggleColors);

    $btnToggleFonts.on('click', toggleFonts);

    $btnDownload.on('click', function () {
        var headerContent = Storage.get('headerContent');
        var bodyContent = Storage.get('bodyContent');
        var blob = new Blob([headerContent + '\n' + bodyContent], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "slight.txt");
    });

    $contentEditable
        .each(function (i, el) {
            var $this = $(el);
            var scope = $this.attr('data-scope');
            var storageContent = Storage.get(scope);
            var content = storageContent == 'null' ? defaultTexts[scope] : storageContent;

            $this.html(content);
        })
        .on('paste', function (e) {
            e.preventDefault();
            var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Your text here! Delete me to get started.');
            console.log(text);
            document.execCommand('insertText', false, text);
        })
        .on('keyup', function () {
            var $this = $(this);
            var scope = $this.attr('data-scope');
            var content = $this.html();

            Storage.set(scope, content);
        });


    // if user has settings, apply
    var userFont = Storage.get('font');
    var userColor = Storage.get('color');

    if (userFont !== 'null') {
        toggleFonts(null, userFont);
    }
    if (userColor !== 'null') {
        toggleColors(null, userColor);
    }

});