const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Menú para celulares
menuToggle.addEventListener('click', () => {
  const opened = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Botones "Conocer más"
document.querySelectorAll('.details-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const expanded = card.classList.toggle('expanded');

    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded
      ? 'Mostrar menos −'
      : 'Conocer más +';
  });
});

// Recomendaciones de experiencias
const recommendations = {
  spa: {
    title: 'Oasis Spa & Bienestar',
    text: 'Explora los cuidados estéticos y las experiencias de bienestar. Los servicios se confirmarían según las necesidades de cada mascota.'
  },
  moda: {
    title: 'The Atelier',
    text: 'Descubre Velvet & Gold, Glow-Tech y los accesorios pensados para combinar diseño y funcionalidad.'
  },
  bistro: {
    title: 'Bark & Meow Bistro',
    text: 'Conoce la propuesta gourmet y sus productos conceptuales. La alimentación debe ser adecuada para cada especie.'
  }
};

document.getElementById('recommendBtn').addEventListener('click', () => {
  const pet = document.getElementById('petType').value;
  const interest = document.getElementById('interest').value;
  const chosen = recommendations[interest];

  document.getElementById('resultTitle').textContent = chosen.title;

  let extra = '';

  if (pet === 'gato') {
    extra = ' Si te acompaña un gato, confirma que cualquier servicio o producto sea apropiado para felinos.';
  } else if (pet === 'ambos') {
    extra = ' Recuerda que perros y gatos pueden necesitar cuidados y productos diferentes.';
  }

  document.getElementById('resultText').textContent = chosen.text + extra;
  document.getElementById('quizResult').classList.add('show');
});

// Preguntas frecuentes
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const opened = item.classList.toggle('open');

    button.setAttribute('aria-expanded', String(opened));
  });
});

// Selección automática del tema en el formulario
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => {
    const topic = document.getElementById('topic');
    const wanted = link.dataset.interest;

    topic.value = wanted === 'moda'
      ? 'Atelier y accesorios'
      : 'Información general';
  });
});

// Formulario de demostración
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  document.getElementById('formMessage').style.display = 'block';
  contactForm.reset();
});

// Año automático en el pie de página
document.getElementById('year').textContent = new Date().getFullYear();

// Botón para volver arriba
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

backTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Animaciones al aparecer en pantalla
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('in-view'));
}
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalOptions = document.getElementById("modalOptions");

const catalogo = {
  "Velvet & Gold": {
    categoria: "THE ATELIER",
    descripcion: "Accesorios elegantes para mascotas.",
    opciones: [
      ["Rose Champagne", "Collares y arneses en tonos rosados."],
      ["Midnight Black", "Diseño clásico en negro."],
      ["Pearl Ivory", "Estilo delicado en tonos claros."],
      ["Forest Emerald", "Detalles inspirados en la naturaleza."]
    ]
  },

  "Glow-Tech": {
    categoria: "THE ATELIER",
    descripcion: "Tecnología y estilo para mascotas.",
    opciones: [
      ["Glow Collar", "Collar conceptual con luz."],
      ["Smart Tag", "Placa inteligente de identificación."],
      ["GPS Companion", "Idea de accesorio con localización GPS."],
      ["Active Track", "Concepto para registrar actividad."]
    ]
  },

  "Pet Splashes": {
    categoria: "THE ATELIER",
    descripcion: "Inspiración para una colección de aromas.",
    opciones: [
      ["Soft Cotton", "Aroma inspirado en algodón limpio."],
      ["Fresh Garden", "Inspiración fresca y floral."],
      ["Peach Blossom", "Inspiración frutal de durazno."],
      ["Oat & Calm", "Concepto de aroma suave."]
    ]
  },

  "Pure Paws": {
    categoria: "OASIS SPA",
    descripcion: "Ideas de cuidado y limpieza.",
    opciones: [
      ["Baño delicado", "Cuidado suave del pelaje."],
      ["Patas limpias", "Limpieza de las patitas."],
      ["Higiene de rutina", "Servicio de higiene básica."],
      ["Cuidado del pelaje", "Atención según sus necesidades."]
    ]
  },

  "Silk & Shine": {
    categoria: "OASIS SPA",
    descripcion: "Opciones para el cuidado del pelaje.",
    opciones: [
      ["Cepillado suave", "Desenredado y cepillado."],
      ["Brillo natural", "Cuidado para un pelaje brillante."],
      ["Grooming a medida", "Atención personalizada."],
      ["Acabado elegante", "Terminación prolija."]
    ]
  },

  "Calm Moments": {
    categoria: "OASIS SPA",
    descripcion: "Una experiencia tranquila de bienestar.",
    opciones: [
      ["Pausa tranquila", "Un momento de calma."],
      ["Mimos suaves", "Atención delicada."],
      ["Momento sensorial", "Experiencia de cuidado."],
      ["Bienestar personalizado", "Atención según cada mascota."]
    ]
  },

  "Puppyccinos": {
    categoria: "BARK & MEOW BISTRO",
    descripcion: "Sabores conceptuales para el menú.",
    opciones: [
      ["Clásico cremoso", "Una propuesta suave."],
      ["Manzana & avena", "Inspiración frutal."],
      ["Plátano delicado", "Una opción de inspiración frutal."],
      ["Calabaza suave", "Una alternativa de sabor vegetal."]
    ]
  },

  "Doggie Macarons": {
    categoria: "BARK & MEOW BISTRO",
    descripcion: "Pequeñas ideas para un menú especial.",
    opciones: [
      ["Manzana & avena", "Inspiración frutal y suave."],
      ["Plátano", "Una propuesta de sabor frutal."],
      ["Zapallo", "Una alternativa de sabor vegetal."],
      ["Zanahoria", "Una propuesta inspirada en vegetales."]
    ]
  },

  "Cattinis": {
    categoria: "BARK & MEOW BISTRO",
    descripcion: "Opciones conceptuales para el menú felino.",
    opciones: [
      ["Pollo", "Propuesta inspirada en pollo."],
      ["Atún", "Propuesta inspirada en pescado."],
      ["Salmón", "Otra idea de sabor a pescado."],
      ["Hierba gatera", "Inspiración para una opción felina."]
    ]
  }
};

function abrirModal(nombre) {
  const producto = catalogo[nombre];

  if (!producto) return;

  modalCategory.textContent = producto.categoria;
  modalTitle.textContent = nombre;
  modalDescription.textContent = producto.descripcion;
  modalOptions.replaceChildren();

  producto.opciones.forEach(([titulo, descripcion], index) => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "modal-option";
    tarjeta.style.animationDelay = `${index * 0.07}s`;

    const encabezado = document.createElement("h3");
    encabezado.textContent = titulo;

    const texto = document.createElement("p");
    texto.textContent = descripcion;

    tarjeta.append(encabezado, texto);
    modalOptions.appendChild(tarjeta);
  });

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", cerrarModal);

modal.addEventListener("click", (evento) => {
  if (evento.target === modal) cerrarModal();
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") cerrarModal();
});

/* Conecta los botones con su ventana emergente */
document.querySelectorAll("[data-modal]").forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirModal(boton.dataset.modal);
  });
});
