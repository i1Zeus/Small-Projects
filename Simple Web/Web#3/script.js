let bug = document.querySelector("#bug");
let x = 0;
let y = 0;
let speed = 10;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

document.addEventListener("keydown", (e) => {
    if (e.keyCode === 37) {
        if (x > 0) {
            x -= speed;
            bug.style.left = x + "px";
            bug.style.transform = "rotate(270deg)";
        }
    } else if (e.keyCode === 38) {
        if (y > 0) {
            y -= speed;
            bug.style.top = y + "px";
            bug.style.transform = "rotate(0deg)";
        }
    } else if (e.keyCode === 39) {
        if (x + 100 < windowWidth) {
            x += speed;
            bug.style.left = x + "px";
            bug.style.transform = "rotate(90deg)";
        }
    } else if (e.keyCode === 40) {
        if (y + 100 < windowHeight) {
            y += speed;
            bug.style.top = y + "px";
            bug.style.transform = "rotate(180deg)";
        }
    }
});
