//Declare vars
var document, jQuery, $, header, bodytext, saveAs, localStorage, prompt, Blob;

//Change background
jQuery(document).ready(function ($) {
    var togglebg = (function () {
        var bgs = ['black', 'white'];

        return function () {
            document.body.style.backgroundColor = bgs[0];
            bgs.push(bgs.shift());
        };
    })();

    $('#contrast').on('click', togglebg);
});

//Change font color
jQuery(document).ready(function ($) {
    var togglecolor = (function () {
        var colors = ['white', 'black'];

        return function () {
            document.body.style.color = colors[0];
            colors.push(colors.shift());
        };
    })();

    $('#contrast').on('click', togglecolor);
});

//Change font in header
jQuery(document).ready(function ($) {
    var togglefonts = (function () {
        var fonts = ['source-serif-pro', 'source-sans-pro'];

        return function () {
            document.getElementById('header').style.fontFamily = fonts[1];
            fonts.push(fonts.shift());
        };
    })();

    $('#font').on('click', togglefonts);
});

//Change font in body
jQuery(document).ready(function ($) {
    var togglefonts = (function () {
        var fonts = ['source-serif-pro', 'source-sans-pro'];

        return function () {
            document.getElementById('bodytext').style.fontFamily = fonts[1];
            fonts.push(fonts.shift());
        };
    })();

    $('#font').on('click', togglefonts);
});

/*function storeHeader(id) {
    var header = document.getElementById('header').innerHTML;
    localStorage.setItem('header', header);
}*/

document.getElementById('header').onkeyup = function () {
    var header = document.getElementById('header').innerHTML;
    localStorage.setItem('header', header);
};

function getHeader() {
    var header;
    if (localStorage.getItem('header')) {
        header = localStorage.getItem('header');
    } else {
        header = 'My Great Document';
    }
    document.getElementById('header').innerHTML = header;
}

/*function storeBodytext(id) {
    var bodytext = document.getElementById('bodytext').innerHTML;
    localStorage.setItem('bodytext', bodytext);
}*/

document.getElementById('bodytext').onkeyup = function () {
    var bodytext = document.getElementById('bodytext').innerHTML;
    localStorage.setItem('bodytext', bodytext);
};

function getBodytext() {
    var bodytext;
    if (localStorage.getItem('bodytext')) {
        bodytext = localStorage.getItem('bodytext');
    } else {
        bodytext = 'Your text here. Delete me to get started!';
    }
    document.getElementById('bodytext').innerHTML = bodytext;
}

$('#bodytext[contenteditable]').on('paste', function (e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Your text here! Delete me to get started.');
    document.execCommand('insertText', false, text);
});

$('#header[contenteditable]').on('paste', function (e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('My Great Document');
    document.execCommand('insertText', false, text);
});

function saveDocument() {
    var headersave = header.textContent;
    var bodytextsave = bodytext.textContent;
    var blob = new Blob([headersave + '\n' + bodytextsave], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "slight.txt");

getHeader();
getBodytext();
