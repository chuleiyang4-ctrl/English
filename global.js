// 全局交互脚本：处理小卡片交互与自查复选框记忆
document.addEventListener("DOMContentLoaded", () => {
  // 1. 处理移动端点击弹出小卡片（兼容手机触摸）
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

  // 2. 自动记忆自查 Checkbox 的打卡状态
  const checkboxes = document.querySelectorAll('.task-checkbox');
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
  addScript("account.js?v=20260809-unified-auth");
  addScript("notebook.js");
  addScript("english-ai.js");
})();
