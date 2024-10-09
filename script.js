let fields = [
  null, null, null,
  null, null, null,
  null, null, null
];

let currentPlayer = 'circle'; // Der aktuelle Spieler, startet mit "circle"

function init() {
  render(); // Die Funktion aufrufen, um die Tabelle zu generieren
}

function render() {
  let contentRef = document.getElementById('content');
  let tableHTML = '<table>'; // HTML-Code für die 3x3 Tabelle generieren

  for (let row = 0; row < 3; row++) {
    tableHTML += '<tr>'; // Neue Zeile in der Tabelle

    for (let col = 0; col < 3; col++) {
      let index = row * 3 + col; // Berechnung des aktuellen Index im `fields`-Array
      let symbol = '';
      let colorStyle = '';
      
      if (fields[index] === 'cross') {
        symbol = createAnimatedCross(); // Cross-SVG zurückgeben
        colorStyle = 'style="color: #FEC000;"';
      } else if (fields[index] === 'circle') {
        symbol = createAnimatedCircle(); // Circle-SVG zurückgeben
        colorStyle = 'style="color: #0DA3DA;"';
      }

      // HTML für jede Zelle mit onclick-Event
      tableHTML += `<td id="cell-${row}-${col}" ${colorStyle} onclick="handleClick(${index})">${symbol}</td>`;
    }

    tableHTML += '</tr>';
  }
  
  tableHTML += '</table>';
  contentRef.innerHTML = tableHTML; // Tabelle in das div mit der ID 'content' rendern
}

function restartGame(){

fields = [
    null, null, null,
    null, null, null,
    null, null, null
  ];

  render();

}

// Diese Funktion wird aufgerufen, wenn auf ein <td> geklickt wird
function handleClick(index) {
  if (fields[index] === null) {
    // Abwechselnd "circle" oder "cross" in das fields-Array einfügen
    fields[index] = currentPlayer;

    // Passendes SVG in die Zelle einfügen
    let cell = document.getElementById(`cell-${Math.floor(index / 3)}-${index % 3}`);
    if (currentPlayer === 'circle') {
      cell.innerHTML = createAnimatedCircle();
    } else {
      cell.innerHTML = createAnimatedCross();
    }

    // onclick entfernen, damit nicht mehr darauf geklickt werden kann
    cell.onclick = null;

    // Spieler wechseln
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

    // Überprüfen, ob ein Spieler gewonnen hat
    checkForWin();
  }
}

// Überprüfe, ob ein Spieler gewonnen hat
function checkForWin() {
  const winConditions = [
    [0, 1, 2], // Erste Zeile
    [3, 4, 5], // Zweite Zeile
    [6, 7, 8], // Dritte Zeile
    [0, 3, 6], // Erste Spalte
    [1, 4, 7], // Zweite Spalte
    [2, 5, 8], // Dritte Spalte
    [0, 4, 8], // Diagonale von links oben nach rechts unten
    [2, 4, 6]  // Diagonale von rechts oben nach links unten
  ];

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(condition); // Wenn gewonnen, die Gewinnlinie zeichnen
      return; // Beende die Funktion, wenn ein Gewinner gefunden wurde
    }
  }
}

