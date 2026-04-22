// CHECK FOR USERNAME
const savedUsername = sessionStorage.getItem("funfinance_username");

if (!savedUsername) {
    window.location.href = "splash.html";
}

// THEME SELECTION CARRY-OVER
const savedTheme = localStorage.getItem("funfinance_theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

// TIME-OF-DAY BASED GREETING
function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
}

// Set greeting accordingly with username
document.querySelector(".page-title").textContent =
    `${getGreeting()}, ${savedUsername} 👋`;

// THEME TOGGLE
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";

themeToggle.addEventListener("click", function () {
    const html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        themeToggle.textContent = "Dark Mode";
        localStorage.setItem("funfinance_theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        themeToggle.textContent = "Light Mode";
        localStorage.setItem("funfinance_theme", "dark");
    }
});

// PIE CHART (Spending by Category)
const categoryCtx = document.getElementById("categoryChart").getContext("2d");
new Chart(categoryCtx, {
    type: "doughnut",
    data: {
        labels: ["Rent", "Food", "Groceries", "Transport", "Entertainment", "Other"],
        datasets: [{
            data: [850, 220, 180, 95, 120, 75],
            backgroundColor: [
              "#1DB954",  
              "#f0a500",  
              "#3b82f6",  
              "#a855f7",  
              "#e05260",  
              "#06b6d4"   
            ],
            borderWidth: 0,
            hoverOffset: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "#a0a0a0",
                    padding: 16,
                    font: { size: 12 }
                }
            }
        },
        cutout: "65%"
    }
});

// BAR CHART (Monthly Spending)
const spendingCtx = document.getElementById("spendingChart").getContext("2d");
new Chart(spendingCtx, {
    type: "bar",
    data: {
        labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [{
            label: "Spending ($)",
            data: [1100, 1380, 1600, 1250, 1190, 1340],
            backgroundColor: "#1DB954",
            borderRadius: 8,
            borderSkipped: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#a0a0a0" }
            },
            y: {
                grid: { color: "#2a2a2a" },
                ticks: { color: "#a0a0a0" }
            }
        }
    }
});