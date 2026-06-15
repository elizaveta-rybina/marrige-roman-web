import { SCRIPT_URL } from './config.js'
const form = document.getElementById('rsvpForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.textContent = 'Отправка...';
  submitBtn.disabled = true;

  // Собираем данные
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    attendance: formData.get('attendance'),
    alcohol: formData.getAll('alcohol')
  };

  fetch(SCRIPT_URL, { 
    method: 'POST', 
    mode: 'no-cors',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(() => {
    submitBtn.textContent = 'ОТПРАВЛЕНО!';
    form.reset();
  })
  .catch(error => {
    console.error('Ошибка!', error.message);
    submitBtn.textContent = 'Ошибка, попробуйте снова';
    submitBtn.disabled = false;
  });
});