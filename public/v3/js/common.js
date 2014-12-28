$(document).bind('touchstart', function(e) {
  var oTarget = e.target,
    $target = $(oTarget),
    sHover,
    $parents = $target.parents();
  for (var i = -1; i < $parents.length; i++) {
    if (i == -1) {
      oTempTarget = oTarget;
    } else {
      $target = $parents.eq(i)
      oTempTarget = $target.get(0);
    }
    sHover = $target.attr('data-hover');
    if (sHover) {
      oTempTarget.classname = sHover;
      $(oTempTarget).addClass('touchTarget');
      $(oTempTarget).addClass(sHover);
      break;
    };
  }
}).bind('touchmove touchend', function(e) {
  var $target = $('.touchTarget'),
    oTarget = $target.get(0);
  if (oTarget) {
    $target.removeClass(oTarget.classname);
    $target.removeClass('touchTarget');
  }
}).bind('touchend', function(e) {
  var oTarget = e.target,
    $target = $(oTarget),
    sId,
    sMask,
    sClass,
    bAdd;
  sId = $target.attr('data-id');
  sMask = $target.attr('data-mask');
  bAdd = $target.attr('data-checkclass');
  if (oTarget.className == 'btn_detail_view' || oTarget.className == 'icon_arror_up' || oTarget.className == 'icon_arror') {
    $target.parent().trigger('touchend');
  }
  if (sId) {
    e.preventDefault();
    $id = $('#' + sId);
    sClass = $id.attr('data-classname');
    if (bAdd) {
      $id.addClass(sClass);
    } else {
      $id.removeClass(sClass);
    }
    if (sMask) {
      window.setTimeout(function() {
        addMask(0.1, 90);
        var oDiv = document.getElementById('J-opacity-mask');
        oDiv.mask = sId;
        oDiv.maskClass = $id.attr('data-classname');
      }, 200);
    }
  }
});

(function() {
  var $scroll = $('.main_menu_box_cnt'),
    navScroll,
    $box = $('#J-nav-scroll');
  if ($scroll.get(0)) {
    var setWidth = function() {
        var $lis = $scroll.find('li');
        var nWidth = 0;
        var nWinwidth = $(window).width();
        for (var i = 0; i < $lis.length; i++) {
          nWidth += $lis.eq(i).width();
        }
        nWidth = nWidth > nWinwidth ? nWidth : nWinwidth
        $scroll.width(nWidth + 10);
      },
      loadDo = function() {
        setWidth();
        navScroll = new iScroll("J-nav-scroll", {
          hScrollbar: false
        });
        var nIndex = $box.find('.active').index();
        navScroll.scrollToElement('.main_menu_list li:nth-child(' + (nIndex + 1) + ')', 0);
      },
      resizeDo = function() {
        setWidth();
        navScroll.refresh();
      };
    loadDo();
    $(window).bind('resize', resizeDo);
  }
})();

