const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#000"
const CANVAS_SIZE = "700"
// const modeFill = "FILL"; 
// const modeFaint = "Faint";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting () {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
         ctx.beginPath();
         ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function handleColorCilck(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}


function handleModeChange(){
    if (filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "FAINT";
    }
}
//  function handleModeChange(event){
//      const mode = event.target
//      if (mode.innerText === modeFill) {
//          mode.innerText = modeFaint;
//      } else {
//          mode.innerText = modeFill;
//      }
//      
//  }

function handleCanvasClick() {
    if (filling === true) { 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
   
}

function handleCM(event){
    event.preventDefault(); //우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL(); //image 포맷 변환
    const link = document.createElement("a"); //밑에의 이유로 a를 사용.
    link.href = image;
    link.download = "mypainting"; //download는 a에 있는 attribute 중 하나. <a href=""> 대신 <a download 를 쓸 수 있다. 그러면 링크된 곳으로 가는 것이 아니라 다운로드 받는다.
    link.click();
}

if (canvas) { 
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}



Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorCilck)
    );

if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(mode) {
    mode.addEventListener("click", handleModeChange)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}
