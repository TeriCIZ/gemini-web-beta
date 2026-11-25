{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const top=document.querySelector('.top'),b=document.querySelector('.burger'),bar=document.getElementById('progress');
if(b)b.addEventListener('click',()=>{const o=top.classList.toggle('open');b.setAttribute('aria-expanded',o);b.textContent=o?L.close:L.menu});
// progress bar, header shadow, photo parallax
const bands=[...document.querySelectorAll('.photoband img')];
let ticking=false;
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 if(bar)bar.style.transform=`scaleX(${h>0?y/h:0})`;top.classList.toggle('scrolled',y>8);
 if(!RM)for(const im of bands){const r=im.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)continue;
  const p=(r.top+r.height/2-innerHeight/2)/innerHeight;im.style.transform=`translateY(${p*-6}%) scale(${1.04+Math.abs(p)*.04})`}
 ticking=false}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(onScroll)}},{passive:true});onScroll();
// reveal + counters
const count=el=>{const n=+el.dataset.count;if(RM||!n)return;const t0=performance.now(),d=1400;
 const step=t=>{const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);el.textContent=Math.round(n*e);if(k<1)requestAnimationFrame(step)};el.textContent='0';requestAnimationFrame(step)};
const io=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;e.target.classList.add('in');
 e.target.querySelectorAll('[data-count]').forEach(count);io.unobserve(e.target)}},{threshold:.18,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// rotating wireframe globe
const g=document.getElementById('globe');
if(g){const NS='http://www.w3.org/2000/svg',R=290,C=300,M=9,els=[];
 const mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);e.setAttribute('fill','none');e.setAttribute('stroke','#fff');g.appendChild(e);return e};
 mk('circle',{cx:C,cy:C,r:R,'stroke-width':1.6});
 [-60,-30,0,30,60].forEach(lat=>{const yy=C-R*Math.sin(lat*Math.PI/180),w=R*Math.cos(lat*Math.PI/180);mk('line',{x1:C-w,x2:C+w,y1:yy,y2:yy,'stroke-width':1.1})});
 for(let i=0;i<M;i++)els.push(mk('ellipse',{cx:C,cy:C,rx:1,ry:R,'stroke-width':1.1}));
 const red=mk('ellipse',{cx:C,cy:C,rx:1,ry:R,'stroke-width':2.4});red.setAttribute('stroke','#DF2A19');
 const draw=t=>{const a=t/9000;els.forEach((e,i)=>{const th=a+i*Math.PI/M;const s=Math.sin(th);e.setAttribute('rx',Math.abs(R*s).toFixed(1));e.setAttribute('stroke-opacity',(.35+.65*Math.abs(Math.cos(th))).toFixed(2))});
  const th=a*1.0+.4,s=Math.cos(th);red.setAttribute('rx',Math.abs(R*Math.sin(th)).toFixed(1));red.setAttribute('stroke-opacity',s>0?.95:.25);
  if(!RM)requestAnimationFrame(draw)};requestAnimationFrame(draw)}
// texts by language
const HRL=document.documentElement.lang==='hr';
const L=HRL?{step:(a,b,t)=>`Korak ${a} od ${b} · ${t}`,play:'Pokreni',pause:'Pauza',
 origin:'Polazište, preuzimanje na vratima tvornice',port:p=>`Luka ${p==='Koper'?'Koper':'Rijeka'}`,portS:'Iskrcaj, rukovanje teretom i pretovar',
 air:'Zračna luka dolaska',airS:'Zračni prijevoz, ekspres ili čarter',rail:'Željeznički terminal',railEU:'Od vrata do vrata željeznicom',railV:p=>`Željeznička veza preko Luke ${p}`,
 road:'Na cesti',roadEU:'Puni ili djelomični kamion',roadV:p=>`Kamionska veza preko Luke ${p}`,cdoc:'Carina i dokumenti',cg:'Carinjenje – Gemini',
 cEU:'Tranzit i fiskalno carinjenje po potrebi',cX:'Uvozna deklaracija, tranzit T1 ili fiskalno carinjenje',onward:'Dalje cestom ili željeznicom, dostava od vrata do vrata',d2d:'Dostava od vrata do vrata',
 gw:p=>`Predložena ulazna luka: Luka ${p}`,
 notes:{Dangerous:'Dokumenti i provjere ADR, IMO i RID',Food:'Fitosanitarni, zdravstveni i veterinarski certifikati','Out-of-gauge':'Posebna ruta, dozvole i pretovar',Bulk:'Rukovanje rasutim teretom i skladištenje u luci',General:'Po potrebi skladištenje u našem carinskom skladištu'},
 enq:(f,t,m,c)=>`Upit za pošiljku\nOdakle: ${f}\nKamo: ${t}\nPrijevoz: ${m}\nTeret: ${c}\n\nPojedinosti (težina, volumen, datumi): `,enqS:'Upit za pošiljku',
 fill:'Molimo ispunite: ',fields:{name:'ime',email:'e-pošta',subject:'predmet',message:'poruka'},sent:'Sada bi se trebao otvoriti vaš program za e-poštu. Ako se ne otvori, pišite na info@gemini.si.',menu:'Izbornik',close:'Zatvori',yes:'da',pal:n=>`${n} paleta`,qreq:'Zahtjev za ponudu',sending:'Šaljemo…',fail:to=>`Slanje nije uspjelo. Pokušajte ponovno ili pišite na ${to}.`,qok:'Hvala, vaš zahtjev je poslan.',qokp:'Naš prodajni tim javit će vam se radnim danom, obično isti dan.',cok:'Hvala, vaša poruka je poslana.',cokp:'Odgovaramo radnim danom, obično isti dan.'}