(function() {
  var sliderScroll,
    $slider = $('#J-slider-box'),
    $slidercnt = $('.slider_list'),
    nLength = $slider.find('li').length,
    $lis,
    timer,
    nIndex = 0;

  if (!document.getElementById('J-slider-box')) return false;

  function setSliderWidth() {
    var nWidth = $slider.width();
    $lis = $slidercnt.find('li');
    $lis.each(function() {
      $(this).width(nWidth)
    });
    $slidercnt.width(nWidth * nLength);
    $slidercnt.find('li').show();
    return $lis.eq(0).width();
  }
  setSliderWidth();

  function setHeight() {
    var nHeight = document.querySelector('.slider_list > li:nth-child(' + (sliderScroll.currPageX + 1) + ')').clientHeight;
    $slider.height(nHeight);
    $slidercnt.height(nHeight);
  }

  function setSliderWidths() {
    var nWidth = setSliderWidth();
    setHeight();
    $slidercnt.get(0).style.webkitTransform = 'translate(-' + sliderScroll.currPageX * nWidth + 'px, 0px) scale(1) translateZ(0px)';
    $slidercnt.get(0).style.transform = 'translate(-' + sliderScroll.currPageX * nWidth + 'px, 0px) scale(1) translateZ(0px)';
  }

  function setSlider() {
    var nFirstHeight = $lis.eq(0).height();
    $slidercnt.height(nFirstHeight);
    $slider.height(nFirstHeight);
    if (!document.getElementById('J-slider-box')) return false;
    sliderScroll = new iScroll('J-slider-box', {
      snap: true,
      momentum: false,
      hScrollbar: false,
      lockDirection: true,
      onScrollEnd: function() {
        setHeight();
        document.querySelector('.slider_list_num > dd.active').className = '';
        document.querySelector('.slider_list_num > dd:nth-child(' + (this.currPageX + 1) + ')').className = 'active';
      }
    });
    $(window).bind('resize', setSliderWidths);
    //autoPlay();
  }

  function autoPlay() {
    timer = window.setTimeout(function() {
      sliderScroll.scrollToElement('.slider_list li:nth-child(' + (nIndex + 1) + ')', 0);
      nIndex++;
      if (nIndex > nLength) {
        nIndex = 0;
      }
    }, 1000);
  }
  $(window).bind('load', setSlider);

})();

(function() {
  var $txt = $('#J-txt-search'),
    $hotKeywords = $('#J-search-box'),
    $btnClear = $('#J-clear-txt'),
    $btnCancel = $('#J-btn-cancel'),
    tipTimer;
  $txt.bind('focus', txtSearchFocus);
  $txt.bind('input', txtSearchChange);
  $btnClear.bind('click', txtSearchClose);
  $btnCancel.bind('touchend', cancleSearch);

  function readTips(data) {
    if (data.tips.length) {
      var htmlValue = template.render('J-template-search-tip', data);
      $('#J-search-tip').html(htmlValue);
    } else {
      $('#J-search-tip').html('');
    }
  }

  function getTips() {
    $.ajax({
      type: 'GET',
      url: '/app/suggestion/' + $txt.val(),
      dataType: 'json',
      success: readTips,
      error: function() {
        $('#J-search-tip').html('<li>Data Error</li>');
      }
    });
  }

  function subSearch() {
    $('.tool_search_box form').eq(0).submit();
  }

  function txtSearchChange() {
    if ($txt.val()) {
      if (tipTimer) {
        window.clearTimeout(tipTimer);
        tipTimer = null;
      }
      $btnClear.show();
      $hotKeywords.removeClass('tool_search_tip_cnt_show');
      $hotKeywords.addClass('search_tip_list_show');
      if ($txt.val().length >= 2) {
        tipTimer = window.setTimeout(getTips, 50);
        $btnCancel.unbind('touchend', cancleSearch);
        $btnCancel.bind('touchend', subSearch);
        $btnCancel.html('Search');
      } else {
        $btnCancel.unbind('touchend', subSearch);
        $btnCancel.bind('touchend', cancleSearch);
        $btnCancel.html('Cancle');
        $('#J-search-tip').html('');
      }
    } else {
      $btnClear.hide();
      $hotKeywords.removeClass('search_tip_list_show');
      $hotKeywords.show().addClass('tool_search_tip_cnt_show');
    }
  }

  function txtSearchFocus() {
    if (!$txt.val()) {
      $hotKeywords.removeClass('search_tip_list_show');
      $hotKeywords.show().addClass('tool_search_tip_cnt_show');
    } else {
      $hotKeywords.removeClass('tool_search_tip_cnt_show');
      $hotKeywords.show().addClass('search_tip_list_show');
    }
    addMask(1, 70);
  }

  function txtSearchClose() {
    closeSearch();
    $txt.focus();
  }

  function closeSearch() {
    $hotKeywords.hide().removeClass('tool_search_tip_cnt_show').removeClass('search_tip_list_show');
    $txt.val('');
    $btnCancel.unbind('touchend', subSearch);
    $btnCancel.bind('touchend', cancleSearch);
    $btnCancel.html('Cancle');
    $btnClear.hide();

  }

  function cancleSearch() {
    if (document.getElementById('J-opacity-mask')) {
      closeSearch();
      removeMask();
    }
    $('#J-nav-box').removeClass('nav_box_active');
  }
})();

