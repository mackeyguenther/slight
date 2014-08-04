$(function () {
    var doc = document;
    var win = window;
    var body = doc.body;
    var fonts = ['source-serif-pro', 'source-sans-pro'];
    var colors = ['black', 'white'];
    var defaultTexts = {
        headerContent: 'My Great Document',
        bodyContent: 'Your text here. Delete me to get started!'
    };

    var $contentEditable = $('[contenteditable]');
    var $btnToggleContrast = $('.js-toggle-contrast');
    var $btnToggleFonts = $('.js-toggle-fonts');
    var $btnDownload = $('.js-download-content');

    var Storage = {
        get: function (val, cb) {
            var val = win.localStorage.getItem(val);
            if (cb) cb();
            return val;
        },
        set: function (key, val, cb) {
            win.localStorage.setItem(key, val);
            if (cb) cb();
        }
    };

    var toggleColors = function () {
        body.style.backgroundColor = colors[0];
        body.style.color = colors[1];
        colors.reverse();
        //session
        Storage.set('colors', JSON.stringify({'bg': colors[1], 'text': colors[0]}));
        
    };
    
    var toggleFonts = function () {
        $contentEditable.css('fontFamily', fonts[1]);
        fonts.reverse();
        //session
        Storage.set('font', fonts[0]);
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
            var content = storageContent || defaultTexts[scope];

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
    
    // Local Storage
    if(Storage.get('font') === null){
        //Font
        Storage.set('font', 'source-serif-pro');
    }
    else if(Storage.get('colors') === null){
         //Contrast
        Storage.set('colors', JSON.stringify({'bg': 'white', 'text': 'black'}));  
    }
    else{
        //Font
        $contentEditable.css('fontFamily', Storage.get('font'));
        //Contrast
        var color = JSON.parse(Storage.get('colors'));
        body.style.backgroundColor = color.bg;
        body.style.color = color.text;
    }
  

});
