//= libraries/jquery/dist/jquery.js
//= libraries/baron/baron.js

$(function() {
    $('.js-main').on('click', function(){
       $(this).empty().addClass('btn_circle');
        $('.main').toggleClass('processing');
        $('.main__info').html('Processing<span>This may take few minutes. Please wait.</span>')
    });

    $('.js-scroller').baron({
        scroller: '.scroller',
        barOnCls: 'baron-show-scroll',
        bar: '.scroller__bar'
    });

    $('.js-description-popup').each(function (i, el) {
        new DescriptionPopup(el);
    });
});

function DescriptionPopup(element) {
    this.element = $(element);
    this.content = this.element.find('.js-description-scroller');

    this.initContentHeight();
    this.initBindings();
}

DescriptionPopup.prototype.proxy = function (callback) {
    if (typeof callback === 'string') {
        callback = this[callback];
    }

    return $.proxy(callback, this);
};

DescriptionPopup.prototype.initContentHeight = function () {
    this.content.height(this.element.height() - this.content.position().top + parseInt(this.element.css('padding-top')));
    setTimeout(this.proxy(function () {
        this.content.trigger('sizeChange');
    }), 1);
};

DescriptionPopup.prototype.initBindings = function () {
    $(window).on('resize', this.proxy('initContentHeight'));

    $('.js-description-caller').off('descriptionPopup.click').on('click', this.proxy(function(event){
        event.preventDefault();
        event.stopImmediatePropagation();
        this.element.toggleClass('show');
    }));

    this.element.on('click', '.js-description-close', this.proxy(function (event) {
        event.preventDefault();
        this.element.removeClass('show');
    }));

    this.element.on('click', function (event) {
        event.stopImmediatePropagation();
    });

    $(window).on('click', this.proxy(function () {
        this.element.removeClass('show');
    }));
};
