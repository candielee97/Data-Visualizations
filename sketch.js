// Data about American concerns regarding data use
const data = [
  { category: "Company use of data", percent: 81, type: "Concerned" },
  { category: "Government use of data", percent: 71, type: "Concerned" },
  { category: "Company data use", percent: 73, type: "Control" },
  { category: "Government data use", percent: 79, type: "Control" },
  { category: "Company data use", percent: 67, type: "Understanding" },
  { category: "Government data use", percent: 77, type: "Understanding" }
];

const typeColors = {
  "Concerned": [220, 53, 69],
  "Control": [255, 193, 7],
  "Understanding": [33, 150, 243]
};

const typeLabels = {
  "Concerned": "Concerned about...",
  "Control": "Little/no control over...",
  "Understanding": "Little/no understanding of..."
};

let hoveredBar = -1;

function setup() {
  createCanvas(900, 550);
}

function draw() {
  background(255);
  
  // Title
  fill(20);
  textSize(32);
  textAlign(LEFT);
  textStyle(BOLD);
  text("American Data Privacy Concerns", 40, 50);
  
  // Draw bars
  drawBars();
  
  // Draw tooltip if hovering
  if (hoveredBar >= 0) {
    drawTooltip();
  }
  
  hoveredBar = -1;
}

function drawBars() {
  let startY = 120;
  let barSpacing = 80;
  let maxBarWidth = 600;
  let padding = 40;
  
  for (let i = 0; i < data.length; i++) {
    let y = startY + i * barSpacing;
    let barWidth = (data[i].percent / 100) * maxBarWidth;
    let barX = padding + 150;
    
    // Check if mouse is over this bar
    let isHovered = (mouseY > y - 15 && mouseY < y + 20 && 
                     mouseX > barX && mouseX < barX + barWidth);
    
    if (isHovered) {
      hoveredBar = i;
    }
    
    // Draw bar
    let color = typeColors[data[i].type];
    if (isHovered) {
      fill(color[0] - 30, color[1] - 30, color[2] - 30);
      stroke(0);
      strokeWeight(2);
    } else {
      fill(color[0], color[1], color[2]);
      noStroke();
    }
    
    rect(barX, y - 15, barWidth, 30, 4);
    
    // Draw percentage text on bar
    fill(255);
    textSize(13);
    textAlign(LEFT);
    textStyle(BOLD);
    text(data[i].percent + "%", barX + barWidth + 12, y + 5);
    
    // Draw category label
    fill(80);
    textSize(12);
    textAlign(RIGHT);
    textStyle(NORMAL);
    text(data[i].category, barX - 15, y + 5);
  }
}

function drawTooltip() {
  let item = data[hoveredBar];
  let tooltipText = typeLabels[item.type] + " " + item.category + ": " + item.percent + "%";
  
  textSize(12);
  textAlign(LEFT);
  textStyle(NORMAL);
  
  let tooltipWidth = textWidth(tooltipText) + 20;
  let tooltipHeight = 28;
  let tooltipX = mouseX + 12;
  let tooltipY = mouseY - 40;
  
  // Draw tooltip box
  fill(50);
  stroke(200);
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4);
  
  // Draw tooltip text
  fill(255);
  text(tooltipText, tooltipX + 10, tooltipY + 19);
}
