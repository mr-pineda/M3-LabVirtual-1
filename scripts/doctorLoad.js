document.addEventListener('DOMContentLoaded', listDoctors);
async function loadServices() {
  try {
    const res = await fetch('./scripts/services.json');
    if (!res.ok) {
      console.error(`Response status: ${Response.status}`);
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error('Ups, something happen:', e);
    return null;
  }
}

async function loadDoctors() {
  try {
    const res = await fetch('./scripts/doctors.json');
    if (!res.ok) {
      console.error(`Response status: ${Response.status}`);
      return null;
    }
    const doctorsData = await res.json();
    // Usando JSON Stringify para mostrar los datos cargados
    console.log(
      'doctors.json file content:\n',
      JSON.stringify(doctorsData, null, 2)
    );

    // Creando copia de doctores y mostrando datos en consola
    const doctors_copy = JSON.parse(JSON.stringify(doctorsData));
    console.log('Prueba de clonanción: (nombre 1er doctor)');
    console.log(
      `Original: ${doctorsData[0].name}  |  Copia: ${doctors_copy[0].name}  `
    );
    doctors_copy[0].name = 'Tio Pirata';
    console.log('Despues de Cambiar el nombre');
    console.log(
      `Original: ${doctorsData[0].name}  |  Copia: ${doctors_copy[0].name}  `
    );

    return doctorsData;
  } catch (e) {
    console.error('Ups, something happen:', e);
    return null;
  }
}

const addClasses = (element, classString) => {
  const classList = classString.trim().split(' ');
  classList.forEach((bootstrapClass) => {
    element.classList.add(bootstrapClass);
  });
};

const translateDays = (day) => {
  switch (day) {
    case 'mon':
      return 'Lunes';
    case 'tue':
      return 'Martes';
    case 'wed':
      return 'Miércoles';
    case 'thu':
      return 'Jueves';
    case 'fri':
      return 'Viernes';
    case 'sat':
      return 'Sábado';
    case 'sun':
      return 'Domingo';
  }
};

// Función que crea las Card de los doctores y ademas muestra por consola los datos
// La funcion usa asignación por destructuración
function createDoctorCard({ name, job, profile, fonasa, img, alt, schedule }) {
  console.log('doctor: ', name);
  console.log('especialidad: ', job);
  console.log('perfil: ', profile);
  console.log('acepta fonasa?: ', fonasa);

  const doctorCard = document.createElement('article');
  addClasses(doctorCard, 'card mb-3');
  doctorCard.style.width = '100%';

  const responsiveContainer = document.createElement('div');
  addClasses(responsiveContainer, 'row g-0');

  const imgContainer = document.createElement('div');
  addClasses(
    imgContainer,
    'col-md-4 d-flex justify-content-center align-items-center'
  );

  const doctorImg = document.createElement('img');
  addClasses(doctorImg, 'img-fluid rounded');
  doctorImg.src = img;
  doctorImg.alt = alt;

  imgContainer.appendChild(doctorImg);
  responsiveContainer.appendChild(imgContainer);

  const responsiveBodyContainer = document.createElement('div');
  responsiveBodyContainer.classList.add('col-md-8');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const doctorName = document.createElement('h4');
  doctorName.classList.add('card-title');
  doctorName.textContent = name;

  const doctorJob = document.createElement('h5');
  addClasses(doctorJob, 'card-subtitle mb-2 text-body-secondary');
  doctorJob.textContent = job;

  const acceptFonasa = document.createElement('h6');
  addClasses(acceptFonasa, 'card-subtitle mb-3');
  acceptFonasa.textContent = fonasa
    ? 'Convenio con Isapre y Fonasa'
    : 'Convenio exclusivo con Isapre';

  const doctorProfile = document.createElement('p');
  doctorProfile.classList.add('card-text');
  doctorProfile.textContent = profile;

  const scheduleList = document.createElement('div');
  addClasses(scheduleList, 'mx-3');
  const days = document.createElement('div');
  addClasses(days, 'row border');
  const workTime = document.createElement('div');
  addClasses(workTime, 'row border');
  console.log('Horario de atencion: ');
  for (let key in schedule) {
    const dayContainer = document.createElement('div');
    addClasses(
      dayContainer,
      'col d-flex justify-content-center align-items-center'
    );
    const day = document.createElement('p');
    addClasses(day, 'text-align-center fw-bold');
    day.innerText = translateDays(key);
    dayContainer.appendChild(day);
    days.appendChild(dayContainer);

    const workContainer = document.createElement('div');
    addClasses(
      workContainer,
      'col d-flex justify-content-center align-items-center'
    );
    const dayWork = document.createElement('p');
    dayWork.innerText = schedule[key] !== 'none' ? schedule[key] : '---';
    workContainer.appendChild(dayWork);
    workTime.appendChild(workContainer);
    console.log(`  ${translateDays(key)}: ${schedule[key]}`);
  }
  scheduleList.appendChild(days);
  scheduleList.appendChild(workTime);

  cardBody.appendChild(doctorName);
  cardBody.appendChild(doctorJob);
  cardBody.appendChild(acceptFonasa);
  cardBody.appendChild(doctorProfile);
  responsiveBodyContainer.appendChild(cardBody);
  responsiveBodyContainer.appendChild(scheduleList);
  responsiveContainer.appendChild(responsiveBodyContainer);

  doctorCard.appendChild(responsiveContainer);

  return doctorCard;
}

async function listDoctors() {
  try {
    const listContainer = document.getElementById('doctor_list');
    const fonasaCheckbox = document.getElementById('fonasaOnlyCheckbox');
    const doctors = await loadDoctors();
    const services = await loadServices();

    // Merge de 2 objetos JSON
    doctors.forEach((doctor) => {
      services.forEach((element) => {
        if (doctor.name === element.doctor) doctor.services = element.services;
      });
    });
    console.log(doctors);

    if (!doctors) return;
    doctors.forEach((doctor) =>
      listContainer.appendChild(createDoctorCard(doctor))
    );

    fonasaCheckbox.addEventListener('change', (e) => {
      if (e.currentTarget.checked) {
        const fonasaDoctors = doctors.filter(({ fonasa }) => fonasa);
        listContainer.innerHTML = '';
        fonasaDoctors.forEach((doctor) =>
          listContainer.appendChild(createDoctorCard(doctor))
        );
      } else {
        listContainer.innerHTML = '';
        doctors.forEach((doctor) =>
          listContainer.appendChild(createDoctorCard(doctor))
        );
      }
    });
  } catch (e) {
    const errorMsg = document.createElement('h1');
    errorMsg.textContent =
      'Hubo un error al cargar la información del equipo médico.';
    const listContainer = document.getElementById('doctor_list');
    listContainer.innerHTML = '';
    listContainer.appendChild(errorMsg);
  }
}