:{step:(a,b,t)=>`Step ${a} of ${b} · ${t}`,play:'Play',pause:'Pause',
 origin:'Origin, pick-up at the factory gate',port:p=>`Port of ${p}`,portS:'Unloading, cargo handling and preloading',
 air:'Airport of arrival',airS:'Air freight, express or charter',rail:'Rail terminal',railEU:'Door-to-door by rail',railV:p=>`Rail connection via the Port of ${p}`,
 road:'On the road',roadEU:'Full or part truckload',roadV:p=>`Truck connection via the Port of ${p}`,cdoc:'Customs and documents',cg:'Customs clearance by Gemini',
 cEU:'Transit and fiscal clearance where needed',cX:'Import declaration, T1 transit or fiscal clearance',onward:'Onward by road or rail, door-to-door delivery',d2d:'Door-to-door delivery',
 gw:p=>`Suggested gateway: Port of ${p}`,
 notes:{Dangerous:'ADR, IMO and RID documents and checks',Food:'Phytosanitary, health and veterinary certificates','Out-of-gauge':'Special routing, permits and preloading',Bulk:'Bulk handling and storage at the port',General:'Storage in our customs bonded warehouse if needed'},
 enq:(f,t,m,c)=>`Shipment enquiry\nFrom: ${f}\nTo: ${t}\nTransport: ${m}\nCargo: ${c}\n\nDetails (weight, volume, dates): `,enqS:'Shipment enquiry',
 fill:'Please fill in: ',fields:{name:'name',email:'email',subject:'subject',message:'message'},sent:"Your email app should open now. If it doesn't, write to info@gemini.si.",menu:'Menu',close:'Close',yes:'yes',pal:n=>`${n} pallets`,qreq:'Quote request',sending:'Sending…',fail:to=>`Your message couldn't be sent. Try again or write to ${to}.`,qok:'Thank you, your request has been sent.',qokp:'Our sales team will get back to you on a working day, usually the same day.',cok:'Thank you, your message has been sent.',cokp:'We reply on working days, usually the same day.'};
// interactive supply chain
const cw=document.querySelector('.chain-wrap');
if(cw){const data=JSON.parse(document.getElementById('chain-data').textContent),nodes=[...cw.querySelectorAll('.node')],line=cw.querySelector('.cline'),
 num=cw.querySelector('.cp-num'),h=cw.querySelector('.cp-h'),ul=cw.querySelector('.cp-b'),txt=cw.querySelector('.cp-text'),play=cw.querySelector('[data-a=play]');
 if(!line.querySelector('.fill'))line.insertAdjacentHTML('afterbegin','<span class="fill"></span>');
 let cur=0,timer=null,auto=!RM;
 const show=i=>{cur=(i+data.length)%data.length;const d=data[cur];
  nodes.forEach((n,k)=>{n.setAttribute('aria-pressed',k===cur);n.parentElement.classList.toggle('done',k<cur)});line.style.setProperty('--p',cur/(data.length-1));
  num.textContent=L.step(cur+1,data.length,d.t);h.textContent=d.h;ul.replaceChildren(...d.b.map(x=>{const li=document.createElement('li');li.textContent=x;return li}));
  txt.classList.add('swap');void txt.offsetWidth;txt.classList.remove('swap')};
 const stop=()=>{auto=false;clearInterval(timer);play.classList.add('paused');play.setAttribute('aria-label',L.play)};
 const start=()=>{auto=true;clearInterval(timer);timer=setInterval(()=>show(cur+1),4200);play.classList.remove('paused');play.setAttribute('aria-label',L.pause)};
 nodes.forEach((n,k)=>n.addEventListener('click',()=>{stop();show(k)}));
 cw.querySelector('[data-a=prev]').addEventListener('click',()=>{stop();show(cur-1)});
 cw.querySelector('[data-a=next]').addEventListener('click',()=>{stop();show(cur+1)});
 play.addEventListener('click',()=>auto?stop():start());
 cw.querySelector('.nodes').addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();stop();show(cur+(e.key==='ArrowRight'?1:-1));nodes[cur].focus()}});
 show(0);
 if(auto){const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){setTimeout(()=>{if(auto)start()},2800);o.disconnect()}},{threshold:.3});o.observe(cw)}else stop();}
