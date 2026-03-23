/* ==============
 ========= js documentation ==========================

 * theme name: Xpovio
 * version: 1.0
 * description: Creative Agency Portfolio HTML5 Template
 * author: Gramentheme
 * author-url: https://themeforest.net/user/gramentheme

	==================================================

	 01. video modal
	 -------------------------------------------------
	 02. portfolio text slider
	 -------------------------------------------------
	 03. vanilla tilt
	 -------------------------------------------------
	 04. testimonial text slider
	 -------------------------------------------------
	 05. sponsor slider
	 -------------------------------------------------
	 06. next page text slider
	 -------------------------------------------------
	 07. offer two slider
	 -------------------------------------------------
	 08. portfolio filter
	 -------------------------------------------------
	 09. testimonial two slider
	 -------------------------------------------------
	 10. blog two slider
	 -------------------------------------------------
	 11. banner three slider
	 -------------------------------------------------
	 12. portfolio three slider
	 -------------------------------------------------
	 13. testimonial slider
	 -------------------------------------------------
	 14. project slider
	 -------------------------------------------------
	 15. team slider
	 -------------------------------------------------
	 16. achievements slider
	 -------------------------------------------------
	 17. service plan slider
	 -------------------------------------------------
	 18. project details poster slider
	 -------------------------------------------------
	 19. project details slider
	 -------------------------------------------------
	 20. select subject
	 -------------------------------------------------
	 21. gsap register
	 -------------------------------------------------
	 22. gsap config
	 -------------------------------------------------
	 23. target id
	 -------------------------------------------------
	 24. smooth scroll
	 -------------------------------------------------
	 25. skill bar progress
	 -------------------------------------------------
	 26. project horizontal move
	 -------------------------------------------------
	 27. split title
	 -------------------------------------------------
	 28. fade animations
	 -------------------------------------------------
	 29. banner one thumb
	 -------------------------------------------------
	 30. banner two thumb
	 -------------------------------------------------
	 31. banner five horizontal move
	 -------------------------------------------------
	 32. video modal bg
	 -------------------------------------------------
	 33. testimonial two thumb
	 -------------------------------------------------
	 34. banner five
	 -------------------------------------------------
	 35. folks text
	 
	==================================================
============== */

