const canvas = document.getElementById('canvas');
const clear = document.querySelector("#clear");
const div = document.getElementById('canvas-div');

// Context for the canvas for 2 dimensional operations 
const ctx = canvas.getContext('2d'); 

let coord = {x:0 , y:0};  
 
let paint = false;

resize();
window.addEventListener('resize',resize);
div.addEventListener('resize',resize);

//set events
canvas.addEventListener('mousedown',startPainting);
canvas.addEventListener('mouseup',stopPainting);
canvas.addEventListener('mousemove',sketch);
    
function resize(){ 
  canvas.width = div.clientWidth; 
  canvas.height = div.clientHeight;
  console.log("div= "+ div.clientHeight, div.clientWidth); 
} 
    
function getPosition(event){ 
  var rect= canvas.getBoundingClientRect();
  //rect.x, rect.y gives position of canvas wrt browser size
  coord.x = event.clientX-rect.x; 
  coord.y = event.clientY-rect.y; 
} 
  
function startPainting(event){ 
  paint = true; 
  getPosition(event);
  console.log("start="+ coord.x,coord.y);
  //console.log(event.x,event.y);
} 

function stopPainting(){ 
  paint = false;
  console.log("stop");
  console.log("end= "+ coord.x,coord.y);
  ctx.beginPath(); 
} 
    
function sketch(event){ 
  //if (!paint) return; 
  if(event.buttons != 1) return;

  ctx.lineWidth = 5; 
  ctx.lineCap = 'round'; 
  ctx.strokeStyle = 'black'; 
      
  // The position of the cursor 
  // gets updated as we move the 
  // mouse around. 
  getPosition(event); 
   
  // A line is traced from start 
  // coordinate to this coordinate 
  ctx.lineTo(coord.x , coord.y);
    
  // Draws the line.
  ctx.stroke(); 
}

clear.addEventListener("click",function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})