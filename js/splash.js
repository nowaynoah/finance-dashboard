// SPLASH PAGE LOGIC
const getStartedBtn = document.getElementById("getStartedBtn");
const usernameInput = document.getElementById("usernameInput");
const splashError = document.getElementById("splashError");

// If user already has a name saved for this session, skip to dashboard
if (sessionStorage.getItem("funfinance_username")) {
    window.location.href = "index.html";
}

// Allow pressing Enter to submit
usernameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleGetStarted();
    }
});

// Get Started button click
getStartedBtn.addEventListener("click", function () {
    handleGetStarted();
});

// HANDLE SUBMISSION
function handleGetStarted() {
    const name = usernameInput.value.trim();

    if (name === "") {
        splashError.textContent = "Please enter a name to continue.";
        return;
    }

    // Save name to sessionStorage for this session only
    sessionStorage.setItem("funfinance_username", name);

    // Redirect to dashboard
    window.location.href = "index.html";
}