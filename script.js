/* =========================
   GLOBAL VARIABLES
========================= */

let carbonChart;
let trendChart;

/* =========================
   CALCULATE CARBON
========================= */

function calculateCarbon() {
  let electricity = Number(document.getElementById("electricity").value);

  let vehicle = Number(document.getElementById("vehicle").value);

  let flights = Number(document.getElementById("flights").value);

  let diet = Number(document.getElementById("diet").value);

  let waste = Number(document.getElementById("waste").value);

  /* Emissions */

  let electricityEmission = electricity * 0.5;

  let vehicleEmission = vehicle * 0.2;

  let flightEmission = flights * 90;

  let wasteEmission = waste * 2;

  let totalCarbon =
    electricityEmission +
    vehicleEmission +
    flightEmission +
    diet +
    wasteEmission;

  /* Result */

  document.getElementById("result").innerHTML =
    totalCarbon.toFixed(2) + " kg CO₂";

  /* Score */

  let score = "";
  let badge = "";
  let progress = 0;

  if (totalCarbon < 300) {
    score = "🟢 Low Carbon Footprint";

    badge = "🥇 Gold Earth Saver";

    progress = 30;
  } else if (totalCarbon < 700) {
    score = "🟡 Medium Carbon Footprint";

    badge = "🥈 Silver Eco Champion";

    progress = 65;
  } else {
    score = "🔴 High Carbon Footprint";

    badge = "🥉 Bronze Eco Citizen";

    progress = 100;
  }

  document.getElementById("score").innerHTML = score;

  document.getElementById("badge").innerHTML = badge;

  /* Progress */

  document.getElementById("progress-bar").style.width = progress + "%";

  /* Trees Needed */

  let trees = Math.ceil(totalCarbon / 22);

  document.getElementById("treeCount").innerHTML = trees + " Trees";

  /* Suggestions */

  generateSuggestions(electricity, vehicle, flights, waste);

  /* Charts */

  generatePieChart(
    electricityEmission,
    vehicleEmission,
    flightEmission,
    diet,
    wasteEmission,
  );

  generateTrendChart(totalCarbon);
}
/* =========================
   AI SUGGESTIONS
========================= */

function generateSuggestions(electricity, vehicle, flights, waste) {
  let suggestion = "";

  if (electricity > 300) {
    suggestion +=
      "⚡ Your electricity usage is high. Switch to LED bulbs and energy-efficient appliances.<br><br>";
  }

  if (vehicle > 500) {
    suggestion +=
      "🚲 Transportation emissions are high. Consider cycling, carpooling, or public transport.<br><br>";
  }

  if (flights > 5) {
    suggestion +=
      "✈ Air travel contributes significantly to emissions. Try reducing flights where possible.<br><br>";
  }

  if (waste > 20) {
    suggestion +=
      "♻ Waste generation is high. Recycle more and reduce single-use plastics.<br><br>";
  }

  if (suggestion === "") {
    suggestion =
      "🌍 Excellent! Your lifestyle is already environmentally friendly. Keep it up!";
  }

  document.getElementById("suggestionBox").innerHTML = suggestion;
}

/* =========================
   PIE CHART
========================= */

function generatePieChart(
  electricityEmission,
  vehicleEmission,
  flightEmission,
  dietEmission,
  wasteEmission,
) {
  let ctx = document.getElementById("carbonChart");

  if (carbonChart) {
    carbonChart.destroy();
  }

  carbonChart = new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: ["Electricity", "Transport", "Flights", "Diet", "Waste"],

      datasets: [
        {
          data: [
            electricityEmission,
            vehicleEmission,
            flightEmission,
            dietEmission,
            wasteEmission,
          ],

          backgroundColor: [
            "#4CAF50",
            "#2196F3",
            "#FF9800",
            "#E91E63",
            "#9C27B0",
          ],
        },
      ],
    },

    options: {
      responsive: true,
    },
  });
}

/* =========================
   TREND CHART
========================= */

function generateTrendChart(totalCarbon) {
  let ctx = document.getElementById("trendChart");

  if (trendChart) {
    trendChart.destroy();
  }

  trendChart = new Chart(ctx, {
    type: "line",

    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

      datasets: [
        {
          label: "Monthly Carbon Trend",

          data: [
            totalCarbon + 120,
            totalCarbon + 80,
            totalCarbon + 50,
            totalCarbon + 20,
            totalCarbon - 20,
            totalCarbon,
          ],

          fill: false,
          borderWidth: 3,
        },
      ],
    },

    options: {
      responsive: true,
    },
  });
}

/* =========================
   DOWNLOAD REPORT
========================= */

function downloadReport() {
  let result = document.getElementById("result").innerText;

  let score = document.getElementById("score").innerText;

  let badge = document.getElementById("badge").innerText;

  let trees = document.getElementById("treeCount").innerText;

  let report =
    "EcoTrack AI Carbon Report\n\n" +
    "Carbon Footprint: " +
    result +
    "\n\n" +
    "Score: " +
    score +
    "\n\n" +
    "Badge: " +
    badge +
    "\n\n" +
    "Trees Needed: " +
    trees;

  let blob = new Blob([report], {
    type: "text/plain",
  });

  let link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = "EcoTrack_Report.txt";

  link.click();
}

/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.innerHTML = "☀";
  } else {
    themeBtn.innerHTML = "🌙";
  }
});

/* =========================
   INITIAL CHARTS
========================= */

window.onload = () => {
  generateTrendChart(200);
};
