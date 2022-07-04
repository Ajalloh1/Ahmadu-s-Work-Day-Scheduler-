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
///here are functions for loop to invoc future classes for all rows except the first row///
function allFuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}
/// here function for loop for when the time is after business hours-6pm, then assing all rows but the last///
function allPast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length - 1]).addClass("present");
}
///function for loop for middday, using moment to know what hour and assign classes ///
function formatTimes() {
    $(classes[classIndex]).addClass("present");
    for (i = 0; i < classIndex; i++) {
        $(classes[i]).addClass("past");
    }
    for (i = classIndex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}
///fucntion to store data after been saved in array and local storage///
$(".saveBtn").on("click", function () {
    var di = $(this).data('index');
    allNotes[di] = $(classes[di]).val();
    localStorage.setItem('allNotes', JSON.stringify(allNotes))
    alert("Saved")

})
///create function to restore date to the rows from where it was saved: ;;pca storage and allnotes///
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
//this is the click event cutton to clear //
$(".cleary").on("click", function () {
    cleardata()
})
//clear all fucntion, and store empty array in local storage//
function cleardata() {
    var confirmDelete = confirm("please confirm you wanna clear all 🤔");
    if (confirmDelete == true) {
        allNotes = ["", "", "", "", "", "", "", "", "", "", ""];
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
        grabData();
    }
}
///create fucniton to compare current day to previous day, and ask users to clear data if new day//
function checkDay() {
    var dateSet = localStorage.getItem("date");
    if (dateSet == null) {
        localStorage.setItem('date', currentDayCheck);
    }
    else if (currentDayCheck !== dateSet) {
        localStorage.setItem('date', currentDayCheck);
        var confirmNewDay = confirm("It's a new day! wanna clear calendar 😄?")
        if (confirmNewDay == true) {
            cleardata()
            localStorage.setItem('date', currentDayCheck);
        }
    }
}

//create fucntion to save all button function, stores everything in allNotes array and local storage data
$(".savey").on("click", function () {
    for (i = 0; i < classes.length; i++) {
        allNotes[i] = $(classes[i]).val();
    }
    localStorage.setItem('allNotes', JSON.stringify(allNotes))
    alert("All Data Saved")
})