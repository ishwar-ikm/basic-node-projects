// Get references to HTML elements
const rentForm = document.getElementById('rentForm'); // Rental form
const rentAmount = document.getElementById('rentAmount'); // Element to display rent amount
const rentFor = document.getElementById('rentFor'); // Element for specifying rental duration
const totalRent = document.getElementById('totalRent'); // Element to display total rent

// Function to update rent amount based on selected rental type
function updateRentAmount() {
    const selectedRadio = document.querySelector('input[name="btnradio"]:checked'); // Get selected rental type
    const rentalType = selectedRadio ? selectedRadio.value : ''; // Determine selected rental type

    // Set rent amount based on selected rental type
    if (rentalType === 'ppd') {
        rentAmount.textContent = '₹' + car.ppd.toString(); // Display price per day
    } else if (rentalType === 'ppkm') {
        rentAmount.textContent = '₹' + car.ppkm.toString(); // Display price per kilometer
    } else if (rentalType === 'pph') {
        rentAmount.textContent = '₹' + car.pph.toString(); // Display price per hour
    }
    updateTotalAmount(); // Update total rent amount
}

// Function to update total rent amount based on rental duration
function updateTotalAmount() {
    totalRent.textContent = '₹' + (rentAmount.textContent.slice(1) * rentFor.value); // Calculate and display total rent
}

// Event listener for changes in the rental form
rentForm.addEventListener('change', updateRentAmount);

// Event listener for changes in the rental duration input
rentFor.addEventListener('input', updateTotalAmount);

// Initialize rent amount when the page loads
updateRentAmount();
