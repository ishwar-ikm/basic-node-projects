// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
  // Select all input elements within elements with the class 'input'
  const inputElements = document.querySelectorAll('.input input');

  // Iterate over each input element
  inputElements.forEach(function (inputElement) {
      // Add an event listener for the 'input' event on each input element
      inputElement.addEventListener('input', function () {
          // Find the closest ancestor with the class 'input' (parent container)
          const inputContainer = this.closest('.input');
          
          // Toggle the 'filled' class based on whether the input value is not empty
          inputContainer.classList.toggle('filled', this.value.trim() !== '');
      });
  });
});
