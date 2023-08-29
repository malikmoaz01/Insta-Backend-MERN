document.addEventListener("DOMContentLoaded", () => {
    const verificationButton = document.getElementById("verification-button");
    const loadingContainer = document.getElementById("loading-container");
    const verificationSuccessContainer = document.getElementById("verification-success-container");

    verificationButton.addEventListener("click", async (event) => {
        event.preventDefault();

        verificationButton.style.display = "none";
        loadingContainer.style.display = "block";

        // Simulate a delay for verification process
        await simulateVerification();

        loadingContainer.style.display = "none";
        verificationSuccessContainer.style.display = "block";
    });
});

// Simulate a delay for verification process
function simulateVerification() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000); // Simulated 2 seconds delay
    });
}
