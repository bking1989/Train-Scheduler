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

        // Define a train counter
        let trainCount = 1;

        // Run a loop to build the new schedule
        trainList.forEach(function(train) {
            const newRow = $("<tr>");
            const numberCol = $("<th class='text-center' scope='row'>")
            const nameCol = $("<td class='text-center'>");
            const destCol = $("<td class='text-center'>");
            const timeCol = $("<td class='text-center'>");
            const freqCol = $("<td class='text-center'>");

            $(numberCol).append(trainCount);
            $(nameCol).append(train.name);
            $(destCol).append(train.destination);
            $(timeCol).append(train.startingTime);
            $(freqCol).append(train.frequency);

            $(newRow).append(numberCol);
            $(newRow).append(nameCol);
            $(newRow).append(destCol);
            $(newRow).append(timeCol);
            $(newRow).append(freqCol);
            $("#scheduleArea").append(newRow);

            trainCount++;
        });
    };

    // New train function
    const newTrain = () => {
        // Retrieve form data and define it
        const trainName = $("#trainName").val();
        const destination = $("#destination").val();
        const firstTime = $("#firstTime").val();
        const frequency = $("#frequency").val();

        // Create a new object for the train's information
        const trainObj = {
            name : trainName,
            destination : destination,
            startingTime : firstTime,
            frequency : frequency
        };

        // Push this new object into an array, for storage
        trainList.push(trainObj);

        // Re-render the train schedule
        scheduleRender();

        // Clear the form's input boxes
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTime").val("");
        $("#frequency").val("");

        // Finish the sequence by turning our list back into a string
        localStorage.setItem("trainList", JSON.stringify(trainList));
    };

    // Listener for the form's submit button
    $(document).on("click", "#formBtn", newTrain);

    // Access local storage and render the schedule on page load
    scheduleRender();
});