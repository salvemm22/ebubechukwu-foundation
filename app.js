// enable reveal animation only when JS runs
document.documentElement.classList.add('js');
// mobile menu
const b=document.querySelector('.burger'),m=document.querySelector('.menu');
if(b&&m){b.addEventListener('click',()=>{b.classList.toggle('open');m.classList.toggle('open')});
 m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{b.classList.remove('open');m.classList.remove('open')}));}
// reveal on scroll

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// donation amount pickers
document.querySelectorAll('[data-donate]').forEach(box=>{
 const inp=box.querySelector('.dinput');
 box.querySelectorAll('.amt').forEach(a=>a.addEventListener('click',()=>{
  box.querySelectorAll('.amt').forEach(x=>x.classList.remove('on'));a.classList.add('on');
  if(inp&&a.dataset.v)inp.value=a.dataset.v}));
 if(inp)inp.addEventListener('input',()=>box.querySelectorAll('.amt').forEach(x=>x.classList.remove('on')));
 const go=box.querySelector('[data-go]');
 if(go)go.addEventListener('click',e=>{e.preventDefault();
  const v=(inp&&inp.value||'').replace(/[^0-9]/g,'');
  location.href='donate.html'+(v?('?amount='+v):'')+'#give'});
});
// prefill amount on donate page
const q=new URLSearchParams(location.search).get('amount');
if(q){const i=document.querySelector('#give .dinput');if(i){i.value=q;
 document.querySelectorAll('#give .amt').forEach(a=>{if(a.dataset.v===q)a.classList.add('on')})}}
// copy account number
document.querySelectorAll('[data-copy]').forEach(c=>c.addEventListener('click',()=>{
 navigator.clipboard&&navigator.clipboard.writeText(c.dataset.copy);const t=c.textContent;c.textContent='Copied ✔';setTimeout(()=>c.textContent=t,1600)}));
// netlify form success
document.querySelectorAll('form[data-netlify]').forEach(f=>f.addEventListener('submit',async e=>{
 e.preventDefault();
 try{await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()})}catch(_){}
 f.innerHTML='<div style="text-align:center;padding:30px 10px"><div style="font-size:44px">💛</div><h3 style="font-family:Playfair Display,serif;font-size:26px;margin:8px 0">Thank you!</h3><p style="color:#5d6a65">We have received your message and will reach out shortly.</p></div>'}));

// tabs (give section)
document.querySelectorAll('.tabsbox').forEach(box=>{
 box.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  box.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  box.querySelectorAll('.tabpane').forEach(x=>x.classList.remove('on'));
  t.classList.add('on');
  const p=box.querySelector('#'+t.dataset.t); if(p)p.classList.add('on');
 }));
});
