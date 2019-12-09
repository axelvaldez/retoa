const code = document.querySelector("#code");
const run = document.querySelector("#run");
let commands = [];

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
  
  //parse into command and argument pairs
  let pairs = [];
  for(let i = 0; i < commands.length; i++){
    pairs = commands[i].split("-");
  }
  
  // send pairs to drawing
  goTurtle(pairs);
  
}

run.addEventListener("click", (e) =>{
  e.preventDefault();
  go();
});

code.addEventListener("keyup", (e) => {
  if (event.keyCode == 13){
    go();
  }
});

function goTurtle(pairs){
  resetMatrix();
  background(255);
  stroke(0);
  for(let i = 0; i < commands.length; i++){
    const pair = commands[i].split("-");
    let arg = pair[1];
    if(arg) arg = parseInt(arg.trim());
    const cmd = pair[0].trim();
    if(cmd === "REP"){
      let j = i + 1;
      // create repeat array
      let repCommands = [];
      
      while(j < commands.length){
        if(commands[j].split("-")[0] === "FIN"){
          i = j;
          break;
        }
        repCommands.push(commands[j]);
        if(j + 1 < commands.length){
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
}