function addMask(opacity, zIndex, bg, winScreen) {
  var oDiv = document.getElementById('J-opacity-mask');
  if (oDiv) {
    oDiv.style.display = 'block';
    if (typeof opacity != 'undefined') {
      oDiv.style.opacity = opacity;
    }
    if (typeof zIndex != 'undefined') {
      oDiv.style.zIndex = zIndex;
    }
  } else {
    oDiv = document.createElement('div');
    oDiv.style.height = $(document).height() + 'px';
    oDiv.className = 'opacity_mask';
    oDiv.id = 'J-opacity-mask';
    if (typeof opacity != 'undefined') {
      oDiv.style.opacity = opacity;
    }
    if (typeof zIndex != 'undefined') {
      oDiv.style.zIndex = zIndex;
    }
    if (typeof bg != 'undefined') {
      oDiv.style.background = bg;
    }
    if (typeof winScreen != 'undefined') {
      oDiv.style.height = $(window).height() + 'px';
      $('body,html').css('overflow', 'hidden');
    }
    document.body.appendChild(oDiv);
    oDiv.onclick = removeMask;
  }
}

function removeMask() {
  var oDiv = document.getElementById('J-opacity-mask');
  oDiv.style.display = 'none';
  $('body,html').css('overflow', 'auto');
  var oMask = document.getElementById(oDiv.mask);
  $(oMask).removeClass(oDiv.maskClass);
  var $searchbox = $('#J-search-box');
  $searchbox.hide();
}

