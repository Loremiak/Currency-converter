const amountInput = document.querySelector("#amount-input");
const selectDOM = document.querySelector("#select-dom");
const submitBtn = document.querySelector("#submit-btn");
const resultSpanDOM = document.querySelector(".answer");

function getCurrencyList() {
	fetch("http://api.nbp.pl/api/exchangerates/tables/a/")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let currencies = ["EUR", "USD", "CHF"];

			selectDOM.addEventListener("change", (event) => {
				let actualName = event.target.value;
				let chooseCurrency = data[0].rates.filter((rate) => {
					return rate.code === actualName;
				});
				let actualRate = chooseCurrency[0].mid;

				function getRoundToTwo(num) {
					return +(Math.round(num + "e+2") + "e-2");
				}

				function exchangeCurrency(e) {
					e.preventDefault();
					if (amountInput.value > 0) {
						document.getElementById("play").play();
						let currencyAmount = amountInput.value;
						let result = currencyAmount * actualRate;
						resultSpanDOM.innerText = getRoundToTwo(result) + " PLN";
					}
				}
				submitBtn.addEventListener("click", exchangeCurrency);
			});
			currencies.forEach((element) => {
				let option = document.createElement("option");
				option.textContent = element;
				selectDOM.appendChild(option);
			});
		});
}
getCurrencyList();
