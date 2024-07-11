$(document).ready(function () {
    function switchTheme(theme) {

        $('html').attr('data-bs-theme', theme);


        $('.themes-list li a').removeClass('active');

        $('.themes-list li a[data-theme="' + theme + '"]').addClass('active');
        $('.current-theme').html(`<i class="bi ${theme === 'light' ? 'bi-brightness-high' : 'bi-moon-fill'}"></i> ${theme === 'light' ? 'Claro' : 'Escuro'}`);
    }


    $('.themes-list li a').on('click', function (e) {
        e.preventDefault();

        let icon = $('.custom-icon-size');

        if (icon.css('color') === 'rgba(31, 45, 71, 0.8)') {
            icon.css('color', 'white');
        } else if (icon.css('color') === 'rgb(255, 255, 255)') {
            icon.css('color', 'rgba(31, 45, 71, 0.8)');
        }


        let theme = $(this).data('theme');
        switchTheme(theme);
    });

    let initialTheme = 'light';
    switchTheme(initialTheme);



});

