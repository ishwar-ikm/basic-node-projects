// Import necessary modules for user input, QR code generation, and file handling
import inquirer from 'inquirer'; // For user input prompts
import qr from 'qr-image'; // For generating QR codes
import fs from 'fs'; // For file system operations

// Prompt the user to enter a website URL
inquirer
  .prompt([
    {
      name: 'website',
      message: 'Enter website',
      type: 'input'
    }
  ])
  .then(function(answer) {
    // Generate a QR code image based on the entered website URL
    var qr_svg = qr.image(answer['website']);

    // Pipe the generated QR code image to a PNG file
    qr_svg.pipe(fs.createWriteStream('qr.png'));

    // Save the entered website URL to a text file
    fs.writeFile('URL.txt', answer['website'], (err) => {
      if (err) throw err;
      console.log('Saved');
    });
  })
  .catch(function(error) {
    // Handle any errors that occur during the inquirer prompts or file operations
    console.error(error);
  });
