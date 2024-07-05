var tl=gsap.timeline();

var vegMeals=[
    {img:"https://i.pinimg.com/736x/26/b4/27/26b42723c6166089b0545846dd1652ec.jpg",title:"Veg Noodles ",p:" Fresh and flavorful veggie noodles tossed in a savory sauce, packed with crisp vegetables for a perfect meal."},
    {img:"https://i.pinimg.com/564x/33/6f/49/336f4969f18cc575675c4f485443c383.jpg",title:" Burgers",p:" Delight in our juicy veg burgers, bursting with garden-fresh veggies and a hint of spice in every bite."},
    {img:"https://i.pinimg.com/564x/50/3b/99/503b9952fffc44143981d6b6a1b953cd.jpg",title:" Rolls",p:" Enjoy our veg rolls, filled with vibrant vegetables and wrapped in a soft, warm tortilla for a quick, tasty treat"},
    {img:"https://i.pinimg.com/736x/44/93/84/4493848babc1da57c2f2641891e2d0fc.jpg",title:" Veg Pizza",p:"Savor our veg pizza, loaded with colorful veggies and melted cheese on a crispy crust, a delight for every pizza lover."},
    {img:"https://i.pinimg.com/564x/33/0f/8e/330f8e3594e6063e038585b1aed5e597.jpg",title:"Cheese Fries",p:"Indulge in our golden fries smothered in gooey, melted cheese for the ultimate comfort snack."}
]

var nonVegMeals=[
    {img:"https://i.pinimg.com/564x/e7/65/08/e76508a35de02567b4321519f6dd9611.jpg",title:" Chicken Spring Rolls",p:"Crispy spring rolls stuffed with seasoned chicken and fresh vegetables, offering a delightful crunch in every bite."},
    {img:"https://i.pinimg.com/564x/9b/71/87/9b7187bba5612bd01e086ff5b74b7a6a.jpg",title:" Chicken Pakoras",p:"Succulent chicken pieces, marinated and fried to golden perfection, delivering a burst of flavor with every crispy pakora."},
    {img:"https://i.pinimg.com/564x/3c/e8/20/3ce820fcadd4433a2769abb9beb6d854.jpg",title:" Shio Ramen",p:" Savory shio ramen with tender chicken, delicate noodles, and a rich broth, perfect for a comforting and aromatic meal."},
    {img:"https://i.pinimg.com/564x/7e/77/10/7e7710f3720a1d893e702274c9553a28.jpg",title:" Chicken Soup",p:"Heartwarming chicken soup brimming with tender chicken, vegetables, and herbs, a classic choice for wholesome comfort."},
    {img:"https://i.pinimg.com/564x/6f/dc/67/6fdc67046b2a14caa72e3a005d11b596.jpg",title:"Meatballs",p:"Juicy meatballs cooked to perfection, served in a savory sauce, making them a delicious addition to any meal."}
]
function locomotiveAnimation(){
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
function loadingAnimation(){
    
tl.to("#loader-page h1",{
    opacity: 0,
    duration: 2,
    delay:1,
    // repeat: true,
})

tl.to("#loader-page",{
    // opacity: 0,
    x:-2000,
    duration: 0.8,
    delay:1,
    display:"none"

})
}
function vegMealsShow(){
    var clutter="";
    vegMeals.forEach(function(element){
        clutter +=`<div class="card">
                    <div id="card-img">
                        <img src="${element.img}" alt="Noodles">
                    </div>
                    <h2>${element.title}</h2>
                    <p>${element.p}</p>
                    <button>Order Now</button>
                    <button>Add To Cart</button>
                </div>`
    })
    document.querySelector("#meals-veg").innerHTML=clutter
}

function nonVegMealsShow(){
    var clutter="";
    nonVegMeals.forEach(function(item){
        clutter +=`<div id="card-nvg">
                    <div id="card-nvg-img">
                        <img src="${item.img}" alt="">
                    </div>
                    <h2>${item.title}</h2>
                    <p>${item.p}</p>
                    <button>Order Now</button>
                    <button>Add To Cart</button>
                </div>`
    })
    document.querySelector("#meals-non-veg").innerHTML=clutter
}

function videoPlayer(){
    var videoInContainter=document.querySelector("#video-container video");




    document.querySelector("#video-container").addEventListener("mouseenter",function(){
        document.querySelector("#video-container").addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0,
                display:"none"
            })
            gsap.to("#video-cursor",{
                top:dets.y-150,
                left:dets.x-90
            })
        })
    })

    document.querySelector("#video-container").addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
            opacity:1,
            display:"initial"
        })
        gsap.to("#video-cursor",{
            left:"50%",
            top:"50%"
        })
    })

    var flag=0;
    document.querySelector("#video-container").addEventListener("click",function(){
        if(flag==0){
            videoInContainter.play();
        videoInContainter.style.opacity=1;

        document.querySelector("#video-cursor").innerHTML=`<i class="ri-pause-mini-fill"></i>`
        gsap.to("#video-cursor",{
            scale:0.5
        })
        flag=1;
        }
        else{
            videoInContainter.pause();
        videoInContainter.style.opacity=0;

        document.querySelector("#video-cursor").innerHTML=`<i class="ri-play-mini-fill"></i>`
        gsap.to("#video-cursor",{
            scale:1
        })
        flag=0;
        }
        
    })
}

function socialBtnClick(){
    document.querySelector("#social-btn").addEventListener("click",function(){
        alert("im shy suri 👉👈");
        document.querySelector("#social-details").style.display="inline";
    })
}

function allGSAP(){
    tl.from("#right h3",{
        opacity:0,
        y:-10,
        stagger:0.3,
    })

    tl.from("#pg1-main",{
        opacity:0,
        x:-100,
        stagger:0.3,
    })

    tl.to("#page3",{
        opacity:1,
        y:-100,
        ScrollTrigger:{
        trigger:"#page3",
        scroller:"body",
        // markers:true,
        start:"top 30%",
        end:"top -100%",
        scrub:2,
        // pin:true
        }
    })
}
loadingAnimation();
locomotiveAnimation();
vegMealsShow();
nonVegMealsShow();
videoPlayer();
socialBtnClick();

allGSAP();