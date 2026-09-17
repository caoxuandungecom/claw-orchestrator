/**
 * LedgerFlow — Global SaaS Accounting Platform
 * Interactive Landing Page Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPricingToggle();
  initFaqAccordion();
  initHeroCurrencyDemo();
  initCtaToasts();
});

/**
 * 1. Mobile Menu Drawer Navigation
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!mobileMenuBtn || !mobileMenu) return;

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : mobileMenu.classList.contains('hidden');
    if (shouldOpen) {
      mobileMenu.classList.remove('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link inside drawer
  const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link, .cta-trigger');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(false);
    }
  });

  // Close if clicked outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu(false);
      }
    }
  });
}

/**
 * 2. Interactive Pricing Toggle (Monthly vs Annual -20%)
 */
function initPricingToggle() {
  const billingToggle = document.getElementById('billing-toggle');
  const billingToggleThumb = document.getElementById('billing-toggle-thumb');
  const billingMonthlyLabel = document.getElementById('billing-monthly-label');
  const billingAnnualLabel = document.getElementById('billing-annual-label');
  const priceElements = document.querySelectorAll('.pricing-price');
  const periodElements = document.querySelectorAll('.pricing-period');
  const subtextElements = document.querySelectorAll('.billing-subtext');

  if (!billingToggle) return;

  let isAnnual = false;

  function updatePricing(annual) {
    isAnnual = annual;
    billingToggle.setAttribute('aria-checked', String(isAnnual));

    if (isAnnual) {
      // Toggle button visual state
      billingToggle.classList.replace('bg-slate-800', 'bg-brand-600');
      if (billingToggleThumb) {
        billingToggleThumb.classList.replace('translate-x-0', 'translate-x-7');
      }
      if (billingMonthlyLabel) {
        billingMonthlyLabel.classList.replace('text-white', 'text-slate-400');
        billingMonthlyLabel.classList.replace('font-semibold', 'font-medium');
      }
      if (billingAnnualLabel) {
        billingAnnualLabel.classList.replace('text-slate-400', 'text-white');
        billingAnnualLabel.classList.replace('font-medium', 'font-semibold');
      }

      // Update price values
      priceElements.forEach((el) => {
        const annualPrice = el.getAttribute('data-annual');
        if (annualPrice) {
          el.textContent = `$${annualPrice}`;
        }
      });

      periodElements.forEach((el) => {
        el.textContent = '/month';
      });

      subtextElements.forEach((el) => {
        el.textContent = 'Billed annually (-20% discount applied)';
      });
    } else {
      // Monthly state
      billingToggle.classList.replace('bg-brand-600', 'bg-slate-800');
      if (billingToggleThumb) {
        billingToggleThumb.classList.replace('translate-x-7', 'translate-x-0');
      }
      if (billingMonthlyLabel) {
        billingMonthlyLabel.classList.replace('text-slate-400', 'text-white');
        billingMonthlyLabel.classList.replace('font-medium', 'font-semibold');
      }
      if (billingAnnualLabel) {
        billingAnnualLabel.classList.replace('text-white', 'text-slate-400');
        billingAnnualLabel.classList.replace('font-semibold', 'font-medium');
      }

      priceElements.forEach((el) => {
        const monthlyPrice = el.getAttribute('data-monthly');
        if (monthlyPrice) {
          el.textContent = `$${monthlyPrice}`;
        }
      });

      periodElements.forEach((el) => {
        el.textContent = '/month';
      });

      subtextElements.forEach((el) => {
        el.textContent = 'Billed monthly';
      });
    }
  }

  billingToggle.addEventListener('click', () => {
    updatePricing(!isAnnual);
  });

  if (billingMonthlyLabel) {
    billingMonthlyLabel.addEventListener('click', () => updatePricing(false));
  }
  if (billingAnnualLabel) {
    billingAnnualLabel.addEventListener('click', () => updatePricing(true));
  }
}

/**
 * 3. FAQ Expand/Collapse Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const toggle = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!toggle || !content) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      // Optionally close other open FAQs for a clean accordion effect
      faqItems.forEach((other) => {
        if (other !== item) {
          const otherToggle = other.querySelector('.faq-toggle');
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');

          if (otherToggle && otherContent) {
            otherToggle.setAttribute('aria-expanded', 'false');
            otherContent.classList.add('hidden');
            if (otherIcon) otherIcon.classList.remove('rotate-180');
            other.classList.remove('border-brand-500/50');
          }
        }
      });

      if (isExpanded) {
        toggle.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
        item.classList.remove('border-brand-500/50');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
        item.classList.add('border-brand-500/50');
      }
    });
  });
}

/**
 * 4. Interactive Hero Currency Switcher
 */
function initHeroCurrencyDemo() {
  const tabButtons = document.querySelectorAll('.currency-tab-btn');
  const balanceValEl = document.getElementById('hero-balance-val');
  const currencySymbolEl = document.getElementById('hero-currency-symbol');
  const taxSymbolEl = document.getElementById('hero-tax-symbol');
  const taxValEl = document.getElementById('hero-tax-val');

  if (!tabButtons.length || !balanceValEl || !currencySymbolEl) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Highlight active tab
      tabButtons.forEach((b) => {
        b.classList.remove('bg-brand-600', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-400');
      });

      btn.classList.add('bg-brand-600', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-400');

      const symbol = btn.getAttribute('data-symbol') || '$';
      const balance = btn.getAttribute('data-balance') || '284,950.40';
      const rate = parseFloat(btn.getAttribute('data-rate') || '1.0');

      // Update UI values with subtle animation effect
      currencySymbolEl.textContent = symbol;
      balanceValEl.textContent = balance;

      if (taxSymbolEl && taxValEl) {
        taxSymbolEl.textContent = symbol;
        const taxBase = 34180.20;
        const convertedTax = (taxBase * rate).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        taxValEl.textContent = convertedTax;
      }
    });
  });
}

/**
 * 5. Interactive Toast Notifications on CTA Click
 */
function initCtaToasts() {
  const triggers = document.querySelectorAll('.cta-trigger');
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-message');

  if (!triggers.length || !toast) return;

  let toastTimeout;

  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // If it's an internal anchor (#pricing), let it scroll smoothly
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (toastTitle) toastTitle.textContent = '14-Day Free Trial Activated';
      if (toastMsg) toastMsg.textContent = 'Welcome to LedgerFlow! Redirecting to workspace...';

      toast.classList.remove('translate-y-24', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 3500);
    });
  });
}
