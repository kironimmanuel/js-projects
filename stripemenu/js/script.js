'use strict';

import sublinks from './data.js';

const sidebar = document.querySelector('.sidebar-links');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const submenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const linkBtns = [...document.querySelectorAll('.link-btn')];

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelectorAll('.open-modal-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');

const header = document.querySelector('.nav');
const message = document.createElement('div');

// Sign in Modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

openModalBtn.forEach(btn => btn.addEventListener('click', openModal));
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Hide/show sidebar
toggleBtn.addEventListener('click', function () {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', function () {
  sidebarWrapper.classList.remove('show');
});
// Sidebar display
sidebar.innerHTML = sublinks
  .map(item => {
    const { links, page } = item;
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
    .map(link => {
      return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>`;
    })
    .join('')}
  </div>
  </article>`;
  })
  .join('');

linkBtns.forEach(btn => {
  btn.addEventListener('mouseover', function (e) {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    // If temp page exists, show the submenu
    const tempPage = sublinks.find(({ page }) => page === text);
    if (tempPage) {
      const { page, links } = tempPage;
      // Dynamic submenu display
      submenu.classList.add('show');
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;

      // Dynamic columns
      let columns = 'col-2';
      if (links.length === 3) {
        columns = 'col-3';
      }
      if (links.length > 3) {
        columns = 'col-4';
      }

      submenu.innerHTML = `<section>
      <h4>${page}</h4>
      <div class="submenu-center ${columns}">
      ${links
        .map(link => {
          return `<a href="${link.url}">
        <i class="${link.icon}"> </i> ${link.label}</a>`;
        })
        .join('')}
      </div>
      </section>`;
    }
  });
});

hero.addEventListener('mouseover', function (e) {
  submenu.classList.remove('show');
});
nav.addEventListener('mouseover', function (e) {
  if (!e.target.classList.contains('link-btn')) {
    submenu.classList.remove('show');
  }
});

// Cookie Pop-Up
message.classList.add('cookie-message');
message.innerHTML = `This website uses cookies
We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services.    <button class="btn close-cookie-btn">Got it!</button>`;

header.append(message);

document
  .querySelector('.close-cookie-btn')
  .addEventListener('click', function () {
    message.remove();
  });
