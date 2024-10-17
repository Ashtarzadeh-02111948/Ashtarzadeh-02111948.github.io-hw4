/* 
Created by: Nika Ashtarzadeh
Email: Nika_Ashtarzadeh@student.uml.edu
Date: 10/16/24
*/


//  Ensures that the JS function runs after the HTML document has been fully loaded first
document.addEventListener("DOMContentLoaded", function() {

    // listener to check if button is clicked. Once clicked, this function runs
    document.getElementById('generateButton').addEventListener('click', function(event){

        // Preventing form submission
        event.preventDefault()

        // Clear any previous error messages
        var errorMessages = document.getElementById("errorMessages");
        errorMessages.innerHTML = "";  // Clear previous messages

        // getting ids from the form
        var verticalMin = parseFloat(document.getElementById("multiplicandMin").value);
        var verticalMax = parseFloat(document.getElementById("multiplicandMax").value);
        var horizontalMin = parseFloat(document.getElementById("multiplierMin").value);
        var horizontalMax = parseFloat(document.getElementById("multiplierMax").value);
        var tableContainer = document.getElementById("tableContainer");

        
        // ********************************* Start of input validation ***********************************************

            // Array to store all error messages
            var messages = [];

            // using innerHtml to display error messages on page instead of popup. Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

            // Check if any field is empty 
            if (isNaN(verticalMin) || isNaN(verticalMax) || isNaN(horizontalMin) || isNaN(horizontalMax) ) {
                messages.push("Please fill out all fields.");
            
            }

            if(!isWithinBounds(verticalMin, -50, 50) || !isWith){

            }

            // Check if values are within the range
            else if (verticalMin < -50 || verticalMax < -50 || horizontalMin < -50 || horizontalMax < -50 ||
                verticalMin > 50 || verticalMax > 50 || horizontalMin > 50 || horizontalMax > 50) {
                
                messages.push("Please fill out all fields with valid inputs (Between -50 and 50).");
                
        }

            // Check if min values are less than or equal to max values
            if (verticalMin >= verticalMax || horizontalMin >= horizontalMax) {
                messages.push("Minimum values should be less than maximum values.");
            }


            


        // ********************************** end of input validation **********************************************


        // If there are any error messages, display them line by line and return
        if (messages.length > 0) {
            errorMessages.innerHTML = messages.join("<br>");  // Display all messages, separated by line breaks
            errorMessages.style.display = "block"; // Show the error box
        } 
        else {
            errorMessages.style.display = "none"; // Hide the error box if no messages and display chart
       


        // old table is removed when 'generate' button is clicked
        tableContainer.innerHTML = ""; 

        var table = document.createElement("table");

        // Bootstrap class to add border lines to all cells so the table is legible and neater
        table.className = "table table-bordered";

        // Set the ID for the table
        table.id = "multiplicationTable"; 

    
        // Create the header row
        var headerRow = table.insertRow();

        // Setting this top-left corner cell to empty so everything else lines up. 
        headerRow.insertCell().outerHTML = "<th></th>"; 

        /* This loop iterates through the range of multipliers specified by the user.
           And inserts a new header cell for each multiplier, allowing the user to see what 
           numbers will be multiplied across the top of the table.
        */
        for (var j = horizontalMin; j <= horizontalMax; j++) {
            headerRow.insertCell().outerHTML = "<th class='multiplier-header'>" + j + "</th>"; // Add multipliers to header
            //headerRow.className = "header-color";
        }


        /* The outer loop iterates through the range of multiplicands specified by the user.
            and creates a new row in the table for each multiplican and also inserts a header cell for the multiplicand
        
           The inner loop iterates through the range of multipliers for the current multiplicand 
           and inserts the product of the current multiplicand and multiplier into the cell.

        */ 
        for (var i = verticalMin; i <= verticalMax; i++) {
            var rowCreate = table.insertRow();

            rowCreate.insertCell().outerHTML = "<th class='multiplicand-header'>" + i + "</th>"; // Add multiplicand in first cell

            for (var j = horizontalMin; j <= horizontalMax; j++) {
                var productCell = rowCreate.insertCell();
                productCell.innerText = i * j; // Calculate and insert product

                // alternate row color based on even and odd 'i' index
                if(i % 2 == 0){
                    productCell.className = "even-row"; // Apply color for even rows
                }
                else{
                    productCell.className = "odd-row"; // Apply color for even rows
                }
            }
        }

        tableContainer.appendChild(table); // Append the table to the container in the html

    }// end of else block for displaying error messages

    }); // end of generateButton listener

}); // end of main event listener