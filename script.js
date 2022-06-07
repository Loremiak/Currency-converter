const amountInput = document.querySelector("#amount-input");
const selectDOM = document.querySelector("#select-dom");
const submitBtn = document.querySelector("#submit-btn");

const main = document.querySelector("main");
const wheatleyImg = document.querySelector(".wheatley-img");

let span = document.querySelector("span");

wheatleyImg.addEventListener("mouseover", () => {
	const cloud = document.createElement("span");
	cloud.setAttribute("class", "cloud");
	cloud.innerText =
		"Hej! Jestem Wheatley, tą stronę stworzył Damian J. Inspirował się grą Portal 2, a więc uważaj na GLaDOS!";
	main.appendChild(cloud);

	const counter = () => {
		main.removeChild(cloud);
	};
	setTimeout(counter, 6000);
});

function getCurrencyList() {
	fetch("http://api.nbp.pl/api/exchangerates/tables/a/")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let currencies = data.rates;

			selectDOM.addEventListener("change", (event) => {
				// body.appendChild(h1);
				// h1.innerText = `Wybrałeś ${event.target.value} o wartości ${
				// 	currencies[event.target.value]
				// } zł`;
				console.log(event.target.value);
			});
			Object.keys(data.rates).forEach((element) => {
				let option = document.createElement("option");
				option.textContent = element;
				selectDOM.appendChild(option);
			});
		});
}
getCurrencyList();

function exchange(e) {
	e.preventDefault();
	if (amountInput.value > 0) {
		document.getElementById("play1").play();
	} else {
		document.getElementById("play2").play();
	}
}

submitBtn.addEventListener("click", exchange);
