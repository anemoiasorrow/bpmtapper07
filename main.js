let taps = [];
let lastTapTime = 0;
let tapCount = 1;
let targetBPM = 0;

function tapTempo() {
  const currentTime = new Date().getTime();
  if (lastTapTime !== 0) {
    const tapDuration = currentTime - lastTapTime;
    const bpm = calculateBPM(tapDuration);
    taps.push(bpm);
    const averageBPM = calculateAverageBPM();
    displayAverageBPM(averageBPM);
    addTapToTable(tapCount, tapDuration);
    tapCount++;
  }
  lastTapTime = currentTime;
}

function calculateBPM(tapDuration) {
  const millisecondsInMinute = 60000;
  return Math.round(millisecondsInMinute / tapDuration);
}

function calculateAverageBPM() {
  if (taps.length === 0) {
    return 0;
  }
  const sum = taps.reduce((total, bpm) => total + bpm, 0);
  return Math.round(sum / taps.length);
}

function displayAverageBPM(averageBPM) {
  const averageBPMElement = document.getElementById("averageBPM");
  averageBPMElement.textContent = averageBPM;
}

function addTapToTable(click, milliseconds) {
  const table = document.getElementById("tapTable");
  const row = table.insertRow();
  const clickCell = row.insertCell();
  const millisecondsCell = row.insertCell();
  clickCell.textContent = click;
  millisecondsCell.textContent = milliseconds;
}

function reset() {
  taps = [];
  lastTapTime = 0;
  tapCount = 1;
  clearTable();
  displayAverageBPM(0);
}

function clearTable() {
  const table = document.getElementById("tapTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

function downloadTable() {
  const table = document.getElementById("tapTable");
  const csvContent = convertTableToCSV(table);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "tap_table.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function convertTableToCSV(table) {
  let csvContent = "data:text/csv;charset=utf-8,";

  for (let i = 1; i < table.rows.length; i++) {
    const row = table.rows[i];
    for (let j = 0; j < row.cells.length; j++) {
      csvContent += row.cells[j].textContent;
      if (j !== row.cells.length - 1) {
        csvContent += ",";
      }
    }
    csvContent += "\n";
  }

  return csvContent;
}

function generateTargetBPM() {
  const targetBPMElement = document.getElementById("targetBPM");
  const minBPM = 30;
  const maxBPM = 180;
  targetBPM = Math.floor(Math.random() * (maxBPM - minBPM + 1)) + minBPM;
  targetBPMElement.textContent = targetBPM;
}
