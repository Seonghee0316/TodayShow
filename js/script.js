// 처음 페이지가 로딩됐을 때
scrollHandler();
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// auto focus를 회원가입이나 로그인할때 주려고 했는데 커서가 안 생긴다 ...
/* $(document).ready(function () {
    $("#loginInputEmail").focus();
    $("#joinInputEmail1").focus();
});

document.getElementById("loginInputEmail").focus();
 */

// onclick="getFocus()"
/* function getFocus() {
    document.getElementById("loginInputEmail").focus();
  }
  
  function loseFocus() {
    document.getElementById("loginInputEmail").blur();
  } */


/* navbar */
// navbar의 공연 클릭시 스크롤 이동
$('.showbtn').on('click', function () {
    var btnId = $(this).attr('id');
    $('.DividingTitle').each(function () {
        if (btnId === 'bestbtn') {
            $('html,body').animate({
                scrollTop: $('#bestList').position().top + 20
            }, 600)
        } else if (btnId === 'hotbtn') {
            $('html,body').animate({
                scrollTop: $('#hotList').position().top + 20
            }, 600)
        } else if (btnId === 'trendybtn') {
            $('html,body').animate({
                scrollTop: $('#trendyList').position().top + 20
            }, 600)
        }
    })
})

// 검색어 alert창 (메인페이지와 찜한 목록의 검색창)
$('.search button').on('click', function () {
    var searchVal = $('.' + $(this).attr('id') + ' input').val();
    if (searchVal === '') {
        alert('검색어를 입력해주세요!');
    } else {
        alert("'" + searchVal + "'에 대해 검색중입니다. 잠시만 기다려주세요!");
        $('.' + $(this).attr('id') + ' input').val('');
    }
})

// 회원가입
$('#joinInputEmail1').on('input', checkEmail);
$('#joinInputPassword1').on('input', checkPwd);
$('#joinInputPassword2').on('input', checkPwd);

function checkEmail() {
    // 이메일에 @와 .이 반드시 들어가야 함.
    // xodgl@daum.net
    var atSign = $('#joinInputEmail1').val().indexOf('@');
    var period = $('#joinInputEmail1').val().indexOf('.');
    if ($('#joinInputEmail1').val() == '' || atSign != -1 && period != -1 && atSign < period) {
        // 여기에 비밀번호 까지 잘 입력 했으면 가입 버튼 색깔 파란색으로!
        // emailHelp 텍스트 지우기!
        document.getElementById('emailHelp').innerHTML = '';

    } else {
        // $('#emailHelp') 에 innerhtml(?) 텍스트 입력하기!
        document.getElementById('emailHelp').innerHTML = '이메일 형식에 맞게 써주세요!';
    }
}

function checkPwd() {
    var pwd1 = $('#joinInputPassword1').val();
    var pwd2 = $('#joinInputPassword2').val()
    if (pwd1 != '' && pwd2 != '' && pwd1 != pwd2) {
        document.getElementById('passwordHelp').innerHTML = '비밀번호 두개가 다릅니다.';
    } else {
        document.getElementById('passwordHelp').innerHTML = '';
    }
}

// 세개의 input창에 값이 있고, 두개의 innerhtml 값이 ''일 때 버튼 색 변경

$('#joinbtn').on('click', function () {
    if ($('#joinInputEmail1').val() != '' && $('#joinInputPassword1').val() != '' && $('#joinInputPassword2').val() != '') {
        if (document.getElementById('emailHelp').innerHTML === '' && document.getElementById('passwordHelp').innerHTML === '') {
            location.href = "../todayShow/index.html";
        } else {
            alert('형식에 맞지 않는 부분이 있습니다.')
        }
    } else {
        alert('입력하지 않은 부분이 있습니다.');
    }

})

