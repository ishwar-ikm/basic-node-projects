# QR Code Generator

This is a simple QR code generator project that allows you to create QR codes for website URLs. It utilizes Node.js and the `inquirer` and `qr-image` libraries to interact with the user, generate QR codes, and save URLs to files.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed. If not, you can download it from the [official website](https://nodejs.org/).

### Installation

1. Install project dependencies using npm: npm install


### Usage

1. Run the script: node index.js
2. Follow the prompts to enter a website URL.
3. A QR code image named qr.png will be generated in the project directory.
4. The entered URL will be saved to a text file named URL.txt.

### Project Structure
- index.js: Main script for user interaction, QR code generation, and URL saving.
- qr.png: Generated QR code image.
- URL.txt: Text file storing the entered URL.

### Dependencies
- inquirer: Interactive command-line interface for user input.
- qr-image: Library for creating QR codes as PNG images.
