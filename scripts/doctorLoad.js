document.addEventListener('DOMContentLoaded', displayCards);

async function loadDoctors() {
  try {
    const res = await fetch('./scripts/doctors.json');
    if (!res.ok) {
      console.error(`Response status: ${Response.status}`);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('Ups, something happen:', e);
    return null;
  }
}

function createDoctorCard({ name, job, profile, fonasa, img, alt }) {
  const doctorCard = document.createElement('article');
  doctorCard.classList.add('doctor');
  doctorCard.classList.add('row');

  const doctorImg = document.createElement('img');
  doctorImg.classList.add('doctor__img');
  doctorImg.classList.add('col-6');
  doctorImg.classList.add('col-lg-3');
  doctorImg.src = img;
  doctorImg.alt = alt;

  const doctorInfo = document.createElement('div');
  doctorInfo.classList.add('doctor__info');
  doctorInfo.classList.add('col');

  const doctorName = document.createElement('h1');
  doctorName.classList.add('doctor__name');
  doctorName.textContent = name;

  const doctorJob = document.createElement('h2');
  doctorJob.classList.add('doctor__job');
  doctorJob.textContent = job;

  const acceptFonasa = document.createElement('h5');
  acceptFonasa.textContent = fonasa
    ? 'Atiende por Fonasa e Isapre'
    : 'Atiende solo por Isapre';

  const doctorProfile = document.createElement('p');
  doctorProfile.classList.add('doctor__profile');
  doctorProfile.textContent = profile;

  doctorInfo.appendChild(doctorName);
  doctorInfo.appendChild(doctorJob);
  doctorInfo.appendChild(acceptFonasa);
  doctorInfo.appendChild(doctorProfile);

  doctorCard.appendChild(doctorImg);
  doctorCard.appendChild(doctorInfo);

  return doctorCard;
}

async function displayCards() {
  try {
    const listContainer = document.getElementById('doctor_list');
    const fonasaCheckbox = document.getElementById('fonasaOnlyCheckbox');
    const doctors = await loadDoctors();
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