var loginval;   //로그인 상태
// 로그인
$('#loginbtn').on('click', function () {
    var inputEmail = $('#loginInputEmail').val();
    var inputPwd = $('#loginInputPassword').val();
    if (inputEmail === 'test@gmail.com') {
        if (inputPwd === '1234') {
            loginval = true;
            // alert(inputEmail + '님 환영합니다!');

            //회원 가입과 로그인 버튼 숨기고 계정관리와 로그아웃 버튼 보이게 하기 (mypage)
            $('#join').hide();
            $('#login').hide();
            $('#mypage').show();
            
            // location.href = '../todayShow/index.html';
            /*             $.ajax({
                            async: true,
                            type: 'GET',
                            url: '/PersonsAjax/Header',
                            data: {},
                            success: function (data) {
                
                                $("#loading-header").hide();
                
                                console.debug("Is there a header? " + $("#header").size());
                                $("#header").show();  // **** PROBLEM *****
                            }
                
                    }); */

            /*             $.ajax({
                            type: "POST",
                            url: "../todayShow/index.html",
                            data: {
                                inputEmail: inputEmail
                            },
                            success: function (data) {
                                alert('hiii');
                            },
                            error: function (xhr, status, error) {}
                        }); */


        } else {
            alert('비밀번호가 다릅니다.');
            $('#loginInputPassword').val('');
            document.getElementById("loginInputPassword").focus();
        }

    } else if (inputEmail === '' || inputPwd === '') {
        alert('아이디와 비밀번호를 입력해주세요.')
        document.getElementById("loginInputEmail").focus();

    } else {
        alert('존재하지 않는 이메일 입니다.');
        $('#loginInputEmail').val('');
        document.getElementById("loginInputEmail").focus();
    }
})

// 로그인 이메일 저장 (remember me)
$(function () {
    if (localStorage.chkbox && localStorage.chkbox != '') {
        $('#checkbox').attr('checked', 'checked');
        $('#loginInputEmail').val(localStorage.username);
        // $('#loginInputPassword').val(localStorage.pass);
    } else {
        $('#checkbox').removeAttr('checked');
        $('#loginInputEmail').val('');
        // $('#loginInputPassword').val('');
    }

    $('#checkbox').click(function () {

        if ($('#checkbox').is(':checked')) {
            // save username and password
            localStorage.username = $('#loginInputEmail').val();
            // localStorage.pass = $('#loginInputPassword').val();
            localStorage.chkbox = $('#checkbox').val();
        } else {
            localStorage.username = '';
            // localStorage.pass = '';
            localStorage.chkbox = '';
        }
    });
});

// 로그아웃
$('#logout').on('click', function () {
    $('#join').show();
    $('#login').show();
    $('#mypage').hide();
    loginval = false;
    location.href = '../todayShow/index.html';
})

/* 마이페이지 */

// 기본
$('#changeMyPwdbtn').on('click', function () {
    if ($('#currentPwd').val() === '1234') {
        $('.defualtMypage').hide();
        $('.pwdChangepage').show();
    } else if ($('#currentPwd').val() === '') {
        alert('비밀번호를 입력해주세요.');
    } else {
        alert('비밀번호가 다릅니다.');
        $('#currentPwd').val('');
        document.getElementById("currentPwd").focus();
    }
})

// 계정관리 > 비밀번호 변경 > 취소 버튼
function click_cancel() {
    location.href = '../todayShow/index.html';
}

// 비밀번호 변경
$('#changePwd').on('click', function () {
    document.getElementById('accountTitle').innerHTML = '마이페이지 > 비밀번호 변경';
    if ($('#currentPwd').val() === '1234') {
        var pwd = $('#changeMyPwd').val();
        var pwd2 = $('#changeMyPwd2').val()
        if (pwd != '' || pwd2 != '') {
            if (pwd === pwd2) {
                alert('비밀번호가 변경되었습니다!');
                location.href = '../todayShow/index.html';
            } else {
                alert('비밀번호 두개가 다릅니다.');
            }
        } else {
            alert('비밀번호를 입력하세요.');
        }
    } else {
        alert('비밀번호가 다릅니다.');
        $('#currentPwd').val('');
        document.getElementById("currentPwd").focus();
    }
})

//회원 탈퇴
$('#withdrawbtn').on('click', function () {
    if ($('#currentPwd').val() === '1234') {
        var select = confirm('정말 탈퇴하시겠습니까?');
        if (select) {
            location.href = '../todayShow/index.html';
        } else {
            alert('잘 생각하셨어요!');
        }
    } else if ($('#currentPwd').val() === '') {
        alert('비밀번호를 입력해주세요.')
    } else {
        alert('비밀번호가 다릅니다.')
        $('#currentPwd').val('');
        document.getElementById("currentPwd").focus();
    }
})


/* 공연 찜하기 누르면 mypage의 찜한 목록으로 이동 */
$('.mydibs').on('click', goDibsModal);

// $('.goDibsModal').on('click', goDibsModal);
$('.goDibsModal').on('click', function () {
    if (loginval === true) {
        var select = confirm('찜 완료되셨습니다. 찜 목록 페이지로 이동할까요?');
        if (select) {
            goDibsModal();
        }
    } else {
        alert('로그인 해주세요!');
    }
});

