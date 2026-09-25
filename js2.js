/*
      Author: Braeden
      Date: 9/10/2024

      Filename: js2.js
*/
window.onload = function() {
    // Get query parameters
    let params = new URLSearchParams(window.location.search);
    let photoTotal = params.get('photoTotal');
    let salesTax = params.get('salesTax');
    let total = params.get('total');

    // Create detail elements
    let detailsFieldset = document.querySelector(".details");
	
    detailsFieldset.innerHTML += "<p>Photo Total: " + photoTotal + "</p>";
    detailsFieldset.innerHTML += "<p>Sales Tax: " + salesTax + "</p>";
    detailsFieldset.innerHTML += "<p>Total: " + total + "</p>";
};


let useShip = document.querySelector("input[name=useShip]");

useShip.addEventListener('change', function() {
	if (this.checked) {
		document.getElementById("firstnameBill").value = document.getElementById("firstnameShip").value;
		document.getElementById("lastnameBill").value = document.getElementById("lastnameShip").value;
		document.getElementById("address1Bill").value = document.getElementById("address1Ship").value;
		document.getElementById("address2Bill").value = document.getElementById("address2Ship").value;
		document.getElementById("cityBill").value = document.getElementById("cityShip").value;
		document.getElementById("countryBill").value = document.getElementById("countryShip").value;
		document.getElementById("codeBill").value = document.getElementById("codeShip").value;
		document.getElementById("stateBill").value = document.getElementById("stateShip").value;
		document.getElementById("counrtyBill").value = document.getElementById("counrtyShip").value;
	}
});

let subButton = document.getElementById("subButton");

// validate payment when submit button is clicked
subButton.addEventListener("click", validateName);
subButton.addEventListener("click", validateNumber);
subButton.addEventListener("click", validateMonth);
subButton.addEventListener("click", validateYear);
subButton.addEventListener("click", validateCVC);

// checks if the owner's name is entered on cardfucntion
function validateName() {
	let cardName = document.getElementById("cardName");
	if (cardName.validity.valueMissing) {
		cardName.setCustomValidity("Enter your name as it appears on the card");
	} 
	else {
		cardName.setCustomValidity("");
	}
}

// checks if the card number is valid
function validateNumber() {
	let cNum = document.getElementById("cardNumber");
	if (cNum.validity.valueMissing) {
		cNum.setCustomValidity("Enter your card number");
	}
	else if (cNum.validity.patternMismatch) {
		cNum.setCustomValidity("Enter a valid card number");
	}
	else if (luhn(cNum.value) === false) {
		cNum.setCustomValidity("Enter a legitimate card number");
	}
	else {
		cNum.setCustomValidity("");
	}
}

// checks that a month is selected for expiration Date
function validateMonth () {
	let month = document.getElementById("expMonth");
	if (month.selectedIndex === 0) {
		month.setCustomValidity("Select the expiration month");
	}
	else {
		month.setCustomValidity("");
	}
}

// checks that a year is selected for expiration Date
function validateYear () {
	let year = document.getElementById("expYear");
	if (year.selectedIndex === 0) {
		year.setCustomValidity("Select the expiration year");
	}
	else {
		year.setCustomValidity("");
	}
}

// checks if the card CVC is valid
function validateCVC() {
	// Determine which card was selected
	let card = document.querySelector('input[name="credit"]:checked').value;
	let cvc = document.getElementById("cvc");
	
	// validate the CVC value
	if (cvc.validity.valueMissing) {
		cvc.setCustomValidity("Enter your CVC number");
	}
	else if ((card === "amex") && !(/^\d{4}$/.test(cvc.value))) {
		cvc.setCustomValidity("Enter a 4-digit number");
	}
	else if ((card !== "amex") && !(/^\d{3}$/.test(cvc.value))) {
		cvc.setCustomValidity("Enter a 4-digit number");
	}
	else {
		cvc.setCustomValidity("");
	}
}

/* ------- Luhn Algorithm used for Validating Credit Card Numbers   ----- */

function luhn(idNum) {
   let string1 = "";
   let string2 = "";
   
   // Retrieve the odd-numbered digits starting from the back
   for (let i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits starting from the back and double them
   for (let i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2*idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
   
   function sumDigits(numStr) {
      let digitTotal = 0;
      for (let i = 0; i < numStr.length; i++) {
         digitTotal += parseInt(numStr.charAt(i));
      }
      return digitTotal;
   }
}