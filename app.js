const tg=window.Telegram?.WebApp; if(tg){tg.ready();tg.expand();}
const pages=document.querySelectorAll('.page');
function show(p){pages.forEach(e=>e.classList.toggle('active',e.id===p));window.scrollTo({top:0,behavior:'instant'});document.querySelectorAll('.bottom button').forEach(b=>b.style.color=b.dataset.page===p?'#1b4939':'#52625e');}
document.querySelectorAll('[data-page]').forEach(x =>
  x.addEventListener('click', () => {
    if (x.dataset.page === 'portfolio') {
      const url = 'https://t.me/kvartastyle';
      if (tg?.openTelegramLink) {
        tg.openTelegramLink(url);
      } else {
        window.location.href = url;
      }
    } else {
      show(x.dataset.page);
    }
  })
);document.querySelectorAll('.back').forEach(x=>x.addEventListener('click',()=>show('home')));
const contact=()=>{const url='https://t.me/Mjurich';if(tg?.openTelegramLink)tg.openTelegramLink(url);else location.href=url;};document.querySelector('#contact').addEventListener('click',contact);
const sc=document.querySelector('#stylecards');STYLES.forEach(s=>{const el=document.createElement('article');el.className='stylecard';el.innerHTML='<div class="stylevisual"></div><div class="stylecopy"><h3></h3><p></p><div class="meta"></div><button class="outline">Рассчитать в этом стиле ↗</button></div>';el.querySelector('.stylevisual').textContent=s.name;el.querySelector('h3').textContent=s.name;el.querySelector('p').textContent=s.desc;el.querySelector('.meta').textContent=s.price;el.querySelector('button').addEventListener('click',()=>{show('quote');document.querySelector('[name=style]').value=s.name;});sc.append(el);});
const gallery=document.querySelector('#projectgallery');if(!PROJECTS.length){const empty=document.createElement('p');empty.className='muted';empty.textContent='Галерея пока не заполнена.';gallery.append(empty);}PROJECTS.forEach(p=>{const el=document.createElement('article');el.className='proj';el.innerHTML='<div class="projectpic"><small>Фото объекта будет добавлено в галерею</small></div><div class="projectcopy"><div class="meta"></div><h3></h3><p></p><strong></strong><p class="desc"></p><button class="outline">Рассчитать похожий ремонт ↗</button></div>';el.querySelector('.meta').textContent=p.style;el.querySelector('h3').textContent=p.title;el.querySelector('p').textContent=p.area;el.querySelector('strong').textContent=p.total;el.querySelector('.desc').textContent=p.desc;if(p.image){const img=new Image();img.src=p.image;img.alt=p.title;img.onerror=()=>img.remove();el.querySelector('.projectpic').prepend(img);}el.querySelector('button').onclick=()=>{show('quote');document.querySelector('[name=style]').value=p.style;};gallery.append(el);});
document.querySelector('#leadform').addEventListener('submit',e=>{e.preventDefault();const out=document.querySelector('#forminfo');const fd=new FormData(e.target);const lead={kind:'lead',area:fd.get('area'),style:fd.get('style'),building:fd.get('building'),phone:fd.get('phone')};if(!/^\+?[\d\s()\-]{10,22}$/.test(lead.phone)){out.textContent='Проверьте номер телефона.';return;}const payload=JSON.stringify(lead);if(tg?.sendData){out.textContent='Передаём заявку в Telegram…';tg.sendData(payload);return;}out.textContent='Для отправки заявки откройте каталог через кнопку «Открыть каталог» в чате бота Telegram. В браузере автоматическая отправка недоступна.';});