function goDibsModal() {
    $('#Modal4').modal();
    $('body').css("overflow", "hidden");
}
/* 
$('#Modal4').on('click', function() {
    $('body').css("overflow", "hidden");
}) */
$('#closeModal4').on('click', showScroll);

function showScroll() {
    $('body').css("overflow", "scroll");
}

$(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
        showScroll();
    }
})

/* $('#closeModal4').on('click', function() {
    $('body').css("overflow", "scroll");
}) */
/* 마이페이지 > 찜한 목록 */
$('.deletebox .deletebtn').on('click', function () {
    console.log(this.id);
    var id = this.id;
    if (confirm('삭제하시겠습니까?')) {
        $('.' + id).remove();
    }

    console.log($('.gridbox2').length);
    if ($('.gridbox2').length === 0) {
        document.getElementById('mydibslist').innerHTML = '찜한 목록이 없습니다.';
    }
})

// $('#changeMyPwdbtn').on('click', function () {})

/* carousel */
// 찜 버튼 클릭시 팝업 0.5초 이내로 부드럽게 나타나기
$('.popup-trigger').on('click', function () {
    $('#popup').fadeIn(500);
})

$('#close-btn').on('click', fadeOut);

function fadeOut() {
    $('#popup').fadeOut(500);
}

$(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
        fadeOut();
    }
})

/* content */
// gridbox를 클릭하면 예매하러 가기 | 찜하기 모달 or select창 띄우기

$('.gridbox a').on('click', function (e) {
        e.preventDefault(); // 페이지 이동 안되도록.
    var hrefval = $(this).attr('href');
    console.log('처음 링크' + hrefval);
    // $('.gridbox a').removeAttr('href'); //link 없애기
    // $(this).data('href', $(this).attr('href')).removeAttr('href'); //위랑 같음
    var title = $(this).find("h3").text();
    
    // 현재 클릭된 gridbox의 href값을 후에 뜰 모달의 값에 넣어줌.
    $('.goDibsSite').attr('href', hrefval);
    // $('#dibsModal').find('.modal-body span').text("'" + title + "'" + " 보러 가실래요?");
    $('#dibsModal').find(".modal-body span").css('background-color', '#e1eff7');
    $('#dibsModal').find(".modal-body span").css('font-weight', '500');
    $('#dibsModal').find('.modal-body span').text(title);
    $('#dibsModal').modal('show');
})

$('.goDibsSite').on('click', function () {
    console.log('url잘 옮겨졌나?');
    console.log($(this).attr('href'));
    var url = $(this).attr('href');
    // location.href = $(this).attr('href'); 현재 창에서 열기
    window.open(url);
})

// card에 마우스 갖다대면 제목 부분 색 변경
$('.gridbox').mouseenter(function () {
    $(this).find($('img')).addClass("scale");
    $(this).find($('.grid-contentbox')).css('background-color', 'rgb(252, 236, 236)');
})

$('.gridbox').mouseleave(function () {
    $('.grid-contentbox').css('background-color', 'white');
})

/* 스크롤 이벤트 */
$(window).on('scroll', scrollHandler);

function scrollHandler() {
    // 윈도우 밑부분(윈도우 높이 + 스크롤 높이)이 카드의 절반보다 크면 그 카드 보이게 한다.
    var windowBottom = $(window).height() + $(window).scrollTop();
    $('.gridbox').each(function () {
        var cardlist = $(this);
        var cardlistHalf = cardlist.position().top + cardlist.outerHeight() / 4;

        if ($(window).height() > cardlist.position().top || windowBottom >= cardlistHalf) {
            cardlist.animate({
                opacity: '1'
            }, 1500);
        }
    })

    // top button
    // 현재 브라우저의 밑 부분이 페이지 높이보다 크거나 같으면 나타남.
    if ($(document).height() - 100 <= Math.ceil(windowBottom)) {
        // 버튼보이게 함
        $('.to-top-btn').fadeIn();
    } else {
        $('.to-top-btn').fadeOut();
    }
}


$('.to-top-btn').on('click', function () {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
});

$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('오늘의 공연 [문의사항] ')
    modal.find('.modal-body input').val(recipient)
    $('.sendMSG').on('click', function () {
        alert('문의사항이 전달되었습니다. 2-3일내에 연락드리겠습니다.');
        // location.href = '../todayShow/index.html';
    })
})

/* 글씨 꾸미기 */
let spans = document.querySelectorAll('.word span');
spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});