// sending: Web3Forms if a key is set, else the email app
const sendForm=async(form,subject,body,replyto,name,note,done)=>{const key=form.dataset.key,to=form.dataset.to;
 if(!key){location.href=`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;note.textContent=L.sent.replace('info@gemini.si',to);return}
 const btn=form.querySelector('[type=submit]');btn.disabled=true;const old=btn.textContent;btn.textContent=L.sending;note.classList.remove('err');note.style.color='';
 try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
   body:JSON.stringify({access_key:key,subject,from_name:'gemini.si – '+name,replyto,message:body,botcheck:''})});
  const j=await r.json().catch(()=>({}));if(!r.ok||j.success===false)throw 0;done()}
 catch(e){note.textContent=L.fail(to);note.classList.add('err');note.style.color='#DF2A19'}
 finally{btn.disabled=false;btn.textContent=old}};
const thanks=(form,h,p)=>{const d=document.createElement('div');d.className='thanks';d.setAttribute('role','status');d.tabIndex=-1;
 const b=document.createElement('b'),s=document.createElement('p');b.textContent=h;s.textContent=p;d.append(b,s);form.replaceWith(d);d.focus()};
// quote request
const qf=document.getElementById('qform');
if(qf){const tabs=[...qf.querySelectorAll('[role=tab]')],panels=[...qf.querySelectorAll('.qpanel[data-p]')],ink=qf.querySelector('.qink'),sum=document.getElementById('qsum'),note=document.getElementById('qnote');
 let cur=tabs[0].dataset.t;
 const P=()=>qf.querySelector(`.qpanel[data-p="${cur}"]`);
 const moveInk=()=>{const t=tabs.find(x=>x.dataset.t===cur);ink.style.width=t.offsetWidth+'px';ink.style.transform=`translateX(${t.offsetLeft}px)`};
 const sel=k=>{cur=k;tabs.forEach(t=>{const on=t.dataset.t===k;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1});panels.forEach(p=>p.hidden=p.dataset.p!==k);moveInk();cond();upd()};
 const cond=()=>{const p=P(),l=p.querySelector('[name=load]');const v=l&&l.value.startsWith('LCL')?'lcl':'fcl';p.querySelectorAll('[data-show]').forEach(e=>e.hidden=e.dataset.show!==v)};
 const val=n=>{const e=P().querySelector(`[name=${n}]`);return e&&!e.closest('[hidden]')?(e.type==='checkbox'?(e.checked?L.yes:''):e.tagName==='SELECT'?e.selectedOptions[0].textContent:String(e.value).trim()):''};
 const lab=e=>{const l=e.closest('label'),t=l.querySelector('.lt');return (t?t.textContent:l.textContent).replace('*','').trim()};
 const upd=()=>{const t=tabs.find(x=>x.dataset.t===cur).textContent.trim(),f=val('from'),to=val('to'),parts=[t];
  const load=val('load');if(load)parts.push(load.split(' –')[0]);
  if(cur==='sea'&&val('count')&&val('ctype'))parts.push(`${val('count')} × ${val('ctype')}`);
  if(cur==='road'&&val('pallets'))parts.push(L.pal(val('pallets')));
  if(cur==='oog'&&val('length')&&val('width')&&val('height'))parts.push(`${val('length')}×${val('width')}×${val('height')} cm`);
  if(val('weight'))parts.push(`${val('weight')} kg`);
  if(f||to)parts.push(`${f||'…'} → ${to||'…'}`);
  sum.textContent=parts.join(' · ')};
 tabs.forEach(t=>t.addEventListener('click',()=>sel(t.dataset.t)));
 qf.querySelector('[role=tablist]').addEventListener('keydown',e=>{if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;e.preventDefault();const i=tabs.findIndex(x=>x.dataset.t===cur),n=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];sel(n.dataset.t);n.focus()});
 qf.addEventListener('input',()=>{cond();upd()});qf.addEventListener('change',()=>{cond();upd()});
 addEventListener('resize',moveInk);
 qf.addEventListener('submit',e=>{e.preventDefault();
  const need=[...P().querySelectorAll('[required]'),...qf.querySelectorAll('.qcontact [required]')];
  need.forEach(x=>x.classList.toggle('bad',!x.value.trim()||(x.type==='email'&&!/^\S+@\S+\.\S+$/.test(x.value))));
  const bad=need.filter(x=>x.classList.contains('bad'));
  if(bad.length){note.textContent=L.fill+bad.map(lab).join(', ')+'.';note.classList.add('err');bad[0].focus();return}
  note.classList.remove('err');
  const t=tabs.find(x=>x.dataset.t===cur).textContent.trim(),lines=[`${L.qreq}: ${t}`,''];
  P().querySelectorAll('input,select').forEach(x=>{if(x.closest('[hidden]'))return;const v=x.type==='checkbox'?(x.checked?L.yes:''):x.tagName==='SELECT'?x.selectedOptions[0].textContent:x.value.trim();if(v)lines.push(`${lab(x)}: ${v}`)});
  lines.push('');qf.querySelectorAll('.qcontact input,.qcontact textarea').forEach(x=>{if(x.value.trim())lines.push(`${lab(x)}: ${x.value.trim()}`)});
  const em=qf.querySelector('[name=email]').value.trim(),nm=qf.querySelector('[name=name]').value.trim();
  sendForm(qf,`${L.qreq} – ${t}`,lines.join('\n'),em,nm,note,()=>thanks(qf,L.qok,L.qokp))});
 requestAnimationFrame(()=>{sel(cur)});
 if(location.hash==='#quote')setTimeout(()=>tabs[0].focus({preventScroll:true}),400);}
// team filter by office
const tf=document.querySelector('.tfilter');
if(tf){const chips=[...tf.querySelectorAll('.tchip')],groups=[...document.querySelectorAll('.tgroup')];
 tf.addEventListener('click',e=>{const c=e.target.closest('.tchip');if(!c)return;const o=c.dataset.o;
  chips.forEach(x=>x.setAttribute('aria-pressed',x===c));
  groups.forEach(g=>{let any=false;g.querySelectorAll('.person').forEach(p=>{const show=!o||p.dataset.o.split(' ').includes(o);p.hidden=!show;if(show)any=true});g.hidden=!any})});}
// map <-> office list
document.querySelectorAll('.office[data-o]').forEach(r=>{const box=r.closest('.split');if(!box)return;const pin=box.querySelector(`.office-pin[data-o="${r.dataset.o}"]`);if(!pin)return;
 const on=()=>{r.classList.add('hl');pin.classList.add('hl')},off=()=>{r.classList.remove('hl');pin.classList.remove('hl')};
 r.addEventListener('mouseenter',on);r.addEventListener('mouseleave',off);r.addEventListener('focus',on);r.addEventListener('blur',off);
 pin.style.cursor='pointer';pin.addEventListener('mouseenter',on);pin.addEventListener('mouseleave',off);pin.addEventListener('click',()=>r.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'}))});
// floating quote button
const fab=document.getElementById('fab');
if(fab){if(/(contact|inquiry)\.html$/.test(location.pathname))fab.remove();else addEventListener('scroll',()=>fab.classList.toggle('on',scrollY>innerHeight*.8),{passive:true})}
// contact form
const f=document.getElementById('enquiry');
if(f)f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f),n=document.getElementById('formnote');
 const miss=['name','email','subject','message'].filter(k=>!String(d.get(k)||'').trim());
 if(miss.length){n.textContent=L.fill+miss.map(k=>L.fields[k]).join(', ')+'.';n.style.color='#DF2A19';return}
 const body=`${d.get('message')}\n\n${d.get('name')}\n${d.get('email')}\n${d.get('phone')||''}`;
 n.style.color='';sendForm(f,String(d.get('subject')),body,String(d.get('email')),String(d.get('name')),n,()=>thanks(f,L.cok,L.cokp))});
}