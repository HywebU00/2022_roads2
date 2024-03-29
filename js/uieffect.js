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
  // 複製「主選單」到側欄給行動版用
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
  var _hasChild = _menu.find('.hasChild');
  var _topItem = _menu.children('ul').children('li');
  var _hasChildA = _hasChild.children('a');
  var liA = _menu.find('li>a');

  _hasChild.each(function(){
    let _this = $(this);
    let _thisSubMenu = _this.children('ul');
    let _xButton;

    _this.hover(
      function(){
        let offset1 = _window.scrollTop() + _window.height();
        let offset2;
        let translate = '';
        let dd = 0;
        let disB = 0;

        _this.addClass('here');

        if ( _this.is(_topItem) ) {
          _thisSubMenu.css('left', 0);
        } else {
          // _this.addClass('here');
          if ( _this.offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
            _thisSubMenu.css( 'left', -1*(_thisSubMenu.innerWidth()) );
          } else {
            _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
          }
        }

        _thisSubMenu.stop(true, true).slideDown(300, function(){
          offset2 = parseInt(_thisSubMenu.offset().top + _thisSubMenu.innerHeight());
          const itemHeight = _thisSubMenu.find('li:first-child').innerHeight();

          if (offset2 > offset1) {
            if (_thisSubMenu.innerHeight() <= _window.height()) {
              translate = 'translateY(' + String( offset1 - offset2 ) + 'px)';
            } else {
              translate = 'translateY(' + String( _window.scrollTop() - _thisSubMenu.offset().top ) + 'px)';

              // 加入控制 button -------------------------------------
              _this.append('<button class="xButton" type="button"></button>');
              _xButton = _this.find('.xButton');
              _xButton.css('left', _thisSubMenu.offset().left + _thisSubMenu.width());

              // disB = 選單高度 - 視窗高度
              disB =  _thisSubMenu.innerHeight() - _window.height();
            }
            _thisSubMenu.css('transform', translate );

            _xButton.click(function(){
              if ( dd + disB > 0) {
                dd = dd - itemHeight;
                if (dd + disB < itemHeight) { dd = dd - disB%itemHeight;}
                _thisSubMenu.stop(true, false).animate({'margin-top': dd}, 200);
              }
            })
          };
        });
      },
      function(){
        _this.removeClass('here').find('.xButton').remove();
        _thisSubMenu.stop(true, false).slideUp(200, function(){
          $(this).removeAttr('style');
        });
      }
    );

  })
  
  // 鍵盤操作 
  _hasChildA.focus(function(){
    let _this = $(this);
    let _thisSubMenu = $(this).next('ul');

    if ( _this.parent().is(_topItem) ) {
      _thisSubMenu.show();
    } else {
      if (_this.parent().offset().left + _this.innerWidth() + _thisSubMenu.innerWidth() > _window.innerWidth()) {
        _thisSubMenu.css('left', -1*(_thisSubMenu.innerWidth()) );
      } else {
        _thisSubMenu.css('left', _thisSubMenu.parent().innerWidth());
      }
      _thisSubMenu.show();
    }
    _this.parent().addClass('here');
  })

  liA.focus(function(){
    $(this).parent('li').siblings().removeClass('here').find('ul').hide();
  })

  // 離開 _menu 隱藏所有次選單
  $('*').focus(function(){
    if( $(this).parents('.menu').length == 0 ){
      _menu.find('.hasChild').removeClass('here').find('ul').removeAttr('style');
    }
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
    _searchCtrl.focus();
    setTimeout(function(){
      _search.removeAttr('style');
    }, 800);
  }
  _searchSkip.focus(function(){
    _closeSearch.focus();
  })
  _body.keydown(function(e){
    if ( ( e.altKey ) && (e.keyCode != 18) ) {
      if ( e.keyCode == 83 ) {
        _search.show().addClass('reveal').find('input[type="text"]').focus();
      }
    }
  })
 







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
    _html.stop(true,false).animate({scrollTop: 0}, 800, function(){
      $('.goCenter').focus();
    });
  });
	_window.scroll(function() {
		if ( $(this).scrollTop() > 200){
			_goTop.addClass('show');
		} else {
      _goTop.removeClass('show');
		}
	});

  // .flow1：寬版顯示３筆，平板顯示２筆，手機顯示１筆 ------------------------------
  
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
  var _flow3 = $('.flow3, .flow1');
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
      // 判斷 .tabContent 是否有 slick 元件
      if ( _tabContent.eq(i).find('.imgSlick').length > 0 ) {
        _tabContent.eq(i).find('.imgSlick').find('.slick-prev').trigger('click');
        setTimeout( function (){_tabContent.eq(i).find('.imgSlick').find('.slick-next').trigger('click');}, 600)
      }
    })

    _skip.on('focus', function(){
      _tabButton.eq( $(this).parent().index() ).focus();
    })

    _tabButton.on('focus', function(){
      $(this).trigger('click');
    })
  })


  // 數字累加效果，２０２３０４１２  ======================================================================
  var _numberCount = $('.roadData').find('.number');
  _numberCount.each(function() {
    let _this = $(this);
    let countTo = _this.text();
    _this.attr('data-count', countTo).text(0);

    $({ countNum: 0 }).animate({
      countNum: countTo
    }, {
      duration: 6000,
      easing: 'swing',
      step: function() {
        // _this.text(Math.floor(this.countNum));
        _this.text(Intl.NumberFormat().format(Math.floor(this.countNum)));
      },
      complete: function() {
        // _this.text(this.countNum);
        _this.text(Intl.NumberFormat().format(this.countNum));
      }
    });

  });

  
  // ======================================================================
  // rwd list Table
  // 把 th 的內容複製到對應的td的 title 屬性值
  _rwdTable = $('.rwdTable');
  _rwdTable.each( function(){
    let _this = $(this);
    let _th = _this.find('thead>tr>th');
    let count = _th.length;
    let _tr = _this.find('tbody').children('tr');

      _tr.each(function(){
        let _td = $(this).children('td');
        for ( let i = 0; i<count; i++ ) {
          _td.eq(i).attr('title', _th.eq(i).text());
        }
      })
  })



  // ======================================================================
  // ======================================================================




  // 燈箱 --- 
  var _showLightbox =  $('.showLightbox');
  var _lightbox = $('.lightbox');
  var _hideLightbox = _lightbox.find('.closeThis');
  var _lightboxNow;
  var _whichTrigger;
  const speed = 400;

  _lightbox.before('<div class="coverAll"></div>');
  var _cover = $('.coverAll');

  _lightbox.append('<button type="button" class="skip">回「關閉燈箱」</button>')
  var _skipLbx = _lightbox.find('.skip');

  _skipLbx.on('focus' , function(){ _hideLightbox.trigger('focus') });
  
  _showLightbox.click(function(){
    _whichTrigger = $(this);
    let boxID = _whichTrigger.attr('data-id');

    _lightboxNow = _lightbox.filter( function(){ return $(this).attr('data-id') === boxID} );
    _lightboxNow.stop(true, false).fadeIn(speed).addClass('show');
    _lightboxNow.prev(_cover).fadeIn(speed);
    _hideLightbox.focus();

    _body.addClass('noScroll');

  })

  _hideLightbox.click(function(){
    let _targetLbx = _lightbox;
    _targetLbx.stop(true, false).fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
    _targetLbx.prev(_cover).fadeOut(speed);
    _whichTrigger.focus();
    _body.removeClass('noScroll');
  })

  _cover.click(function(){
    let _targetLbx = _lightbox;
    $(this).fadeOut(speed);
    _targetLbx.fadeOut(speed,
      function(){
        _targetLbx.removeClass('show');
      }
    );
	_targetLbx.prev(_cover).fadeOut(speed);
    _body.removeClass('noScroll');
  })
})