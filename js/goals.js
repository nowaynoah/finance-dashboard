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
                <span style="display:flex; align-items:center; gap:0.5rem;">
                    <span>${percentage.toFixed(0)}%</span>
                    <button class="delete-goal-btn" data-id="${limit.id}" data-type="limit">✕</button>
                </span>
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
                <span style="display:flex; align-items:center; gap:0.5rem;">
                    <span>${percentage.toFixed(0)}%</span>
                    <button class="delete-goal-btn" data-id="${goal.id}" data-type="savings">✕</button>
                </span>
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

// MODAL LOGIC
const limitModalOverlay = document.getElementById("limit-modal-overlay");
const savingsModalOverlay = document.getElementById("savings-modal-overlay");

// Open modals
document.getElementById("add-limit-btn").addEventListener("click", function () {
    limitModalOverlay.classList.add("active");
});

document.getElementById("add-savings-btn").addEventListener("click", function () {
    savingsModalOverlay.classList.add("active");
});

// Close modals
document.getElementById("limit-cancel-btn").addEventListener("click", function () {
    limitModalOverlay.classList.remove("active");
    document.getElementById("limit-error").textContent = "";
});

document.getElementById("savings-cancel-btn").addEventListener("click", function () {
    savingsModalOverlay.classList.remove("active");
    document.getElementById("savings-error").textContent = "";
});

// Close modal when clicking outside
limitModalOverlay.addEventListener("click", function (event) {
    if (event.target === limitModalOverlay) {
        limitModalOverlay.classList.remove("active");
        document.getElementById("limit-error").textContent = "";
    }
});

savingsModalOverlay.addEventListener("click", function (event) {
    if (event.target === savingsModalOverlay) {
        savingsModalOverlay.classList.remove("active");
        document.getElementById("savings-error").textContent = "";
    }
});

// SAVE NEW LIMIT
document.getElementById("limit-save-btn").addEventListener("click", function () {
    const name = document.getElementById("limit-name-input").value.trim();
    const spent = parseFloat(document.getElementById("limit-spent-input").value);
    const limit = parseFloat(document.getElementById("limit-max-input").value);
    const error = document.getElementById("limit-error");

    if (!name || isNaN(spent) || isNaN(limit)) {
        error.textContent = "Please fill in all fields.";
        return;
    }

    if (limit <= 0) {
        error.textContent = "Limit must be greater than $0.";
        return;
    }

    const limits = getLimits();
    limits.push({
        id: Date.now(),
        name: name,
        spent: spent,
        limit: limit
    });

    saveLimits(limits);
    renderLimits();

    // Reset and close modal
    document.getElementById("limit-name-input").value = "";
    document.getElementById("limit-spent-input").value = "";
    document.getElementById("limit-max-input").value = "";
    error.textContent = "";
    limitModalOverlay.classList.remove("active");
});

// SAVE NEW SAVINGS GOAL
document.getElementById("savings-save-btn").addEventListener("click", function () {
    const name = document.getElementById("savings-name-input").value.trim();
    const saved = parseFloat(document.getElementById("savings-saved-input").value);
    const target = parseFloat(document.getElementById("savings-target-input").value);
    const error = document.getElementById("savings-error");

    if (!name || isNaN(saved) || isNaN(target)) {
        error.textContent = "Please fill in all fields.";
        return;
    }

    if (target <= 0) {
        error.textContent = "Target must be greater than $0.";
        return;
    }

    const savings = getSavings();
    savings.push({
        id: Date.now(),
        name: name,
        saved: saved,
        target: target
    });

    saveSavingsGoals(savings);
    renderSavings();

    // Reset and close modal
    document.getElementById("savings-name-input").value = "";
    document.getElementById("savings-saved-input").value = "";
    document.getElementById("savings-target-input").value = "";
    error.textContent = "";
    savingsModalOverlay.classList.remove("active");
});

// DELETE GOAL
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-goal-btn")) {
        const id = parseInt(event.target.dataset.id);
        const type = event.target.dataset.type;

        if (type === "limit") {
            const limits = getLimits().filter(function (l) { return l.id !== id; });
            saveLimits(limits);
            renderLimits();
        } else {
            const savings = getSavings().filter(function (s) { return s.id !== id; });
            saveSavingsGoals(savings);
            renderSavings();
        }
    }
});