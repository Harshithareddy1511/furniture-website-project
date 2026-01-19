const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".content .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxscrollLeft=imageList.scrollWidth - imageList.clientWidth;
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown",(e)=>{
        const startX=e.clientX;
        const thumbPosition =scrollbarThumb.offsetLeft;
        // update thumb position on mouse move
        const handleMouseMove = (e) =>{
            const deltaX =e.clientX-startX;
            const newThumbPosition =thumbPosition +deltaX;
            const maxThumbPosition =sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            const boundedPosition =Math.max(0,Math.min(maxThumbPosition,newThumbPosition));
            const scrollPosition =(boundedPosition/maxThumbPosition)*maxscrollLeft;
            scrollbarThumb.style.left=`${newThumbPosition}px`;
            imageList.scrollLeft=scrollPosition;
        }
        // remove event listeners on mouse up
        const handleMouseup=() =>{
            
            document.removeEventListener("mousemove",handleMouseMove);
            document.removeEventListener("mouseup",handleMouseup);

        }
        // add event listeners for drag interaction
        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup",handleMouseup);
    });
    //slide images according to the slide button clicks
    slideButtons.forEach(button =>{
        button.addEventListener("click",()=>{
            const direction =button.id==="prev-slide" ? -1:1;
            const scrollAmount =imageList.clientWidth*direction;
            imageList.scrollBy({left: scrollAmount, behavior:"smooth"});
        });
    });
    const handleSlideButtons= ()=>{
        slideButtons[0].style.display=imageList.scrollLeft <=0 ? "none" :"block";
        slideButtons[1].style.display=imageList.scrollLeft >= maxscrollLeft ? "none" : "block";
    }
    //update scrollthumb position
    const updateScrollThumbPosition =() => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition =(scrollPosition/maxscrollLeft)*(sliderScrollbar.clientWidth-scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left= `${thumbPosition}px`;

    }
    imageList.addEventListener("scroll",() =>{
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load",initSlider);