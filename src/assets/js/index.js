// mvのフェードイン
/* $(function () {
    // 一旦hide()で隠してフェードインさせる
    $('#mv').hide().fadeIn(3000)
}); */
// mvのフェードイン-END


/*  // mvのVegas
var ww = window.innerWidth || document.documentElement.clientWidth || 0;
if (ww > 768) {
     var srcBgArray = [{
             src: 'assets/img/kv_photo_01.jpg'
         },
         {
             src: 'assets/img/kv_photo_02.jpg'
         },
         {
             src: 'assets/img/kv_photo_03.jpg'
         },
         {
             src: 'assets/img/kv_photo_04.jpg'
         },
         {
             src: 'assets/img/kv_photo_05.jpg'
         },
         {
             src: 'assets/img/kv_photo_06.jpg'
         },
     ];
 } else {
     var srcBgArray = [{
             src: 'assets/img/kv_photo_01-sp.jpg'
         },
         {
             src: 'assets/img/kv_photo_02-sp.jpg'
         },
         {
             src: 'assets/img/kv_photo_03-sp.jpg'
         },
         {
             src: 'assets/img/kv_photo_04-sp.jpg'
         },
         {
             src: 'assets/img/kv_photo_05-sp.jpg'
         },
         {
             src: 'assets/img/kv_photo_06-sp.jpg'
         }
     ];
 }
 $(function () {
     $("#mv").vegas({
         slides: srcBgArray,
         transition: "fade",
         transitionDuration: 9000,
         delay: 3000,
         animation: "random",
         animationDuration: 8000
     });
 })
 // mvのVegas-END */


/* ========================================================
SP 追従btn
=========================================================*/
//スムーズスクロール-表示方法
$(document).ready(function () {
    $("#topBtn").hide(); //とりあえず隠す
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) { //100以上にスクロールされた／されている時は
            $("#topBtn").fadeIn("fast"); //ふわっと表示
        } else { //それ意外は
            $("#topBtn").fadeOut("fast"); //ふわっと非表示
        }
    });
});
//スムーズスクロール-表示位置
$(document).ready(function () {
    $("#topBtn").hide();
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            $("#topBtn").fadeIn("fast");
        } else {
            $("#topBtn").fadeOut("fast");
        }
        scrollHeight = $(document).height(); //ドキュメントの高さ 
        scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
        footHeight = $("footer").innerHeight(); //footerの高さ（＝止めたい位置）
        if (scrollHeight - scrollPosition <= footHeight) { //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
            $("#topBtn").css({
                "position": "absolute", //pisitionをabsolute（親：wrapperからの絶対値）に変更
                "bottom": footHeight + 1 //下からfooterの高さ + 1px上げた位置に配置
            });
        } else { //それ以外の場合は
            $("#topBtn").css({
                "position": "fixed", //固定表示
                "bottom": ""
            });
        }
    });
});
/* ========================================================
PC 追従btn
=========================================================*/
//スムーズスクロール-表示方法
$(document).ready(function () {
    $("#pctopBtn").hide(); //とりあえず隠す
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) { //100以上にスクロールされた／されている時は
            $("#pctopBtn").fadeIn("fast"); //ふわっと表示
        } else { //それ意外は
            $("#pctopBtn").fadeOut("fast"); //ふわっと非表示
        }
    });
});
//スムーズスクロール-表示位置
$(document).ready(function () {
    $("#pctopBtn").hide();
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 100) {
            $("#pctopBtn").fadeIn("fast");
        } else {
            $("#pctopBtn").fadeOut("fast");
        }
        scrollHeight = $(document).height(); //ドキュメントの高さ 
        scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
        footHeight = $("footer").innerHeight(); //footerの高さ（＝止めたい位置）
        if (scrollHeight - scrollPosition <= footHeight) { //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
            $("#pctopBtn").css({
                "position": "absolute", //pisitionをabsolute（親：wrapperからの絶対値）に変更
                "bottom": footHeight + 1 //下からfooterの高さ + 1px上げた位置に配置
            });
        } else { //それ以外の場合は
            $("#pctopBtn").css({
                "position": "fixed", //固定表示
                "bottom": ""
            });
        }
    });
});




/* ヘッダーの背景を白に変える */
$(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
        $('.header').addClass('is-active');
    } else {
        $('.header').removeClass('is-active');
    }
});
/* End ヘッダーの背景を白に変える */
/* $(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
        $('.vision').addClass('is-active');
    } else {
        $('.vision').removeClass('is-active');
    }
}); */

/* End ヘッダーの背景を白に変える */
/* $(window).scroll(function () {
    if ($(window).scrollTop() > 400) {
        $('.gnav-btn').addClass('is-active');
    } else {
        $('.gnav-btn').removeClass('is-active');
    }
});
 */

/* ========================================================
スクロールでトップに戻るボタンを表示
=========================================================*/
// スクロールして何ピクセルでアニメーションさせるか
var px_change = 1;
// スクロールのイベントハンドラを登録
window.addEventListener('scroll', function (e) {
    // 変化するポイントまでスクロールしたらクラスを追加
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > px_change) {
        document.getElementById("btn-backtotop").classList.add("fadein");

        // 変化するポイント以前であればクラスを削除
    } else {
        document.getElementById("btn-backtotop").classList.remove("fadein");
    }

});

/* ========================================================
トップに戻るボタンのスムーズスクロール
=========================================================*/
$('a[href^="#"]').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({
        scrollTop: position
    }, speed, "swing");
    return false;
});

window.onscroll = function () {
    var calHeight = window.pageYOffset;
    var docHeight = $(document).height();
    var ftrHeight = $(window).height();

    if (calHeight > docHeight - ftrHeight - 600) {
        $('#btn-backtotop').fadeOut(300);

    } else {
        $('#btn-backtotop').fadeIn(300);
    }
};

/* アコーディオン */
$(function () {
    $('.js-menu__item__link').each(function () {
        $(this).on('click', function () {
            $(this).toggleClass("on");
            $("+.submenu", this).slideToggle();
            return false;
        });
    });
});

/* ハンバーガーメニュー記述 */
$('.gnav-btn').on('click', function () {
    $('.gnav').toggleClass('is-active');
});
$('.gnav-btn').on('click', function () {
    $('.line').toggleClass('is-active');
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $('.header').addClass('is-active');
    } else {
        $('.header').removeClass('is-active');
    }
});
$('.gnav__txt a[href]').on('click', function () {
    $('.gnav-btn').trigger('click');
});

/* ハンバーガーメニュー記述-END */
2

new ScrollHint('.js-scrollable', {
  applyToParents: true,
  i18n: {
    scrollable: 'スクロールできます'
  }
});