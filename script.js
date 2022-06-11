const amountInput = document.querySelector("#amount-input");
const selectDOM = document.querySelector("#select-dom");
const submitBtn = document.querySelector("#submit-btn");

const main = document.querySelector("main");
const wheatleyImg = document.querySelector(".wheatley-img");

const resultSpanDOM = document.querySelector(".answer");

wheatleyImg.addEventListener("mouseover", () => {
	const cloudMsg = document.createElement("span");
	cloudMsg.setAttribute("class", "cloud");
	cloudMsg.innerText =
		"Hej! Jestem Wheatley, tą stronę stworzył Damian J. Inspirował się grą Portal 2, a więc uważaj na GLaDOS!";
	main.appendChild(cloudMsg);

	const counter = () => {
		main.removeChild(cloudMsg);
	};
	setTimeout(counter, 6000);
});

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
						resultSpanDOM.innerText = result + " PLN";
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
