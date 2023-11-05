/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

	// add
	const slogan = "안녕하세요.\n 개발자 김광호 입니다.";
	const subTxt = "어제보다 조금 더 세심한 코드를 짜기 위해 노력합니다."
	const text1 = document.querySelector("#typing1");
	const text2 = document.querySelector("#typing2");
	let i = 0;
	let j = 0;

	// 타이핑 효과를 위한 함수
	// 적용되는 문장에 복수의 태그가 사용되어 각각 변수와 조건을 따로 줌.
	function typing(){
		if (i < slogan.length){
			let txt = slogan[i++];
			text1.innerHTML += txt=== "\n" ? "<br/>": txt;
		} else if(i == slogan.length) {
			$('#cursor1').html('');
			i++
		}
		if(i > slogan.length && j < subTxt.length){
			$('#cursor2').html('|').addClass('blink');
			let txt = subTxt[j++];
			text2.innerHTML += txt=== "\n" ? "<br/>": txt;
		} else if (j == subTxt.length){
			$('.button').removeClass('hide');
			clearInterval(interval)
		}
	}
	var interval = setInterval(typing, 150)

	// intro를 전체화면으로 변경하면서 거슬리는 메뉴를 스크롤 높이에 따라 자동으로 감추었다 꺼내도록 만듬
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if (window.innerWidth > 961) {
			if (scroll <= 500) {
				$('#main').addClass('content-open');
				$('#footer').addClass('content-open');
				$('#header').addClass('head-open');
			}
			if (scroll > 500) {
				$('#main').removeClass('content-open');
				$('#footer').removeClass('content-open');
				$('#header').removeClass('head-open');
			}
		}
	})


	var card = $('.card');

	// 클릭 시 카드를 뒤집는 효과
	let count = 0;
	let rotate = 0;
	function flipper (e) {
		count++;
		var flip = count % 2 === 1 ? 1 : -1
		rotate += 180 * flip
		console.log('count: ' + count);
		console.log('flip: ' + flip);
		console.log('rotate: ' + rotate);
		card.css({
			'transform':`rotateX(${rotate}deg)`,
			'box-shadow': `3px calc(${flip} * -3px) 5px #999`
		});
		//
		// target.style.transform = "rotateX(180deg)"
		// target.style.boxShadow = "3px -3px 5px #999;"
		// target.addEventListener("click", innerFlipper)
	}

	// function innerFlipper (e) {
	// 	const target = e.currentTarget
	// 	target.style.transform = "rotateX(0deg)"
	// 	target.style.boxShadow = "3px 3px 5px #999;"
	// 	target.addEventListener("click", flipper)
	// 	target.removeEventListener("click", innerFlipper)
	// }

	card.click(flipper);


	var per = 0;
	var timer = setInterval(function (){
		per++
		if(per === 100) clearInterval(timer)
		},20)
	// 기술 스택과 관련된 데이터를 json형식으로 만들어 ajax로 처리.
	// 이미지를 넣고 숙련도 값을 받아와 progress바에 적용
	function createStack (stacks){
		stacks.forEach(function (skill){
			$('.'+skill.stack).append(`<div class="logo">
				<img src=${skill.img}>
				<progress class="progress ${skill.skill}" value="0" min="0" max="100"></progress>
			</div>`)
			var increase = setInterval(function (){
				percent(skill)
				if(per >= skill.level){
					clearInterval(increase)
				}
			},20)
		})
	}

	var percent = function percent (skill){
		let level = parseInt(skill.level);
		if(level !== 0){
			$('.'+skill.skill).attr('value',`${per}`);
		}
	}


	// $(function(){
	// 	$('.container').each(function(i){
	// 		// var skill = $(this).find('.skills');//this=.container 안에 있는 .skill의 값을 읽어서 skill이라는 값에 넣어라
	// 		var percent = parseInt(skill.level); //skill에 들어있는 값을 percent라는 변수에 넣어라
	//
	// 		console.log(percent);
	//
	// 		var num = 0; //10퍼센트부터 올라갈 예정이기 때문에 10으로 설정함
	//
	// 		skill.level.animate({'width':percent+'%'},function(){//skill을 애니메이트하겠다. percent에 들어있는 값만큼
	// 			var auto = setInterval(function(){
	// 				num++
	// 				if(num>percent){
	// 					clearInterval(auto)
	// 				}else(
	// 					skill.text(num+'%')
	// 				)
	// 			},10);
	// 		});
	// 	});
	// });

	$.get('https://gist.githubusercontent.com/SDeung01/d3259512d32767264025cf64dc66adb7/raw/065f49ef686f937c8733362ef3fb7a6b4474cd9c/skillstack.json')
		.done(function (data){
			var stacks = JSON.parse(data)
			//console.log(stack)
			for(var stack in stacks){
				createStack(stacks[stack])
			}

			// const front = stacks.stFront;
			// const back = stacks.stBack;
			// const mobile = stacks.stMobile;
			// const version = stacks.stVersion;
			// const tool = stacks.stTool;
			//
			// createStack(front);
			// createStack(back);
			// createStack(mobile);
			// createStack(version);
			// createStack(tool);
		}).fail(function (){
			console.log("error")
	})


})(jQuery);