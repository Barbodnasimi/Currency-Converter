const appId = 'YOUR_OPEN_EXCHANGE_RATES_API_KEY';
const convertDiv = document.querySelector('#result');
const fromCurrencyEl = document.querySelector('#fromCurrency');
const toCurrencyEl = document.querySelector('#toCurrency');
const amountEl = document.querySelector('#amount');
const convertButton = document.querySelector('button');

function convertCurrency() {
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;
    const amount = amountEl.value;

    if (amount <= 0) {
        convertDiv.textContent = 'Please enter a valid number';
    } else {
        const apiUrl = `https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${appId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const conversionRate = data.rates[toCurrency];
                const convertedAmount = amount * conversionRate;

                if (fromCurrency === toCurrency) {
                    convertDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                } else {
                    convertDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
                }
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
                convertDiv.innerHTML = 'Error fetching exchange rates. Please try again later.';
            });
    }
}

convertButton.addEventListener('click', convertCurrency);
