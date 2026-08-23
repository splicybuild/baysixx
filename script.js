document.querySelectorAll('a[href^="#"]').forEach((link)=>{link.addEventListener('click',(e)=>{const id=link.getAttribute('href');if(id==='#')return;const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}})});

const backTop=document.querySelector('.back-to-top');
if(backTop){const toggle=()=>backTop.classList.toggle('visible',window.scrollY>500);window.addEventListener('scroll',toggle,{passive:true});toggle();}

const PRODUCTS=[
 {key:'signature-graffiti',name:'SIGNATURE GRAFFITI TEE',price:'FROM £45.00',image:'assets/products/signature-board.png'},
 {key:'raw-grid',name:'RAW GRID TEE',price:'FROM £48.00',image:'assets/products/raw-grid-colourways.jpg'},
 {key:'icon-hoodie-black',name:'ICON HOODIE — BLACK',price:'£78.00',image:'assets/products/icon-hoodie-black-back.jpg'},
 {key:'ronin-japan',name:'RONIN TEE — BLACK',price:'COMING SOON',image:'assets/products/ronin-tee-back-clean.jpg'}
];

const path=location.pathname;
const onHome=path.endsWith('index.html')||path==='/'||path.endsWith('/baysixx/');
const onShop=path.endsWith('shop.html')||path.endsWith('product.html');
const onStory=path.endsWith('story.html');
const icon=(name)=>({home:'<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-6h6v6"/></svg>',shop:'<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6z"/><path d="M8 8a4 4 0 0 1 8 0"/></svg>',grid:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',about:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></svg>'}[name]);

const mobileNav=document.createElement('nav');
mobileNav.className='mobile-bottom-nav';
mobileNav.setAttribute('aria-label','Mobile navigation');
mobileNav.innerHTML=`<a class="${onHome?'active':''}" href="index.html">${icon('home')}<span>HOME</span></a><a class="${onShop?'active':''}" href="shop.html">${icon('shop')}<span>SHOP</span></a><a href="${onHome?'#drop':'index.html#drop'}">${icon('grid')}<span>DROPS</span></a><a class="${onStory?'active':''}" href="story.html">${icon('about')}<span>ABOUT</span></a>`;
document.body.appendChild(mobileNav);

const backdrop=document.createElement('div');backdrop.className='app-backdrop';document.body.appendChild(backdrop);
function makeSheet(id,title){const el=document.createElement('section');el.className='app-sheet';el.id=id;el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label',title);el.innerHTML=`<div class="app-sheet-head"><strong>${title}</strong><button class="app-sheet-close" type="button" aria-label="Close">×</button></div><div class="app-sheet-body"></div>`;document.body.appendChild(el);el.querySelector('.app-sheet-close').addEventListener('click',closeSheets);return el;}
const searchSheet=makeSheet('searchSheet','SEARCH BAYSIXX');
const cartSheet=makeSheet('cartSheet','YOUR BAG');
const accountSheet=makeSheet('accountSheet','ACCOUNT');
function openSheet(sheet){document.querySelectorAll('.app-sheet.open').forEach(x=>x.classList.remove('open'));sheet.classList.add('open');backdrop.classList.add('open');document.body.classList.add('sheet-open');setTimeout(()=>sheet.querySelector('input')?.focus(),180)}
function closeSheets(){document.querySelectorAll('.app-sheet.open').forEach(x=>x.classList.remove('open'));backdrop.classList.remove('open');document.body.classList.remove('sheet-open')}
backdrop.addEventListener('click',closeSheets);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheets()});

const searchBody=searchSheet.querySelector('.app-sheet-body');
searchBody.innerHTML='<input class="app-search-input" type="search" placeholder="Search products" aria-label="Search products"><div class="app-search-results"></div>';
const searchInput=searchBody.querySelector('input'),searchResults=searchBody.querySelector('.app-search-results');
function renderSearch(q=''){const clean=q.trim().toLowerCase();const matches=clean?PRODUCTS.filter(p=>p.name.toLowerCase().includes(clean)):PRODUCTS;searchResults.innerHTML=matches.length?matches.map(p=>`<a class="app-search-result" href="product.html?product=${p.key}"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${p.price}</small></div><span>→</span></a>`).join(''):'<div class="app-empty">NO PRODUCTS FOUND</div>'}
searchInput.addEventListener('input',()=>renderSearch(searchInput.value));renderSearch();

