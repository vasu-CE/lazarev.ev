function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotiveAnimation();

function loadingAnimation(){
    var tl = gsap.timeline();
    tl.from('#page1',{
        opacity:0,
        duration:0.3,
        delay:0.2
    })
    tl.from('#page1',{
        transform:'scaleX(0.7) scaleY(0.2)',
        borderRadius:'50px',
        duration:2,
        ease:'expo.out'
    })
    tl.from('nav,#page1 h1,#page1 p,#page1 div',{
        opacity:0,
        duration:0.5,
        stagger:0.2
    })
}
loadingAnimation();

function navAnimation(){
    let nav = document.querySelector('.nav');
nav.addEventListener('mouseenter' , ()=> {

    let tl = gsap.timeline();
    tl.to('.navBottom',{
        height:'26vh'
    })
    tl.to('.nav h5',{
        display:"block"
    })
    tl.to('.nav h5 span',{
        y:0,
        // duration:0.2,
        stagger:{
            amount:0.6
        }
    })
})

nav.addEventListener('mouseleave',()=>{
    let tl = gsap.timeline();
    tl.to('.nav h5 span',{
        y:25,
        stagger:{
            amount:0.2
        }
    })
    tl.to('.nav h5',{
        display:"none",
        duration:0.01
    })
    tl.to('.navBottom',{
        height:'0',
        duration:0.28
    })
})
}

navAnimation();

function cursorImg() {
    let rightElem = document.querySelectorAll('.rightElement');

rightElem.forEach((elem) => {
    elem.addEventListener('mouseenter',()=> {
        // console.log(elem.childNodes);
        // console.log(elem.getBoundingClientRect())
        elem.style.borderColor = "#fff";
        gsap.to(elem.childNodes[3],{
            opacity:1,
            scale:1,
        })
        
    })
    elem.addEventListener('mouseleave',() => {
        elem.style.borderColor = "#333";
        gsap.to(elem.childNodes[3],{
            opacity:0,
            scale:0
        })
    })
    elem.addEventListener('mousemove',(dets) => {
        // console.log(elem.getBoundingClientRect().y)
        gsap.to(elem.childNodes[3],{
            x:dets.x - elem.getBoundingClientRect().x-57,
            y:dets.y - elem.getBoundingClientRect().y-145
        })
    })
})
}

cursorImg();

function playVideo() {
    let vidioElem = document.querySelector('.vidioElement');
let video = document.querySelector('#page3 video');
let h5 = document.querySelector('#page3 h5');

vidioElem.addEventListener('click',()=> {
    h5.style.opacity = 0;

    video.play();
    gsap.to(video,{
        // duration:1,
        transform:'scaleX(1) scaleY(1)',      
        borderRadius:0,
        opacity:1
    })
})
video.addEventListener('click',() => {
    video.pause();
    gsap.to(video, {
        // duration:1,
        transform : 'scale(0.7) scalY(0)',
        opacity:0,
        borderRadius:'30px'
    })
})
}
playVideo();

function sectionVideo() {
    var sections = document.querySelectorAll('#page6 .section .right');

sections.forEach((right)=> {
    // console.log(right.childNodes)
    right.addEventListener('mouseenter' , ()=> {
        right.childNodes[7].style.opacity = 1;
        right.childNodes[7].play();
    })
    right.addEventListener('mouseleave' , ()=> {
        right.childNodes[7].style.opacity = 0;
        right.childNodes[7].pause();
        right.childNodes[7].load();
    })
})

sections.forEach((section)=> {
    section.addEventListener('mouseenter' , ()=> {
        gsap.to(section.childNodes[3],{
            opacity:1,
            scale:1
        })
    })

    section.addEventListener('mouseleave',()=> {
        gsap.to(section.childNodes[3],{
            opacity:0,
            scale:0
        })
    })

    section.addEventListener('mousemove',(dets)=>{
        gsap.to(section.childNodes[3],{
            x:dets.x - section.getBoundingClientRect().x-70,
            y:dets.y - section.getBoundingClientRect().y-64
        })
    })
})
}

sectionVideo();

function cardAnimation() {
    let cards = document.querySelectorAll('#page7 .card');
cards.forEach((card) => {
    // console.log(card);
    card.addEventListener('mouseenter',()=>{
        console.log(card.childNodes);
        card.childNodes[7].play();
        // card.childNodes[5].style.height = '63vh';
        card.childNodes[7].style.height = '63vh';
        card.style.borderColor = 'black';

    })

    card.addEventListener('mouseleave',() => {
        // card.childNodes[5].style.height = '40vh';
        card.childNodes[7].style.height = '40vh';
        card.childNodes[7].pause();
        card.childNodes[7].load();
        card.style.borderColor = '#dedede';
    })
})
}

cardAnimation();

