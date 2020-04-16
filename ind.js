function myFunc(){
    let form = document.forms.frm1;
    console.log(form)
    let elem1 = form.elements.fname.value;
    let elem2 = form.elements.lname.value;
    console.log(elem1, elem2,"here")
    url = "http://localhost:3000?lat="+elem1+"&lon="+elem2;
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            var r = JSON.parse(request.response);
            console.log("new code" + r.message);
            var lst = r.response;
            var i;
            var text = "";
            for (i = 0; i < lst.length; i++){
                document.getElementById("dur").innerHTML = text += "Duration: "+ lst[i].duration  + ";" + " " + "risetime: "+ lst[i].risetime + " <br>";
            }
        }
        else {
            alert("Please enter a value between -80 to 80 for longitude and -180 to 180 for latitude.");
        }
    }

}

// After the document is loaded
document.addEventListener('DOMContentLoaded', function() {

document.querySelector('#location').onclick = function() {
    url = "http://api.open-notify.org/iss-now.json";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => {
        if (request.status === 200) {
            var r = JSON.parse(request.response);
            document.getElementById("long").innerHTML = "Longitude: "+r.iss_position.longitude;
            document.getElementById("lat").innerHTML = "Latitude: "+r.iss_position.latitude;
            document.getElementById("time").innerHTML = "Timestamp: "+r.timestamp;
        }
        else {
            document.querySelector("p1").innerHTML = "Error";
        }
    }
};

// document.querySelector('#pass').onclick = function() {
//     document.getElementById("frm1").style.display="null";
// };

document.querySelector('#people').onclick = function() {
    url = "http://api.open-notify.org/astros.json";
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status === 200) {
            var r = JSON.parse(request.response);
            var x = r.people;
            var i;
            var text = "";
            document.getElementById("tot").innerHTML = "Total number of people in space: " + x.length + " <br>";
            for (i = 0; i < x.length; i++){
                var ppl = x[i].name
                document.getElementById("pplin").innerHTML = text += "Name: "+ ppl + " <br>";
            }
        }
        else {
            document.querySelector("p1").innerHTML = "Error";
        }
    }
};
});