accountSheet.querySelector('.app-sheet-body').innerHTML='<div class="account-panel"><p>Account features are being prepared for the BAYSIXX store.</p><a href="shop.html">SHOP DROP 001 <span>→</span></a><a href="story.html">OUR STORY <span>→</span></a><a href="index.html#contact">CONTACT <span>→</span></a></div>';

const BAG_KEY='baysixxBag';
const getBag=()=>{try{return JSON.parse(localStorage.getItem(BAG_KEY)||'[]')}catch{return[]}};
const setBag=(bag)=>{localStorage.setItem(BAG_KEY,JSON.stringify(bag));updateBagUI()};
function updateBagUI(){const bag=getBag();document.querySelectorAll('.cart-count').forEach(el=>el.textContent=bag.length);const body=cartSheet.querySelector('.app-sheet-body');if(!bag.length){body.innerHTML='<div class="app-empty">YOUR BAG IS EMPTY</div><a class="cart-checkout" style="display:block;text-align:center" href="shop.html">SHOP DROP 001</a>';return}body.innerHTML=bag.map((item,i)=>`<div class="cart-line"><img src="${item.image}" alt=""><div><strong>${item.name}</strong><small>SIZE ${item.size}<br>${item.price}</small></div><button class="cart-remove" data-index="${i}" aria-label="Remove item">×</button></div>`).join('')+`<div class="cart-summary"><span>ITEMS</span><span>${bag.length}</span></div><button class="cart-checkout" type="button">CHECKOUT — COMING SOON</button>`;body.querySelectorAll('.cart-remove').forEach(btn=>btn.addEventListener('click',()=>{const b=getBag();b.splice(Number(btn.dataset.index),1);setBag(b)}))}
updateBagUI();

document.querySelectorAll('.text-button').forEach(btn=>{const label=(btn.getAttribute('aria-label')||'').toLowerCase();if(label.includes('search'))btn.addEventListener('click',()=>openSheet(searchSheet));if(label.includes('account'))btn.addEventListener('click',()=>openSheet(accountSheet));if(label.includes('cart'))btn.addEventListener('click',()=>openSheet(cartSheet));});

const sizeButtons=[...document.querySelectorAll('.sizes button')];
sizeButtons.forEach(btn=>btn.addEventListener('click',()=>{sizeButtons.forEach(b=>b.classList.remove('size-selected'));btn.classList.add('size-selected')}));
const addButton=document.querySelector('.add-bag:not(.notify-me)');
if(addButton){addButton.addEventListener('click',()=>{const selected=document.querySelector('.sizes .size-selected');if(!selected){addButton.textContent='SELECT A SIZE';setTimeout(()=>addButton.textContent='ADD TO BAG',1200);return}const key=new URLSearchParams(location.search).get('product')||'signature-graffiti';const product=PRODUCTS.find(p=>p.key===key)||PRODUCTS[0];const bag=getBag();bag.push({...product,size:selected.textContent.trim()});setBag(bag);addButton.textContent='ADDED TO BAG ✓';setTimeout(()=>addButton.textContent='ADD TO BAG',1300)});}

const homeCards=[...document.querySelectorAll('.drop .products .product-card')];
const homeMeta=[['ICON HOODIE — BLACK','£78.00'],['RONIN TEE — BLACK','COMING SOON'],['RONIN TEE — BACK','DROP 001']];
homeCards.forEach((card,i)=>{if(!card.querySelector('.mobile-card-meta')){const meta=document.createElement('span');meta.className='mobile-card-meta';meta.innerHTML=`<strong>${homeMeta[i]?.[0]||'BAYSIXX DROP 001'}</strong><small>${homeMeta[i]?.[1]||''}</small>`;card.appendChild(meta)}});

const gallery=document.querySelector('.product-gallery');if(gallery&&!gallery.querySelector('.product-swipe-hint')){const hint=document.createElement('span');hint.className='product-swipe-hint';hint.textContent='TAP THUMBNAILS';gallery.appendChild(hint)}
