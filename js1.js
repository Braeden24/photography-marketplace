/*
      Author: Braeden
      Date: 9/10/2024

      Filename: js1.js
*/

// creates arrays for the animal titles and animal photos
var animalList = [
	["Mallard Meeting", "animals/SCduck.jpg"],
	["Backyard Sparrow", "animals/MKsparrow.png"],
	["Wading Moose", "animals/WJmoose.jpg"],
	["Eastern Swallowtail", "animals/WJswallowtail.jpg"],
	["Superior Eagle", "animals/SCeagle.jpg"],
	["Silent Reflection", "animals/SCloon.jpg"],
	["Snowy Barred", "animals/SCowl.jpg"],
	["Messy Bee", "animals/WJbee.jpg"],
	["Meet the Mockingbird", "animals/WJbird.jpg"],
	["Chubby Skipper", "animals/WJbird.jpg"],
	["Hello Hawk", "animals/WJhawk.jpg"],
	["Spider Splits", "animals/WJspider.jpg"]
];

// creates arrays for the plant titles and plant photos
var plantList = [
	["Eye of the Forest", "plants/MKeye.jpeg"],
	["Rooted Room", "plants/MKroots.jpeg"],
	["Boggy Bayou", "plants/SCbayou.jpg"],
	["Melting Roots", "plants/SCtreerock.jpg"]
];

// creates arrays for the landscape titles and landscape photos
var landscapeList = [
	["Frozen Shore", "landscape/MKfrozen.jpeg"],
	["Golden Sunset", "landscape/MKgolden.jpeg"],
	["Dancing Borealus", "landscape/SCaurora.jpg"],
	["Rushing Water", "landscape/SCgooseberry.jpg"],
	["Oregon Shore", "landscape/MKoregon.jpeg"],
	["Secret Falls", "landscape/MKsecret.jpeg"],
	["Superior Shore", "landscape/MKsecret.jpeg"],
	["Traquil Sunset", "landscape/SCsunset.png"]
];

let category = document.getElementById("category");
let photos = document.getElementById("photos");
let preview = document.getElementById("preview");
let addBtn = document.getElementById("addPhoto");
let clearBtn = document.getElementById("clearCart");
let photoTotal = 0;


// function that adds options to dropdown menus
category.onchange = function() {
	// adds animalTitle array to photo selection if animals is selected in the category selection
	if (category.value == "animals") {
		var photoOptions = "";
		for (i = 0; i <animalList.length; i++) {
			photoOptions += "<option>"+animalList[i][0]+"</option>";
			photoImg = animalList[0][1]; // gets initial preview photo;
		}
	}
	// adds plantTitle array to photo selection if plants is selected in the category selection
	else if (category.value == "plants") {
		var photoOptions = "";
		for (i = 0; i <plantList.length; i++) {
			photoOptions += "<option>"+plantList[i][0]+"</option>";
			photoImg = plantList[0][1]; // gets initial preview photo;
		}
	}
	// adds landscapeTitle array to photo selection if landscape is selected in the category selection
	else if (category.value == "landscapes") {
		var photoOptions = "";
		for (i = 0; i <landscapeList.length; i++) {
			photoOptions += "<option>"+landscapeList[i][0]+"</option>";
			photoImg = landscapeList[0][1]; // gets initial preview photo;
		}
	}
	photos.innerHTML = photoOptions;
	preview.innerHTML = "<img src='"+photoImg+"'/>"; // sets initial preview photo;
};

// retrives image assosiated with the photos name
function getPhoto() {
	if (category.value == "animals") {
		for (i = 0; i < animalList.length; i++) {
			if (animalList[i][0] == photos.value) {
				photoImg = animalList[i][1];
			}
		}
	}
	else if (category.value == "plants") {
		for (i = 0; i < plantList.length; i++) {
			if (plantList[i][0] == photos.value) {
				photoImg = plantList[i][1];
			}
		}
	}
	else if (category.value == "landscapes") {
		for (i = 0; i < landscapeList.length; i++) {
			if (landscapeList[i][0] == photos.value) {
				photoImg = landscapeList[i][1];
			}
		}
	}
	return photoImg
}

// displays selected photo in the preview box
photos.onchange = function() {
	getPhoto();
	preview.innerHTML = "<img src='"+photoImg+"'/>";
};

addBtn.onclick = function() {
	// adds selected photo to table
	getPhoto();
	document.getElementById("photoCart").innerHTML += "<img src = '"+photoImg+"'/>";
	
	// retrives value of selected size
	sizeValue = document.querySelector("input[name='sizes']:checked").value;
	if (sizeValue == 5) {
	photoTotal += 5;
	document.getElementById("cart").innerHTML += "<li>"+photos.value+" (Small - $5.00)</li>";
	document.getElementById("photoTotal").innerHTML = "Photo Total: "+formatCurrency(photoTotal);
	}
	
	else if (sizeValue == 10) {
	photoTotal += 10;
	document.getElementById("cart").innerHTML += "<li>"+photos.value+" (Medium - $10.00)</li>";
	document.getElementById("photoTotal").innerHTML = "Photo Total: "+formatCurrency(photoTotal);
	}
	else if (sizeValue == 15) {
	photoTotal += 15
	document.getElementById("cart").innerHTML += "<li>"+photos.value+" (Large - $15.00)</li>";
	document.getElementById("photoTotal").innerHTML = "Photo Total: "+formatCurrency(photoTotal);
	}
	let salesTax = photoTotal * 0.06875
	document.getElementById("salesTax").innerHTML = "Sales Tax: "+formatCurrency(salesTax);
	document.getElementById("total").innerHTML = "Total: "+formatCurrency(photoTotal + salesTax);
};

function formatCurrency(value) {
    return "$" + value.toFixed(2);
 }
 
// clears the cart table
clearBtn.onclick = function() {
	cart.innerHTML = "";
	photoCart.innerHTML = "";
	photoTotal = 0;
}

document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission
		
    // Get total values
    let photoTotal = document.getElementById("photoTotal").innerText.split(': ')[1];
    let salesTax = document.getElementById("salesTax").innerText.split(': ')[1];
    let total = document.getElementById("total").innerText.split(': ')[1];

    // Redirect to submit.html with query parameters
    window.location.href = `submit.html?photos=${encodeURIComponent(photos)}&photoTotal=${encodeURIComponent(photoTotal)}&salesTax=${encodeURIComponent(salesTax)}&total=${encodeURIComponent(total)}`;
});