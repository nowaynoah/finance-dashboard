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

// MORTGAGE CALCULATOR
const mortgageBtn = document.getElementById("mortgage-btn");

mortgageBtn.addEventListener("click", function () {
    const principal = parseFloat(document.getElementById("mortgage-principal").value);
    const down = parseFloat(document.getElementById("mortgage-down").value);
    const annualRate = parseFloat(document.getElementById("mortgage-rate").value);
    const years = parseFloat(document.getElementById("mortgage-term").value);
    const result = document.getElementById("mortgage-result");

    if (!principal || !down || !annualRate || !years) {
        result.innerHTML = "Please fill in all fields.";
        result.classList.add("visible");
        return;
    }

    const loanAmount = principal - down;
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;

    const monthlyPayment =
        (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numPayments));

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;

    result.innerHTML = `
        <strong>Loan Amount:</strong> $${loanAmount.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Monthly Payment:</strong> $${monthlyPayment.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Total Payment:</strong> $${totalPayment.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Total Interest:</strong> $${totalInterest.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
    `;
    result.classList.add("visible");
});

// OSAP LOAN CALCULATOR
const osapBtn = document.getElementById("osap-btn");

osapBtn.addEventListener("click", function () {
    const balance = parseFloat(document.getElementById("osap-balance").value);
    const annualRate = parseFloat(document.getElementById("osap-rate").value);
    const monthlyPayment = parseFloat(document.getElementById("osap-payment").value);
    const result = document.getElementById("osap-result");

    if (!balance || !annualRate || !monthlyPayment) {
        result.innerHTML = "Please fill in all fields.";
        result.classList.add("visible");
        return;
    }

    const monthlyRate = annualRate / 100 / 12;

    // Check for if payment is enough to cover interest
    const minPayment = balance * monthlyRate;
    if (monthlyPayment <= minPayment) {
        result.innerHTML = `<strong>⚠️ Warning:</strong> Your monthly payment of $${monthlyPayment.toFixed(2)} doesn't cover the monthly interest of $${minPayment.toFixed(2)}. You'll never pay off the loan at this rate.`;
        result.classList.add("visible");
        return;
    }

    const months = Math.ceil(
        -Math.log(1 - (balance * monthlyRate) / monthlyPayment) /
        Math.log(1 + monthlyRate)
    );

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - balance;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    result.innerHTML = `
        <strong>Payoff Time:</strong> ${years > 0 ? years + " years " : ""}${remainingMonths > 0 ? remainingMonths + " months" : ""}<br>
        <strong>Total Payment:</strong> $${totalPayment.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Total Interest:</strong> $${totalInterest.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
    `;
    result.classList.add("visible");
});

// CREDIT CARD PAYOFF CALCULATOR
const ccBtn = document.getElementById("cc-btn");

ccBtn.addEventListener("click", function () {
    const balance = parseFloat(document.getElementById("cc-balance").value);
    const annualRate = parseFloat(document.getElementById("cc-rate").value);
    const monthlyPayment = parseFloat(document.getElementById("cc-payment").value);
    const result = document.getElementById("cc-result");

    if (!balance || !annualRate || !monthlyPayment) {
        result.innerHTML = "Please fill in all fields.";
        result.classList.add("visible");
        return;
    }

    const monthlyRate = annualRate / 100 / 12;

    // Check for if payment covers interest
    const minPayment = balance * monthlyRate;
    if (monthlyPayment <= minPayment) {
        result.innerHTML = `<strong>⚠️ Warning:</strong> Your monthly payment of $${monthlyPayment.toFixed(2)} doesn't cover the monthly interest of $${minPayment.toFixed(2)}. You'll never pay off the balance at this rate.`;
        result.classList.add("visible");
        return;
    }

    const months = Math.ceil(
        -Math.log(1 - (balance * monthlyRate) / monthlyPayment) /
        Math.log(1 + monthlyRate)
    );

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - balance;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    result.innerHTML = `
        <strong>Payoff Time:</strong> ${years > 0 ? years + " years " : ""}${remainingMonths > 0 ? remainingMonths + " months" : ""}<br>
        <strong>Total Payment:</strong> $${totalPayment.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Total Interest Paid:</strong> $${totalInterest.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
    `;
    result.classList.add("visible");
});

// HISA CALCULATOR
const hisaBtn = document.getElementById("hisa-btn");

hisaBtn.addEventListener("click", function () {
    const initial = parseFloat(document.getElementById("hisa-initial").value);
    const monthly = parseFloat(document.getElementById("hisa-monthly").value);
    const annualRate = parseFloat(document.getElementById("hisa-rate").value);
    const years = parseFloat(document.getElementById("hisa-years").value);
    const result = document.getElementById("hisa-result");

    if (!initial || !annualRate || !years) {
        result.innerHTML = "Please fill in all required fields.";
        result.classList.add("visible");
        return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numMonths = years * 12;

    // Calculation for compound growth of initial deposit
    const initialGrowth = initial * Math.pow(1 + monthlyRate, numMonths);

    // Calculation for compound growth of monthly contributions
    const contributionGrowth = monthly *
        ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate);

    const finalBalance = initialGrowth + contributionGrowth;
    const totalContributions = initial + (monthly * numMonths);
    const totalInterestEarned = finalBalance - totalContributions;

    result.innerHTML = `
        <strong>Final Balance:</strong> $${finalBalance.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Total Contributions:</strong> $${totalContributions.toLocaleString("en-CA", { minimumFractionDigits: 2 })}<br>
        <strong>Interest Earned:</strong> $${totalInterestEarned.toLocaleString("en-CA", { minimumFractionDigits: 2 })}
    `;
    result.classList.add("visible");
});