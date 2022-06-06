const amountInput = document.querySelector("#amount-input");
const selectDOM = document.querySelector("#select-dom");
const submitBtn = document.querySelector("#submit-btn");

let span = document.querySelector("span");

function getCurrencyList() {
	fetch("https://api.frankfurter.app/latest?from=PLN")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let currencies = data.rates;

			selectDOM.addEventListener("change", () => {
				// body.appendChild(h1);
				// h1.innerText = `Wybrałeś ${event.target.value} o wartości ${
				// 	currencies[event.target.value]
				// } zł`;
				console.log(event.target.value);
			});
			Object.keys(data.rates).forEach((element) => {
				let option = document.createElement("option");
				// option.setAttribute("value", element);
				option.textContent = element;
				selectDOM.appendChild(option);
			});
			document.body.appendChild(selectDOM);
		});
}
getCurrencyList();

submitBtn.addEventListener("click", function () {});
