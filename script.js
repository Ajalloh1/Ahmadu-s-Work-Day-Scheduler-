//here I have the list of varibale used globally in the codes defined below.
var hourNow = parseInt(moment().format('H'));
var classes = [".8AM", ".9AM", ".10AM", ".11AM", ".12PM", ".1PM", ".2PM", ".3PM", ".4PM", ".5PM", ".6PM"]
var time = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var classIndex = time.indexOf(hourNow);
$("#currentDay").text(moment().format('dddd, MMMM D, YYYY'));
var currentDayCheck = moment().format('dddd, MMMM D, YYYY')
var allNotes = ["", "", "", "", "", "", "", "", "", "", ""]

//simple logic, if and if else to asign present and future classes to be used.//
if (hourNow < 9) {
    allFuture();
}
else if (hourNow > 17) {
    allPast();
}
else {
    formatTimes()
}
// here are funcitons to fetch data from local storage to find out if the scheduler is oppend on a new day///
grabData();
checkDay()

/// function for when time is before 9am, assigning all but the first row the future class
function allFuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

/// function for when time is after 6pm, assigning all but the last row the past class
function allPast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length - 1]).addClass("present");
}

/// function for middle of the day- uses moment api to determine the hour and assigns classes by that
function formatTimes() {
    $(classes[classIndex]).addClass("present");
    for (i = 0; i < classIndex; i++) {
        $(classes[i]).addClass("past");
    }
    for (i = classIndex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}

//save button function, stores in allNotes array and local storage data
$(".saveBtn").on("click", function () {
    var di = $(this).data('index');
    allNotes[di] = $(classes[di]).val();
    localStorage.setItem('allNotes', JSON.stringify(allNotes))
    alert("Saved")

})

//grabData function, restores data to rows from local storage
function grabData() {
    allNotes = JSON.parse(localStorage.getItem("allNotes"));
    if (allNotes == null) {
        allNotes = ["", "", "", "", "", "", "", "", "", "", ""];
        return;
    }
    for (i = 0; i < classes.length; i++) {
        ($(classes[i])).val(allNotes[i]);
    }
}

//click event for the clear button
$(".cleary").on("click", function () {
    cleardata()
})

//clear data function, clears allnote array, all rows and stores empty array in local storage
function cleardata() {
    var confirmDelete = confirm("Are you sure you want to clear all data?");
    if (confirmDelete == true) {
        allNotes = ["", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
        grabData();
    }
}

//function that compares current day with last day stored in local storage. offers user to clear data if day has changed.
function checkDay() {
    var dateSet = localStorage.getItem("date");
    if (dateSet == null) {
        localStorage.setItem('date', currentDayCheck);
    }
    else if (currentDayCheck !== dateSet) {
        localStorage.setItem('date', currentDayCheck);
        var confirmNewDay = confirm("It's a new day, would you like to clear the calendar?")
        if (confirmNewDay == true) {
            cleardata()
            localStorage.setItem('date', currentDayCheck);
        }
    }
}

//save all button function, stores everything in allNotes array and local storage data
$(".savey").on("click", function () {
    for (i = 0; i < classes.length; i++) {
        allNotes[i] = $(classes[i]).val();
    }
    localStorage.setItem('allNotes', JSON.stringify(allNotes))
    alert("All Data Saved")
})