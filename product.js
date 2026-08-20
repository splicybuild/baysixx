const products={
 'ronin-japan':{name:'RONIN TEE — BLACK',price:'COMING SOON',images:['assets/products/ronin-tee-back-detail.png?v=10','assets/products/ronin-tee-front-detail.png?v=10'],description:'Japanese-inspired BAYSIXX graphic tee with the locked graffiti wordmark, distressed red sun, ronin figure, pagoda and sakura. Japanese details read 本物であれ (Be authentic) and 余分なものを削ぎ落とせ (Strip away the excess), with a 本物 (genuine) seal.'},
 'signature-graffiti':{name:'SIGNATURE GRAFFITI TEE',price:'FROM £45.00',images:['assets/products/signature-board.png'],description:'The signature BAYSIXX graffiti tee — the locked back wordmark with the B/XX chest mark and clean neck treatment. Available in black and white.'},
 'raw-grid':{name:'RAW GRID TEE',price:'FROM £48.00',images:['assets/products/raw-grid-colourways.jpg','assets/products/raw-grid-black.jpg'],description:'The Raw Grid tee in black, washed black and bone colourways, built around the restrained BAYSIXX neck print and graphic back layout.'},
 'icon-hoodie-black':{name:'ICON HOODIE — BLACK',price:'£78.00',images:['assets/products/icon-hoodie-black-front.jpg','assets/products/icon-hoodie-black-back.jpg'],description:'Black pullover hoodie with the BAYSIXX B/XX chest icon and locked graffiti wordmark across the back.'}
};
const key=new URLSearchParams(location.search).get('product')||'signature-graffiti';
const p=products[key]||products['signature-graffiti'];
document.title=p.name+' — BAYSIXX';
document.getElementById('productName').textContent=p.name;
document.getElementById('productPrice').textContent=p.price;
document.getElementById('productDescription').textContent=p.description;
const main=document.getElementById('productImage');
const thumbs=document.getElementById('productThumbs');
function showImage(src,i){main.src=src;main.alt=p.name+' image '+(i+1);thumbs.querySelectorAll('button').forEach((b,n)=>b.classList.toggle('active',n===i));}
p.images.forEach((src,i)=>{const b=document.createElement('button');b.type='button';b.className='product-thumb';b.setAttribute('aria-label','View product image '+(i+1));const im=document.createElement('img');im.src=src;im.alt='';b.appendChild(im);b.addEventListener('click',()=>showImage(src,i));thumbs.appendChild(b);});
showImage(p.images[0],0);
