function sum(_numbers) {
    var sum = 0;
    for (var i = 0; i < _numbers.length; i++) {
        sum += _numbers[i];
    }
    return sum;
}
//? Same as the above function
/*
function sum(numbers) {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
*/

//? Sum all the numbers of a given array ( cq. list ), except the highest and the lowest element
function sumArray(array) {
    if (array.length < 2) {
        return 0;
    }
    var sortedNumbers = array
        .sort(function (a, b) {
            return a - b;
        })
        .slice(1, -1);
    var sum = sortedNumbers.reduce(function (acc, val) {
        return acc + val;
    }, 0);
    return sum;
}
