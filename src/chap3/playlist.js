window.onload = init;

function init() {
  //get the button and set up the handler on the onclick event
  var button = document.getElementById("addButton");
  button.onclick = handleButtonClick;
  loadPlaylist();
}

function handleButtonClick() {

  var textInput = document.getElementById("songTextInput");
  var songName = textInput.value;
  if (songName == "") {
    alert("Please enter a song name.")
  } else {
    alert("Adding: " + songName);
    var li = document.createElement("li");
    li.innerHTML = songName;
    var ul = document.getElementById("playlist");
    ul.appendChild(li);
    save(songName);
  }
}