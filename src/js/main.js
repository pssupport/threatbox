//= libraries/jquery/dist/jquery.js

$(function() {
    $('.js-main').on('click', function(){
       $(this).empty().addClass('btn_circle');
        $('.main').toggleClass('processing');
        $('.main__info').html('Processing<span>This may take few minutes. Please wait.</span>')
    });
});