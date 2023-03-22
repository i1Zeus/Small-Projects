//* change color on click
const svg = document.getElementById("triangles");
svg.onclick = (e) => {
    const colors = [
        "red",
        "blue",
        "purple",
        "black",
        "yellow",
        "darkgray",
        "orange",
    ];
    const ranod = () => colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.cssText = `--dark: ${ranod()}; --light: ${ranod()}`;
};

//* this is to show content on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
});

const hiddenEl = document.querySelectorAll(".hidden");
hiddenEl.forEach((el) => {
    observer.observe(el);
});
