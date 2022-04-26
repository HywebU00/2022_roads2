$(function(){

  var _html = $('html');
  var _body = $('body');
  var _window = $(window);

  const wwSlim = 480;
  const wwMedium = 700; //此值以下是手機
  const wwNormal = 960;  //此值以上是電腦
  const wwMaximum = 1200;

  var _webHeader = $('.webHeader');
  var _menu = _webHeader.find('.menu');
  var _sidebar = $('.sidebar');

  var ww = _window.width();
  var wwNew = ww;
  var wh = _window.innerHeight();
  var hh = _webHeader.innerHeight();

  _html.removeClass('no-js');

  // --------------------- 外掛套件 slick 參數設定
  $('.imgSlick').find('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.imgSlick .slider-nav'
  });
  $('.imgSlick').find('.slider-nav').slick({
    variableWidth: true,
    slidesToShow: 3,  
    slidesToScroll: 1,
    asNavFor: '.imgSlick .slider-for',
    centerPadding: 0,
    dots: false,
    centerMode: true,
    focusOnSelect: true
  });

  // $('.bigImgShow').slick({
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   fade: true,
  //   cssEase: 'linear'
  // });
  // --------------------- slick 參數設定：結束


  // 計算照片張數
  var _countPhoto = $('.imgSlick').filter('.count');
  _countPhoto.each(function(){
    let _this = $(this);
    _this.prepend('<div class="photoCount"><span class="current" title="目前位置"></span><span class="total" title="總張數"></span></div>');
    let _photoCount = _this.find('.photoCount');
    let _current = _photoCount.find('.current');
    let _total = _photoCount.find('.total');
    let _countThis = _this.find('.slider-for');

    _total.text(_countThis.find('.slick-slide').length);
    _current.text( _countThis.find('.slick-current').index()+1);

    _this.find('.slick-arrow').click( function(){
      _current.text( _countThis.find('.slick-current').index()+1);
    })
  })
  


  // 製作側欄選單遮罩
  _body.append('<div class="sidebarMask"></div>');

  // 找出_menu中有次選單的li
  _menu.find('li').has('ul').addClass('hasChild');

  // 行動版＊側欄選單
  //複製「主選單」到側欄給行動版用
  _menu.clone().prependTo(_sidebar);
  $('.topNav').clone().appendTo(_sidebar);
  var _sidebarCtrl = _webHeader.find('.sidebarCtrl');
  var _sidebarMenu = _sidebar.find('.menu');
  var _sidebarMask = $('.sidebarMask');
  _sidebarMenu.each( function(){
    let _hasChild = $(this).find('.hasChild>a');
    _hasChild.click(
      function(e){
        e.preventDefault();
  
        let _this = $(this);
        let _subMenu = _this.next('ul');
  
        if (_subMenu.is(':hidden')) {
          _subMenu.stop(true, false).slideDown();
          _this.parent().addClass('closeIt');
        } else {
          _subMenu.stop(true, false).slideUp();
          _this.parent().removeClass('closeIt');
        }
      }
    )
  })


  // 寬版主選單 -----------------------------------------------------
  _menu.each( function(){
    let _this = $(this);
    let _hasChild = _this.find('.hasChild');
    let _hasChildTop = _this.children('ul').children('.hasChild');
    let subMenuH;
    let _hasChildA = _hasChild.children('a');
    let liA = _this.find('li>a');

    // let _subMenuA = _this.children('ul').find('ul').find('a');
    
    _hasChild.hover(
      function(){
        wh = _window.height();
        hh = _webHeader.innerHeight();

        // $(this).children('ul').stop(true, false).slideDown(300);
        $(this).children('ul').show(0, function(){

          // console.log(!$(this).parent().is(_hasChildTop));
          if ( !$(this).parent().is(_hasChildTop) ) {
            $(this).css('left', $(this).prev().innerWidth());
            // $(this).parent('li').parent('ul').removeAttr('style').show();
          }

          subMenuH = $(this).innerHeight();
          if ( subMenuH > wh - hh) {
            console.log(subMenuH);
            // console.log( $(this).mousemove(function(e){ e.pageX, e.pageY} ))
          }
            // $(this).css( {
            //   'height': wh - hh - 20 ,
            //   'overflow-y' : 'scroll',
            // });

        });
      },
      function(){
        // $(this).children('ul').stop(true, false).slideUp(200);
        $(this).children('ul').hide().removeAttr('style');
      }
    );
    
    _hasChildA.focus(function(){
      $(this).next('ul').show();
      $(this).parent('li').addClass('here').siblings().removeClass('here');
    })


    liA.focus(function(){
      $(this).parent('li').siblings().find('ul').hide();
    })

    // let mt = 0;
    // liA.mouseenter(
    //   function(e){
    //     // console.log( e.pageY, e.clientY )
    //     let moveUp = $(this).innerHeight();
    //     if ( e.clientY > wh - moveUp*1.5) {
    //       console.log('yes');
    //       $(this).parent('li').parent('ul').animate({
    //         'margin-top' : mt - moveUp
    //       }, 600, function(){
    //         mt = mt - moveUp;
    //       });
    //     } else {
    //       console.log('no');
    //       $(this).parent('li').parent('ul').css({
    //         'margin-top' : 0
    //       });
    //     }
    //   }
    // )

    // blur 隱藏所有次選單
    // _subMenuA.blur(function(){
    //   if ( $(this).parent('li').next().length == 0 && !($(this).parent('li').hasClass('hasChild'))) {
    //     $(this).parent('li').parent().hide();
    //   }
    // })

  })


  // 固定版頭 -----------------------------------------------------
  function fixHeader(){
    hh = _webHeader.innerHeight();
    if (_window.scrollTop() > hh ) {
      _webHeader.addClass('fixed').css('top', -1*hh);
      _body.offset( {top : hh})
    } 
    if(_window.scrollTop() == 0 ) {
      _webHeader.removeClass('fixed').css('top', 0);
      _body.offset( {top : 0})
    }
  }

  // 清除固定版頭時產生的 style 屬性
  function fxH_clearStyle() {
    _webHeader.removeAttr('style').removeClass('fixed');
    _body.removeAttr('style');
  }

  if (ww >= wwNormal) {
    _window.on('scroll.fixHeader' , fixHeader);
  } else {
    _window.off('.fixHeader');
    fxH_clearStyle();
  }

  // 行動版側欄開關
  _sidebarCtrl.click(function(){
    if (_sidebar.hasClass('reveal')) {
      _sidebar.removeClass('reveal');
      _sidebarCtrl.removeClass('closeIt');
      _sidebarMask.fadeOut(400);
      _body.removeClass('noScroll');
    } else {
      _sidebar.addClass('reveal');
      _sidebarCtrl.addClass('closeIt');
      _sidebarMask.fadeIn(400);
      _body.addClass('noScroll')
    }
  })
  _sidebarMask.click(function(){
    _sidebar.removeClass('reveal');
    _sidebarCtrl.removeClass('closeIt');
    _body.removeClass('noScroll');
    $(this).fadeOut(400);
  })

  let winResizeTimer0;
  _window.resize(function () {
    clearTimeout(winResizeTimer0);
    ww = _window.width();

    winResizeTimer = setTimeout(function () {
      if(ww >= wwNormal) {
        _sidebarMask.hide();
        _body.removeClass('noScroll');
        _sidebar.removeClass('reveal');
        _sidebarCtrl.removeClass('closeIt');

        // fix header on
        _window.on('scroll.fixHeader' , fixHeader);
      } else {
        _menu.hide().removeAttr('style');

        // fix header off
        _window.off('.fixHeader');
        fxH_clearStyle();
      }
    }, 200);
  });




  // 查詢區開合 -----------------------------------------------------
  var _searchCtrl = $('.searchCtrl');
  var _search = $('.search');
  var _closeSearch = _search.find('.closeThis');
  _search.append('<button class="skip" type="button">離開</button>');
  var _searchSkip = _search.find('.skip');
  _searchCtrl.click(function(){
    if( _search.hasClass('reveal')) {
      searchHide();
    } else {
      _search.show(0, function(){
        $(this).addClass('reveal');
      });
    }
  })
  _closeSearch.click(function () {
    searchHide();
  })
  function searchHide(){
    _search.removeClass('reveal');
    setTimeout(function(){_search.removeAttr('style')}, 800);
  }
  _searchSkip.focus(function(){
    _closeSearch.focus();
  })
 


  // --------------------- 外掛套件 slick 參數設定
  // 首頁大圖輪播
  $('.bigBanner').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    speed: 800,
    autoplay: true,
    arrows: true,
    fade: false,
    infinite: true,
  });

  // --------------------- slick 參數設定：結束




  // fatfooter 開合 -----------------------------------------------------
  var _fatFootCtrl = $('.fatFootCtrl');
  var _footSiteTreeNav = $('.fatFooter').find('.siteTree');
  var _footSiteTree = $('.fatFooter').find('.siteTree>ul>li>ul');
  const text1 = _fatFootCtrl.text();
  const text2 = _fatFootCtrl.attr('data-altText');

  _fatFootCtrl.click(function(){
    if ( _footSiteTree.is(':visible')) {
      _footSiteTree.slideUp();
      _footSiteTreeNav.addClass('short');

      $(this).addClass('closed').text(text2);
    } else {
      _footSiteTree.slideDown();
      _footSiteTreeNav.removeClass('short');

      $(this).removeClass('closed').text(text1);
    }
  })


  // 向上捲動箭頭 -----------------------------------------------------
	var _goTop = $('.goTop');
  _goTop.click(function(){
    _html.stop(true,false).animate({scrollTop: 0}, 800);
  });
	_window.scroll(function() {
		if ( $(this).scrollTop() > 200){
			_goTop.addClass('show');
		} else {
      _goTop.removeClass('show');
		}
	});


  // 右側點點快速連結 -----------------------------------------------------
  // var _main = $('.main');
  // var _mainRow = _main.children('.row');
  // var roleCount = _mainRow.length;
  // var rowDotLi = '';
  // _body.append('<nav class="mpNav"><ul></ul></nav>');
  // var _navDotsUl = $('.mpNav>ul');

  // // 產生<li><a>元件
  // for (let n = 0; n < roleCount; n++) {
  //   let rowtext = _mainRow.eq(n).find('.blockHeader>h2').text();
  //   rowDotLi = rowDotLi + `<li><a href="#row${n}" title="${rowtext}"></a></li>`;
  //   _mainRow.eq(n).attr('id', 'row' + n);
  // }
  // _navDotsUl.append(rowDotLi);
  // var _navDots = _navDotsUl.find('li');
  // var navDotTop;

  // _navDots.children('a').focus( function(e){
  //   e.preventDefault();
  //   let _dotliNow = $(this).parent();
  //   _dotliNow.addClass('focused').siblings().removeClass('focused');

  // })
  // _navDots.children('a').click(function(e){
  //   e.preventDefault();
  //   let _dotliNow = $(this).parent();
  //   _dotliNow.addClass('focused').siblings().removeClass('focused');

  //   navDotTop = _mainRow.eq(_dotliNow.index()).offset().top;

  //   _html.stop(true, false).animate({'scrollTop': navDotTop }, 800, function(){
  //     setTimeout(() => {
  //       _navDots.removeClass('focused');
  //     }, 1000);
  //   });
  // })


  // 大圖自動輪播 -----------------------------------------------------
  var _bigBanner = $('.bigBanner');
  // _bigBanner.each( function() {
  //   let _this = $(this);
  //   let _floxBox = _this.find('.flowBox');
  //   let _flowList = _floxBox.find('.flowList');
  //   let _flowItem = _flowList.children('li');
  //   let count = _flowItem.length;
  //   let _btnRight = _this.find('.diskBtn.next');
  //   let _btnLeft = _this.find('.diskBtn.prev');
  //   const speed = 900;
  //   const duration = 4000;
  //   const actClassName = 'active';
  //   let i = 0;
  //   let j;
  //   let _dots = '';
  //   let _indicatItem;
    
  //   if (count > 1){
  //     // 產生 indicator
  //     _floxBox.append('<div class="flowNav"><ul></ul></div>');
  //     let _indicator = _this.find(".flowNav>ul");
  //     for (let n = 0; n < count; n++) {
  //       _dots = _dots + '<li></li>';
  //     }
  //     _indicator.append(_dots);
  //     _indicatItem = _indicator.find('li');
  //     _indicatItem.eq(i).addClass(actClassName);
  //   } else {
  //     _btnRight.add(_btnLeft).hide();
  //   }

  //   // 開始自動輪播
  //   let autoLoop = setInterval( slideForward , duration);


  //   // 滑鼠移入、移出輪播區
  //   _floxBox.mouseenter(function(){
  //     clearInterval(autoLoop);
  //   });
  //   _floxBox.mouseleave(function(){
  //     autoLoop = setInterval( slideForward , duration);
  //   });

  //   function slideForward() {
  //     j = (i + 1) % count;
  //     _flowItem.eq(i).stop(true, false).animate({'left': '-100%'}, speed, function(){
  //       $(this).css('left', '100%');
  //     })
  //     _flowItem.eq(j).stop(true, false).animate({ 'left': 0}, speed);
  //     _indicatItem.eq(i).removeClass(actClassName);
  //     _indicatItem.eq(j).addClass(actClassName);
  //     i = j;
  //   }

  //   function slideBackward() {
  //     j = (i - 1) % count;
  //     _flowItem.eq(j).css('left', '-100%').stop(true, true).animate({left: 0} , speed);
  //     _flowItem.eq(i).stop(true, true).animate({'left': '100%'}, speed );
  //     _indicatItem.eq(i).removeClass(actClassName);
  //     _indicatItem.eq(j).addClass(actClassName);
  //     i = j;
  //   }

  //   // 點擊向右箭頭
  //   _btnRight.click(function () { 
  //     clearInterval(autoLoop);
  //     slideForward();
  //   });

  //   // 點擊向左箭頭
  //   _btnLeft.click(function () {
  //     clearInterval(autoLoop);
  //     slideBackward();
  //   });
  //   _btnRight.add(_btnLeft).focus(function(){
  //     clearInterval(autoLoop);
  //   })

  //   // touch and swipe 左右滑動
  //   _floxBox.swipe({
  //     swipeRight: function () {slideBackward();},
  //     swipeLeft: function () {slideForward();},
  //     threshold: 20,
  //   });      


  //   // 改變視窗大小時，暫停自動輪播
  //   let winResizeTimer;
  //   _window.resize(function () {
  //     clearTimeout(winResizeTimer);
  //     winResizeTimer = setTimeout(function () {
  //       clearInterval(autoLoop);
  //       autoLoop = setInterval( slideForward , duration);
  //     }, 200);
  //   });

  //   // tab 鍵遊走
  //   _flowItem.children('a').focus(function(){
  //     clearInterval(autoLoop);
  //     $(this).parent().css('left', 0).siblings().css('left', '-100%');
  //     i = $(this).parent().index();
  //     _indicatItem.removeClass(actClassName).eq(i).addClass(actClassName);
  //   })
  //   _flowItem.last().children('a').blur( function(){
  //     _flowItem.css('left', '100%');
  //     _flowItem.last().css('left', 0);
  //     i = count - 1;
  //     j = (i + 1) % count;
  //   })
  //   _floxBox.focusout( function(){
  //     clearInterval(autoLoop);
  //     autoLoop = setInterval( slideForward , duration);
  //   })

  // })

  
  
  // .flow2：寬版顯示兩筆完整，第三筆顯示局部 ------------------------------
  var _flow2 = $('.flow2');
  _flow2.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 600;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    // 產生 indicator
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 1; n <= slideCount; n++) {
      _dots = _dots + '<li>' + n +'</li>';
    }
    _indicator.append(_dots);
    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      if (ww < wwMedium ) {
        if ( slideCount > 1) {
          flownavShow();
        } else {
          flownavHide()
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 2) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }


    function slideForward() {
      _flowList.stop(true, false).animate({ 
        'margin-left': -1 * slideDistance }, speed, function () {
          j = (i + 1) % slideCount;
          _flowItem.eq(i).appendTo(_flowList);
          _indicatItem.eq(i).removeClass(actClassName);
          _indicatItem.eq(j).addClass(actClassName);
          _flowList.css('margin-left', 0);

          // if (ww >= wwMedium) {
          //   _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
          // }
          if (ww >= wwNormal) {
            _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
            // _indicatItem.eq((j + 2) % slideCount).addClass(actClassName);
          }
          i = j;
        });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css('margin-left', -1 * slideDistance);

      _flowList.stop(true, false).animate({ 'margin-left': 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            // _indicatItem.eq(i).removeClass(actClassName);
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          // } else if (ww >= wwMedium) {
          //   _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });

    // tab focus
    let tabCount = 0;
    _flowItem.children('a').focus(function (e) { 
      e.preventDefault();
      if ( tabCount > 0 && tabCount <= slideCount) {
        slideForward();
      }
      tabCount++
      if(tabCount > slideCount) {
        _btnLeft.focus();
        tabCount = 0;
      }
    });
    var winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });


  });

  
  
  // 點選左右箭頭滑動（非自動輪播） -----------------------------------------
  // .flow3：寬版顯示三筆，每筆等寬，第四筆顯示局部 -----------------------------------------
  var _flow3 = $('.flow3');
  _flow3.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 600;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    // 產生 indicator
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 1; n <= slideCount; n++) {
      _dots = _dots + '<li>' + n +'</li>';
    }
    _indicator.append(_dots);
    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      if (ww < wwMedium) {
        if (slideCount > 1) {
          flownavShow();
        } else {
          flownavHide();
        }
      }
      if (ww >= wwMedium) {
        if (slideCount <= 2) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 3) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }

    function slideForward(){
      _flowList.stop(true, false).animate({'margin-left': -1 * slideDistance }, speed, function(){
        j = (i + 1) % slideCount;
        _flowItem.eq(i).appendTo(_flowList);
        _indicatItem.eq(i).removeClass(actClassName);
        _indicatItem.eq(j).addClass(actClassName);
        _flowList.css('margin-left', 0);
        if (ww >= wwMedium) {
          _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
        }
        if (ww >= wwNormal) {
          _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((j + 2) % slideCount).addClass(actClassName);
        }
        i = j;
      });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css("margin-left", -1 * slideDistance);

      _flowList.stop(true, false).animate({ "margin-left": 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            _indicatItem.eq((i + 2) % slideCount).removeClass(actClassName);
          } else if (ww >= wwMedium) {
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });

    // tab focus
    let tabCount = 0;
    _flowItem.children('a').focus(function (e) { 
      e.preventDefault();
      if ( tabCount > 0 && tabCount <= slideCount) {
        slideForward();
      }
      tabCount++
      if(tabCount > slideCount) {
        _btnLeft.focus();
        tabCount = 0;
      }
    });

    let winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });
  });


  

  // .photoflow：cp頁的照片 -----------------------------------------
  var _photoflow = $('.photoflow');
  var _cpBigPhoto = $('.lightbox.bigPhoto');
  
  _photoflow.each(function () {
    let _this = $(this);
    let _floxBox = _this.find('.flowBox');
    let _flowList = _floxBox.find('.flowList');
    let _flowItem = _flowList.children('li');
    let slideDistance = _flowItem.first().outerWidth(true);
    let slideCount = _flowItem.length;
    let _btnRight = _this.find('.diskBtn.next');
    let _btnLeft = _this.find('.diskBtn.prev');
    const speed = 400;
    const actClassName = 'active';
    let i = 0;
    let j;
    let _dots = '';

    

    // 產生 indicator 和 自訂屬性 data-index
    _floxBox.append('<div class="flowNav"><ul></ul></div>');
    let _indicator = _this.find(".flowNav>ul");
    for (let n = 0; n < slideCount; n++) {
      _dots = _dots + '<li></li>';
      _flowItem.eq(n).attr('data-index', n);
      _cpBigPhoto.find('.flowList>li').eq(n).attr('data-index', n);
    }
    _indicator.append(_dots);
    let _indicatItem = _indicator.find('li');
    _indicatItem.eq(i).addClass(actClassName);
    _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);

    // 依據可視的 slide 項目，決定 indicator 樣式
    indicatReady();
    function indicatReady() {
      _indicatItem.removeClass(actClassName);
      _indicatItem.eq(i).addClass(actClassName);
      _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
      if (ww < wwMedium) {
        if (slideCount > 2) {
          flownavShow();
        } else {
          flownavHide();
        }
      }
      if (ww >= wwMedium) {
        if (slideCount <= 3) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
        }
      }
      if (ww >= wwNormal) {
        if (slideCount <= 4) {
          flownavHide();
        } else {
          flownavShow();
          _indicatItem.eq((i + 1) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 2) % slideCount).addClass(actClassName);
          _indicatItem.eq((i + 3) % slideCount).addClass(actClassName);
        }
      }
    }
    function flownavShow(){
      _indicator.add(_btnRight).add(_btnLeft).show();
    }
    function flownavHide(){
      _indicator.add(_btnRight).add(_btnLeft).hide();
    }

    function slideForward(){
      _flowList.stop(true, false).animate({'margin-left': -1 * slideDistance }, speed, function(){
        j = (i + 1) % slideCount;
        _flowItem.eq(i).appendTo(_flowList);
        _indicatItem.eq(i).removeClass(actClassName);
        _indicatItem.eq(j).addClass(actClassName);
        _indicatItem.eq((j + 1) % slideCount).addClass(actClassName);
        _flowList.css('margin-left', 0);
        if (ww >= wwMedium) {
          _indicatItem.eq((j + 2) % slideCount).addClass(actClassName);
        }
        if (ww >= wwNormal) {
          _indicatItem.eq((j + 3) % slideCount).addClass(actClassName);
        }
        i = j;
      });
    }
    function slideBackward() {
      j = (i - 1) % slideCount;
      _flowItem.eq(j).prependTo(_flowList);
      _flowList.css("margin-left", -1 * slideDistance);

      _flowList.stop(true, false).animate({ "margin-left": 0 }, speed, function () {
          _indicatItem.eq(j).addClass(actClassName);
          if (ww >= wwNormal) {
            _indicatItem.eq((i + 3) % slideCount).removeClass(actClassName);
          } else if (ww >= wwMedium) {
            _indicatItem.eq((i + 2) % slideCount).removeClass(actClassName);
          } else {
            _indicatItem.eq((i + 1) % slideCount).removeClass(actClassName);
            _indicatItem.eq(i).removeClass(actClassName);
          }
          i = j;
        });
    }

    // 點擊向右箭頭
    _btnRight.click(function () { slideForward(); });

    // 點擊向左箭頭
    _btnLeft.click(function () { slideBackward(); });

    // touch and swipe 左右滑動
    _floxBox.swipe({
      swipeRight: function () {slideBackward();},
      swipeLeft: function () {slideForward();},
      threshold: 20,
    });

    // tab focus
    let tabCount = 0;
    _flowItem.children('a').focus(function (e) { 
      e.preventDefault();
      if ( tabCount > 0 && tabCount <= slideCount) {
        slideForward();
      }
      tabCount++
      if(tabCount > slideCount) {
        _btnLeft.focus();
        tabCount = 0;
      }
    });

    let winResizeTimer;
    _window.resize(function () {
      clearTimeout(winResizeTimer);
      winResizeTimer = setTimeout(function () {
        ww = _window.width();
        slideDistance = _flowItem.first().outerWidth(true);
        indicatReady();
      }, 200);
    });


    // 點照片開啟燈箱 *********************************************
    // _flowItem.children('a').click(function(){
    //   i = $(this).parent().attr('data-index');
    //   console.log(i);
    //   _cpBigPhoto.add(_cover).stop(true, false).fadeIn();

    //   // let _bigPhotoLbx = $('.lightbox.bigPhoto');
    //   let _bbfloxBox = _cpBigPhoto.find('.flowBox');
    //   let _bbflowList = _cpBigPhoto.find('.flowList');
    //   let _bbflowItem = _bbflowList.children('li');
    //   // let count = _bbflowItem.length;
    //   let _bbtnRight = _cpBigPhoto.find('.diskBtn.next');
    //   let _bbtnLeft = _cpBigPhoto.find('.diskBtn.prev');
    //   const speed = 900;
    //   const actClassName = 'show';
    //   // let i = 0;
    //   // let j;

    //   // for ( n = 0; n < count; n++) {
    //   //   _bbflowItem.eq(n).attr('data-index', n);
    //   // }

    //   _bbflowItem.removeClass(actClassName).filter(function(index){
    //     return  $( this ).attr( "data-index" ) === i;
    //   }).addClass(actClassName).siblings();
  
    //   function slideForward() {
    //     j = (i + 1) % slideCount;
    //     _bbflowItem.eq(i).stop(true, false).animate({'left': '-100%'}, speed, function(){
    //       $(this).removeClass(actClassName).removeAttr('style');
    //     })
    //     _bbflowItem.eq(j).stop(true, false).animate({ 'left': 0}, speed, function(){
    //       $(this).addClass(actClassName);
    //     });
    //     i = j;
    //     console.log(i);
    //   }
  
    //   function slideBackward() {
    //     j = (i - 1) % slideCount;
    //     _bbflowItem.eq(j).css('left', '-100%').stop(true, true).animate({left: 0} , speed);
    //     _bbflowItem.eq(i).stop(true, true).animate({'left': '100%'}, speed );
    //     i = j;
    //   }
  
    //   // 點擊向右箭頭
    //   _bbtnRight.click(function () { 
    //     slideForward(i);
    //   });
  
    //   // 點擊向左箭頭
    //   _bbtnLeft.click(function () {
    //     slideBackward(i);
    //   });
  
    //   // touch and swipe 左右滑動
    //   _bbfloxBox.swipe({
    //     swipeRight: function () {slideBackward();},
    //     swipeLeft: function () {slideForward();},
    //     threshold: 20,
    //   });      
    // })
  });








  // 頁籤，March 2022 新做  ======================================================================

  var _tabset = $('.tabset');
  _tabset.each(function(){
    let _this = $(this);
    let _tabItems = _this.find('.tabItems');
    let _tabButton = _tabItems.find('button');
    let _tabContent = _this.find('.tabContent');
    let i = _tabButton.filter('.active').index();

    _tabContent.not(':last').append('<button class="skip"></button>')
    let _skip = _tabContent.find('.skip');
    
    _tabContent.eq(i).show();
    _tabButton.attr('tabindex' , '-1' ).eq(i).attr('tabindex' , '0' );

    _tabButton.on('click' , function(){
      i = $(this).index();
      $(this).addClass('active').attr('tabindex' , '0' ).siblings().removeClass('active').attr('tabindex' , '-1' );
      _tabContent.hide().eq(i).show();
    })

    _skip.on('focus', function(){
      _tabButton.eq( $(this).parent().index() ).focus();
    })

    _tabButton.on('focus', function(){
      $(this).trigger('click');
    })
  })

  // ======================================================================
  // ======================================================================
  // ======================================================================




  // 燈箱 --- 
  var _showLightbox =  $('.showLightbox');
  var _lightbox = $('.lightbox');
  // _lightbox.filter('.courtsList').append('<div class="overlayForClose"></div>');
  var _hideLightbox = _lightbox.find('.closeThis, .hideLightbox');
  var _lightboxNow;
  const speed = 400;

  _lightbox.before('<div class="coverAll"></div>');
  var _cover = $('.coverAll');
  
  _showLightbox.click(function(){
    let boxID = $(this).attr('data-id');

    _lightboxNow = _lightbox.filter( function(){ return $(this).attr('data-id') === boxID} );
    _lightboxNow.stop(true, false).fadeIn(speed).addClass('show');
    _lightboxNow.prev(_cover).fadeIn(speed);
    _body.addClass('noScroll');
    // if( _lightboxNow.has('.bigImgShow')) {
    //   $('.bigImgShow').slick({
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     fade: true,
    //     mobileFirst: true,
    //     cssEase: 'linear'
    //   });
    // }
  })

  _hideLightbox.click(function(){
    let _targetLbx = $(this).parents('.lightbox');
    _targetLbx.stop(true, false).fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
    _targetLbx.prev(_cover).fadeOut(speed);
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = $(this).next('.lightbox');
    $(this).fadeOut(speed);
    _targetLbx.fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
    _body.removeClass('noScroll');
  })




  // // 條列頁 active 樣式
  // var _category = $('.category');
  // _category.each(function(){
  //   let _item = $(this).find('li');
  //   _item.click(function(){
  //     $(this).addClass('active').siblings().removeClass('active');
  //   })
  // })


  // // 開合區 slideToggle
  // var _slideToggle = $('.slideToggle');
  // _slideToggle.each(function(){
  //   let _this = $(this);
  //   let _ctrl = _this.find('.slideCtrl');
  //   let _drawer = _this.find('.drawer');
  //   let text1 = _ctrl.text();
  //   let text2 = _ctrl.attr('data-altTitle');

  //   if(_drawer.is(':hidden')) {
  //     _ctrl.addClass('openIt').text(text2);
  //   } else {
  //     _ctrl.removeClass('openIt').text(text1);
  //   }

  //   _ctrl.click(function(){
  //     if (_drawer.is(':visible')) {
  //       _drawer.slideUp();
  //       $(this).addClass('openIt').text(text2);
  //     } else {
  //       _drawer.slideDown();
  //       $(this).removeClass('openIt').text(text1);
  //     }
  //   })
  // })





})