import Vue from 'vue';

// 高度设置成窗口高度
Vue.directive('auto-windows-height', {
  inserted(el, binding) {
    const difference = Number(binding.value) || 0;
    el.style.height = `${window.innerHeight - difference}px`;
    window.addEventListener('resize', () => {
      el.style.height = `${window.innerHeight - difference}px`;
    });
  },
});
