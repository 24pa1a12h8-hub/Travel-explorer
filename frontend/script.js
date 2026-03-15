function searchPlace(){

let searchValue =
document.getElementById("searchInput").value
.trim()
.toLowerCase();

if(searchValue === ""){
alert("Please enter a destination");
return;
}

window.location.href =
"place.html?place=" + encodeURIComponent(searchValue);

}


function openPlace(place){

window.location.href =
"place.html?place=" + encodeURIComponent(place);

}