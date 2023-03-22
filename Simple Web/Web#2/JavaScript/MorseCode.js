//* Morse code letters
const MORSE_CODE = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    "--..--": ",",
    ".-.-.-": ".",
    "..--..": "?",
    "-..-.": "/",
    "-....-": "-",
    "-.--.": "(",
    "-.--.-": ")",
    ".--.-.": "@",
    "-...-": "=",
    ".----.": "'",
    "-.-.--": "!",
};

//* Function to decode the morse code!
const decodeMorse = (morseCode_) => {
    return morseCode
        .split("  ")
        .map((word) =>
            word
                .split(" ")
                .map((letter) => MORSE_CODE[letter])
                .join("")
        )
        .join(" ")
        .trim();
};

//? Test
const morseCode = ".... ..- ... ... . .. -.  -. .- .--- .- ....";
const decodedMessage = decodeMorse(morseCode);
console.log(decodedMessage);
