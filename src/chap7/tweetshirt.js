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
  }
}

function drawSquare(canvas, context) {
  var w = Math.floor(Math.random() * 40);
  var x = Math.floor(Math.random() * canvas.width);
  var y = Math.floor(Math.random() * canvas.height);

  context.fillStyle = "lightblue";
  context.fillRect(x, y, w, w);
}

function fillBackgroundColor(canvas, context) {
  var selectObject  = document.getElementById("backgroundColor");
  var index = selectObject.selectedIndex;
  var bgColor = selectObject[index].value;

  context.fillStyle = bgColor;
  context.fillRect(0, 0, 600, 200);
}
