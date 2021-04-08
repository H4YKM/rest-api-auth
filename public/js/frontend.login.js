const form = document.querySelector('#loginjsapi');
const email = document.querySelector('#exampleInputEmail1');
const password = document.querySelector('#exampleInputPassword1');

const spinner = document.querySelector('#spinner');
const btn = document.querySelector('#submitButton');

form.addEventListener('submit', e => {
  e.preventDefault();

  btn.disabled = true;
  spinner.classList.remove('d-none');
  spinner.classList.add('d-block');

  registerRequest('/api/login', {email: email.value, password: password.value})
    .then((data) => {
      console.log(data);
      spinner.classList.remove('d-block');
      spinner.classList.add('d-none');
      btn.disabled = false;

      if (data.errors) {
        M.toast({html: data.errors['0'].msg});
      } else {
        M.toast({html: data.message});
      }

    });
});

async function registerRequest(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}