const updateMedia = (animation, container, history) => {
	
	if (container.getBoundingClientRect().top > -1 && container.classList.contains('locked-bottom')) {
		container.classList.add('locked');
		container.classList.remove('locked-bottom');
	}
	document.querySelector(':root').style.setProperty('--pseudo-history-bar',(Math.max(0,(history.querySelector('.history-line-area').offsetHeight*animation.progress)-(window.innerHeight/2)))+'px');
}
Array.from(document.querySelectorAll('.history-section')).forEach((history)=>{
	const container = history.querySelector('.lp-history-media-container');
	const tl = gsap.timeline();
	tl.to(container, {
		onStart: () => {
			container.classList.add('locked');
			container.classList.remove('locked-bottom')
		},
		onComplete: () => {
			container.classList.remove('locked');
			container.classList.add('locked-bottom')
		},
		onReverseComplete: () => {
			container.classList.remove('locked')
		},
  		scrollTrigger: {
    		trigger: history,
    		start: "top top",
    		end: "bottom bottom",
    		scrub: 0.5,
    		markers: false,
    		onUpdate: (animation) => {
				updateMedia(animation, container,history);
			}
	      }
	}, "1");
	const item = history.querySelector('.history-basic');
	let itemtl = gsap.timeline({});
	itemtl.from(item, {
		opacity: 10
	});
	itemtl.to(item, {
		filter:"blur(3px)",
		opacity: 0, 
		duration: 1,
		scrollTrigger: {
			trigger: item,
			start: "center center",
			pin: true,
			pinSpacing: false,
			scrub: true,
			end: '120% center',
			markers: false
		}
	}, "1");
	Array.from(history.querySelectorAll('.each-history-year')).forEach((hist) => {
		let histtl = gsap.timeline({});
		histtl.from(hist, {
			opacity: 5
		});
		histtl.to(hist, {
			opacity: 0.5, 
			duration: 1,
			scrollTrigger: {
				trigger: hist,
				start: "center center",
				scrub: true,
				end: 'top top',
				markers: false
			}
		}, "1");
	});
});

// image scroll-up animation

const firstImage = document.querySelector('.lp-manifesto-media-container')
		gsap.to(firstImage, {
			y:'-100%',
			duration:.5,
			scrollTrigger:{
				triger: firstImage,
				start: 'center 100',
				end: "+=1000",
				scrub: .5,
			}
			
		})