const products={
 'core-black':{name:'CORE TEE — BLACK',price:'£45.00',image:'assets/product-core-black.jpg',description:'The core BAYSIXX tee: stripped-back black heavyweight cotton with the locked BAYSIXX wordmark and RAW TO THE CORE detail.'},
 'raw-black':{name:'RAW TO THE CORE TEE — BLACK',price:'£48.00',image:'assets/product-raw-black.jpg',description:'A statement tee built around the first-drop message. Bold RAW TO THE CORE typography with the BAYSIXX icon detail.'},
 'icon-black':{name:'ICON TEE — BLACK',price:'£45.00',image:'assets/product-icon-black.jpg',description:'Minimal black tee featuring the exact BAYSIXX B/XX icon artwork and STRIP IT BACK message.'},
 'core-bone':{name:'CORE TEE — BONE',price:'£45.00',image:'assets/product-core-bone.jpg',description:'The core wordmark tee in a warm bone colourway, using the same locked BAYSIXX artwork in high contrast.'}
};
const key=new URLSearchParams(location.search).get('product')||'core-black';const p=products[key]||products['core-black'];
document.title=p.name+' — BAYSIXX';document.getElementById('productName').textContent=p.name;document.getElementById('productPrice').textContent=p.price;document.getElementById('productImage').src=p.image;document.getElementById('productDescription').textContent=p.description;
