(function ($) {
window.addEventListener("DOMContentLoaded", personScrollAni);

gsap.registerPlugin(ScrollTrigger);     

function personScrollAni(){
const winWidth = window.innerWidth;

var personInfoElems = document.querySelectorAll(".person_info");
var personImageElems = document.querySelectorAll(".person_image");

const personInfoWrapper = document.createElement("div");
personInfoWrapper.className = "personInfoWrapper";

personInfoElems.forEach(elem => {
    personInfoWrapper.appendChild(elem);
});

const personImageEvenWrapper = document.createElement("div");
personImageEvenWrapper.className = "personImageEvenWrapper";

const personImageOddWrapper = document.createElement("div");
personImageOddWrapper.className = "personImageOddWrapper";

personImageElems.forEach((elem, i) => {
    if(i%2 === 0) {
        personImageOddWrapper.appendChild(elem);
    } else {
        personImageEvenWrapper.appendChild(elem);
    }
});

const personImageWrapper = document.createElement("div");
personImageWrapper.className = "personImageWrapper";
personImageWrapper.appendChild(personImageEvenWrapper);
personImageWrapper.appendChild(personImageOddWrapper);

const peopleContainer = document.createElement("div");
peopleContainer.className = "peopleContainer";
peopleContainer.appendChild(personInfoWrapper);
peopleContainer.appendChild(personImageWrapper); 

document.getElementById("people-wrapper").appendChild(peopleContainer);


var boardContent = document.querySelector(".people-section-middle-content");



gsap.timeline( { 
    scrollTrigger: {
        trigger: boardContent,
        start: "center center",
        end: () => "+=" + (boardContent.offsetHeight + peopleContainer.getBoundingClientRect().top - boardContent.getBoundingClientRect().bottom),
        pin: true,
        pinSpacing: false,
        scrub: true,
        preventOverlaps: true,
        markers: false,
        toggleActions: "play reverse play reverse",
    }
}).to(boardContent, { opacity: 0, ease: "ease", duration: 15});
gsap.timeline({
    scrollTrigger: {
        trigger:personImageWrapper,
        start:()=>{
            if ($(window).width() <= 768) {     
                return "top center";
            }else{
                return  "top 20%";
            }
        } ,
        end:()=>{
            if($(window).width() > 768){
                return "bottom 80%";
            }else{
                return  "bottom bottom"
            }
        },
        //preventOverlaps: true,
        pin: personInfoWrapper,
        markers: false,
        pinSpacing: false
    }
});

personImageElems.forEach((elem, i) => {
    const endPoint = i === personImageElems.length - 1 ? elem.getBoundingClientRect().height : personImageElems[i + 1].getBoundingClientRect().top - elem.getBoundingClientRect().top;
    const screenStart = winWidth > 768 ? window.innerHeight / 2 : (window.innerHeight / 2) / 2;
    const currentImg = elem.querySelector("img");
    const currentInfoEl = personInfoElems[i];
    const prevImg = personImageElems[i - 1] ? personImageElems[i - 1].querySelector("img") : "";
    const prevInfoEl = personInfoElems[i - 1];
   const personTl =  gsap.timeline({
        scrollTrigger: {
            trigger: currentImg,
            start:`top ${screenStart}`,
            end: `+=${endPoint} ${screenStart}`,
            scrub: true,
            markers: false,
            toggleActions: "play reverse play reverse",
        }
    })
    if(i === 0) {
        personTl
        .to([currentImg, currentInfoEl], { opacity: 1})
    }else{
        personTl
        .to(prevImg, {
            opacity:0.1,
            duration:0.3,
        })
        .to(prevInfoEl, {
            opacity:0,
            duration:0.3,
        }, "<")
        .to(currentImg, { opacity: 1, duration:0.5}, "-=0.3")
        .to(currentInfoEl, { opacity: 1, duration:0.5}, "-=0.3")
    }
});
    ScrollTrigger.refresh();
}
})(jQuery);
