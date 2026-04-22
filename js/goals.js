// CHECK FOR USERNAME
const savedUsername = sessionStorage.getItem("funfinance_username");

if (!savedUsername) {
    window.location.href = "splash.html";
}

// THEME SELECTION CARRY-OVER
const savedTheme = localStorage.getItem("funfinance_theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

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

// DEFAULT GOALS DATA
const defaultLimits = [
    { id: 1, name: "Uber Eats", spent: 72, limit: 100 },
    { id: 2, name: "Coffee", spent: 43, limit: 50 },
    { id: 3, name: "Entertainment", spent: 115, limit: 120 }
];

const defaultSavings = [
    { id: 1, name: "Vacation", saved: 1200, target: 3000 },
    { id: 2, name: "New TV", saved: 600, target: 800 },
    { id: 3, name: "Emergency Fund", saved: 2100, target: 5000 }
];

// LOAD GOALS FROM LOCALSTORAGE
function getLimits() {
    return JSON.parse(localStorage.getItem("funfinance_limits")) || defaultLimits;
}

function getSavings() {
    return JSON.parse(localStorage.getItem("funfinance_savings")) || defaultSavings;
}

function saveLimits(limits) {
    localStorage.setItem("funfinance_limits", JSON.stringify(limits));
}

function saveSavingsGoals(savings) {
    localStorage.setItem("funfinance_savings", JSON.stringify(savings));
}

// GET PROGRESS BAR COLOR
function getLimitColor(spent, limit) {
    const remaining = limit - spent;
    const percentage = spent / limit;

    if (remaining <= 5 || spent >= limit) return "red";
    if (percentage >= 0.8) return "yellow";
    return "green";
}

// RENDER BUDGET LIMITS
function renderLimits() {
    const limits = getLimits();
    const list = document.getElementById("limits-list");
    list.innerHTML = "";

    limits.forEach(function (limit) {
        const percentage = Math.min((limit.spent / limit.limit) * 100, 100);
        const color = getLimitColor(limit.spent, limit.limit);
        const remaining = limit.limit - limit.spent;

        const card = document.createElement("div");
        card.classList.add("goal-card");

        card.innerHTML = `
            <div class="goal-card-header">
                <span class="goal-card-name">${limit.name}</span>
                <span class="goal-card-amount">$${limit.spent} / $${limit.limit}</span>
            </div>
            <div class="progress-bar-track">
                <div class="progress-bar-fill ${color}" data-width="${percentage}"></div>
            </div>
            <div class="goal-card-footer">
                <span>${remaining >= 0 ? "$" + remaining.toFixed(2) + " remaining" : "$" + Math.abs(remaining).toFixed(2) + " over budget"}</span>
                <span>${percentage.toFixed(0)}%</span>
            </div>
        `;

        list.appendChild(card);
    });

    // Animate progress bars
    setTimeout(function () {
        document.querySelectorAll(".progress-bar-fill").forEach(function (bar) {
            bar.style.width = bar.dataset.width + "%";
        });
    }, 100);
}

// RENDER SAVINGS GOALS
function renderSavings() {
    const savings = getSavings();
    const list = document.getElementById("savings-list");
    list.innerHTML = "";

    savings.forEach(function (goal) {
        const percentage = Math.min((goal.saved / goal.target) * 100, 100);
        const remaining = goal.target - goal.saved;

        const card = document.createElement("div");
        card.classList.add("goal-card");

        card.innerHTML = `
            <div class="goal-card-header">
                <span class="goal-card-name">${goal.name}</span>
                <span class="goal-card-amount">$${goal.saved.toLocaleString("en-CA")} / $${goal.target.toLocaleString("en-CA")}</span>
            </div>
            <div class="progress-bar-track">
                <div class="progress-bar-fill green" data-width="${percentage}"></div>
            </div>
            <div class="goal-card-footer">
                <span>$${remaining.toLocaleString("en-CA")} to go</span>
                <span>${percentage.toFixed(0)}%</span>
            </div>
        `;

        list.appendChild(card);
    });

    // Animate progress bars
    setTimeout(function () {
        document.querySelectorAll(".progress-bar-fill").forEach(function (bar) {
            bar.style.width = bar.dataset.width + "%";
        });
    }, 100);
}

// INITIAL RENDER
renderLimits();
renderSavings();