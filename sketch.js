// Data about American concerns regarding data use
const data = [
  { category: "Concerned about company use of data", percent: 81, color: [220, 53, 69] },
  { category: "Concerned about government use of data", percent: 71, color: [220, 53, 69] },
  { category: "Little/no control over company data use", percent: 73, color: [255, 193, 7] },
  { category: "Little/no control over government data use", percent: 79, color: [255, 193, 7] },
  { category: "Little/no understanding of company data use", percent: 67, color: [33, 150, 243] },
  { category: "Little/no understanding of government data use", percent: 77, color: [33, 150, 243] }
];

let barHeight = 50;
let padding = 60;
let hoveredBar = -1;

function setup() {
  createCanvas(1000, 600);
}

function draw() {
  background(245);
  
  // Title
  fill(0);
  textSize(28);
  textAlign(LEFT);
  textStyle(BOLD);
  text("American Concerns About Data Use", padding, 40);
  
  // Subtitle
  textSize(12);
  textStyle(NORMAL);
  fill(100);
  text("Percentage of Americans", padding, 65);
  
  // Draw bars
  drawBars();
  
  // Draw legend
  drawLegend();
}

function drawBars() {
  let startY = 100;
  let maxBarWidth = width - padding * 2 - 100;
  
  for (let i = 0; i < data.length; i++) {
    let y = startY + i * (barHeight + 10);
    let barWidth = (data[i].percent / 100) * maxBarWidth;
    
    // Check if mouse is over this bar
    let isHovered = (mouseY > y && mouseY < y + barHeight && 
                     mouseX > padding + 250 && mouseX < padding + 250 + barWidth);
    
    if (isHovered) {
      hoveredBar = i;
    }
    
    // Draw bar
    let [r, g, b] = data[i].color;
    if (isHovered) {
      fill(r - 20, g - 20, b - 20); // Darker on hover
      stroke(0);
      strokeWeight(2);
    } else {
      fill(r, g, b);
      stroke(0);
      strokeWeight(1);
    }
    
    rect(padding + 250, y, barWidth, barHeight);
    
    // Draw percentage text on bar
    fill(255);
    textSize(14);
    textAlign(LEFT);
    textStyle(BOLD);
    text(data[i].percent + "%", padding + 260 + barWidth, y + barHeight / 2 + 5);
    
    // Draw category label
    fill(0);
    textSize(12);
    textAlign(RIGHT);
    textStyle(NORMAL);
    text(data[i].category, padding + 240, y + barHeight / 2 + 5);
  }
  
  // Draw tooltip if hovering
  if (hoveredBar >= 0) {
    drawTooltip();
  }
  
  hoveredBar = -1; // Reset for next frame
}

function drawTooltip() {
  let tooltipText = data[hoveredBar].category + ": " + data[hoveredBar].percent + "%";
  
  textSize(13);
  textAlign(LEFT);
  textStyle(BOLD);
  
  let tooltipWidth = textWidth(tooltipText) + 20;
  let tooltipHeight = 30;
  let tooltipX = mouseX + 10;
  let tooltipY = mouseY - 35;
  
  // Draw tooltip box
  fill(0);
  stroke(255);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 5);
  
  // Draw tooltip text
  fill(255);
  text(tooltipText, tooltipX + 10, tooltipY + 20);
}

function drawLegend() {
  let legendY = height - 80;
  let legendX = padding;
  
  fill(0);
  textSize(12);
  textStyle(BOLD);
  text("Categories:", legendX, legendY);
  
  // Company concerns
  fill(220, 53, 69);
  rect(legendX, legendY + 15, 20, 20);
  fill(0);
  textSize(11);
  textStyle(NORMAL);
  text("Company Data", legendX + 30, legendY + 30);
  
  // Control concerns
  fill(255, 193, 7);
  rect(legendX + 250, legendY + 15, 20, 20);
  fill(0);
  text("Control Over Data", legendX + 280, legendY + 30);
  
  // Understanding concerns
  fill(33, 150, 243);
  rect(legendX + 520, legendY + 15, 20, 20);
  fill(0);
  text("Understanding of Data", legendX + 550, legendY + 30);
}
