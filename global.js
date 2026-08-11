(() => {
  "use strict";
  const addScript = src => { if (document.querySelector(`script[src^="${src}"]`)) return; const script=document.createElement("script"); script.src=src; script.defer=true; document.body.append(script); };
  const initialize = () => {
    const search=document.getElementById("english-search");
    if(search){search.addEventListener("input",()=>{const query=search.value.trim().toLowerCase();const cards=[...document.querySelectorAll(".course-card")];cards.forEach(card=>card.hidden=Boolean(query&&!card.dataset.search.includes(query)));const empty=document.querySelector(".empty-search");if(empty)empty.hidden=cards.some(card=>!card.hidden);});search.closest("form").addEventListener("submit",event=>event.preventDefault());}
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize);else initialize();
  addScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
  addScript("auth-config.js");
  addScript("account.js?v=20260812-password-auth");
  addScript("notebook.js");
  addScript("atlas-ai.js?v=20260812-panel-header");
})();
