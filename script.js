const amountInput = document.querySelector("#amount-input");
const selectDOM = document.querySelector("#select-dom");
const submitBtn = document.querySelector("#submit-btn");

const main = document.querySelector("main");

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

				function exchangeCurrency(e) {
					e.preventDefault();
					if (amountInput.value > 0) {
						document.getElementById("play1").play();
						let currencyAmount = amountInput.value;
						let result = currencyAmount * actualRate;

						function roundToTwo(num) {
							return +(Math.round(num + "e+2") + "e-2");
						}

						resultSpanDOM.innerText = roundToTwo(result) + " PLN";
					} else {
						document.getElementById("play2").play();
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
