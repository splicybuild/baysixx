function toast(msg){
  const n=document.getElementById('notice');
  n.textContent=msg;
  n.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast=setTimeout(()=>n.classList.remove('show'),1300);
}

const topButton=document.getElementById('topButton');
function updateTopButton(){
  const y=window.scrollY || document.documentElement.scrollTop;
  const docH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
  const nearBottom=(window.innerHeight + y) >= (docH - 80);
  topButton.classList.toggle('visible',y>420);
  topButton.classList.toggle('at-bottom',nearBottom);
}
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
window.addEventListener('scroll',updateTopButton,{passive:true});
window.addEventListener('resize',updateTopButton);
updateTopButton();


const STORE_PRODUCTS={
  "icon-black":{
    name:"ICON TEE — BLACK", price:18, state:"AVAILABLE NOW", image:"assets/available-black.png",
    desc:"A stripped-back heavyweight tee finished with the BAYSIXX B/XX chest mark. Clean front. Plain back.",
    available:true, colours:[["Black","black"]]
  },
  "icon-white":{
    name:"ICON TEE — WHITE", price:18, state:"AVAILABLE NOW", image:"assets/available-white.png",
    desc:"The clean white edition of the BAYSIXX Icon Tee, finished with the contrasting B/XX chest mark.",
    available:true, colours:[["White","white"]]
  },
  "signature-black":{
    name:"SIGNATURE GRAFFITI TEE — BLACK", price:22, state:"AVAILABLE NOW", image:"assets/available-signature.png",
    desc:"Small B/XX chest mark at the front. Full BAYSIXX signature graffiti artwork across the back.",
    available:true, colours:[["Black","black"]]
  },
  "ronin-tee":{
    name:"RONIN TEE", price:28, state:"COMING SOON", image:"assets/coming-ronin.png",
    desc:"A dark Japanese-inspired back graphic built around the lone ronin, red moon and BAYSIXX attitude.",
    available:false, colours:[["Black","black"]]
  },
  "samurai-hoodie":{
    name:"SAMURAI PRINCESS HOODIE", price:35, state:"COMING SOON", image:"assets/coming-samurai-princess.png",
    desc:"A heavyweight black hoodie carrying the Samurai Princess graphic — sharp, layered and unapologetic.",
    available:false, colours:[["Black","black"]]
  },
  "temple-bw-tee":{
    name:"TEMPLE MOON B/W TEE", price:28, state:"COMING SOON", image:"assets/coming-temple-bw.png",
    desc:"Monochrome Tokyo-inspired artwork balancing temple lines, mountain silhouettes and graphic detail.",
    available:false, colours:[["Black","black"]]
  },
  "temple-colour-hoodie":{
    name:"TEMPLE MOON COLOUR HOODIE", price:35, state:"COMING SOON", image:"assets/coming-temple-colour-fixed.png",
    desc:"The full-colour Temple Moon artwork in red, blue and black — built for the next BAYSIXX drop.",
    available:false, colours:[["Black","black"]]
  }
};

const modal=document.getElementById('productModal');
const backdrop=document.getElementById('productBackdrop');
const modalName=document.getElementById('modalProductName');
const modalState=document.getElementById('modalState');
const modalPrice=document.getElementById('modalPrice');
const modalDesc=document.getElementById('modalDesc');
const modalImage=document.getElementById('modalProductImage');
const colourOptions=document.getElementById('colourOptions');
const sizeButtons=[...document.querySelectorAll('#sizeOptions .option-btn')];
const modalAction=document.getElementById('modalAction');
const modalNote=document.getElementById('modalNote');
const notifyFields=document.getElementById('notifyFields');
const notifyEmail=document.getElementById('notifyEmail');
let activeProductKey=null, selectedSize=null, selectedColour=null;

function money(v){return '£'+Number(v).toFixed(2)}
function openProduct(key){
  const p=STORE_PRODUCTS[key]; if(!p)return;
  activeProductKey=key; selectedSize=null; selectedColour=p.colours[0][0];
  modalName.textContent=p.name;
  modalState.textContent=p.state;
  modalPrice.textContent=money(p.price);
  modalDesc.textContent=p.desc;
  modalImage.src=p.image; modalImage.alt=p.name;
  sizeButtons.forEach(b=>b.classList.remove('selected'));
  colourOptions.innerHTML=p.colours.map(([label,cls],i)=>
    `<button class="option-btn colour-swatch ${i===0?'selected':''}" data-colour="${label}">
      <span class="colour-dot ${cls==='white'?'white':''}"></span>${label}
    </button>`).join('');
  colourOptions.querySelectorAll('.option-btn').forEach(btn=>btn.addEventListener('click',()=>{
    colourOptions.querySelectorAll('.option-btn').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');selectedColour=btn.dataset.colour;
  }));
  notifyFields.style.display=p.available?'none':'block';
  modalAction.textContent=p.available?'ADD TO BAG':'NOTIFY ME';
  modalNote.textContent=p.available?'Select a size before adding to your bag.':'Choose your size and colour so we can record what you want from the next drop.';
  modal.classList.add('open');backdrop.classList.add('open');document.body.style.overflow='hidden';
}
function closeProduct(){modal.classList.remove('open');backdrop.classList.remove('open');document.body.style.overflow='';}
document.querySelectorAll('.product-trigger').forEach(card=>card.addEventListener('click',e=>{e.preventDefault();openProduct(card.dataset.product)}));
document.getElementById('modalClose').addEventListener('click',closeProduct);
backdrop.addEventListener('click',()=>{closeProduct();closeBag();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeProduct();closeBag();}});

