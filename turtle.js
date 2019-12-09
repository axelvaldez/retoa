class Turtle{
  constructor(x, y){
    translate(x, y);
  }
  
  movDo(arg){
    translate(arg, 0);
  }
  
  revDo(arg){
    translate(-arg, 0);
  }
  
  linDo(arg){
    line(0, 0, arg, 0)
    translate(arg, 0);
  }
  
  derDo(arg){
    rotate(arg);
  }
  
  izqDo(arg){
    rotate(-arg);
  }
  
  colDo(arg){
    switch(arg){
      case 0: stroke(0); break;         //black
      case 1: stroke(255, 0, 0); break; //red
      case 2: stroke(0, 255, 0); break; //green
      case 3: stroke(0, 0, 255); break; //blue
    }
  }
}

const execute = {
  "lin": function(arg){
    turtle.linDo(arg);
  },
  "mov": function(arg){
    turtle.movDo(arg);
  },
  "rev": function(arg){
    turtle.revDo(arg);
  },
  "der": function(arg){
    turtle.derDo(arg);
  },
  "izq": function(arg){
    turtle.izqDo(arg);
  },
  "col": function(arg){
    turtle.colDo(arg);
  }
}

allowedCommands = ["lin", "mov", "rev", "der", "izq", "col"];