let createLobbyForm = document.getElementById("createLobbyForm");
let errorMessage = document.getElementById("errorMessage");

createLobbyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let location = document.getElementById("location").value.trim();
    let foodType = document.getElementById("foodType").value;
    errorMessage.textContent = "";
    
    let data = { foodType, location };
    
    try {
        let response = await fetch("/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });
        
        let result = await response.json();

        // If response is ok, will redirect to the game page with the lobby ID
        // Waiting for socket implementation
        if (response.ok) {
        window.location.href = "/";
        } else {
        errorMessage.textContent = result.message;
        }
    } catch (error) {
        errorMessage.textContent = "An error occurred";
    }
    });