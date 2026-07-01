import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function CodeCopyEnhancer() {
  const location = useLocation();

  useEffect(() => {
    const root = document.getElementById('main-content');
    if (!root) return;

    const attach = () => {
      root.querySelectorAll('pre').forEach((pre) => {
        if (pre.querySelector('.copy-btn')) return;
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.type = 'button';
        button.textContent = '复制';
        button.addEventListener('click', async () => {
          const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
          try {
            await navigator.clipboard.writeText(code.trim());
            button.textContent = '已复制';
            button.classList.add('copied');
            window.setTimeout(() => {
              button.textContent = '复制';
              button.classList.remove('copied');
            }, 1600);
          } catch {
            button.textContent = '复制失败';
            window.setTimeout(() => {
              button.textContent = '复制';
            }, 1600);
          }
        });
        pre.appendChild(button);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname, location.search]);

  return null;
}
