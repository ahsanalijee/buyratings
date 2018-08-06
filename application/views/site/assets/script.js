function popIt(pageURL, title,w,h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var targetWin = window.open (pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

(function($){
	var timer;
	
	$('input[triggerer]').keypress(function(event) { if(event.which == '13') { $('#doCreate').trigger('click'); } });
	$('#doCreate').click(function() {
		var $error = false;
		var $username = $("#c_user").val();
		var $email = $("#c_email").val();
		var $password = $("#c_password").val();
		var $passwordConfirm = $("#c_passwordConfirm").val();
		
		if($username == "")
		{
			$("#c_user").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#c_user").css({'border-color': '#939393'}) }, 700);
			$error = true;
		}
		if($email == "")
		{
			$("#c_email").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#c_email").css({'border-color': '#939393'}) }, 700);
			$error = true;
		}
		if($password == "")
		{
			$("#c_password").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#c_password").css({'border-color': '#939393'}) }, 700);
			$error = true;
		}
		if($email)
		{
			var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
			if(!emailPattern.test($("#c_email").val()))
			{
				$("#c_email").css({'border-color': '#ff0000'});
				setTimeout(function(){ $("#c_email").css({'border-color': '#939393'}) }, 700);
				$error = true;
			}
		}
		if(!$error)
		{
			var thisAjaxParameters = { username: $username, email: $email, password: $password, passwordconfirm: $passwordConfirm, referral: $('#c_referralCode').val() };
			var thisAjaxBefore = function(){ $('#innerContent').css({'opacity':'0.1'}); $('#doCreateLoader').show(); };
			var thisAjaxSuccess = function(data){
				$('#doCreateLoader').hide();
				$('#innerContent').css({'opacity':'1'});
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#innerContent').remove();
					$('#innerContentDone').show();
					$('#doCreateRefLink').val(data.reflink);
					$('#doCreateBar').html('<div class="arrowIco"></div>Thank you for registering with Friendrise.');
					$('#doCreateRefLink_').attr('href', 'https://twitter.com/intent/tweet?source=webclient&text=Get more followers, fans, views and exposure with Purchase-Traffic, the new place to grow your social network - '+data.reflink);
				}
			};
			
			ajaxCall("signup", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$("#doCreateRefLink").click(function(){
		this.select();
	});
	
	$("#refLink").click(function(){
		this.select();
	});
	
	$('.connectWithFacebook').click(function(e){
		e.preventDefault();
		popIt($(this).attr('data-url'), 'Connect with Facebook', 1000, 500);
	});
	
	$('.awardFreeCredits').click(function(){
		
		var thisAjaxParameters = { task: 'awardFreeCredits' };
		var thisAjaxBefore = function(){ $(this).css('opacity', '0.5'); };
		var thisAjaxSuccess = function(data){
			if (data.status == "problematic")
			{
				$(this).css('opacity', '1');
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				$('.awardFreeCreditsHolder').slideUp();
				$('.awardFreeCreditsHolder').after('<span style="margin-top: 10px;font-weight:bold; display:block">Done! Visit again tomorrow for more!</span>');
				$('.awardFreeCreditsHolder').remove();
				$('#creditsAmountGlobal').html(data.credits);
			}
		};
		
		ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	});
	
	$(".feature").live('click', function(){
		var $ID = $(this).attr('data-id');
		var $type = $(this).attr('data-type');
		var button = $(this);
		
		var thisAjaxParameters = { task: 'addtofeatured', type: $type, ID: $ID };
		var thisAjaxBefore = function(){ button.css('opacity', '0.5'); };
		var thisAjaxSuccess = function(data){
			if (data.status == "problematic")
			{
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				button.hide();
				button.after('<span class="gray">in queue</span>');
				$('#creditsAmountGlobal').html(data.credits);
				button.remove();
				
				if(data.credits < 500)
				{
					$('.feature').hide();
					$('.feature').after('<span class="blue">inadequate</span>');
					$('.feature').remove();
				}
			}
		};
		
		ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	});
	
	
	
	$(".buy").live('click', function(){
		var button = $(this);
		var $ID = $(this).attr('data-id');
		var $type = $(this).attr('data-type');
		
		if($type == 'follower') { var $info = $('#_twitter').val(); }
		if($type == 'retweet') { var $info = $('#_tweet').val(); }
		if($type == 'like') { var $info = $('#_facebookpage').val(); }
		if($type == 'view') { var $info = $('#_youtubevideo').val(); }
		if($type == 'subscriber') { var $info = $('#_youtubechannel').val(); }
		
		var thisAjaxParameters = { type: $type, ID: $ID, info: $info };
		var thisAjaxBefore = function(){ button.css('opacity', '0.5'); };
		var thisAjaxSuccess = function(data){
			button.css('opacity', '1');
			if (data.status == "problematic")
			{
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				button.hide();
				button.after('<span class="gray inti">in progress</span>');
				$('#creditsAmountGlobal').html(data.credits);
				button.remove();
				
				if(data.credits <= 0)
				{
					$('.feature').hide();
					$('.feature').after('<span class="blue inti">inadequate</span>');
					$('.feature').remove();
				}
			}
		};
		
		ajaxCall("buy", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	});
	
	$(".nbb").live('click', function(event){
	
		var namespace = $(this).data('form-id');
		var field = $(namespace + " :input[name='custom']").val();
		var item_number = $(namespace + " :input[name='item_number']").val();
		var selected_item = $(namespace + " :input[name='item_number']").find('option:selected');
		var item_price = selected_item.data('price');
		
		if(field === '')
		{
			event.preventDefault();
			alert('Please provide a value.');
		} else {
			$(namespace + " :input[name='item_name']").val(item_number);
			$(namespace + " :input[name='amount']").val(item_price);
			
			$(namespace).submit();
		}
	});

	$("#FAQ").organicTabs();
	$("#timeline").organicTabs();
	
	$('#filterRefresh').click(function() {
		$('.output').css('opacity', '0.5');
		$('.output').load('/app/load?task='+$(this).attr('data-type'), function(){
			$('.output').css('opacity', '1');
		});
	});

	
	$('#refresh').click(function() {
		$('.output').css('opacity', '0.5');
		$('.output').load('/app/load?task='+$(this).attr('data-type'), function(){
			$('.output').css('opacity', '1');
		});
	});
	
	$('.skip').live('click', function(e){
		e.preventDefault();
		
		var $username = $(this).attr('data-user');
		var $ID = $(this).attr('data-id');
		if($username) { var thisAjaxParameters = { task: 'skip', username: $username }; }
		if($ID) { var thisAjaxParameters = { task: 'skip', ID: $ID }; }
		
		var thisAjaxBefore = function(){
			$('.service_'+$username).fadeOut(function(){
				$('.service_'+$username).remove();
			});
			$('.service_'+$ID).fadeOut(function(){
				$('.service_'+$ID).remove();
			});
		};
		var thisAjaxSuccess = function(data){
			if (data.status == "problematic")
			{
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				
			}
		};
		
		if($username) { ajaxCall("follower", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess); }
		if($ID) { ajaxCall("fan", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess); }
		
	});

	$('.FAQ').live('click', function(e){
		e.preventDefault();
		$item = $(this).find('div');
		
		$item.slideToggle('fast');
	});
	
	
	$('button[surf]').live('click', function() {
		$pageID = $(this).attr('surf');
		$('.service_'+$pageID).remove();
		
		window.open('/community/socialize/surf/' + $pageID);
	});

	$('#toggleFilterOptions').click(function(e) {
		
		$('#filterOptions').slideToggle('fast');
		e.preventDefault();
	});
	
	$('#frame').center();

	$('#flow').live('click', function(){
		$('#frame').hide();
		$('#flow').hide();
		$('#frame').empty();
		window.clearInterval(timer);
	});

	$('button[follow]').live('click', function(){
		
		$('#flow').show();
		popIt('http://twitter.com/'+$(this).attr('follow'), 'Socialize!', 1000, 400);
		$('#frame').center();
		$('#frame').html('<button checkfollower="'+$(this).attr('follow')+'">Confirm</button>');
		$('#frame').show();
		
	});
	
	$('button[checkfollower]').live('click', function(){
		$('#frame').center();
		
		var thisAjaxParameters = { task: 'follow', username: $(this).attr('checkfollower') };
		var thisAjaxBefore = function(){
			$('#frame').html('<div style="margin: 50px 0 0 40px"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div></div>');
		};
		var thisAjaxSuccess = function(data){
			$('#frame').empty();
			$('#frame').hide();
			$('#flow').hide();
			if (data.status == "problematic")
			{
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				$(data.element).remove();
				$('#creditsAmountGlobal').html(data.credits);
			}
		};
		
		ajaxCall("follower", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		
	});
	
	$('.socialBox').click(function(){
		$('.popit').hide();
		$('.popit').empty();
	});
	
	$('button[checklike]').live('click', function(){
		$('#frame').center();
		
		var thisAjaxParameters = { task: 'like', ID: $(this).attr('checklike') };
		var thisAjaxBefore = function(){
			$('#frame').html('<div style="margin: 50px 0 0 40px"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div></div>');
		};
		var thisAjaxSuccess = function(data){
			$('#frame').empty();
			$('#frame').hide();
			$('#flow').hide();
			if (data.status == "problematic")
			{
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				$(data.element).remove();
				$('#creditsAmountGlobal').html(data.credits);
			}
		};
		
		ajaxCall("fan", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	});
	
	$('button[like]').live('click', function() {
		
		$('#flow').show();
		popIt($(this).attr('data-url'), 'Socialize!', 1000, 400);
		$('#frame').center();
		$('#frame').html('<button checklike="'+$(this).attr('like')+'">Confirm</button>');
		$('#frame').show();
		
	});
	
	
	$('button[data-watch]').live('click', function(){
		var $video = $(this).attr('data-watch');
		var $title = $(this).attr('data-title');
		var $thisID = $(this).attr('data-id');
		var $thisType = $(this).attr('data-type');
		
		$('#flow').show();
		$('#frame').center();
		
		if($thisType == 'vimeo')
		{			
			$('#frame').html('<h1>'+$title+'</h1><div>Credits will be rewarded in: <span style="color:#ff8a00;">30 seconds</span></div><iframe src="http://player.vimeo.com/video/'+$video+'?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" width="480" height="270" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
			$('#frame').show();
			$('body').attr('data-video', $video);
			
			var counter = 30;
			timer = setInterval(function(){
				
				if(counter > 0) {
					counter -= 1;
					$('#frame > div > span').html(counter+' seconds');
				} else {
					clearInterval(timer);
					
					var thisAjaxParameters = { ID: $thisID };
					var thisAjaxBefore = function(){ $('#frame > div').html('Please wait...'); };
					var thisAjaxSuccess = function(data){
						if (data.status == "problematic")
						{
							alert(data.message);
						}
						else if (data.status == "fine")
						{
							$(data.element).remove();
							$('.output').load('/app/load?task=vimeo');
							$('#creditsAmountGlobal').html(data.credits);
							$('#frame > div').html('Credits for this video have been rewarded! - <a href="#" class="close-player" style="color:#ff8a00">close</a>');
						}
					};
					
					ajaxCall("watch_vimeo", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
				}
			}, 1000);
		}
		
		if($thisType == 'youtube')
		{
			$('#frame').html('<h1>'+$title+'</h1><div>Credits will be rewarded in: <span style="color:#ff8a00;">30 seconds</span></div><iframe width="480" height="360" src="http://www.youtube.com/embed/'+$video+'?rel=0&showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
			$('#frame').show();
			$('body').attr('data-video', $video);
			
			var counter = 30;
			timer = setInterval(function(){
				
				if(counter > 0) {
					counter -= 1;
					$('#frame > div > span').html(counter+' seconds');
				} else {
					clearInterval(timer);
					
					var thisAjaxParameters = { ID: $thisID };
					var thisAjaxBefore = function(){ $('#frame > div').html('Please wait...'); };
					var thisAjaxSuccess = function(data){
						if (data.status == "problematic")
						{
							alert(data.message);
						}
						else if (data.status == "fine")
						{
							$(data.element).remove();
							$('.output').load('/app/load?task=youtube');
							$('#creditsAmountGlobal').html(data.credits);
							$('#frame > div').html('Credits for this video have been rewarded! - <a href="#" class="close-player" style="color:#ff8a00">close</a>');
						}
					};
					
					ajaxCall("watch", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
				}
			}, 1000);
		}
		
	});
	
	$('.close-player').live('click', function(e){
		e.preventDefault();
		$('#flow').hide();
		$('#frame').empty();
		$('#frame').hide();
		clearInterval(timer);
	});
	
	$('#premSubmit').click(function() {
		$('#premForm').submit();
	});
	
	$('#user').keypress(function(event) { if (event.which == '13') { $('#doConnect').trigger('click'); } });
	$('#password').keypress(function(event) { if (event.which == '13') { $('#doConnect').trigger('click'); } });

	$("#doConnect").click(function() {
		$("#connectResponse").empty();
		if($("#user").val() == "")
		{
			$("#user").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#user").css({'border-color': '#939393'}) }, 700);
		}
		if($("#password").val() == "")
		{
			$("#password").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#password").css({'border-color': '#939393'}) }, 700);
		}
		if($("#user").val() != "" && $("#password").val() != "")
		{
			var thisAjaxParameters = { user: $("#user").val(), password: $("#password").val() };
			var thisAjaxBefore = function(){};
			var thisAjaxSuccess = function(data){
				if (data.status == "problematic")
				{
					$("#connectResponse").html(data.message);
				}
				else if (data.status == "fine")
				{
					window.location.reload();
				}
			};
			
			ajaxCall("login", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$("position > button").click(function() {
		var target = $(this).attr("this");
		$('#'+target+' > element').show();
	});
	
	$("cancel").click(function() {
		var target = $(this).attr("this");
		$('#'+target+' > element').hide();
	});
	
	
	$('#twitterValue').keypress(function(event) { if (event.which == '13') { $('#twitterValueButton').trigger('click'); } });
	$('#twitterValueButton').live('click', function() {
		if($('#twitterValue').val() == "")
		{
			$("#twitterValue").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#twitterValue").css({'border-color': '#939393'}) }, 700);
		}
		else
		{
			var thisAjaxParameters = { task: 'twitterInsert', username: $('#twitterValue').val() };
			var thisAjaxBefore = function(){ $('loader[ata]').show(); };
			var thisAjaxSuccess = function(data){
				$('loader[ata]').hide();
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#twitterValue').val('');
					$('.output').append(data.output);
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$('#userLink').keypress(function(event) { if(event.which == '13') { $('#userLinkButton').trigger('click'); } });
	$('#userLinkButton').live('click', function() {
		if($('#userLink').val() == "")
		{
			$("#userLink").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#userLink").css({'border-color': '#939393'}) }, 700);
		}
		else
		{
			var thisAjaxParameters = { task: 'facebookUserInsert', userID: $('#userLink').val() };
			var thisAjaxBefore = function(){ $('loader[afu]').show(); };
			var thisAjaxSuccess = function(data){
				$('loader[afu]').hide();
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#userLink').val('');
					$('.fbuser').html(data.output);
					$('.cfaholder').hide();
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$('#pageLink').keypress(function(event) { if(event.which == '13') { $('#pageLinkButton').trigger('click'); } });
	$('#pageLinkButton').live('click', function() {
		if($('#pageLink').val() == "")
		{
			$("#pageLink").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#pageLink").css({'border-color': '#939393'}) }, 700);
		}
		else
		{
			var thisAjaxParameters = { task: 'facebookInsert', page: $('#pageLink').val() };
			var thisAjaxBefore = function(){ $('loader[afp]').show(); };
			var thisAjaxSuccess = function(data){
				$('loader[afp]').hide();
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#pageLink').val('');
					$('.fbpage').append(data.output);
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	
	$('#web_button').live('click', function() {
		if($('#web_url').val() == "")
		{
			$("#web_url").css({'border-color': '#ff0000'});
		}
		if($('#web_title').val() == "")
		{
			$("#web_title").css({'border-color': '#ff0000'});
			setTimeout(function(){ $("#web_title").css({'border-color': '#939393'}) }, 700);
		}
		
		if($('#web_url').val() && $('#web_title').val())
		{
			var thisAjaxParameters = { task: 'webInsert', url: $('#web_url').val(), title: $('#web_title').val() };
			var thisAjaxBefore = function(){ $('loader[awa]').show(); };
			var thisAjaxSuccess = function(data){
				$('loader[awa]').hide();
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#web_url').val('');
					$('#web_title').val('');
					$('.output').append(data.output);
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$('#youtube_button').live('click', function() {
		if($('#youtube_url').val() == "")
		{
			$("#youtube_url").css({'border-color': '#ff0000'});
		} else {
			var thisAjaxParameters = { task: 'youtubeInsert', url: $('#youtube_url').val() };
			var thisAjaxBefore = function(){ $('loader[ayv]').show(); };
			var thisAjaxSuccess = function(data){
				$('loader[ayv]').hide();
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#youtube_url').val('');
					$('.output').append(data.output);
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});

	$('#vimeo_button').live('click', function() {
		if($('#vimeo_url').val() == "")
		{
			$("#vimeo_url").css({'border-color': '#ff0000'});
		} else {
			var thisAjaxParameters = { task: 'vimeoInsert', url: $('#vimeo_url').val() };
			var thisAjaxBefore = function(){ $('loader[avv]').show(); };
			var thisAjaxSuccess = function(data){
				$('loader[avv]').hide();
				if (data.status == "problematic")
				{
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('#vimeo_url').val('');
					$('.output').append(data.output);
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	
	$('.disconnect').live('click',function(event) {
		event.preventDefault();
		var answer = confirm("Are you sure you wish to disconnect your account?")
		if(answer)
		{
			var $ID = $(this).attr('data-ID');
			var $SERVICE = $(this).attr('data-SERVICE');
			
			var thisAjaxParameters = { task: 'disconnect', ID: $ID, service: $SERVICE };
			var thisAjaxBefore = function(){ $('table#'+$ID).hide(); };
			var thisAjaxSuccess = function(data) {
				if (data.status == "problematic")
				{
					$('table#'+$ID).show();
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('table#'+$ID).remove();
					window.location.reload();
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$('.remove').live('click',function(event) {
		event.preventDefault();
		var answer = confirm("Are you sure?")
		if(answer)
		{
			var $ID = $(this).attr('data-ID');
			var $type = $(this).attr('data-type');
			var thisAjaxParameters = { task: 'remove', type: $type, ID: $ID };
			var thisAjaxBefore = function(){ $('table#'+$ID).hide(); };
			var thisAjaxSuccess = function(data) {
				if (data.status == "problematic")
				{
					$('table#'+$ID).show();
					alert(data.message);
				}
				else if (data.status == "fine")
				{
					$('table#'+$ID).remove();
				}
			};
			
			ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
		}
	});
	
	$('.creditsSelector').live('change', function() {
		var auto = $(this);
		var $type = $(this).attr('data-type');
		var $holder = $(this).attr('data-holder');
		var $credits = $(this).val();
		var thisAjaxParameters = { task: 'creditSelection', type: $type, holder: $holder, credits: $credits };
		var thisAjaxBefore = function(){ $(auto).next().show(); };
		var thisAjaxSuccess = function(data) {
			$(auto).next().hide();
			if (data.status == "problematic")
			{
				alert(data.message);
			}
			else if (data.status == "fine")
			{
				$('table#'+$username).remove();
			}
		};
		
		ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	
	});
	
	$('#filterCountry').live('change', function() {
		var $value = $(this).val();
		
		var thisAjaxParameters = { task: 'setfilterCountry', value: $value };
		var thisAjaxBefore = function(){ };
		var thisAjaxSuccess = function(data) { };
		
		ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	
	});
	
	$('#filterAge').live('change', function() {
		var $value = $(this).val();
		
		var thisAjaxParameters = { task: 'setfilterAge', value: $value };
		var thisAjaxBefore = function(){ };
		var thisAjaxSuccess = function(data) { };
		
		ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	
	});
	
	$('#filterIntKey').live('change', function() {
		var $value = $(this).val();
		
		var thisAjaxParameters = { task: 'setfilterIntKey', value: $value };
		var thisAjaxBefore = function(){ };
		var thisAjaxSuccess = function(data) { };
		
		ajaxCall("do", thisAjaxParameters, thisAjaxBefore, thisAjaxSuccess);
	
	});
	
})(window.jQuery);