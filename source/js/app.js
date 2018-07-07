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
    $('#duration').fadeOut(400);
})
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
