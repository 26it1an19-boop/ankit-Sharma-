const grid = document.getElementById("parkingGrid");
const states = ["free","busy","busy","free","reserved","busy","free","busy","free","busy","busy","free"];

function buildParking(){
  grid.innerHTML = "";
  for(let i=1;i<=48;i++){
    const el=document.createElement("div");
    const state=states[(i-1)%states.length];
    el.className=`slot ${state}`;
    el.textContent=`P-${String(i).padStart(2,"0")}`;
    el.title=state.toUpperCase();
    grid.appendChild(el);
  }
}
buildParking();

function scrollToSection(id){ document.getElementById(id).scrollIntoView({behavior:"smooth"}); }

async function refreshStatus(){
  try{
    const response=await fetch("/api/status",{cache:"no-store"});
    if(!response.ok) throw new Error("API error");
    const d=await response.json();
    document.getElementById("total").textContent=d.total;
    document.getElementById("available").textContent=d.available;
    document.getElementById("occupied").textContent=d.occupied;
    document.getElementById("occupancyValue").textContent=d.occupancy+"%";
    document.getElementById("avgTime").textContent=d.avgTime;
    document.getElementById("revenue").textContent=Number(d.revenue).toLocaleString("en-IN");
  }catch(e){
    console.log("Using demo values:", e.message);
  }
  document.getElementById("lastUpdate").textContent=new Date().toLocaleTimeString();
}
refreshStatus();
setInterval(refreshStatus,5000);