(function() {
  if (!document.getElementById('J-screenshort')) return false;
  var screenshortBigScroll, bigScreenshort, nWinWidth, nWinHeight, $bigItems, nLen, $bigscroll, isWin = true;

  function setImg(nIndex) {
    var $that;
    $that = $bigItems.eq(nIndex);
    if ('orientation' in window || isWin) {
      var $img = $that.find('img').eq(0);
      if (!$img.attr('data-img')) return false;
      var oImg = new Image();
      oImg.src = $img.attr('data-img');
      oImg.onload = function() {
        $img.attr('src', oImg.src);
        $img.removeAttr('data-img');
        var nImgWidth = $img.width();
        var nImgHeight = $img.height();
        if (nImgWidth && nImgHeight) {
          if (nImgWidth > nImgHeight) {
            $img.width(nWinWidth);

          } else {
            $img.height(nWinHeight);

          }
        }
      }
    }
  }

  function setOption(nIndex) {
    $bigScreenshort = $('#J-big-screenshort');
    nWinWidth = $(window).width();
    nWinHeight = $(window).height();
    $bigItems = $bigScreenshort.find('li');
    $bigscroll = $('.detail_screenshort_big_list');
    $bigscroll.width(nWinWidth * nLength);
    var nZindex = $bigScreenshort.get(0).style.zIndex;
    $bigScreenshort.get(0).scrolltop = document.body.scrollTop;
    if (nZindex > 0 || nZindex == '') {
      $('body,html').css({
        'height': $(window).height(),
        'overflow': 'hidden'
      });
    }
    $bigScreenshort.height(nWinHeight);
    $bigscroll.height(nWinHeight);



    $bigItems.each(function() {
      $(this).width(nWinWidth);
      $(this).height(nWinHeight);
    })
    setImg(nIndex);
  }

  function setScreen() {
    var screenshortScroll = new iScroll('J-screenshort', {
        snap: 'li',
        momentum: false,
        hScrollbar: false,
        lockDirection: true
      }),
      $screenshort = $('.detail_screenshort_list'),
      $lis = $screenshort.find('li'),
      $links = $screenshort.find('a'),
      nLen = $lis.length,
      setBoxWidth = function() {
        nLength = nLen;
        nWidth = 0;
        for (var i = 0; i < nLen; i++) {
          nWidth += $lis.eq(i).width() + 8;
        }
        $screenshort.width(nWidth);
      },
      hiddenBigScrollshort = function() {
        $(this).css('zIndex', '-100');
        $(this).css('left', '-1000px');
        $('body,html').css({
          'height': 'auto',
          'overflow': 'auto'
        });
        window.scroll(0, this.scrolltop);
      },
      addBigScreenShort = function(nIndex) {
        var oEle = document.getElementById('J-big-screenshort');
        if (oEle) {
          oEle.style.zIndex = '200';
          oEle.style.left = '0';
          setOption(nIndex);
        } else {
          var $screenshort = $('#J-screenshort'),
            $lis = $screenshort.find('li'),
            nLiLength = $lis.length,
            liHTML = '',
            spanHTML = '',
            sImgLoading = $lis.eq(0).find('a').eq(0).attr('data-loading');
          for (var i = 0; i < nLiLength; i++) {
            liHTML += '<li><img src="' + sImgLoading + '" data-img="' + $lis.eq(i).find('a').eq(0).attr('href') + '"></li>';
            if (i == 0) {
              spanHTML += '<span class="active">' + i + '</span>';
            } else {
              spanHTML += '<span>' + i + '</span>';
            }
          }
          $(document.body).append('<div class="detail_screenshort_box detail_big_screenshort_box" id="J-big-screenshort">' +
            '<ul class="detail_screenshort_list detail_screenshort_big_list clearfix">' + liHTML +
            '</ul><p class="slider_list_num clearfix">' + spanHTML + '</p>' +
            '</div>');
          var evt = 'onorientationchange' in window ? true : false;
          if ('onorientationchange' in window) {
            window.addEventListener('orientationchange', refreshScreen, false)
          } else {
            $(window).bind('resize', refreshScreen);
          }
          setOption(nIndex);
          screenshortBigScroll = new iScroll('J-big-screenshort', {
            snap: 'li',
            momentum: false,
            hScrollbar: false,
            lockDirection: true,
            onScrollEnd: function() {
              document.querySelector('.slider_list_num > span.active').className = '';
              document.querySelector('.slider_list_num > span:nth-child(' + (this.currPageX + 1) + ')').className = 'active';
              setImg(this.currPageX);
            }
          });

          $bigScreenshort.bind('click', hiddenBigScrollshort);
        }
        screenshortBigScroll.scrollToElement('.detail_screenshort_big_list li:nth-child(' + (nIndex + 1) + ')', 0);
        window.setTimeout(function() {
          document.querySelector('.slider_list_num > span.active').className = '';
          document.querySelector('.slider_list_num > span:nth-child(' + (nIndex + 1) + ')').className = 'active';
        }, 100)
      },
      setSee = function() {
        $links.each(function() {
          $(this).bind('click', function(e) {
            e.preventDefault();
            var nIndex = $(this).parents('li').index();
            addBigScreenShort(nIndex);
          })
        })

      };
    setBoxWidth();
    setSee();
  }

  function refreshScreen() {
    setOption();
    $bigscroll.get(0).style.webkitTransform = 'translate(-' + screenshortBigScroll.currPageX * nWinWidth + 'px, 0px) scale(1) translateZ(0px)';
    $bigscroll.get(0).style.transform = 'translate(-' + screenshortBigScroll.currPageX * nWinWidth + 'px, 0px) scale(1) translateZ(0px)';
    screenshortBigScroll.refresh();
  }
  $(window).bind('load', setScreen);
})();

(function() {
  var aDetail = $('.detail_baseinfo').offset(),
    aApplists = $('.applists_info').offset();

  function setFixedBar() {
    var $applists = $('#J-applists-a'),
      $detail = $('#J-detail-info'),
      nScrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
    if (!!$applists.get(0)) {
      if (nScrollTop > aApplists.top) {
        $applists.css({
          paddingTop: $('.applists_info').height()
        });
        $applists.addClass('applists_box_fix');
      } else {
        $applists.css({
          paddingTop: 0
        });
        $applists.removeClass('applists_box_fix');
      }
    }
    if (!!$detail.get(0)) {
      if (nScrollTop > aDetail.top) {
        $detail.css({
          paddingTop: $('.detail_baseinfo').height()
        });
        $detail.addClass('detail_box_fixed');

      } else {
        $detail.css({
          paddingTop: 0
        });
        $detail.removeClass('detail_box_fixed');
      }
    }
  }
  $(window).bind('scroll', setFixedBar);
})();

