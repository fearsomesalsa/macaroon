$(document).ready(function () {

    let menu = $('#menu');

    $('#burger').click(function () {
        menu.addClass('open');
    });

    menu.children().click(() => {
        menu.removeClass('open');
    });

    let loader = $('.loader');
    let phone = $('#phone');

    $('#submit').click(() => {
        let product = $('#product');
        let name = $('#name');
        let hasError = false;

        $('.form__error-input').hide();

        if (!product.val()) {
            product.parent().next().show();
            hasError = true;
        }

        if (!name.val()) {
            name.parent().next().show();
            hasError = true;
        }

        if (!phone.val()) {
            phone.parent().next().show();
            hasError = true;
        }


        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "http://testologia.site/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('.order__info').html('Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!').css({
                            alignSelf: 'center',
                            display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            fontSize: '45px',
                            fontFamily: 'TavolgaFree, sans-serif',
                            fontWeight: 'normal'
                        })
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    })


    $('.main__button').click(() => {
        $('.products__subtitle')[0].scrollIntoView({behavior: "smooth"});
    });

    $('.products__button').click((event) => {
        $('.order__subtitle')[0].scrollIntoView({behavior: "smooth"});
        $('#product').val($(event.target).parents('.product').find('.product__title').text());
    })

    phone.inputmask({"mask": "+375 (99) 999 - 99 - 99"});


});