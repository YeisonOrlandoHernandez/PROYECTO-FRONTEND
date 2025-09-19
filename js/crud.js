  $(document).ready(function () {
    const $modal = $("#modalForm");
    const $btnAdd = $("#btnAdd");
    const $btnCancel = $("#btnCancel");
    const $form = $("#serviceForm");
    const $editIndex = $("#editIndex");
    const $searchInput = $("#searchInput");

  // Datos iniciales
 let services = JSON.parse(localStorage.getItem("services")) || [
    { name: "Servicios de infraestructura y soporte", desc: "Este servicio está diseñado para garantizar que las empresas cuenten con una base tecnológica sólida, segura y eficiente. Incluye la implementación, administración y mantenimiento de la infraestructura tecnológica (servidores, redes, equipos de cómputo y almacenamiento), así como soporte técnico especializado para resolver incidencias y optimizar el rendimiento de los sistemas.", availability: "Disponible", price: 100000 },
    { name: "Servicios en la nube", desc: "Ofrecemos soluciones seguras y escalables para almacenar, gestionar y acceder a la información de tu empresa desde cualquier lugar y dispositivo. Nuestros servicios en la nube garantizan disponibilidad, respaldo automático, optimización de costos y la máxima protección de tus datos, facilitando la colaboración y la continuidad de tu negocio.", availability: "Disponible", price: 120000 },
    { name: "Servicios de ciberseguridad", desc: "Protegemos la información y los sistemas de tu empresa frente a amenazas digitales. Ofrecemos soluciones de seguridad avanzada como monitoreo constante, detección de vulnerabilidades, gestión de accesos y protección contra ciberataques, garantizando la confidencialidad, integridad y disponibilidad de tus datos.", availability: "Disponible", price: 140000 },
    { name: "Desarrollo de software", desc: "Diseñamos y creamos aplicaciones a la medida de las necesidades de tu negocio. Nuestro equipo desarrolla soluciones innovadoras, escalables y seguras que optimizan procesos, mejoran la productividad y ofrecen experiencias digitales de alto valor para tus clientes.", availability: "Disponible", price: 100000 },
    { name: "Servicios de datos e inteligencia", desc: "Transformamos los datos de tu empresa en información estratégica para la toma de decisiones. Implementamos soluciones de análisis avanzado, inteligencia de negocios (BI) e inteligencia artificial que permiten identificar oportunidades, optimizar procesos y anticipar tendencias del mercado.", availability: "Disponible", price: 120000 },
    { name: "Servicios de innovación digital", desc: "Impulsamos la transformación de tu negocio mediante soluciones digitales innovadoras. Aplicamos tecnologías emergentes, metodologías ágiles y estrategias disruptivas que permiten crear nuevos modelos de negocio, mejorar la experiencia del cliente y mantener tu empresa a la vanguardia del mercado.", availability: "Disponible", price: 140000 },
    { name: "Servicios especializados", desc: "Brindamos soluciones tecnológicas adaptadas a las necesidades específicas de cada sector. Nuestro enfoque combina experiencia, conocimiento técnico y mejores prácticas para ofrecer servicios personalizados que aseguran resultados efectivos y un alto valor para tu negocio.", availability: "Disponible", price: 100000 },
    { name: "Servicios de capacitación y formación", desc: "Fortalecemos las competencias digitales y tecnológicas de tu equipo a través de programas de capacitación prácticos y personalizados. Ofrecemos talleres, cursos y entrenamientos especializados que impulsan la adopción de nuevas herramientas y fomentan la innovación dentro de tu organización.", availability: "Disponible", price: 120000 },
    { name: "Servicios de telecomunicaciones", desc: "Ofrecemos soluciones de conectividad confiables y de alto rendimiento que garantizan la comunicación fluida de tu empresa. Implementamos redes seguras, telefonía IP, internet dedicado y servicios integrados que aseguran disponibilidad, escalabilidad y soporte constante para tu operación.", availability: "Disponible", price: 140000 },
    { name: "Servicios creativos y multimedia", desc: "Desarrollamos contenidos visuales y digitales innovadores que potencian la identidad de tu marca. Ofrecemos diseño gráfico, producción audiovisual, animación y soluciones multimedia que comunican tus ideas de manera efectiva y atractiva para cautivar a tu audiencia.", availability: "Disponible", price: 120000 }
  ];

  // Inicializar DataTable
  const table = $("#serviceTable").DataTable({
    data: services,
    columns: [
      { data: "name" },
      { data: "desc" },
      { data: "availability" },
      { data: "price" },
      {
        data: null,
        orderable: false,
        searchable: false,
        render: function (_, __, row, meta) {
          return `
            <span class="action-btn edit" data-index="${meta.row}" title="Editar">✏️</span>
            <span class="action-btn delete" data-index="${meta.row}" title="Eliminar">🗑️</span>
          `;
        }
      }
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
    },
    pageLength: 5,
    dom: "lrtip"
  });

  // Guardar en localStorage
  function saveToStorage() {
    localStorage.setItem("services", JSON.stringify(services));
  }

  // Renderizar tabla
  function renderTable() {
    table.clear().rows.add(services).draw();
  }

  // Abrir modal
  $btnAdd.on("click", function () {
    $("#modalTitle").text("Añadir Servicio");
    $form[0].reset();
    $editIndex.val("");
    $modal.show();
  });

  // Cancelar modal
  $btnCancel.on("click", function () {
    $modal.hide();
  });

  // Guardar servicio
  $form.on("submit", function (e) {
    e.preventDefault();
    const service = {
      name: $("#serviceName").val(),
      desc: $("#serviceDesc").val(),
      availability: $("#serviceAvailability").val(),
      price: $("#servicePrice").val()
    };
    const index = $editIndex.val();

    if (index === "") {
      services.push(service);
      Swal.fire({
        title: "Servicio añadido",
        text: "El servicio se ha guardado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    } else {
      services[index] = service;
      Swal.fire({
        title: "Servicio actualizado",
        text: "Los cambios se han guardado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });
    }

    saveToStorage();
    renderTable();
    $modal.hide();
  });

  // Editar servicio
  $("#serviceTable").on("click", ".edit", function () {
    const index = $(this).data("index");
    const s = services[index];
    $("#modalTitle").text("Editar Servicio");
    $("#serviceName").val(s.name);
    $("#serviceDesc").val(s.desc);
    $("#serviceAvailability").val(s.availability);
    $("#servicePrice").val(s.price);
    $editIndex.val(index);
    $modal.show();
  });

  // Eliminar servicio con SweetAlert2
  $("#serviceTable").on("click", ".delete", function () {
    const index = $(this).data("index");

    Swal.fire({
      title: "¿Eliminar este servicio?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        services.splice(index, 1);
        saveToStorage();
        renderTable();

        Swal.fire({
          title: "Eliminado",
          text: "El servicio ha sido eliminado correctamente.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  });

  // Buscador personalizado
  $searchInput.on("input", function () {
    table.column(0).search(this.value).draw();
  });

  renderTable();
});