(function ($) {
	"use strict";

	jQuery(document).ready(function () {
		let device_width = window.innerWidth;

		// 01. video modal
		if (document.querySelector(".video-btn") !== null) {
			$(".video-btn").magnificPopup({
				disableOn: 768,
				type: "iframe",
				mainClass: "mfp-fade",
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false,
			});
		}

		// 02. portfolio text slider
		$(".portfolio__text-slider").not(".slick-initialized").slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 10000,
			arrows: false,
			dots: false,
			pauseOnHover: false,
			cssEase: "linear",
			variableWidth: true,
		});

		// 03. vanilla tilt - Disabled for professional look
		/*
		let topylotilt = document.querySelectorAll(".topy-tilt");

		if (topylotilt) {
			VanillaTilt.init(document.querySelectorAll(".topy-tilt"), {
				max: 5,
				speed: 3000,
			});
		}
		*/

		// 04. testimonial text slider
		$(".testimonial__text-slider").not(".slick-initialized").slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 10000,
			arrows: false,
			dots: false,
			pauseOnHover: false,
			cssEase: "linear",
			variableWidth: true,
		});

		// 05. sponsor slider
		$(".sponsor__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 6,
				speed: 1000,
				autoplaySpeed: 3000,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				centerMode: true,
				centerPadding: "0px",
				responsive: [{
					breakpoint: 1700,
					settings: {
						slidesToShow: 5,
					},
				},
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: 4,
					},
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
					},
				},
				],
			});

		// 06. next page text slider
		$(".next__text-slider").not(".slick-initialized").slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 10000,
			arrows: false,
			dots: false,
			pauseOnHover: true,
			draggable: false,
			variableWidth: true,
			cssEase: "linear",
		});

		// 07. offer two slider
		$(".offer-two__slider").not(".slick-initialized").slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 10000,
			arrows: false,
			dots: false,
			pauseOnHover: true,
			draggable: false,
			variableWidth: true,
			cssEase: "linear",
		});
		$(".offer-two__slider-rtl").not(".slick-initialized").slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 10000,
			arrows: false,
			dots: false,
			pauseOnHover: true,
			draggable: false,
			variableWidth: true,
			rtl: true,
			cssEase: "linear",
		});

		// 08. portfolio filter
		function masonryMain() {
			if ($(".masonry-grid").length) {
				var $grid = $(".masonry-grid").isotope({
					itemSelector: ".grid-item-main",
					layoutMode: "fitRows",
				});

				var filterFns = {
					all: function () {
						return true;
					},
				};
				$(".portfolio-two__filter-btn").on("click", "button", function () {
					var filterValue = $(this).attr("data-filter");
					filterValue = filterFns[filterValue] || filterValue;
					$grid.isotope({
						filter: filterValue
					});
				});

				$(".portfolio-two__filter-btn").each(function (i, buttonGroup) {
					var $buttonGroup = $(buttonGroup);
					$buttonGroup.on("click", "button", function () {
						$buttonGroup.find(".active").removeClass("active");
						$(this).addClass("active");
					});
				});

				$grid.isotope({
					transitionDuration: "1200ms",
				});
			}
		}

		masonryMain();

		// 09. testimonial two slider
		$(".testimonial-two__slider").not(".slick-initialized").slick({
			infinite: true,
			autoplay: true,
			focusOnSelect: true,
			slidesToShow: 1,
			speed: 1000,
			autoplaySpeed: 3000,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			centerMode: true,
			centerPadding: "0px",
		});

		// 10. blog two slider
		$(".blog-two__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 3,
				speed: 1000,
				autoplaySpeed: 4000,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: $(".prev-blog"),
				nextArrow: $(".next-blog"),
				dots: false,
				centerMode: true,
				centerPadding: "0px",
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					},
				},
				],
			});

		// 11. banner three slider
		$(".banner-three__slider")
			.slick({
				infinite: true,
				arrows: false,
				dots: false,
				autoplay: false,
				speed: 800,
				autoplaySpeed: 4000,
				slidesToShow: 1,
				slidesToScroll: 1,
			})
			.on("beforeChange", function (nextSlide) {
				updateSliderProgress(nextSlide);
			});

		var percentTime;
		var tick;
		var time = 0.1;
		var progressBarIndex = 0;

		$(".slider-progress").each(function (index) {
			var progress = "<div class='inProgress inProgress" + index + "'></div>";
			$(this).html(progress);
		});

		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			tick = setInterval(interval, 10);
		}

		function interval() {
			if (
				$(
					'.banner-three__slider .slick-track div[data-slick-index="' +
					progressBarIndex +
					'"]'
				).attr("aria-hidden") === "true"
			) {
				progressBarIndex = $(
					'.banner-three__slider .slick-track div[aria-hidden="false"]'
				).data("slickIndex");
				startProgressbar();
			} else {
				percentTime += 1 / (time + 5);
				$(".inProgress" + progressBarIndex).css({
					width: percentTime + "%",
				});
				if (percentTime >= 100) {
					$(".banner-three-alt").slick("slickNext");
					progressBarIndex++;
					if (progressBarIndex > 2) {
						progressBarIndex = 0;
					}
					startProgressbar();
				}
			}
		}

		function resetProgressbar() {
			$(".inProgress").css({
				width: 0 + "%",
			});
			clearInterval(tick);
		}

		function updateSliderProgress(index) {
			$(".single-item").removeClass("single-item-active");
			$(".single-item:eq(" + index + ")").addClass("single-item-active");
		}

		startProgressbar();

		$(".single-item:first-child").addClass("single-item-active");

		$(".single-item").on("click", function () {
			clearInterval(tick);
			$(".single-item").removeClass("single-item-active");
			$(this).addClass("single-item-active");
			var goToThisIndex = $(this).find("div").data("slickIndex");
			$(".banner-three-alt").slick("slickGoTo", goToThisIndex, false);
			startProgressbar();
		});

		// 12. portfolio three slider
		$(".portfolio-three__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 1,
				speed: 1000,
				autoplaySpeed: 6000,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: $(".prev-portfolio"),
				nextArrow: $(".next-portfolio"),
				dots: false,
				centerMode: true,
				centerPadding: "25%",
				draggable: false,
				responsive: [{
					breakpoint: 1200,
					settings: {
						centerPadding: "10%",
					},
				},
				{
					breakpoint: 576,
					settings: {
						centerPadding: "0%",
					},
				},
				],
			});

		// 13. testimonial slider
		$(".testimonial-s__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 1,
				speed: 1000,
				autoplaySpeed: 5000,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: $(".prev-testimonial-three"),
				nextArrow: $(".next-testimonial-three"),
				dots: false,
				centerMode: true,
				centerPadding: "0px",
			});

		$(".testimonial-s__slider").on(
			"beforeChange",
			function (event, slick, currentSlide, nextSlide) {
				var nextSlideIndex = (nextSlide + 1) % slick.slideCount;
				var nextImageSrc = slick.$slides
					.eq(nextSlideIndex)
					.find("img")
					.attr("src");
				$(".other-section-image").attr("src", nextImageSrc);
			}
		);

		// 14. project slider
		$(".project__text-slider").not(".slick-initialized").slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 0,
			speed: 10000,
			arrows: false,
			dots: false,
			pauseOnHover: true,
			draggable: false,
			variableWidth: true,
			cssEase: "linear",
		});

		// 15. team slider
		$(".team-s__slider")
			.not(".slick-initialized")
			.on("init", function (event, slick) {
				$(slick.$slides.get(slick.currentSlide)).addClass(
					"slick-center-active"
				);
			})
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 2,
				speed: 1000,
				autoplaySpeed: 3000,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: $(".prev-team-s"),
				nextArrow: $(".next-team-s"),
				dots: false,
				centerMode: true,
				centerPadding: "0%",
				pauseOnHover: true,
				variableWidth: true,

				responsive: [{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						variableWidth: false,
						centerPadding: "5%",
					},
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						centerPadding: "5%",
					},
				},
				],
			})
			.on("afterChange", function (event, slick, currentSlide) {
				$(".slick-slide").removeClass("slick-center-active");
				$(slick.$slides.get(slick.currentSlide)).addClass(
					"slick-center-active"
				);
			});

		// 16. achievements slider
		$(".achievements__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 5,
				speed: 1000,
				autoplaySpeed: 3000,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				responsive: [{
					breakpoint: 1200,
					settings: {
						slidesToShow: 4,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 375,
					settings: {
						slidesToShow: 1,
					},
				},
				],
			});

		// 17. service plan slider
		$(".service-t__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 4,
				speed: 1000,
				autoplaySpeed: 5000,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: $(".prev-service-t"),
				nextArrow: $(".next-service-t"),
				dots: false,
				centerMode: true,
				centerPadding: "0px",
				responsive: [{
					breakpoint: 1400,
					settings: {
						slidesToShow: 3,
					},
				},
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					},
				},
				],
			});

		// 18. project details poster slider
		$(".poster__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 1,
				speed: 1000,
				autoplaySpeed: 4000,
				slidesToScroll: 1,
				arrows: true,
				prevArrow: $(".prev-project-d"),
				nextArrow: $(".next-project-d"),
				dots: false,
				centerMode: true,
				centerPadding: "0px",
			});

		// 19. project details slider
		$(".project-d__slider")
			.not(".slick-initialized")
			.slick({
				infinite: true,
				autoplay: true,
				focusOnSelect: true,
				slidesToShow: 3,
				speed: 1000,
				autoplaySpeed: 4000,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				centerMode: true,
				centerPadding: "15%",
				responsive: [{
					breakpoint: 1400,
					settings: {
						slidesToShow: 2,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
					},
				},
				],
			});

		// 20. select subject
		$(".subject").niceSelect();

		// 21. gsap register
		gsap.registerPlugin(
			ScrollTrigger,
			ScrollToPlugin,
			SplitText
		);

		// 22. gsap config
		gsap.config({
			nullTargetWarn: false,
			debug: false,
		});

		// 23. target id
		$('a[href^="#"]').on("click", function (event) {
			event.preventDefault();

			var target = $(this).attr("href");

			gsap.to(window, {
				scrollTo: {
					y: target,
					offsetY: 50,
				},
				duration: 0.5,
				ease: "power3.inOut",
			});
		});
		// 24. smooth scroll
		// if (device_width > 576) {
		// 	const smoother = ScrollSmoother.create({
		// 	  smooth: 2.2,
		// 	  effects: device_width < 992 ? false : true,
		// 	  smoothTouch: false,
		// 	  normalizeScroll: false,
		// 	  ignoreMobileResize: true,
		// 	});
		//   }

		// 25. skill bar progress
		$("[data-percent]").each(function () {
			$(this)
				.find(".skill-bar-percent")
				.css("width", $(this).attr("data-percent"));
			$(this).find(".percent-value").text($(this).attr("data-percent"));
		});

		const ax_progress_bar = document.querySelectorAll(".skill-bar-single");
		ax_progress_bar.forEach((element) => {
			const w = element.querySelector(".skill-bar-percent");
			const p = element.querySelector(".percent-value");

			const target = p.textContent;

			const ax_bartl = gsap.timeline({
				defaults: {
					duration: 2,
				},
				scrollTrigger: {
					trigger: element,
				},
			});

			ax_bartl.fromTo(
				w, {
				width: 0
			}, {
				width: target,
			}
			);
			ax_bartl.from(
				p, {
				textContent: 0 + "%",
				snap: {
					textContent: 5
				},
			},
				"<"
			);
		});

		// 26. project horizontal move
		if ($(".project-sl").length > 0) {
			let sections = gsap.utils.toArray(".project-sl__single");
			gsap.to(sections, {
				xPercent: -100 * (sections.length - 1),
				ease: "none",
				scrollTrigger: {
					trigger: ".project-sl",
					pin: true,
					invalidateOnRefresh: true,
					start: "center center",
					scrub: 1,
					snap: 1 / (sections.length - 1),
					end: () => "+=" + $(".project-sl").innerWidth(),
				},
			});
		}

		// Removed unnecessary animations (e.g., split title, fade animations, etc.) to keep the site professional.
	});
})(jQuery);