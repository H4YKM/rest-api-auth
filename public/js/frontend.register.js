const form = document.querySelector('#apijs');
const email = document.querySelector('#exampleInputEmail1');
const password = document.querySelector('#exampleInputPassword1');

form.addEventListener('submit', e => {
  e.preventDefault();
  registerRequest('/api/register', {email: email.value, password: password.value})
    .then((data) => {
      console.log(data);

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