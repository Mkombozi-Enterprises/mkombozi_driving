document.addEventListener('DOMContentLoaded', function () {

  // Mobile menu
  const navToggle = document.getElementById('nav-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  function openMenu(){mobileMenu.classList.add('open');document.body.classList.add('menu-open');}
  function closeMenu(){mobileMenu.classList.remove('open');document.body.classList.remove('menu-open');}
  navToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  // Sticky header background
  const header = document.getElementById('site-header');
  function onScroll(){ header.classList.toggle('scrolled', window.scrollY > 30); }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, {threshold:0.12});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('is-visible'));
  }

  // Stat counters
  const counters = document.querySelectorAll('.stat-num');
  function animateCounter(el){
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1300;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now-start)/duration,1);
      const eased = 1-Math.pow(1-progress,3);
      el.textContent = Math.round(target*eased) + suffix;
      if(progress<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if('IntersectionObserver' in window){
    const cio = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ animateCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, {threshold:0.4});
    counters.forEach(el=>cio.observe(el));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.querySelector('.faq-q').addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  // Pricing -> contact prefill
  document.querySelectorAll('[data-choose-course]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const course = btn.dataset.chooseCourse;
      const select = document.getElementById('course-interest');
      if(select){
        for(const opt of select.options){ if(opt.value === course){ select.value = course; break; } }
      }
    });
  });

  // Contact form fake submit
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    form.classList.add('hidden');
    document.getElementById('form-success').classList.add('visible');
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

});