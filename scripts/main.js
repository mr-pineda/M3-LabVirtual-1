const button = document.getElementById('appointmentBtn');

// Pila (Clase) para gestionar lista de citas
// Solo permite las acciones push (añadir elemento al final)
// y pop (extraer el último elemento de la lista)
// implementando una arquitectura FIFO.
class Appointments {
  constructor() {
    this.appointments = [];
  }
  push(appointment) {
    this.appointments.push(appointment);
  }
  pop() {
    return this.appointments.pop();
  }
}

const appointments = new Appointments();

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

  appointments.push({ name, email, phone });
  console.log(
    'Elementos en la pila de citas: ',
    appointments.appointments.length
  );
  alert(`Se ingresaron los siguientes datos:
    Nombre: ${name}
    correo: ${email}
    Teléfono: ${phone}
    
    Lo contactaremos enseguida.
    `);
});
