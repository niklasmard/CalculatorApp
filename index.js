const display = document.getElementById("display");

let calculated = false; // Flag to check if a result was just calculated
let lastResult = null; // Variable to store the last result

function appendToDisplay(input) {
    const operators = ["+", "-", "*", "/"];
    const lastChar = display.value.slice(-1);

    // Clear the display if a result was just calculated
    if (calculated) {
        if (input.classList.contains("operator-btn")) {
            // Clear the display and start with the last result followed by the operator
            lastResult = display.value; // Store the last result
            clearLastResult();
            display.value += input.textContent; // Append operator
            calculated = false; // Reset the flag
        } 
    } else {
        if (input.classList.contains("operator-btn")) {
            // Prevent stacking operators
            if (!operators.includes(lastChar) && display.value !== "") {
                display.value += input.textContent; // Append operator if last character is not an operator
            }
        } else {
            // Append numbers or other inputs
            display.value += input.textContent;
        }
    }
}

function clearDisplay() {
    display.value = "";
    lastResult = null; // Reset last result
}
function clearLastResult() {
    display.value = "";
}

function calculate() {
    try {
        // Replace ^ with ** for exponentiation
        let expression = display.value.replace(/\^/g, "**");

        // Prepend lastResult if the expression starts with an operator
        if (lastResult !== null && /^[+\-*/]/.test(expression)) {
            expression = lastResult.toString() + expression; // Prepend last result to the expression
        }

        let result = eval(expression); // Evaluate the modified expression

        // Convert the result to scientific notation if necessary
        if (result.toString().length > 9) {
            const scientificResult = result.toExponential(); // Convert to scientific notation
            const [mantissa, exponent] = scientificResult.split("e"); // Split into mantissa and exponent
            const maxMantissaLength = 9 - (exponent.length + 2); // Calculate max length for mantissa (2 accounts for "e" and sign)
            result = `${Number(mantissa).toFixed(Math.max(0, maxMantissaLength))}e${exponent}`; // Format result
        }

        display.value = result;
        lastResult = result; // Store the last result for the next calculation
        calculated = true; // Set the calculated flag
    } catch (err) {
        display.value = "Error";
        calculated = false; // Reset the flag in case of an error
    }
}