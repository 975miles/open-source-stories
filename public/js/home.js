function expand(menuName) {
    $(".home-button-big").finish();
    $(".home-button-big.home-button-left").animate({width: '0%', 'margin-left': '0%'}, 1000, 'swing', () => $(".home-button-big.home-button-left").hide());
    $(".home-button-big.home-button-right").animate({width: '0%', 'margin-right': '0%'}, 1000, 'swing', () => $(".home-button-big.home-button-right").hide());
    let menu = $(`#${menuName}Menu`);
    menu.css({width: '0%'});
    menu.finish();
    menu.show();
    menu.animate({width: '100%'}, 1000);
}

function collapse(menuName) {
    $(".home-button-big").finish();
    $(".home-button-big").show();
    $(".home-button-big.home-button-left").animate({width: '100%', 'margin-left': '5%'}, 1000);
    $(".home-button-big.home-button-right").animate({width: '100%', 'margin-right': '5%'}, 1000);
    let menu = $(`#${menuName}Menu`);
    menu.finish();
    menu.animate({width: '0%'}, 1000, 'swing', () => menu.hide());
}

for (let i of ['read', 'contribute'])
    $(`#${i}Menu`).hide();