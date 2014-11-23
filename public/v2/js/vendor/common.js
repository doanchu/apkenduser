$(document).ready(function(){
	if ($('#search_btn_top[data-search-hidden]').length){
		$(window).scroll(function(e){
			if ($(window).scrollTop() > 100)
				$('#search_btn_top[data-search-hidden]').fadeIn('fast');
			else
				$('#search_btn_top[data-search-hidden]').fadeOut('fast');
		});
	}
	
	$('#search_btn_top').click(function(){
		$(this).removeAttr('data-search-hidden').fadeOut('fast');
		$('#top_logo').fadeOut('fast');
		$('#search_top').fadeIn('fast', function(){$(this).find('input[type="text"][name="search"]').focus();});
		return false;
	});
	
	$('.arrow_scroll_up').click(function(){
		$('html, body').animate({scrollTop: 0}, 'slow');
	});
	
	
	//Login sendTo
	$('[data-login-btn-trigger]').click(function(){
		document.location = $('[data-login-sendto]').attr('data-login-sendto');
		return false;
	});
	
	
	//Drawer
	$('#drawer_btn').click(function(){
		$('#drawer').addClass('active');
        $('.back').show();
		return false;
	});
	$('#drawer_close,.back').click(function(event) {
        /* Act on the event */
            $('.back').hide();
            $('#drawer').removeClass('active');


	});
	$('[data-drawer-menu]').click(function(){
		var el = $(this);
		var submenus = el.parent().find('[data-drawer-submenu="'+el.attr('data-drawer-menu')+'"]');
		var is_opening = !submenus.first().hasClass('open');
		if (is_opening)
			submenus.addClass('open');
		else
			submenus.removeClass('open');
		el.find('[data-drawer-sub-indicator]').attr('data-drawer-sub-indicator', (is_opening ? 'up' : 'down'));
		return false;
	});

	
	//Adult content
	$('input[type="radio"][name="mature_switch"]').change(function(){
		if (!this.checked)
			return;
		var date = new Date();
		date.setTime(date.getTime()+(700*24*60*60*1000)); //700 days
		var expires = "; expires="+date.toGMTString();
		document.cookie = "adult_content_enable="+($(this).val()=='on'?1:0)+expires+"; path=/; domain=aptoide.com;";
		document.location = document.URL;
	});
});