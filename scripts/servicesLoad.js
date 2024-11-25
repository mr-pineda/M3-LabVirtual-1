document.addEventListener('DOMContentLoaded', listServices);

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

const addClasses = (element, classString) => {
  const classList = classString.trim().split(' ');
  classList.forEach((bootstrapClass) => {
    element.classList.add(bootstrapClass);
  });
};

async function listServices() {
  try {
    const listContainer = document.getElementById('service_list');
    const serviceData = await loadServices();
    if (!serviceData) return;
    const servicesList = [];
    serviceData.forEach(({ services }) => {
      services.forEach((service) => {
        if (!servicesList.includes(service)) {
          servicesList.push(service);
        }
      });
    });
    const title = document.createElement('h1');
    addClasses(title, 'service__title');
    title.textContent = 'Especialidades';
    const list = document.createElement('ul');
    addClasses(list, 'service__list');
    servicesList.forEach((service) => {
      const element = document.createElement('li');
      element.innerText = service;
      list.appendChild(element);
    });
    listContainer.appendChild(title);
    listContainer.appendChild(list);
  } catch (e) {
    const errorMsg = document.createElement('h1');
    errorMsg.textContent =
      'Hubo un error al cargar la información del equipo médico.';
    const listContainer = document.getElementById('doctor_list');
    listContainer.innerHTML = '';
    listContainer.appendChild(errorMsg);
  }
}
