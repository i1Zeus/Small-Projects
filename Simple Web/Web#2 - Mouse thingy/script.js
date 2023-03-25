let circle = document.getElementById("circle");

const onMouseMove = (e) => {
    setTimeout(() => {
        circle.style.left = e.pageX - circle.offsetWidth / 2 + "px";
        circle.style.top = e.pageY - circle.offsetHeight / 2 + "px";
    }, 40);
};

document.addEventListener("mousemove", onMouseMove);
