const uniqueRand = (min, max, perv) => {
    let next = perv;
    while (perv === next) next = rand(min, max);
    return next;
};
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const combinations = [
    { configuration: 1, roundness: 1 },
    { configuration: 1, roundness: 2 },
    { configuration: 1, roundness: 4 },
    { configuration: 2, roundness: 2 },
    { configuration: 2, roundness: 3 },
    { configuration: 3, roundness: 3 },
];

let perv = 0;

setInterval(() => {
    const index = uniqueRand(0, combinations.length - 1, perv);
    combination = combinations[index];

    const wrapper = document.getElementById("wrapper")
    wrapper.dataset.combination = combination.configuration;
    wrapper.dataset.roundness = combination.roundness;
}, 3000);
