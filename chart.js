/* 
Created by: Nika Ashtarzadeh
Email: Nika_Ashtarzadeh@student.uml.edu
Date: 11/26/24
*/

$(document).ready(function () {
    // Custom validation method to check if max is greater than min
    $.validator.addMethod("greaterThan", function (value, element, param) {
        const minValue = parseFloat($(param).val());
        return !isNaN(minValue) && parseFloat(value) > minValue;
    }, "Maximum value must be greater than the minimum value.");

    // Jquery validation plugin to the form for input validation as instructed
    $("#tableInput").validate({
        rules: {
            multiplicandMin: {
                required: true,
                range: [-50, 50]
            },
            multiplicandMax: {
                required: true,
                range: [-50, 50],
                greaterThan: "#multiplicandMin"
            },
            multiplierMin: {
                required: true,
                range: [-50, 50]
            },
            multiplierMax: {
                required: true,
                range: [-50, 50],
                greaterThan: "#multiplierMin"
            }
        },
        messages: {
            multiplicandMin: {
                required: "Please enter a minimum value for multiplicand.",
                range: "Value must be between -50 and 50."
            },
            multiplicandMax: {
                required: "Please enter a maximum value for multiplicand.",
                range: "Value must be between -50 and 50.",
                greaterThan: "Maximum value must be greater than the minimum value."
            },
            multiplierMin: {
                required: "Please enter a minimum value for multiplier.",
                range: "Value must be between -50 and 50."
            },
            multiplierMax: {
                required: "Please enter a maximum value for multiplier.",
                range: "Value must be between -50 and 50.",
                greaterThan: "Maximum value must be greater than the minimum value."
            }
        },
        errorPlacement: function (error, element) {
            // Place error message below the corresponding input field
            error.insertAfter(element);
        },
        highlight: function (element) {
            $(element).addClass("is-invalid"); // Highlight invalid fields
        },
        unhighlight: function (element) {
            $(element).removeClass("is-invalid"); // Remove highlight from valid fields
        },
        submitHandler: function (form) {
            generateTable(); // Generate the multiplication table
            return false; // Prevent default form submission
        }
    });

    // Function to generate the multiplication table
    function generateTable() {
        // Get input values
        const multiplicandMin = parseInt($("#multiplicandMin").val());
        const multiplicandMax = parseInt($("#multiplicandMax").val());
        const multiplierMin = parseInt($("#multiplierMin").val());
        const multiplierMax = parseInt($("#multiplierMax").val());

        // Clear the existing table
        $("#tableContainer").empty();

        // Create table
        const table = $("<table>").addClass("table table-bordered").attr("id", "multiplicationTable");

        // Add header row for multipliers
        const headerRow = $("<tr>");
        headerRow.append($("<th>").addClass("multiplier-header").text("")); // Empty top-left corner
        for (let j = multiplierMin; j <= multiplierMax; j++) {
            headerRow.append($("<th>").addClass("multiplier-header").text(j));
        }
        table.append(headerRow);

        // Add rows for multiplicands and their products
        for (let i = multiplicandMin; i <= multiplicandMax; i++) {
            const row = $("<tr>");
            row.append($("<th>").addClass("multiplicand-header").text(i)); // Left-side multiplicand header
            for (let j = multiplierMin; j <= multiplierMax; j++) {
                const cell = $("<td>").text(i * j);
                row.append(cell);
            }
            table.append(row);
        }

        // Append the table to the container
        $("#tableContainer").append(table);
    }
});
