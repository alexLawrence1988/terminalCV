var scanlines = $('.scanlines');
var tv = $('.tv');
var term = $('#term').terminal(function (command, term) {
    if (command.match(/^\s*exit\s*$/)) {
        $('.tv').addClass('collapse');
        term.disable();        
    } else if (command.match(/^\s*help\s*$/)) {

        var helpTxt = `Use the following commands to navigate the CV:

--  currentEmployment()
--  previousEmployment()
--  stack()
--  projects()

You can clear the terminal any time, just type "clear"`

        term.echo(green(helpTxt));
        updateScroll();

    } else if (command !== '') {
        try {
            window.eval(command)
                .then((result) => {

                    if (result !== undefined) {
                        
                        term.echo(green(result));    
                        updateScroll();
                }
            
            })
        } catch (e) {
            term.error('command not found - if executing a CV command, please include parameter parenthesis, eg. employment()');
            updateScroll();
        }
    } else {

    }
    
}, {
        name: 'js_demo',
        onResize: set_size,
        exit: false,
        // detect iframe codepen preview
        enabled: $('body').attr('onload') === undefined,
        onInit: function () {
            set_size();
            this.echo('Type "help" to see available options...');
            // this.echo('Type and execute grab() function to get the scre' +
            //           'enshot from your camera');
            // this.echo('Type camera() to get video and pause()/play() to stop/play');
        },
        prompt: 'CV> '
    });
// for codepen preview
if (!term.enabled()) {
    term.find('.cursor').addClass('blink');
}
function set_size() {
    // for window height of 170 it should be 2s
    var height = $(window).height();
    var width = $(window).width()
    var time = (height * 2) / 170;
    scanlines[0].style.setProperty("--time", time);
    tv[0].style.setProperty("--width", width);
    tv[0].style.setProperty("--height", height);
}

function tree(obj) {
    term.echo(treeify.asTree(obj, true, true));
}
function camera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        term.pause();
        var media = navigator.mediaDevices.getUserMedia({ video: true });
        media.then(function (mediaStream) {
            term.resume();
            term.echo('<video data-play="true" class="self"></video>', {
                raw: true,
                finalize: function (div) {
                    var video = div.find('video');
                    if (!video.length) {
                        return;
                    }
                    video[0].src = window.URL.createObjectURL(mediaStream);
                    if (video.data('play')) {
                        video[0].play();
                    }
                }
            });
        });
    }
}
var play = function () {
    var video = term.find('video').slice(-1);
    if (video.length) {
        video[0].play();
    }
}
function pause() {
    term.find('video').each(function () {
        this.pause();
    });
}
function grab() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        term.pause();
        var media = navigator.mediaDevices.getUserMedia({ video: true });
        media.then(function (mediaStream) {
            const mediaStreamTrack = mediaStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(mediaStreamTrack);
            return imageCapture.takePhoto();
        }).then(function (blob) {
            term.echo('<img src="' + URL.createObjectURL(blob) + '" class="self"/>', {
                raw: true,
                finialize: function (div) {
                    div.find('img').on('load', function () {
                        URL.revokeObjectURL(this.src);
                    });
                }
            }).resume();
        }).catch(function (error) {
            term.error('Device Media Error: ' + error);
        });
    }
}
function currentEmployment() {
    return new Promise(function(resolve, reject){
        $.ajax({
            method: "GET",
            url: document.location.origin + "/currentEmployment"
        })
            .done(function (msg) {
               resolve(msg);            
            });
    });  
      
    
}

function previousEmployment() {
    return new Promise(function(resolve, reject){
        $.ajax({
            method: "GET",
            url: document.location.origin + "/previousEmployment"
        })
            .done(function (msg) {
               resolve(msg);            
            });
    });    
}

function stack(){
    return new Promise(function(resolve, reject){
        $.ajax({
            method: "GET",
            url: document.location.origin + "/stack"
        })
            .done(function (msg) {
               resolve(msg);            
            });
    })
}

function green(message) {
    return "[[gb;lime;]" + message + "]";
}
function updateScroll(){
    $('.terminal-wrapper').animate({
        scrollTop: $('.terminal-wrapper').get(0).scrollHeight}, 500);
}