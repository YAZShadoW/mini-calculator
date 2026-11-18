const display = document.querySelector('#display');
const hint = document.querySelector('#hint');
const keys = document.querySelector('.keys');
let expression = '';

function render() { display.value = expression || '0'; }

function calculate() {
  if (!expression.trim()) return;
  if (!/^[0-9+*/.()\-\s]+$/.test(expression)) {
    hint.textContent = 'Недопустимое выражение'; return;
  }
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    if (!Number.isFinite(result)) throw new Error();
    expression = String(Number(result.toFixed(10)));
    hint.textContent = 'Вычисление выполнено';
  } catch {
    expression = ''; hint.textContent = 'Проверь выражение и попробуй снова';
  }
  render();
}

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const {value, action} = button.dataset;
  if (action === 'clear') { expression = ''; hint.textContent = 'Поле очищено'; }
  else if (action === 'delete') { expression = expression.slice(0, -1); }
  else if (action === 'calculate') { calculate(); return; }
  else if (value) { expression += value; hint.textContent = 'Готово к вычислению'; }
  render();
});
document.addEventListener('keydown', (event) => {
  if (/^[0-9.+*/()-]$/.test(event.key)) expression += event.key;
  else if (event.key === 'Backspace') expression = expression.slice(0, -1);
  else if (event.key === 'Enter' || event.key === '=') { calculate(); return; }
  else if (event.key === 'Escape') expression = '';
  else return;
  render();
});
console.log('Мини-калькулятор загружен!');
