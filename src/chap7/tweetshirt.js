window.onload = function () {
  var button = document.getElementById("previewButton");
  button.onclick = previewHandler;

};

function previewHandler() {
  var canvas = document.getElementById("tshirtCanvas");
  var context = canvas.getContext("2d");
  fillBackgroundColor(canvas, context);

  var selectObj = document.getElementById("shape");
  var index = selectObj.selectedIndex;
  var shape = selectObj[index].value;

  if (shape == "squares") {
    for (var squares = 0; squares < 20; squares++) {
      drawSquare(canvas, context);
    }
  } else if (shape == "circles") {
    for (var squares = 0; squares < 20; squares++) {
      drawCircle(canvas, context);
    }
  }
}

function drawSquare(canvas, context) {
  var w = Math.floor(Math.random() * 40);
  var x = Math.floor(Math.random() * canvas.width);
  var y = Math.floor(Math.random() * canvas.height);

  context.fillStyle = "lightblue";
  context.fillRect(x, y, w, w);
}

function drawCircle(canvas, context) {
  var radius = Math.floor(Math.random() * 40);
  var x = Math.floor(Math.random() * canvas.width);
  var y = Math.floor(Math.random() * canvas.height);

  context.beginPath();
  context.arc(x, y, radius, 0, degreesToRadians(360), true);
  context.fillStyle = "lightblue";
  context.fill();
}

function fillBackgroundColor(canvas, context) {
  var selectObject = document.getElementById("backgroundColor");
  var index = selectObject.selectedIndex;
  var bgColor = selectObject[index].value;

  context.fillStyle = bgColor;
  context.fillRect(0, 0, 600, 200);
}

//this will convert degrees to radians for the arc method.  360 gives a circle.
function degreesToRadians(degress) {
  return (degress * Math.PI)/180;
}

function updateTweets(tweets) {
  var tweetsSelection = document.getElementById("tweets");

  for (var i = 0; i < tweets.length; i++) {
    tweet = tweets[i];
    var option = document.createElement("option");
    option.text = tweet.text;
    option.value = tweet.text.replace("\"", "'");

    tweetsSelection.options.add(option);
  }
  tweetsSelection.index = 0;
}