sizeButtons.forEach(btn=>btn.addEventListener('click',()=>{
  sizeButtons.forEach(b=>b.classList.remove('selected'));
  btn.classList.add('selected');selectedSize=btn.dataset.size;
}));

const BAG_KEY='baysixxPrototypeBagV1';
const NOTIFY_KEY='baysixxPrototypeNotifyV1';
const getStored=(key)=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
const setStored=(key,val)=>localStorage.setItem(key,JSON.stringify(val));

modalAction.addEventListener('click',()=>{
  const p=STORE_PRODUCTS[activeProductKey]; if(!p)return;
  if(!selectedSize){toast('SELECT A SIZE');return;}
  if(p.available){
    const bag=getStored(BAG_KEY);
    bag.push({key:activeProductKey,name:p.name,price:p.price,image:p.image,size:selectedSize,colour:selectedColour});
    setStored(BAG_KEY,bag);updateBag();closeProduct();openBag();toast('ADDED TO BAG');
  }else{
    const email=notifyEmail.value.trim();
    if(!email || !email.includes('@')){toast('ENTER YOUR EMAIL');notifyEmail.focus();return;}
    const list=getStored(NOTIFY_KEY);
    list.push({key:activeProductKey,name:p.name,price:p.price,image:p.image,size:selectedSize,colour:selectedColour,email});
    setStored(NOTIFY_KEY,list);
    modalAction.textContent='YOU’RE ON THE LIST ✓';
    modalNote.textContent=`Saved: ${selectedColour}, ${selectedSize}. Your selection has been saved on this device for testing.`;
    setTimeout(()=>{closeProduct();modalAction.textContent='NOTIFY ME';},1200);
  }
});

const bagDrawer=document.getElementById('bagDrawer');
const bagBody=document.getElementById('bagBody');
const bagCount=document.getElementById('bagCount');
function updateBag(){
  const bag=getStored(BAG_KEY);
  bagCount.textContent=bag.length;
  if(!bag.length){bagBody.innerHTML='<div class="bag-empty">YOUR BAG IS EMPTY</div>';return;}
  bagBody.innerHTML=bag.map((item,i)=>`
    <div class="bag-line">
      <img src="${item.image}" alt="">
      <div><strong>${item.name}</strong><small>${item.colour} / SIZE ${item.size}<br>${money(item.price)}</small></div>
      <button class="bag-remove" data-index="${i}" aria-label="Remove">×</button>
    </div>`).join('')+
    `<div class="bag-total"><span>TOTAL</span><span>${money(bag.reduce((s,i)=>s+i.price,0))}</span></div>
     <button class="checkout-btn" type="button" onclick="toast('CHECKOUT CONNECTION NEXT')">CHECKOUT</button>`;
  bagBody.querySelectorAll('.bag-remove').forEach(btn=>btn.addEventListener('click',()=>{
    const b=getStored(BAG_KEY);b.splice(Number(btn.dataset.index),1);setStored(BAG_KEY,b);updateBag();
  }));
}
function openBag(){bagDrawer.classList.add('open');backdrop.classList.add('open');document.body.style.overflow='hidden';}
function closeBag(){bagDrawer.classList.remove('open');if(!modal.classList.contains('open')){backdrop.classList.remove('open');document.body.style.overflow='';}}
document.getElementById('bagButton').addEventListener('click',openBag);
document.getElementById('bagClose').addEventListener('click',closeBag);
updateBag();


const mobileMenuButton=document.getElementById('mobileMenuButton');
const mobileMenu=document.getElementById('mobileMenu');

function closeMobileMenu(){
  mobileMenu.classList.remove('open');
  mobileMenuButton.classList.remove('open');
  mobileMenuButton.setAttribute('aria-expanded','false');
  mobileMenuButton.setAttribute('aria-label','Open menu');
}
function toggleMobileMenu(){
  const willOpen=!mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open',willOpen);
  mobileMenuButton.classList.toggle('open',willOpen);
  mobileMenuButton.setAttribute('aria-expanded',String(willOpen));
  mobileMenuButton.setAttribute('aria-label',willOpen?'Close menu':'Open menu');
}
mobileMenuButton.addEventListener('click',toggleMobileMenu);
mobileMenu.querySelectorAll('a,button').forEach(item=>item.addEventListener('click',closeMobileMenu));
window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu();});
document.addEventListener('click',e=>{
  if(window.innerWidth<=980 && mobileMenu.classList.contains('open') &&
     !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)){
    closeMobileMenu();
  }
});
