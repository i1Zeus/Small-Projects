/* 
* Project Tasks
TODO //// 1. Deposit some money.
TODO //// 2. Determine the number of line to bet on.
TODO //// 3. Collect a bet amount.
TODO //// 4. Spin the slot machine. 
TODO //// 5. Check if user won.
TODO ////  6. Give user the money.
TODO //// 7. Check if user has enough money to play again.
*/

//! old style function Deposit() {}
//! ES6 Style const deposit = () => {}

//! Imports
const prompt = require("prompt-sync")();

//! Global Variables
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

//! Functions
//* Function
const deposit = () => {
    const depositAmount = prompt("Enter the deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log("Invalid deposit amount, try again");
        return deposit();
    } else {
        return numberDepositAmount;
    }
};

//* Function
const getNumberOfLines = () => {
    const lines = prompt("Enter the number of lines (1-3): ");
    const numberOfLines = parseInt(lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
        console.log("Invalid number of lines, try again");
        return getNumberOfLines();
    } else {
        return numberOfLines;
    }
};

//* Function
const getBetAmount = (balance, numberOfLines) => {
    const betAmount = prompt("Enter the bet amount: ");
    const numberBet = parseFloat(betAmount);

    if (
        isNaN(numberBet) ||
        numberBet <= 0 ||
        numberBet > balance / numberOfLines
    ) {
        console.log("Invalid bet amount, try again");
        return getBetAmount();
    } else {
        return numberBet;
    }
};

//* Function
const spin = () => {
    const symbols = [];
    // loop through each symbol and add it to the symbols array n times
    for ([Symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(Symbol);
        }
    }
    // create empty reels array with 3 columns and ROWS number of rows
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        // create a copy of the symbols array for the current column
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            // choose a random symbol from the current reelSymbols array and add it to the current row of the current column
            const randomIndex = Math.floor(Math.random() * symbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            // remove the selected symbol from the reelSymbols array so it cannot be selected again
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

//* Function
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

//* Function
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

//* Function
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOLS_VALUE[symbols[0]];
        }
    }
    return winnings;
};

//* Game
const game = () => {
    console.log("Welcome to the slot machine!");
    console.log("Let's play!");
    let balance = deposit();
    while (true) {
        console.log(`Your balance is ${balance}!`);
        const numberOfLines = getNumberOfLines();
        const bet = getBetAmount(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log(`You won $${winnings}!`);
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Play again? (y/n): ");
        if (playAgain != "y") break;
    }
};

game();
