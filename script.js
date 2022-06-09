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
			console.log(data[0].rates);
			console.log(data[0].rates[0].code);
			console.log(data[0].rates[0].mid);
			let mid = data[0].rates[0].mid;
			let currencies = data[0].rates[0].code;

			selectDOM.addEventListener("change", (event) => {
				// body.appendChild(h1);
				// h1.innerText = `Wybrałeś ${event.target.value} o wartości ${
				// 	currencies[event.target.value]
				// } zł`;
				console.log(event.target.value);
				console.log(currencies[event.target.value]);
			});

			Object.keys(currencies).forEach((element) => {
				let option = document.createElement("option");
				option.textContent = element;
				selectDOM.appendChild(option);
			});

			function exchangeCurrency(e) {
				e.preventDefault();
				if (amountInput.value > 0) {
					document.getElementById("play1").play();
					let currencyAmount = amountInput.value;
					console.log(currencyAmount);

					let result = currencyAmount * mid;
					console.log(result);
					resultSpanDOM.innerText = result + " PLN";
				} else {
					document.getElementById("play2").play();
				}
			}
			submitBtn.addEventListener("click", exchangeCurrency);
		});
}
getCurrencyList();
