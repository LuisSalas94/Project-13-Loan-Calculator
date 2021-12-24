const form = document.querySelector("#loan-form");
form.addEventListener("submit", function (e) {
	//hide results
	document.querySelector("#results").style.display = "none";
	//show loader
	document.querySelector("#loading").style.display = "block";
	setTimeout(() => {
		calculateResults();
	}, 2000);

	e.preventDefault();
});

function calculateResults() {
	//UI vars
	const amount = document.querySelector("#amount");
	const interest = document.querySelector("#interest");
	const years = document.querySelector("#years");
	const monthlyPayment = document.querySelector("#monthly-payment");
	const totalPayment = document.querySelector("#total-payment");
	const totalInterest = document.querySelector("#total-interest");

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	//Monthly Payment
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest) / (x - 1);
	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
		//show results
		document.querySelector("#results").style.display = "block";
		//hide loader
		document.querySelector("#loading").style.display = "none";
	} else {
		showError("Please check your numbers");
	}
}

//Show Error
function showError(err) {
	//hide results
	document.querySelector("#results").style.display = "none";
	//hide loader
	document.querySelector("#loading").style.display = "none";
	//create dic
	const errDiv = document.createElement("div");
	//get elements
	const card = document.querySelector(".card");
	const heading = document.querySelector(".heading");
	//add class
	errDiv.className = "alert alert-danger";
	//create text
	const errContent = document.createTextNode(err);
	//append text to errDiv
	errDiv.appendChild(errContent);
	//Insert error above heading
	card.insertBefore(errDiv, heading);
	//clear error after 2 secs
	setTimeout(() => {
		document.querySelector(".alert").remove();
	}, 1500);
}
