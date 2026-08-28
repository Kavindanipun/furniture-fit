let unit="in";
const $=id=>document.getElementById(id);
document.querySelectorAll(".unit").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".unit").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); unit=btn.dataset.unit;
  const vals=unit==="in"?["84","34","38","36","80","1","144","120"]:["213","86","97","91","203","2.5","366","305"];
  ["fw","fh","fd","dw","dh","clearance","rl","rw"].forEach((id,i)=>$(id).placeholder=vals[i]);
  $("clearance").value=unit==="in"?"1":"2.5";
}));
$("fitForm").addEventListener("submit",e=>{
 e.preventDefault();
 const n=id=>parseFloat($(id).value);
 const fw=n("fw"),fh=n("fh"),fd=n("fd"),dw=n("dw"),dh=n("dh"),rl=n("rl"),rw=n("rw"),c=n("clearance")||0,qty=n("qty")||1;
 const roomFit=(fw+c*2<=rl&&fd+c*2<=rw)||(fd+c*2<=rl&&fw+c*2<=rw);
 // Simple rectangular orientation screening: choose two furniture dimensions as opening face.
 const orientations=[[fw,fh],[fd,fh],[fw,fd]];
 const doorFit=orientations.some(([a,b])=>(a+c<=dw&&b+c<=dh)||(b+c<=dw&&a+c<=dh));
 const close=orientations.some(([a,b])=>(a<=dw&&b<=dh)||(b<=dw&&a<=dh));
 const r=$("result"); r.hidden=false; r.className="result";
 let title,body;
 if(roomFit&&doorFit){r.classList.add("good");title="✓ The basic measurements look promising";body=`The furniture fits the room footprint and at least one simple doorway orientation with your ${c} ${unit} clearance setting. Still measure hallways, corners, stairs and packaging before delivery.`}
 else if(roomFit&&close){r.classList.add("warn");title="⚠ It is a tight / manual-check fit";body=`The basic dimensions can pass the doorway without your requested clearance, but the route may be too tight in practice. Check turning space and ask the retailer or mover to confirm.`}
 else if(!roomFit){r.classList.add("bad");title="✕ The destination room is the first problem";body=`With the dimensions entered, the furniture footprint does not fit inside the room in either simple orientation${qty>1?" (and you entered "+qty+" items)":""}. Recheck usable room dimensions and furniture size.`}
 else {r.classList.add("bad");title="✕ No simple doorway orientation fits";body=`The furniture fits the room, but none of the three basic rectangular faces fits through the entered clear doorway. A real item may sometimes pivot differently, so check the full geometry with the seller or mover before assuming delivery is impossible.`}
 r.innerHTML=`<h3>${title}</h3><p>${body}</p><p><strong>Your check:</strong> furniture ${fw} × ${fh} × ${fd} ${unit}; doorway ${dw} × ${dh} ${unit}; room ${rl} × ${rw} ${unit}.</p>`;
 r.scrollIntoView({behavior:"smooth",block:"center"});
});
$("year").textContent=new Date().getFullYear();