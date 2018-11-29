$(document).ready(function() {
    // Check to see if existing data is there
    if (localStorage.getItem("trainCount") === null) {
        // Counter for the number of trains
        var trainCount = 1;
        localStorage.setItem("trainCount", trainCount);
    } else {
        localStorage.getItem("trainCount");
    };

    // Check to see if schedule's been made yet
    if (localStorage.getItem("trainSchedule") === null) {
        return false;
    } else {
        localStorage.getItem("trainSchedule");
    };

    // Function for when form is submitted
    const newTrain = () => {
        // Retrieve the form values and define them
        const trainName = $("#trainName").val();
        const destination = $("#destination").val();
        const firstTime = $("#firstTime").val();
        const frequency = $("#frequency").val();

        const newRow = $("<tr>");
        const rowCount = $("<th class='text-center' scope='row'>");
        const colOne = $("<td class='text-center'>");
        const colTwo = $("<td class='text-center'>");
        const colThree = $("<td class='text-center'>");
        const colFour = $("<td class='text-center'>");
        
        if (trainName == "" || destination == "" || firstTime == "" || frequency == "") {
            return false;
        } else {
            $(rowCount).append(trainCount);
            $(rowCount).appendTo(newRow);
            $(colOne).append(trainName);
            $(colOne).appendTo(newRow);
            $(colTwo).append(destination);
            $(colTwo).appendTo(newRow);
            $(colThree).append(firstTime);
            $(colThree).appendTo(newRow);
            $(colFour).append(frequency);
            $(colFour).appendTo(newRow);

            trainCount++;
            localStorage.setItem("trainCount", trainCount);

            $(newRow).appendTo("#scheduleArea");

            const scheduleContent = $("#scheduleArea").val()
            localStorage.setItem("trainSchedule", JSON.stringify(scheduleContent));

            $("#trainName").val("");
            $("#destination").val("");
            $("#firstTime").val("");
            $("#frequency").val("");
        };
    };

    // Listener for the new train form's submit button
    $(document).on("click", "#formBtn", newTrain);
});