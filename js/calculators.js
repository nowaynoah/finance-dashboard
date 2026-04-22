// THEME TOGGLE 
const themeToggle = document.querySelector(".theme-toggle");

themeToggle.addEventListener("click", function () {
    const html = document.documentElement;

    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    } else {
        html.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
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