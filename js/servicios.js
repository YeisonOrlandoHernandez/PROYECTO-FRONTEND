document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#viewTable tbody"); // si usas tabla
  const cardContainer = document.getElementById("cardContainer"); // si usas cards

  // Modal referencias
  const modal = document.getElementById("modal");
  const cerrar = document.getElementById("cerrar");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalDescuento = document.getElementById("modal-descuento");
  const modalPrecioOriginal = document.getElementById("modal-precio-original");
  const modalPrecioOferta = document.getElementById("modal-precio-oferta");
  const modalDetalle = document.getElementById("modal-detalle");
  const modalLista = document.getElementById("modal-lista");

  // Obtener servicios desde localStorage
  const services = JSON.parse(localStorage.getItem("services")) || [];

  // Renderizar como tabla o como cards
  function renderServices() {
    if (tableBody) {
      tableBody.innerHTML = "";
    }
    if (cardContainer) {
      cardContainer.innerHTML = "";
    }

    services.forEach((s, index) => {
      // Si usas tabla
      if (tableBody) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${s.name}</td>
          <td>${s.desc}</td>
          <td>${s.availability}</td>
          <td>$${s.price}</td>
          <td><button class="btn" data-index="${index}">Ver más</button></td>
        `;
        tableBody.appendChild(row);
      }

      // Si usas cards
      if (cardContainer) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.titulo = s.name;
        card.dataset.precioOriginal = s.price;
        card.dataset.precioOferta = s.price; // puedes poner cálculo de descuento aquí
        card.dataset.descuento = "";
        card.dataset.detalle = s.desc;
        card.dataset.lista = "Disponibilidad: " + s.availability;

        card.innerHTML = `
          <h3>${s.name}</h3>
          <p>${s.desc}</p>
          <p><strong>$${s.price}</strong></p>
          <button class="btn">Ver más</button>
        `;
        cardContainer.appendChild(card);
      }
    });

    // Re-asignar eventos a botones
    asignarEventosModal();
  }

  // Abrir modal al hacer clic en botones
  function asignarEventosModal() {
    const botones = document.querySelectorAll(".btn");
    botones.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".card") || btn.closest("tr");

        const titulo = card.dataset.titulo;
        const precioOriginal = card.dataset.precioOriginal;
        const precioOferta = card.dataset.precioOferta;
        const descuento = card.dataset.descuento;
        const detalle = card.dataset.detalle;
        const lista = card.dataset.lista ? card.dataset.lista.split(";") : [];

        modalTitulo.textContent = titulo;
        modalDescuento.textContent = descuento ? `${descuento}% OFF` : "";
        modalPrecioOriginal.textContent = precioOriginal ? `$${precioOriginal}` : "";
        modalPrecioOferta.textContent = precioOferta ? `Ahora $${precioOferta}` : "";
        modalDetalle.textContent = detalle;

        modalLista.innerHTML = "";
        lista.forEach(item => {
          if (item.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = item.trim();
            modalLista.appendChild(li);
          }
        });

        modal.style.display = "flex";
      });
    });
  }

  // Cerrar modal
  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  renderServices();
});
