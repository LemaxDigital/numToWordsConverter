/* ============================================
===============================================
Authors & copyright: (c) 2016 LemaxDigital.com | numbertoWordsConverter.js - MIT License
===============================================
=============================================== */

// ---- Set Up ---
// Set the word counterparts			
var byOne = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
    byEen = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
    byTen = ["ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
    overHundred = ["hundred", "thousand", "million", "billion"];

function byOneNumber(oneNum) {
    var oneResult
        // -- From one to nine numbers ---					
    oneResult = byOne[oneNum - 1];
    return oneResult;
}

function byEenNumber(eenNum) {
    // -- From eleven to nineteen numbers ---					
    var eenResult = byEen[eenNum - 11];
    return eenResult;
}

function byTenNumber(tenNum) {
    var tenResult;
    if (tenNum > 10 && tenNum < 20) {
        // If the number is between 11 and 19, display the corresponding word from the byEen[];
        tenResult = byEenNumber(tenNum);
        return tenResult;
    } else if (tenNum.charAt(0) >= 1 && tenNum.charAt(0) <= 9 && tenNum.charAt(1) == 0) {
        // Display the byTen word equivalent and if the second number is equal to 0 then display its base 10 equivalent, such as: 10, 20, 30 etc...
        var tenResult = byTen[tenNum.charAt(0) - 1];
        return tenResult;
    } else if (tenNum.charAt(0) >= 1 && tenNum.charAt(0) <= 9 && tenNum.charAt(1) != 0) {
        // Display all the byTen words but if the second digit is not equal to 0 find the corresponding word by running byOneNumber();
        tenResult = byTen[tenNum.charAt(0) - 1] + " " + byOneNumber(tenNum.charAt(1));
        return tenResult;
    } else if (tenNum.charAt(0) == 0 && tenNum.charAt(1) >= 1 && tenNum.charAt(1) <= 9) {
        // If the number start with 0 but the second digit is between 1 and 9 find its corresponding word by running byOneNumber();
        tenResult = byOneNumber(tenNum.charAt(1));
        return tenResult;
    } else {
        // If the number is 00 return an empty string
        tenResult = "";
        return tenResult;
    }
}

function byHundredNumber(hundredNum) {
    if (hundredNum.length == 3) {
        if (hundredNum.charAt(0) == 0) {
            // If the number start with zero
            hundredNum = " and " + byTenNumber(hundredNum.slice(-2, hundredNum.length));
            return hundredNum;
        } else {
            // If the number length is 3
            hundredNum = byOneNumber(hundredNum.slice(0, 1)) + " " + overHundred[0] + " and " + byTenNumber(hundredNum.slice(-2, hundredNum.length));
            return hundredNum;
        }
    } else if (hundredNum.length == 2) {
        // If the number length is 2
        hundredNum = byTenNumber(hundredNum);
        return hundredNum;
    } else {
        // If the number length is 1
        hundredNum = byOneNumber(hundredNum);
        return hundredNum;
    }
}

function doConvert() {
		
    // Get the value from the input
    var inputNum = document.getElementById("numInput").value,	
        //Set up the result variable
        result,
        // Remove Whitespaces
        removeWSpace = inputNum.replace(/\s/g, ''),
        // Remove all dots
        changeDots = removeWSpace.replace(/\./g, '#'),
        // Remove all Dashes
        changeDashes = changeDots.replace(/-/g, '#'),
        // Remove 0 at the beginning
        removeZero = parseInt(changeDashes),
        // Formatted input
        inputNum = removeZero.toString(),
        // Get the length of the input
        inputLength = inputNum.length,
        // Error message to display if inputNum is not a valid input
        errFormat = "Please enter a valid number. <strong>It must be a positive and whole number.</strong>",
        errLength = "Please enter a between 0 and 12 digits.";

    // ---- Validating inputNum ----    
    if ( document.getElementById("numInput").value == "") { // If inputNum is empty, return an error message
        result = errLength;
    } else if (removeZero * 0 != 0) { // If inputNum is not a number, return an error message
        result = errFormat;
    } else {
        // Depending on the inputNum length add the corresponding words
        if (inputLength >= 10 && inputLength <= 12) {
            // Convert Billion length of number
            result = byHundredNumber(inputNum.slice(0, -9)) + " " + overHundred[3] + " " + byHundredNumber(inputNum.slice(-9, -6)) + " " + overHundred[2] + " " + byHundredNumber(inputNum.slice(-6, -3)) + " " + overHundred[1] + " " + byHundredNumber(inputNum.slice(-3, inputLength));
        } else if (inputLength >= 7 && inputLength <= 9) {
            // Convert Million length of number	
            result = byHundredNumber(inputNum.slice(0, -6)) + " " + overHundred[2] + " " + byHundredNumber(inputNum.slice(-6, -3)) + " " + overHundred[1] + " " + byHundredNumber(inputNum.slice(-3, inputLength));
        } else if (inputLength >= 4 && inputLength <= 6) {
            // Convert Thousand length of number			
            result = byHundredNumber(inputNum.slice(0, -3)) + " " + overHundred[1] + " " + byHundredNumber(inputNum.slice(-3, inputLength));
        } else if (inputLength == 3) {
            // Convert Hundred length of number
            result = byHundredNumber(inputNum);
        } else if (inputLength == 2) {
            // Convert two digit length of number
            result = byTenNumber(inputNum);
        } else {
            if (inputNum == 0) {
                // -- Return zero if inputNum is equal to 0 ---										
                result = "Zero";
            } else {
                // -- From one to nine number ---
                result = byOneNumber(inputNum);
            }
        }
    }
	// Return Final result to the html
    document.getElementById("outputTaskThree").innerHTML = result.charAt(0).toUpperCase() + result.slice(1);
}