(function() {
  var $hotSearch = $('#J-hot-search'),
    step = 0,
    timer;
  if (!document.getElementById('J-hot-search')) return false;

  function play() {
    var $first = $hotSearch.find('li').eq(0),
      nFirstWidth = $first.width();
    step++;
    if (step > nFirstWidth) {
      step = 1;
      $hotSearch.append($first);
      $hotSearch.get(0).style.webkitTransform = 'translate(0px, 0px) scale(1) translateZ(0px)';
      $hotSearch.get(0).style.transform = 'translate(0px, 0px) scale(1) translateZ(0px)';
    } else {
      $hotSearch.get(0).style.webkitTransform = 'translate(-' + (step) + 'px, 0px) scale(1) translateZ(0px)';
      $hotSearch.get(0).style.transform = 'translate(-' + (step) + 'px, 0px) scale(1) translateZ(0px)';
    }
  }

  function autoPlay() {
    timer = window.setTimeout(function() {
      play();
      autoPlay();
    }, 50);
  }

  function stopPlay() {
    window.clearTimeout(timer);
    timer = null;
  }
  autoPlay();
  $hotSearch.bind('touchstart', stopPlay);
  $hotSearch.bind('touchend', autoPlay);
})();

(function() {
  var $btnSearch = $('.btn_search'),
    submitSearch = function(e) {
      e.preventDefault();
      $('#J-search-form').submit();
    };
  $btnSearch.bind('click', submitSearch);
})();

(function() {
  var $btnQuick = $('.btn_quick_download'),
    $seepdTip = $('.detail_speedup'),
    timer,
    downloadTip = function() {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
      $seepdTip.addClass('detail_speedup_active');
      timer = window.setTimeout(function() {
        $seepdTip.removeClass('detail_speedup_active');
      }, 5000);
    };
  $btnQuick.bind('touchend', downloadTip);
})();


function market_download(that) {
  var $this = $(that);
  var p_name = $this.attr('data-name');
  var p_url = $this.attr('data-href');
  $.ajax({
    type: "get",
    async: true,
    timeout: 1000,
    url: "http://127.0.0.1:61234/download/" + p_name + "/?jsoncallback=?&status=1",
    dataType: "jsonp",
    success: function(json) {
      if (json.status == 1) {
        $.ajax({
          type: "get",
          url: "http://package.1mobile.com/d_market_success.php?pkg=" + p_name + "&channel=301",
          success: function(data) {

          }
        });
      } else {
        window.location.href = p_url;
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      if (XMLHttpRequest.readyState != 4) {
        window.location.href = p_url;
      }
    }
  });
}

function setCookie(c_name, value, expiredays) {
  var Cookie_Domain = "m.1mobile.com"
  var exdate = new Date();
  exdate.setHours(exdate.getHours() + expiredays);
  document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ';domain=' + Cookie_Domain + '; path=/';
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
  }
  (function() {
    var $bar = $('.market_link'),
      $market = $('.bar_market'),
      goMarket = function(e) {
        e.preventDefault();
        setCookie('market', 'open', 360);
        if ($(e.target).html() == 'Download') {
          window.open('http://package.1mobile.com/market_d.php?channel=401&url=http://f3.1mobile.com/mobile_software/channel/1MobileMarket_401.apk', '_self');
        } else {
          window.open('http://market.1mobile.com/', '_self');
        }
        $market.hide();
      };
    if (!getCookie('market')) {
	  var reg=/\/search\/\?keyword=/;
	  if(!reg.test(window.location.href)){
	    $market.show();  
	  }      
    } else {
      $market.hide();
    }
    $bar.bind('click', goMarket);
  })();