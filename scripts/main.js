const button = document.getElementById('appointmentBtn');

button.addEventListener('click', () => {
  let name = prompt('Ingrese su nombre y apellido:').trim();
  if (name === null) return;

  while (name.split(' ').length < 2) {
    console.log('Invalid name:', name);
    // Se considera un nombre valido, un string que contenga al menos 2 palabras
    name = prompt('Ingrese un nombre válido:').trim();
  }
  console.log(`name "${name}" is valid`);

  let email = prompt('Ingrese su correo:').trim();
  if (email === null) {
    name = null;
  }
  while (!email.includes('@') || !email.includes('.')) {
    // Se considera como email valido cualquier string que contenga un caracter @
    // y un caracter .
    console.log('Invalid email:', email);
    email = prompt('Ingrese un correo válido:').trim();
  }
  console.log(`email "${email}" was valid`);

  let phone = prompt('Ingrese un número de teléfono').trim();
  if (phone === null) {
    name = null;
    email = null;
    return;
  }
  while (isNaN(Number(phone))) {
    // Se considera un numero telefonico valido cualquier string
    // que se pueda convertir a número
    console.log('Invalid phone:', phone);
    phone = prompt('Ingrese un teléfono válido:').trim();
  }
  console.log('Datos ingresados: ');
  console.log('Nombre:', name);
  console.log('correo:', email);
  console.log('telefono:', phone);

  alert(`Se ingresaron los siguientes datos:
    Nombre: ${name}
    correo: ${email}
    Teléfono: ${phone}`);
});
