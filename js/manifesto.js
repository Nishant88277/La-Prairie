window.addEventListener('load',() => {
	setTimeout(()=>{
		window.scrollTo(0,0);
		document.documentElement.scrollTop = 0;
	},5);
});
Array.from(document.querySelectorAll('.lr-manifesto-container')).forEach((manifesto)=>{
	const media = manifesto.querySelector('.lp-manifesto-media');
	Array.from(manifesto.querySelectorAll('.lp-manifesto-content-text-item')).forEach((item)=>{
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
	});
	const tl = gsap.timeline();
	tl.from(media, {
		opacity: 10
	});
	tl.to(media, {
		filter:"blur(8px)",
		opacity: 0,
  		scrollTrigger: {
    		trigger: manifesto,
    		start: "top bottom",
    		end: "bottom bottom",
    		scrub: 0.5,
    		markers: false
	      }
		}, "1");
	});
	
	
//  peragraph reveling animation......
	
const paragraphDiv = document.querySelectorAll('.lp-manifesto-content-text-item')
const textDiv = document.querySelectorAll('.lp-manifesto-content-text-item p')

// assining new innerHtml with span tag to every paragraph.
paragraphDiv[1].children[0].innerHTML = linecount(paragraphDiv[1].children[0].firstChild)
paragraphDiv[2].children[0].innerHTML = linecount(paragraphDiv[2].children[0].firstChild)
paragraphDiv[3].children[0].innerHTML = linecount(paragraphDiv[3].children[0].firstChild)
paragraphDiv[4].children[0].innerHTML = linecount(paragraphDiv[4].children[0].firstChild)


// function for rendered lines of text from the given textNode as it
// exists in the document at this very moment.
function linecount(textnode){
	let textNode = textnode

	textNode.textContent = collapseWhiteSpace(textNode.textContent);

	let textContent = textNode.textContent;
	let range = document.createRange();
	let lines = [];
	let lineChar = [];

	for( let i = 0; i < textContent.length; i++){
		range.setStart( textNode, 0);
		range.setEnd( textNode, (i + 1))

		let lineIndex = (range.getClientRects().length - 1);

		if(! lines[lineIndex]){
			lines.push(lineChar = []);
		}

		lineChar.push( textContent.charAt(i));
	}

	lines = lines.map(
		function operator(characters){
			return (collapseWhiteSpace(characters.join('')))
		}
	)

	let htmlStr = ''
	const str = lines.map((line)=>{
		htmlStr += `<span>${line}</span> `
	})

	// returning string. 
	return htmlStr
}

function collapseWhiteSpace( value ) {
	return( value.trim().replace( /\s+/g , " " ) );
}


textDiv.forEach((line)=>{
	let item = line.querySelectorAll('span')
	item.forEach((item, index)=>{
		gsap.from(item,{
			opacity:0,
			y:'5px',
			duration:.5,			
			ease: Power3.easeIn,
			scrollTrigger:{
				trigger: item,
				start: start(index),
				end: 'bottom bottom',
				scrub: 2,
			}
		})
	})
})


// setting starting point for every single span.
function start(index){
	let point = ''

	return point = window.innerWidth < 480 ? 'top' + ' ' + (660 - (index * 30)) : 'top' + ' ' + (720 - (index * 60))
}