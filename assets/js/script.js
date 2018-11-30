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

            const currentTime = moment();
            const startTime = moment(train.startingTime, moment.ISO_8601);

            while (startTime.isBefore(currentTime)) {
                var updatedTime = moment(startTime, "HH:mm").add(train.frequency, 'm');
                return updatedTime;
            }

            const nextTime = moment(updatedTime, "HH:mm").add(train.frequency, 'm');

            $(nameCol).append(train.name);
            $(destCol).append(train.destination);
            $(freqCol).append(train.frequency);
            $(nextCol).append(nextTime);
            $(etaCol).append("");

            $(newRow).append(nameCol);
            $(newRow).append(destCol);
            $(newRow).append(freqCol);
            $(newRow).append(nextCol);
            $(newRow).append(etaCol);
            $("#scheduleArea").append(newRow);
        });
    };

    // New train function
    const newTrain = () => {
        // Retrieve form data and define it
        const trainName = $("#trainName").val();
        const destination = $("#destination").val().trim();
        const frequency = $("#frequency").val();
        const firstTime = $("#firstTime").format("HH:mm");

        // Create a new object for the train's information
        const trainObj = {
            name : trainName,
            destination : destination,
            frequency : frequency,
            startingTime : firstTime
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

    // Listener for the form's submit button
    $(document).on("click", "#formBtn", newTrain);

    // Access local storage and render the schedule on page load
    scheduleRender();
});