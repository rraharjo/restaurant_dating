export function getLocation(onSuccess, onError) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      if (onError) onError(new Error("Geolocation is not supported by this browser."));
    }
  }
  
export function showError(error) {
    const errorMessage = {
        [error.PERMISSION_DENIED]: "User denied the request for Geolocation.",
        [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
        [error.TIMEOUT]: "The request to get user location timed out.",
        [error.UNKNOWN_ERROR]: "An unknown error occurred.",
    }[error.code] || "An unexpected error occurred.";

    // Example: Log or display the error message
    const errorDiv = document.getElementById("error");
    if (errorDiv) {
        errorDiv.innerHTML = errorMessage;
    } else {
        console.error(errorMessage);
    }
}

export function storePosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    return { lat: latitude, lon: longitude };
}

export function initAutocomplete(address1Field, userLocation) {
    //address1Field = document.querySelector("#res-address");
    let autocomplete;
    const googleMapAutoOption = {
        componentRestrictions: { country: ["us"] },
        fields: ["geometry"],
        types: [],
    };
    autocomplete = new google.maps.places.Autocomplete(address1Field, googleMapAutoOption);
    address1Field.focus();
    autocomplete.addListener("place_changed", setUserLocation.bind(null, userLocation));
    function setUserLocation(userLocation) {
        const place = autocomplete.getPlace();
        userLocation.lat = place.geometry.location.lat();
        userLocation.lon = place.geometry.location.lng();
    }
};