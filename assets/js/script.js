$(document).ready(function() {
    // Retrieve or create an array to store our train schedule data
    if (localStorage.getItem("trainList") === null) {
        var trainList = [];
        localStorage.setItem("trainList", JSON.stringify(trainList));
    } else {
        var trainList = JSON.parse(localStorage.getItem("trainList"));
    };

    // Schedule render function
    const scheduleRender = () => {
        // Clear out the schedule's body
        $("#scheduleArea").empty();

        // Run a loop to build the new schedule
        trainList.forEach(function(train) {
            const newRow = $("<tr>");
            const nameCol = $("<td class='text-center'>");
            const destCol = $("<td class='text-center'>");
            const freqCol = $("<td class='text-center'>");
            const nextCol = $("<td class='text-center'>");
            const etaCol = $("<td class='text-center'>");

            // Variables using the Moment.js plug-in
            const currentDate = moment().format("YYYY-MM-DD");
            const startingTime = moment(`${currentDate} ${train.startingTime}`);
            var nextTime = moment(startingTime);
            
            if (moment().isAfter(startingTime)) {
                var nextTime = moment(startingTime).add(train.frequency, "minutes");
            };

            // This while loop was meant to update nextTime *until it became a future time*
            while (moment().isAfter(nextTime)) {
                nextTime.add(train.frequency, "minutes");

                if (moment().isBefore(nextTime)) {
                    break;
                };
            };

            // Estimated time of arrival
            const etaTime = moment(nextTime).fromNow();

            // Append all the information to their columns, and then the new row
            $(nameCol).append(train.name);
            $(destCol).append(train.destination);
            $(freqCol).append(train.frequency);
            $(nextCol).append(nextTime.format("h:mm A").toString());
            $(etaCol).append(etaTime.toString());

            $(newRow).append(nameCol);
            $(newRow).append(destCol);
            $(newRow).append(freqCol);
            $(newRow).append(nextCol);
            $(newRow).append(etaCol);
            $("#scheduleArea").append(newRow);
        });
    };

    // Define refresh timer
    setInterval(function () {
        scheduleRender();
    }, 60000);

    // New train function
    const newTrain = () => {
        // Retrieve form data and define it
        const trainName = $("#trainName").val();
        const destination = $("#destination").val();
        const frequency = $("#frequency").val();
        const startingTime = $("#firstTime").val();

        // Regular Expression for time format
        const timeCheck = "^([0-1][0-9]|[2][0-3]):([0-5][0-9])$";

        // Conditional to make sure fields aren't empty, or in the wrong format
        if (trainName == "" || destination == "" || frequency == "" || startingTime == "") {
            alert("You did not provide the correct information. Please review the form, and try again.");
            return false;
        } else if (startingTime != "" && !startingTime.match(timeCheck)) {
            alert("The time you entered is not the correct format. Please review the form, and try again.");
            return false;
        } else {
            // Create a new object for the train's information
            const trainObj = {
                name : trainName,
                destination : destination,
                frequency : frequency,
                startingTime : startingTime
            };

            // Push this new object into an array, for storage
            trainList.push(trainObj);

            // Re-render the train schedule
            scheduleRender();

            // Clear the form's input boxes
            $("#trainName").val("");
            $("#destination").val("");
            $("#frequency").val("");
            $("#firstTime").val("");

            // Finish the sequence by turning our list back into a string
            localStorage.setItem("trainList", JSON.stringify(trainList));
        };
    };

    // Listener for the form's submit button
    $(document).on("click", "#formBtn", newTrain);

    // Access local storage and render the schedule on page load
    scheduleRender();
});