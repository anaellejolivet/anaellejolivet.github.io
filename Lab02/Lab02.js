var date = new Date;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function datetimepopup() {
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDay();
    var hours12 = (document.getElementById("Hours").selectedIndex == 0 ? true : false);
    var hour = date.getHours();
    hour = (hours12 ? hour % 12 : hour);
    var minutes = date.getMinutes();
    alert("The date today is: " + month + " " + day + " , " + year + " and the current time is: " + hour + ":" + minutes);
}
function datetimepage() {
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var day = date.getDay();
    var hours12 = (document.getElementById("Hours").selectedIndex == 0 ? true : false);
    var hour = date.getHours();
    hour = (hours12 ? hour % 12 : hour);
    var minutes = date.getMinutes();
    document.querySelector("#arrayOut").innerHTML = "The date today is: " + month + " " + day + " , " + year + "<br> and the current time is: " + hour + ":" + minutes;
}

