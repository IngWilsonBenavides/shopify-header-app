/**
 * Shopify Header App — header.js
 *
 * Responsibilities:
 *  1. Push the page body down so content is not hidden under the fixed header.
 *  2. Toggle the mobile navigation menu.
 *  3. Toggle mobile sub-menu dropdowns.
 *  4. Keep the cart item count badge in sync via the Shopify Cart API.
 */
(function () {
  'use strict';

  var HEADER_ID = 'shopify-header-app';
  var MENU_OPEN_CLASS = 'sha-is-open';

  /* ------------------------------------------------------------------
     1. Body padding — reserves space equal to the header height so
        fixed-positioned header does not overlap page content.
     ------------------------------------------------------------------ */
  function setBodyPadding() {
    var header = document.getElementById(HEADER_ID);
    if (!header) return;
    document.body.style.paddingTop = header.offsetHeight + 'px';
  }

  /* ------------------------------------------------------------------
     2. Mobile navigation toggle
     ------------------------------------------------------------------ */
  function initMobileMenu() {
    var btn = document.querySelector('.sha-mobile-menu-btn');
    var menu = document.getElementById('sha-nav-menu');
    var iconHamburger = btn && btn.querySelector('.sha-icon-hamburger');
    var iconClose = btn && btn.querySelector('.sha-icon-close');

    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
      var isOpen = menu.classList.toggle(MENU_OPEN_CLASS);
      btn.setAttribute('aria-expanded', String(isOpen));

      if (iconHamburger) iconHamburger.style.display = isOpen ? 'none' : '';
      if (iconClose) iconClose.style.display = isOpen ? '' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      var header = document.getElementById(HEADER_ID);
      if (header && !header.contains(e.target)) {
        closeMenu(btn, menu, iconHamburger, iconClose);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu(btn, menu, iconHamburger, iconClose);
      }
    });
  }

  function closeMenu(btn, menu, iconHamburger, iconClose) {
    menu.classList.remove(MENU_OPEN_CLASS);
    btn.setAttribute('aria-expanded', 'false');
    if (iconHamburger) iconHamburger.style.display = '';
    if (iconClose) iconClose.style.display = 'none';
  }

  /* ------------------------------------------------------------------
     3. Mobile sub-menu (dropdown) toggle
     ------------------------------------------------------------------ */
  function initDropdowns() {
    var dropdownLinks = document.querySelectorAll('.sha-has-dropdown > a');

    dropdownLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth > 768) return; // desktop uses CSS :hover
        e.preventDefault();
        var parentItem = link.parentElement;
        var isOpen = parentItem.classList.toggle(MENU_OPEN_CLASS);
        link.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* ------------------------------------------------------------------
     4. Cart count — fetch live count from the Shopify Cart API so the
        badge stays accurate after AJAX add-to-cart events.
     ------------------------------------------------------------------ */
  function syncCartCount() {
    var badge = document.querySelector('.sha-cart-count');
    if (!badge) return;

    fetch('/cart.js', { credentials: 'same-origin' })
      .then(function (response) {
        if (!response.ok) return null;
        return response.json();
      })
      .then(function (data) {
        if (data && typeof data.item_count === 'number') {
          badge.textContent = data.item_count;
          badge.setAttribute(
            'aria-label',
            data.item_count + ' artículos en el carrito'
          );
        }
      })
      .catch(function () {
        /* Silently fail — Liquid-rendered count already shown */
      });
  }

  /* ------------------------------------------------------------------
     Listen for Shopify "cart:updated" custom events fired by themes
     and third-party apps after AJAX cart operations.
     ------------------------------------------------------------------ */
  function listenForCartUpdates() {
    document.addEventListener('cart:updated', syncCartCount);
    document.addEventListener('cart:refresh', syncCartCount);
  }

  /* ------------------------------------------------------------------
     Bootstrap
     ------------------------------------------------------------------ */
  function init() {
    setBodyPadding();
    initMobileMenu();
    initDropdowns();
    syncCartCount();
    listenForCartUpdates();

    // Re-calculate padding on window resize (e.g. top-bar wraps on small screens)
    window.addEventListener('resize', setBodyPadding);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
