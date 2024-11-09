$(document).ready(function() {
    // Validate the form when submitted
    $('#tableInput').validate({
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
        errorPlacement: function(error, element) {
            error.appendTo("#errorMessages"); // Custom placement for error messages
        },
        submitHandler: function(form) {
            // Prevent form submission and generate table
            event.preventDefault();

            var verticalMin = parseFloat($("#multiplicandMin").val());
            var verticalMax = parseFloat($("#multiplicandMax").val());
            var horizontalMin = parseFloat($("#multiplierMin").val());
            var horizontalMax = parseFloat($("#multiplierMax").val());

            var tableContainer = $("#tableContainer");
            tableContainer.empty(); // Clear any existing table

            // Generate the table
            var table = $("<table>").addClass("table table-bordered");

            // Header row
            var headerRow = $("<tr>").append("<th></th>");
            for (var j = horizontalMin; j <= horizontalMax; j++) {
                headerRow.append("<th class='multiplier-header'>" + j + "</th>");
            }
            table.append(headerRow);

            // Multiplicand rows
            for (var i = verticalMin; i <= verticalMax; i++) {
                var row = $("<tr>").append("<th class='multiplicand-header'>" + i + "</th>");
                for (var j = horizontalMin; j <= horizontalMax; j++) {
                    row.append("<td>" + (i * j) + "</td>");
                }
                table.append(row);
            }

            tableContainer.append(table); // Append the table to the container
        }
    });

    // Custom method to check that the max value is greater than min
    $.validator.addMethod("greaterThan", function(value, element, param) {
        return parseFloat(value) > parseFloat($(param).val());
    }, "This value must be greater than the minimum value.");
});
