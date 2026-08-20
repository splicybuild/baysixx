const products={
 'raw-grid-black':{name:'RAW GRID TEE — BLACK',price:'£48.00',images:['assets/products/raw-grid-black.jpg'],description:'Heavyweight black tee with the graphic Raw Grid back print and restrained BAYSIXX neck print. Part of Drop 001.'},
 'graffiti-black':{name:'GRAFFITI TEE — BLACK',price:'£45.00',images:['assets/products/graffiti-black-front.webp','assets/products/graffiti-black-back.webp','assets/products/signature-board.png'],description:'Black heavyweight tee with the BAYSIXX B/XX chest mark and locked graffiti wordmark across the back.'},
 'graffiti-white':{name:'GRAFFITI TEE — WHITE',price:'£45.00',images:['assets/products/graffiti-white-front.webp','assets/products/graffiti-white-back.webp'],description:'White heavyweight tee with black B/XX chest mark and black locked BAYSIXX graffiti wordmark on the back.'},
 'icon-hoodie-navy':{name:'ICON HOODIE — NAVY',price:'£78.00',images:['assets/products/icon-hoodie-navy-front.webp','assets/products/icon-hoodie-navy-back.webp'],description:'Navy pullover hoodie with oversized B/XX icon front print and BAYSIXX graffiti wordmark across the back.'},
 'signature-black':{name:'SIGNATURE TEE — BLACK',price:'£48.00',images:['assets/products/signature-board.png','assets/products/graffiti-black-front.webp','assets/products/graffiti-black-back.webp'],description:'The signature first-drop tee: locked BAYSIXX back print, B/XX chest mark, and the clean BAYSIXX neck-print treatment.'},
 'raw-grid-colourways':{name:'RAW GRID TEE — COLOURWAYS',price:'FROM £48.00',images:['assets/products/raw-grid-colourways.jpg','assets/products/raw-grid-black.jpg'],description:'The Raw Grid graphic in black, washed black and bone colourways. Built around the clean BAYSIXX neck print and raw back graphic.'}
};
const key=new URLSearchParams(location.search).get('product')||'raw-grid-black';
const p=products[key]||products['raw-grid-black'];
document.title=p.name+' — BAYSIXX';
document.getElementById('productName').textContent=p.name;
document.getElementById('productPrice').textContent=p.price;
document.getElementById('productDescription').textContent=p.description;
const main=document.getElementById('productImage');
const thumbs=document.getElementById('productThumbs');
function showImage(src,i){main.src=src;main.alt=p.name+' image '+(i+1);thumbs.querySelectorAll('button').forEach((b,n)=>b.classList.toggle('active',n===i));}
p.images.forEach((src,i)=>{const b=document.createElement('button');b.type='button';b.className='product-thumb';b.setAttribute('aria-label','View product image '+(i+1));const im=document.createElement('img');im.src=src;im.alt='';b.appendChild(im);b.addEventListener('click',()=>showImage(src,i));thumbs.appendChild(b);});
showImage(p.images[0],0);
