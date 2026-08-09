// 鍏ㄥ眬浜や簰鑴氭湰锛氬鐞嗗皬鍗＄墖浜や簰涓庤嚜鏌ュ閫夋璁板繂
document.addEventListener("DOMContentLoaded", () => {
  // 1. 澶勭悊绉诲姩绔偣鍑诲脊鍑哄皬鍗＄墖锛堝吋瀹规墜鏈鸿Е鎽革級
  const popovers = document.querySelectorAll('.has-popover');
  popovers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      el.classList.toggle('active');
    });
  });

  document.addEventListener('click', () => {
    popovers.forEach(el => el.classList.remove('active'));
  });

  // 2. 鑷姩璁板繂鑷煡 Checkbox 鐨勬墦鍗＄姸鎬?  const checkboxes = document.querySelectorAll('.task-checkbox');
  checkboxes.forEach((cb, index) => {
    const savedState = localStorage.getItem(`task_cb_${index}`);
    if (savedState === 'true') cb.checked = true;

    cb.addEventListener('change', () => {
      localStorage.setItem(`task_cb_${index}`, cb.checked);
    });
  });
});

(() => {
  "use strict";
  const addStyle = (href) => {
    if (document.querySelector(`link[href^="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${href}?v=20260808-1`;
    document.head.append(link);
  };
  const addScript = (src) => {
    if (document.querySelector(`script[src^="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = `${src}?v=20260808-1`;
    script.defer = true;
    document.body.append(script);
  };
  const mountLearningTools = () => {
    if (document.querySelector(".learning-toolbar")) return;
    const bar = document.createElement("nav");
    bar.className = "learning-toolbar";
    bar.setAttribute("aria-label", "Learning tools");
    bar.innerHTML = `<div class="learning-toolbar-inner">
      <a class="english-brand" href="index.html" aria-label="English home"><span aria-hidden="true">E</span><strong>English</strong></a>
      <button class="notebook-tool" type="button" data-notebook-open aria-label="Open Notebook">Notebook</button>
      <button class="ai-tool" type="button" aria-label="Open English AI" aria-controls="english-ai-panel" aria-expanded="false">AI</button>
      <button class="profile-tool" type="button">Profile</button>
    </div>`;
    document.body.prepend(bar);
    const panel = document.createElement("aside");
    panel.id = "english-ai-panel";
    panel.className = "ai-panel";
    panel.setAttribute("aria-hidden", "true");
    document.body.append(panel);
    bar.querySelector(".ai-tool").addEventListener("click", () => {
      const open = !panel.classList.contains("is-open");
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      bar.querySelector(".ai-tool").setAttribute("aria-expanded", String(open));
    });
  };
  addStyle("learning-tools.css");
  addStyle("auth.css");
  addStyle("notebook.css");
  addStyle("math-ai.css");
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountLearningTools);
  else mountLearningTools();
  addScript("auth-config.js");
  addScript("auth.js?v=20260809-unified-auth");
  addScript("notebook.js");
  addScript("english-ai.js");
})();

