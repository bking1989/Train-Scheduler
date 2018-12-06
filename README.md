# Train-Scheduler
Train Schedule Web App using Local Storage

This was an assignment for our code bootcamp that required us to use local storage and JavaScript scripts like [Moment.js](https://momentjs.com/) in order to make a functioning time table for a train network.

In order to tackle this, I used local storage to store any train information submitted by the user, then set up a method for fetching this data and formatting this into an HTML table. From there, I used Moment.js (which is called using `moment()`) and calculated things like when the next train was going to arrive and the estimated time of arrival.

In addition to these basic functions, I used a `setInterval()` code to make it so that the schedule itself is refreshed every minute, in order to show up-to-the-minute accuracy for the schedule.
