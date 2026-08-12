(() => {
  "use strict";

  const addScript = src => {
    if (document.querySelector(`script[src^="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.body.append(script);
  };

  const ensureUnifiedPricingLink = () => {
    const shellStylesheet = document.querySelector('link[href^="atlas-shell.css"]');
    if (shellStylesheet) shellStylesheet.href = "atlas-shell.css?v=20260813-unified-nav";
    const topbar = document.querySelector(".atlas-topbar-inner");
    if (!topbar || topbar.querySelector(".atlas-pricing-link")) return;
    const search = topbar.querySelector(".atlas-search");
    if (!search) return;
    const pricing = document.createElement("a");
    pricing.className = "atlas-tool atlas-pricing-link";
    pricing.href = "https://luminaatlas.com/#pricing";
    pricing.setAttribute("aria-label", "Pricing");
    pricing.textContent = "Pricing";
    search.insertAdjacentElement("afterend", pricing);
  };

  const initialize = () => {
    ensureUnifiedPricingLink();
    const search = document.getElementById("english-search");
    if (search) {
      search.addEventListener("input", () => {
        const query = search.value.trim().toLowerCase();
        const cards = [...document.querySelectorAll(".course-card")];
        cards.forEach(card => card.hidden = Boolean(query && !card.dataset.search.includes(query)));
        const empty = document.querySelector(".empty-search");
        if (empty) empty.hidden = cards.some(card => !card.hidden);
      });
      search.closest("form").addEventListener("submit", event => event.preventDefault());
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
  addScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
  addScript("auth-config.js");
  addScript("account.js?v=20260812-password-auth");
  addScript("notebook.js");
  addScript("atlas-ai.js?v=20260812-panel-header");
})();

