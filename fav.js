var favs = JSON.parse(localStorage.getItem("favs") || "[]");

var favContainer = document.getElementById("favs");

// Retrieving character IDs from favs array that is stored in localStorage and rendering them

for (i in favs) {
  var id = favs[i];

  var url =
    "https://cors-anywhere.herokuapp.com/https://www.superheroapi.com/api/3195255593905641/" +
    id;

  $.get(url, function (hero) {

    // Creating div for each character in the favourites from localStorage and appending it dynamically to a parent div

    var heroDiv = document.createElement("div");
    heroDiv.className = "hero-tile";

    var heroImage = document.createElement("img");
    heroImage.src = hero.image.url;

    var heroName = document.createElement("h3");
    heroName.innerText = hero.name;

    var removeFav = document.createElement("button");
    removeFav.innerText = "Remove";
    removeFav.className = "remove-btn";
    removeFav.id = hero.id;

    heroDiv.appendChild(heroImage);
    heroDiv.appendChild(heroName);
    heroDiv.appendChild(removeFav);

    favContainer.appendChild(heroDiv);
  });
}

var buttons;

//Adding eventListeners to all remove buttons that serve removing from favourites function;

$(document).ajaxStop(function () {
  buttons = document.getElementsByClassName("remove-btn");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {

        var favs = JSON.parse(localStorage.getItem("favs") || "[]");
        var index = favs.indexOf(this.id);
        favs.splice(index,1);
        window.localStorage.setItem("favs", JSON.stringify(favs));  
        location.reload();    
    });
  }
});


