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
