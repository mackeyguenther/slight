//Declare vars
var document, jQuery, $, header, bodytext, saveAs, localStorage, prompt, Blob;

$(function(){
    var doc = document;
    var body = doc.body;
    var colors = ['black', 'white'];
    var fonts = ['source-serif-pro', 'source-sans-pro'];

    var $contrastBtn = $('#contrast');
    var $fontBtn = $('#font');
    var $contentEditable = $('[contenteditable]');

    var toggleColors = function(){
        body.style.backgroundColor = colors[0];
        body.style.color = colors[1];
        colors.reverse();
    };
    var toggleFonts = function(){
        $contentEditable.css('fontFamily', fonts[1]);
        fonts.reverse();
    };


    $contrastBtn.on('click', toggleColors);

    $fontBtn.on('click', toggleFonts);

    $contentEditable.on('paste', function (e) {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Your text here! Delete me to get started.');
        console.log(text);
        document.execCommand('insertText', false, text);
    });

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

document.getElementById('download').onclick = function () {
    header = document.getElementById('header').innerHTML;
    bodytext = document.getElementById('bodytext').innerHTML;
    var blob = new Blob([header + '\n' + bodytext], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "slight.txt");
};

getHeader();
getBodytext();
