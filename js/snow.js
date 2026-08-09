const canvas=document.getElementById("snow");
const ctx=canvas.getContext("2d");

let w,h;

function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
}

window.addEventListener("resize",resize);
resize();

const flakes=[];

for(let i=0;i<160;i++){
    flakes.push({
        x:Math.random()*w,
        y:Math.random()*h,
        r:Math.random()*2+0.5,
        s:Math.random()*1.2+0.3
    });
}

function draw(){
    ctx.clearRect(0,0,w,h);

    ctx.fillStyle="rgba(255,255,255,.85)";

    for(const f of flakes){
        ctx.beginPath();
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
        ctx.fill();

        f.y+=f.s;
        f.x+=Math.sin(f.y*0.003)*0.35;

        if(f.y>h){
            f.y=-5;
            f.x=Math.random()*w;
        }
    }

    requestAnimationFrame(draw);
}

draw();