document.getElementById("seeMoreButton").addEventListener("click", function() {
    const hiddenAnnouncements = document.querySelectorAll(".announcement-card.hidden");
    const isExpanded = hiddenAnnouncements[0].style.display === "block"; // Check if expanded
    const buttonIcon = this.querySelector("i");
    hiddenAnnouncements.forEach((card, index) => {
        setTimeout(() => {
            card.style.display = isExpanded ? "none" : "block"; // Toggle display
            card.style.opacity = isExpanded ? "0" : "1"; // Toggle opacity for smooth effect
            card.style.transform = isExpanded ? "translateY(20px)" : "translateY(0)"; // Slide effect
        }, index * 150); // Delay for staggered effect
    });

    // Update button text based on expanded or collapsed state
    this.textContent = isExpanded ? "See More ..." : "See Less ...";
});
