//YOUTUBE SEARCH & PLAY

//declare variables
var screenCount = 0
var menu = 0;
var toggle;

// Many event listeners on the same page cause performance issues
// so use event delegation pattern to attach events to dynamic elements
// ***INSERT ALL EVENT LISTENERS INTO THESE EVENT DELEGATORS***
document.addEventListener("click", function(e){
	if(e.target && e.target.id == "ytButton"){
		youTubeSearch(e);
	}
	if(e.target && e.target.className == "play"){
		youtubePlay(e);
 	}
	if(e.target && e.target.id == "youTube"){
		youtubeapp(e);
	}
	if(e.target && e.target.id == "splitscreen"){
		splitScreen(e);
	}
	if(e.target && e.target.id == "clearList"){
		clearResults(e);
	}
}, false);

//Plays content and loops through screens
function youtubePlay(e){
	var screenPanel = document.querySelectorAll(".screenPanel");
	screenPanel[screenCount].innerHTML = "<iframe src='//www.youtube.com/embed/" + e.target.id + "?autoplay=1' frameborder='0'></iframe>";
	if (screenPanel.length === 1){
		menuClose();
		var ytSearch = document.getElementById("ytSearch");
		ytSearch.innerHTML = " ";
		menu = 0;
	}
	if (screenPanel.length > 1){
		screenCount++;
	}
	if (screenCount === 4){
		screenCount=0;
	}
}

//initialise and set api key
function init(){
	gapi.client.setApiKey("YOUR_GOOGLE_DEVELOPER_ID");
	gapi.client.load("youtube", "v3", function(){
		//api is ready
	});
}

//set search parameters and request results
function youTubeSearch(){
  var ytResults = document.getElementById("ytResults");
  ytResults.innerHTML = " ";
  //prepare youtube request
  var searchText = ytText.value;
  var request = gapi.client.youtube.search.list({
    q: searchText,
    part: "snippet",
    type: "video",
    maxResults: 25
  });
	//loop through search results and display
  request.execute(function(response) {
    var results = response.result;
    for (var item in results.items){
      var ytResults = document.getElementById("ytResults");
			var itemWrapper = document.createElement('article');
			ytResults.appendChild(itemWrapper);
      itemWrapper.setAttribute('class', 'item');
			itemWrapper.innerHTML += '<h2>' + results.items[item].snippet.title + '</h2>';
      itemWrapper.innerHTML += '<img id="' + results.items[item].id.videoId + '" class="play" src="http://img.youtube.com/vi/' + results.items[item].id.videoId + '/0.jpg">';
      itemWrapper.innerHTML += '<h3>' + results.items[item].snippet.channelTitle + '</h3>';
      itemWrapper.innerHTML += '<p>' + results.items[item].snippet.description + '</p>';
		}
  });
}

//menu open animation
function menuOpen() {
	var ytResults = document.getElementById("ytResults");
  var width = 0;
  var id = setInterval(frame, 15);
  function frame() {
    if (width === 320) {
			ytResults.style.display = "block";
      clearInterval(id);
		}
    else {
      width+=20;
			results.style.width = width + 'px';
    }
  }
}

//menu close animation
function menuClose() {
	var ytResults = document.getElementById("ytResults");
  var width = 320;
	var id = setInterval(frame, 15);
  function frame() {
    if (width === 0) {
      clearInterval(id);
    }
		else {
      width-=20;
			ytResults.style.display = "none";
      results.style.width = width + 'px';
    }
  }
}

//EVENT: trigger menu animation
function youtubeapp(){
	var ytSearch = document.getElementById("ytSearch");
	var youTube = document.getElementById("youTube");
	if(menu === 0) {
		youTube.style.backgroundColor = "#808080";
    ytSearch.innerHTML += "<input id='ytText' type='text' placeholder='search youtube'>";
    ytSearch.innerHTML += "<button type='submit' id='ytButton'>Search</button>";
		ytSearch.innerHTML += "<span type='submit' id='clearList'>Clear list</span>";
    menuOpen();
    return menu = 1;
  }
  else {
    menuClose();
    youTube.style.backgroundColor = "#999";
    ytSearch.innerHTML = " ";
    return menu = 0;
  }
}

//clear results from search list
function clearResults(){
	var ytResults = document.getElementById("ytResults");
	var ytText = document.getElementById("ytText");
	ytText.value = " ";
	ytResults.innerHTML = " ";
}

// split screen control
function splitScreen(){
	var screen = document.getElementById("screen");
	var splitscreen = document.getElementById("splitscreen");
	screenCount = 0;
	var screenPanel = document.querySelectorAll(".screenPanel");
  if (!toggle){
		screen.innerHTML = " ";
    for (var i=0; i < 4; i++){
      screen.innerHTML += "<section style='width: 49.8%; height:49.6%; float:left;' class='screenPanel'></section>";
    }
		return toggle = 1;
  }
  else {
    screen.innerHTML = "<section style='width:100%; height:99.5%;' class='screenPanel'><section>";
		return toggle = null;
  }
}
