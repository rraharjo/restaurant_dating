let cuisine  = document.getElementById("cuisine");
let price    = document.getElementById("price");
let city     = document.getElementById("location"); 
let radius   = document.getElementById("radius");
let button   = document.getElementById("submit");


button.addEventListener("click", (event) => {
    // Prevent form submission if the button is inside a form
    event.preventDefault();
    console.log(cuisine.value);

    let url = `preferences-api/?cuisine=${cuisine.value}&price=${price.value}&city=${city.value}&radius=${radius.value}`;

    fetch(url)
        .then((response) => response.json())
        .then((body) => { 
            console.log("Response Received");
        })
        .catch((error) => {
            console.log(error);
        });
});
