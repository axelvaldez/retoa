const code = document.querySelector("#code");
const run = document.querySelector("#run");
const toggleGuides = document.querySelector("#guides");
let commands = [];
let showGuides = true;

function setup() {
  // setup drawing env
  let canvas = createCanvas(800, 800);
  translate(width/2, height/2);
  canvas.parent('sketch');
  background(255);
  stroke(0);
  strokeWeight(2);
  angleMode(DEGREES);
  
  // create turtle
  turtle = new Turtle(width/2, height/2);
  
  // get commands and execute them
  go();
}

function go(){
  // parse commands from textarea
  commands = code.value.split("\n");
  commands.pop();
  // send pairs to drawing
  goTurtle(commands);
}

run.addEventListener("click", (e) =>{
  e.preventDefault();
  go();
});

code.addEventListener("keyup", (e) => {
  if (e.keyCode == 13){
    go();
  }
});

toggleGuides.addEventListener("click", (e) => {
  showGuides = !showGuides;
  go();
});

function drawGuides(){
  if(showGuides){
    noFill();
    stroke(255,0,0,64);
    circle(0,0,10);
    stroke(255,0,0,64);
    line(0, 0, 800, 0);
    strokeWeight(2);
  }
}

function goTurtle(comms){
  resetMatrix();
  translate(width/2, height/2);
  background(255);
  stroke(0);
  for(let i = 0; i < comms.length; i++){
    const pair = comms[i].split("-");
    let arg = pair[1];
    if(arg) arg = parseInt(arg.trim());
    const cmd = pair[0].trim();
    if(cmd === "REP"){
      let j = i + 1;
      // create repeat array
      let repCommands = [];
      
      while(j < comms.length){
        if(comms[j].split("-")[0] === "FIN"){
          i = j;
          break;
        }
        repCommands.push(comms[j]);
        if(j + 1 < comms.length){
          j++;
        }
        else{
          break;
        }
      }
      // iterate trough array, executing
      for(let k = 0; k < arg; k++){
        for(let l = 0; l < repCommands.length; l++){
          const pair = repCommands[l].split("-");
          let arg = pair[1];
          if(arg) arg = parseInt(arg.trim());
          const cmd = pair[0].trim();
          if(allowedCommands.includes(cmd)){
            execute[cmd](arg);
          }
        }
      }
    }
    else if(allowedCommands.includes(cmd)){
      execute[cmd](arg);
    }
  }
  drawGuides();
}