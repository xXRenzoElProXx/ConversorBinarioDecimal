function filterInput() {
    const input = document.getElementById('numberInput');
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const allowedChars = '0123456789ABCDEF'.slice(0, fromBase);

    input.value = input.value.toUpperCase().split('').filter(char => allowedChars.includes(char)).join('');
}

function updateToBaseOptions() {
    const fromBase = document.getElementById('fromBase').value;
    const toBase = document.getElementById('toBase');
    const options = toBase.querySelectorAll('option');

    options.forEach(option => {
        if (option.value === fromBase) {
            option.disabled = true;
        } else {
            option.disabled = false;
        }
    });

    if (toBase.value === fromBase) {
        toBase.value = Array.from(options).find(option => option.value !== fromBase).value;
    }
}

function swapBases() {
    const fromBase = document.getElementById('fromBase');
    const toBase = document.getElementById('toBase');

    const temp = fromBase.value;
    fromBase.value = toBase.value;
    toBase.value = temp;

    updateToBaseOptions();
    convert();
}

function convert() {
    const numberInput = document.getElementById('numberInput').value;
    const fromBase = parseInt(document.getElementById('fromBase').value);
    const toBase = parseInt(document.getElementById('toBase').value);
    const resultElement = document.getElementById('result');

    if (numberInput === "") {
        resultElement.innerHTML = "-";
        return;
    }

    const regex = new RegExp(`^[0-9A-Fa-f]+$`);
    if (!regex.test(numberInput)) {
        resultElement.innerHTML = "Número no válido.";
        return;
    }

    const number = parseInt(numberInput, fromBase);
    if (isNaN(number)) {
        resultElement.innerHTML = "Número no válido.";
        return;
    }

    let convertedNumber = number.toString(toBase).toUpperCase();

    if (convertedNumber.length > 10) {
        const mid = Math.ceil(convertedNumber.length / 2);
        convertedNumber = convertedNumber.slice(0, mid) + "<br>" + convertedNumber.slice(mid);
    }

    resultElement.innerHTML = convertedNumber;
}
