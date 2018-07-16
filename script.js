var buttonShown = false;
var btn = document.getElementById("check-btn");
var txt = document.getElementById("text-input");

// color schemes
var color_schemes = {
  neutral : ["#424242", "#d9d9db", "#757575"],
  green : ["#00661e", "#b3fcc8", "#3cc463"],
  red : ["#c42525", "#ff6363", "#e00f0f"],
  yellow : ["#c49600", "#f9fcbd", "#f9cd3b"]
}

// change color scheme of content
function changeColorScheme(color){
  switch(color){
    case "neutral":
      document.getElementsByTagName("H1")[0].style.color = color_schemes.neutral[0];
      document.body.style.backgroundColor = color_schemes.neutral[1];
      document.getElementById("main").style.border = "5px solid" + color_schemes.neutral[2];
      document.getElementById("check-btn").style.backgroundColor = color_schemes.neutral[0];
    break;

    case "green":
      document.getElementsByTagName("H1")[0].style.color = color_schemes.green[0];
      document.body.style.backgroundColor = color_schemes.green[1];
      document.getElementById("main").style.border = "5px solid" + color_schemes.green[2];
      document.getElementById("check-btn").style.backgroundColor = color_schemes.green[0];
    break;

    case "red":
      document.getElementsByTagName("H1")[0].style.color = color_schemes.red[0];
      document.body.style.backgroundColor = color_schemes.red[1];
      document.getElementById("main").style.border = "5px solid" + color_schemes.red[2];
      document.getElementById("check-btn").style.backgroundColor = color_schemes.red[0];
    break;

    case "yellow":
      document.getElementsByTagName("H1")[0].style.color = color_schemes.yellow[0];
      document.body.style.backgroundColor = color_schemes.yellow[1];
      document.getElementById("main").style.border = "5px solid" + color_schemes.yellow[2];
      document.getElementById("check-btn").style.backgroundColor = color_schemes.yellow[0];
    break;
  }
}

window.onload = function(){
  // center content
  var main = document.getElementById("main");
  main.style.marginTop = (window.innerHeight - main.offsetHeight)/2 + "px";
  main.style.paddingTop = window.innerHeight;

  // enable CHECK button if input has already been filled out
  if(txt.value!== ""){
    txt.style.width="84%";
    btn.style.display = "inline-block";
    buttonShown = true;
  }
}

window.onresize = function(){
  //center content
  var main = document.getElementById("main");
  main.style.marginTop = (window.innerHeight - main.offsetHeight)/2 + "px";
  main.style.paddingTop = window.innerHeight
}

// (called as user types) hide CHECK button if input is empty, otherwise show CHECK button
function showButton(){
  if(buttonShown == true && txt.value == ""){
    txt.style.width="100%";
    btn.style.display = "none";
    buttonShown = false;
  } else if(txt.value !== "") {
    txt.style.width="84%";
    btn.style.display = "inline-block";
    buttonShown = true;
  }
}

// (called as user types) remove all spaces from input and change content color scheme to neutral
function sanitize(){
  txt.value = txt.value.replace(/ /g, "");
  changeColorScheme("neutral");
}

// called when user clicks CHECK button
function submit(address){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://thakkaha.dev.fast.sheridanc.on.ca/pme/email-status/status.php?address='+ address, true);

  request.onload = function () {
    var data = JSON.parse(request.responseText);
    console.log(data);

    if(data.smtp_check === true){
      if(data.disposable === false){
        // change page color to green if email address exists and is not disposable
        changeColorScheme("green");
      } else {
        // change page color to yellow if email address exists but is  disposable
        changeColorScheme("yellow");
      }
    } else {
      // change page color to red if email address does not exist
      changeColorScheme("red");
    }
  }

  request.send();
}

// click CHECK button if user presses ENTER key
txt.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13 && txt.style.width === "84%") {
    btn.click();
  }
});
