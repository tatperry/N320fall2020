// 
// 
// Tatiana Perry
// NEWM-N320 - Project 1
// Tic Tac Toe Board Game 
// October 30, 2020
// 
// 
// 
// will always start wit "X" 
let isCrossTurn = true;
// will be false when it is "O" turn
let isOver = false;
// will prompt the user to hit the RESET button when game is over
document.getElementById("reset-btn").addEventListener("click", resetGame);

// set up for the board game 
// "X" and "O" will slowly fade away when game is reset or when the page is refreshed
// always will start with "X" 
function resetGame(){
    isCrossTurn = true;
    isOver = false;
    Array.from(document.getElementsByClassName("used")).map(it=>it.classList.remove("used"));
    let g = Array.from(document.getElementsByTagName("g"));
    g.map(it=>it.classList.remove("circle"));
    g.map(it=>it.classList.remove("cross"));
    Array.from(document.getElementsByClassName("cross")).map(it=>TweenMax.to(it,1,{opacity:0}));
    Array.from(document.getElementsByClassName("circle")).map(it=>TweenMax.to(it,1,{opacity:0}));
    document.getElementById("turn").innerHTML = "cross' turn"
}
// Board game set up
// will call on the svg animations of the "X" and "O" when the player hits where they want to play first
// The pieces are set at 0 opacity, when the player hits any sqare the "X" or "O" will fade in to wherever that player played
function createField(){
    const svg = createElem("svg");
    svg.setAttribute("viewBox", "-10 -10 190 190");
    svg.setAttribute("width", "500");
    svg.setAttribute("id", "grid");
    const grid = createGrid()
    let squares = createSquares();
    squares = Array.from(squares);
    squares.map(it=> svg.appendChild(it));
    svg.appendChild(grid);
    document.querySelector(".wrapper").appendChild(svg);
}
// returning the function of the svg 
function createElem(elem){
    return document.createElementNS("http://www.w3.org/2000/svg", elem);
}
// Board game grid setup 
// The lines of the board game 
function createGrid(){
    const g = createElem("g");
    const path = createElem("path");
    const d = `M55 0L55 170Z M115 0L115 170Z M0 55L 170 55Z M0 115L 170 115Z`;
    path.setAttribute("d", d);
    path.setAttribute("stroke-width", "8");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-linecap", "round");
    g.appendChild(path);
    return g;
}
// functions of when and where someone playes or clicks a certain sqare
// in oder to win you need 3 pices in a row 
function createSquares(){
    let squares = [];
    for(i=0;i<3;i++){
        for(j=0;j<3;j++){
            const g = createElem("g");
            const path = createElem("path");
            const d = `M${i*50+i*10} ${j*50+j*10} L ${(i+1)*50+i*10} ${j*50+j*10} L ${(i+1)*50+i*10} ${(j+1)*50+j*10} L ${i*50+i*10} ${(j+1)*50+j*10} L ${i*50+i*10} ${j*50+j*10}`;
            path.setAttribute("d", d);
            path.setAttribute("class", "square");
            path.setAttribute("stroke-width", "0");
            path.setAttribute("fill", "transparent");
            path.addEventListener("click", placeItem);

 // CROSS STYLES
            const cross = createElem("path");
            const d2 = `M${i*50+i*10+10} ${j*50+j*10+10} L ${(i+1)*50+i*10-10} ${(j+1)*50+j*10-10} Z M ${(i+1)*50+i*10-10} ${j*50+j*10+10} L ${i*50+i*10+10} ${(j+1)*50+j*10-10} Z`;
            cross.setAttribute("d", d2);
            cross.setAttribute("class", "cross");
            cross.setAttribute("stroke-width", "2");
            cross.setAttribute("stroke", "white");
            cross.setAttribute("fill", "transparent");

 // CIRCLE STYLES

            const circle = createElem("circle")
            circle.setAttribute("cx", `${25+i*60}`);
            circle.setAttribute("cy", `${25+j*60}`);
            circle.setAttribute("r", "15");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("stroke", "black");
            circle.setAttribute("fill", "transparent");
            circle.setAttribute("class", "circle");
            g.appendChild(circle);
            g.appendChild(cross);
            g.appendChild(path);
            g.setAttribute("value", `${i}${j}`);
            squares.push(g);
        }
    }
    return squares;
}
// All alerts that will come up  MAY POSSIBLY BE GETTING RID OF THIS

// If someone places one of their pieces on a place that someones has already played then there will be an alert saying "pick an empty sqare"/ this will also accure if the player does not click on an actual square
function placeItem(e){
    if(!isOver)
    {
        const event = e.target;
        let turn = (isCrossTurn) ? "circle's" : "cross'"
        document.getElementById("turn").innerHTML = `${turn} turn`;
        if(event.classList.contains("used"))
        {
            alert("Pick an empty sqaure");
        }
        else
        {
            const g = event.parentElement;
            const elem = Array.from(g.children);
            let target = (isCrossTurn) ? 'cross' : 'circle';
            const item = elem.filter(it=>it.classList.contains(target));
            g.classList.add(target);
            TweenMax.to(item, 1, {opacity:1});
            event.classList.add("used")
            isCrossTurn = !isCrossTurn;
            let win = [
                ["00", "01", "02"],
                ["10", "11", "12"],
                ["20", "21", "22"],
                ["00", "10", "20"],
                ["01","11","21"],
                ["02","12","22"],
                ["00","11","22"],
                ["02","11","20"]
            ]
            let gs = Array.from(document.getElementsByTagName("g"));
            let elems = gs.filter(it=> it.classList.contains(target));
            elems = elems.map(it=>it.attributes.value.nodeValue);
            let winning = (win.map(it=>(it).filter(it=>elems.includes(it)))).filter(it=>it.length===3);
            const used = document.getElementsByClassName("used");
            if(winning.length!==0)
            // alert on the header for whoever wins and to hit the reset button on the bottom
            {
                isOver = !isOver;
                document.getElementById("turn").innerHTML = `${target} wins, reset the game`;
            } 
            else if(used.length===9)
            // alert if it is a draw and no one wins and to hit the reset button
            {
                // alert('outcome is a draw');
                document.getElementById("turn").innerHTML = "It's a draw reset the game";
                isOver = !isOver;
            }
        }
    }
    else
    {
        // alert("press the reset button");
    }
}

createField();