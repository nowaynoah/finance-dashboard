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

// FINANCIAL NEWS VIA RSS2JSON
const RSS_URL = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=^GSPC,^DJI&region=US&lang=en-US";
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function renderNews(articles) {
    const grid = document.getElementById("news-grid");
    grid.innerHTML = "";

    if (!articles || articles.length === 0) {
        grid.innerHTML = "<p class='news-loading'>No news available right now. Check back later.</p>";
        return;
    }

    articles.slice(0, 6).forEach(function (article) {
        const card = document.createElement("a");
        card.classList.add("news-card");
        card.href = article.link;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        card.innerHTML = `
            <div class="news-card-source">${article.author || "Yahoo Finance"}</div>
            <div class="news-card-title">${article.title}</div>
            <div class="news-card-date">${formatDate(article.pubDate)}</div>
        `;

        grid.appendChild(card);
    });
}

// Fetch news from RSS feed
fetch(API_URL)
    .then(function (response) { return response.json(); })
    .then(function (data) {
        if (data.status === "ok") {
            renderNews(data.items);
        } else {
            document.getElementById("news-grid").innerHTML =
                "<p class='news-loading'>Unable to load news right now. Check back later.</p>";
        }
    })
    .catch(function () {
        document.getElementById("news-grid").innerHTML =
            "<p class='news-loading'>Unable to load news right now. Check back later.</p>";
    });

// LEARN CARDS
const learnTopics = [
    {
        icon: "💳",
        title: "Understanding Credit Scores",
        text: "Your credit score affects your ability to get loans, rent apartments, and even land certain jobs. Pay bills on time, keep utilization below 30%, and avoid opening too many accounts at once."
    },
    {
        icon: "🏦",
        title: "TFSA vs RRSP",
        text: "A TFSA lets your money grow tax-free and can be withdrawn anytime. An RRSP reduces your taxable income now but is taxed on withdrawal. Both are powerful — the right choice depends on your income and goals."
    },
    {
        icon: "📈",
        title: "Compound Interest",
        text: "Compound interest means you earn interest on your interest. The earlier you start saving, the more powerful it becomes. Even small monthly contributions grow significantly over 10-20 years."
    },
    {
        icon: "🎓",
        title: "Managing OSAP Debt",
        text: "OSAP loans in Ontario are interest-free while in school. After graduation, make more than the minimum payment when possible — even an extra $50/month can shave years off your repayment."
    },
    {
        icon: "🏠",
        title: "Saving for a Down Payment",
        text: "In Canada, you need at least 5% down for homes under $500K. Use your FHSA (First Home Savings Account) to save up to $40,000 tax-free specifically for your first home purchase."
    },
    {
        icon: "📊",
        title: "The 50/30/20 Rule",
        text: "A simple budgeting framework: 50% of income goes to needs, 30% to wants, and 20% to savings and debt repayment. It's a great starting point for building healthy spending habits."
    }
];

function renderLearnCards() {
    const grid = document.getElementById("learn-grid");
    grid.innerHTML = "";

    learnTopics.forEach(function (topic) {
        const card = document.createElement("div");
        card.classList.add("learn-card");

        card.innerHTML = `
            <div class="learn-card-icon">${topic.icon}</div>
            <div class="learn-card-title">${topic.title}</div>
            <div class="learn-card-text">${topic.text}</div>
        `;

        grid.appendChild(card);
    });
}

renderLearnCards();