function drawWinningLine(condition) {
  const line = document.createElement('div');
  line.style.position = 'absolute'; // Absolut positionieren
  line.style.backgroundColor = 'white';
  line.style.zIndex = '10'; // Über den Zellen

  // Größe jeder Zelle
  const cellSize = 100; // Größe jeder Zelle (width und height)
  const lineThickness = 5; // Dicke der Linie

  // Berechnung der Position und Größe der Gewinnlinie
  if (condition[0] === 0 && condition[1] === 1 && condition[2] === 2) { // Erste Zeile
    line.style.top = `${cellSize * 0.5 - lineThickness / 2}px`; // In der Mitte der Zeile
    line.style.left = '0px';
    line.style.width = `${cellSize * 3}px`; // Länge der Linie
    line.style.height = `${lineThickness}px`; // Dicke der Linie
  } else if (condition[0] === 3 && condition[1] === 4 && condition[2] === 5) { // Zweite Zeile
    line.style.top = `${cellSize * 1.5 - lineThickness / 2}px`; // 1.5 Zellenhöhe
    line.style.left = '0px';
    line.style.width = `${cellSize * 3}px`;
    line.style.height = `${lineThickness}px`;
  } else if (condition[0] === 6 && condition[1] === 7 && condition[2] === 8) { // Dritte Zeile
    line.style.top = `${cellSize * 2.5 - lineThickness / 2}px`; // 2.5 Zellenhöhe
    line.style.left = '0px';
    line.style.width = `${cellSize * 3}px`;
    line.style.height = `${lineThickness}px`;
  } else if (condition[0] === 0 && condition[1] === 3 && condition[2] === 6) { // Erste Spalte
    line.style.top = '0px';
    line.style.left = `${cellSize * 0.5 - lineThickness / 2}px`; // Mitte der ersten Zelle
    line.style.width = `${lineThickness}px`; // Dicke der Linie
    line.style.height = `${cellSize * 3}px`; // Länge der Linie
  } else if (condition[0] === 1 && condition[1] === 4 && condition[2] === 7) { // Zweite Spalte
    line.style.top = '0px';
    line.style.left = `${cellSize * 1.5 - lineThickness / 2}px`; // Mitte der zweiten Zelle
    line.style.width = `${lineThickness}px`;
    line.style.height = `${cellSize * 3}px`;
  } else if (condition[0] === 2 && condition[1] === 5 && condition[2] === 8) { // Dritte Spalte
    line.style.top = '0px';
    line.style.left = `${cellSize * 2.5 - lineThickness / 2}px`; // Mitte der dritten Zelle
    line.style.width = `${lineThickness}px`;
    line.style.height = `${cellSize * 3}px`;
  } else if (condition[0] === 0 && condition[1] === 4 && condition[2] === 8) { // Diagonale von links oben nach rechts unten
    line.style.top = '0px'; // Oben im Container
    line.style.left = '0px'; // Oben links
    line.style.width = `${Math.sqrt(2) * cellSize * 3}px`; // Länge der Diagonalen
    line.style.height = `${lineThickness}px`; // Dicke der Linie
    line.style.transform = 'rotate(45deg)'; // Diagonale drehen
    line.style.transformOrigin = '0 0'; // Ursprung für die Drehung
  } else if (condition[0] === 2 && condition[1] === 4 && condition[2] === 6) { // Diagonale von rechts oben nach links unten
    line.style.top = '0px'; // Oben im Container
    line.style.left = `${cellSize * 3}px`; // Rechts oben
    line.style.width = `${Math.sqrt(2) * cellSize * 3}px`; // Länge der Diagonalen
    line.style.height = `${lineThickness}px `; // Dicke der Linie
    line.style.transform = 'rotate(-45deg)'; // Diagonale drehen
    line.style.transformOrigin = '0 0'; // Ursprung für die Drehung
  }

  const contentRef = document.getElementById('content');
  contentRef.appendChild(line); // Füge die Linie zum Container hinzu
}


function createAnimatedCircle() {
  const circleSVG = `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="30" fill="none" stroke="#0DA3DA" stroke-width="4" 
              stroke-dasharray="188.5" stroke-dashoffset="188.5">
        <animate attributeName="stroke-dashoffset" from="188.5" to="0" dur="800ms" fill="freeze" />
      </circle>
    </svg>
  `;
  return circleSVG;
}



function createAnimatedCross() {
  const crossSVG = `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="10" x2="60" y2="60" stroke="#FEC000" stroke-width="5"
              stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" from="70" to="0" dur="800ms" fill="freeze" />
        </line>
        <line x1="60" y1="10" x2="10" y2="60" stroke="#FEC000" stroke-width="5"
              stroke-dasharray="70" stroke-dashoffset="70">
            <animate attributeName="stroke-dashoffset" from="70" to="0" dur="800ms" fill="freeze" />
        </line>
    </svg>
  `;
  return crossSVG;
}

init();
