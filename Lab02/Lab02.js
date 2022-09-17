function arrayannalize() {
    var array = [];
    var sum = 0;
    var greater = [];

    for (let i = 0; i < 5; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    var mean = sum / array.length;

    for (let i = 0; i < array.length; i++) {
        if (array[i] > mean) {
            greater.push(array[i]);
        }
    }

    document.querySelector("#arrayOut").innerHTML = "The array is:" + array + "<br> The mean is:" + mean + "<br>Greater:" + greater;
}



hours12 = (document.getElementById("Hours").selectedIndex == 0 ? true : false);
hour = date.getHours();
hour = (hours12 ? hour % 12 : hour);