var audio;
//Hide Pause Button
$('#pause').hide();
//Init
initAudio($('#playlist li:first-child'));
function initAudio(element) {
    var song = element.attr('song'),
        title = element.text(),
        cover = element.attr('cover'),
        artist = element.attr('artist');
    //Create Audio Object
    audio = new Audio('../assets/media/' + song);
    if(!audio.currentTime) {
        $('#duration').html('0.00');
    }
    $('#audio-player .title').text(title);
    $('#audio-player .artist').text(artist);
    //Insert the Cover img
    $('img.cover').attr('src','../assets/img/covers/' + cover);
    //Remove active class from everyone and put it on the current song
    $('#playlist li').removeClass('active');
    element.addClass('active');
}
//Play Button
$('#play').click(function () {
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
})
//Pause Button
$('#pause').click(function () {
    audio.pause();
    $('#pause').hide();
    $('#play').show();
})
//Stop Button (there is no .stop() function available for some reason so i will make it)
$('#stop').click(function () {
    audio.pause();
    audio.currentTime = 0;
    $('#pause').hide();
    $('#play').show();
    $('#playlist li').removeClass('active');
    $('#playlist li:first-child').addClass('active');
    $('#duration').fadeOut(400);
})
//Next Button
$('#next').click(function () {
    audio.pause();
    var next = $('#playlist li.active').next();
    if(next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});
//Previous Button
$('#prev').click(function () {
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if(prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
    audio.play();
    $('#play').hide();
    $('#pause').show();
    $('#duration').fadeIn(400);
    showDuration();
});
//Volume Control
$('#volume').change(function () {
    audio.volume = parseFloat(this.value / 100);
});
//Ovaj kod dole mrtvi za showduration() sam kopirao od nekud
//Time Duration
function showDuration(){
    $(audio).bind('timeupdate', function(){
        //Get hours and minutes
        var s = parseInt(audio.currentTime % 60),
            m = parseInt((audio.currentTime / 60) % 60);
        //Add 0 if seconds less than 10
        if(s < 10) {
            s = '0' + s;
        }
        $('#duration').html(m + '.' + s);
        var value = 0;
        if (audio.currentTime > 0) {
            value = ((100 / audio.duration) * audio.currentTime);
        }
        $('#progress').css('width',value+'%');
    });
}
