document.querySelectorAll('a[href^="#"]').forEach((link)=>{link.addEventListener('click',(e)=>{const id=link.getAttribute('href');if(id==='#')return;const target=document.querySelector(id);if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}})});

const mobileNav=document.createElement('nav');
mobileNav.className='mobile-bottom-nav';
mobileNav.setAttribute('aria-label','Mobile navigation');
const onHome=location.pathname.endsWith('index.html')||location.pathname==='/'||location.pathname.endsWith('/baysixx_site/');
mobileNav.innerHTML=`<a href="index.html">HOME</a><a href="shop.html">SHOP</a><a href="story.html">OUR STORY</a><a href="${onHome?'#lookbook':'index.html#lookbook'}">LOOKBOOK</a>`;
document.body.appendChild(mobileNav);
