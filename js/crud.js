  $(document).ready(function () {
  const $modal = $("#modalForm");
  const $btnAdd = $("#btnAdd");
  const $btnCancel = $("#btnCancel");
  const $form = $("#serviceForm");
  const $editIndex = $("#editIndex");
  const $searchInput = $("#searchInput");

  let services = [];

  // Datos iniciales (backup)
  const defaultServices = [
    {
      name: "Servicios de infraestructura y soporte",
      desc: "Garantiza una base tecnológica sólida y eficiente con soporte técnico y mantenimiento.",
      availability: "Disponible",
      price: 100000
    },
    {
      name: "Servicios en la nube",
      desc: "Soluciones seguras y escalables para almacenar y acceder a la información desde cualquier lugar.",
      availability: "Disponible",
      price: 120000
    },
    {
      name: "Servicios de ciberseguridad",
      desc: "Protección avanzada contra amenazas digitales, vulnerabilidades y ciberataques.",
      availability: "Disponible",
      price: 140000
    },
    {
      name: "Desarrollo de software",
      desc: "Aplicaciones a la medida que optimizan procesos y mejoran la productividad.",
      availability: "Disponible",
      price: 100000
    },
    {
      name: "Servicios de datos e inteligencia",
      desc: "Transformamos los datos en información estratégica con BI e inteligencia artificial.",
      availability: "Disponible",
      price: 120000
    },
    {
      name: "Consultoría tecnológica",
      desc: "Asesoría experta para implementar soluciones tecnológicas adecuadas a cada negocio.",
      availability: "Disponible",
      price: 80000
    },
    {
      name: "Desarrollo web y móvil",
      desc: "Diseño y desarrollo de plataformas web y aplicaciones móviles modernas.",
      availability: "Disponible",
      price: 150000
    },
    {
      name: "Soporte técnico remoto",
      desc: "Atención rápida y eficiente para resolver incidentes técnicos sin desplazamiento.",
      availability: "Disponible",
      price: 70000
    },
    {
      name: "Gestión de redes y servidores",
      desc: "Administración, monitoreo y optimización de infraestructura de red y servidores.",
      availability: "Disponible",
      price: 130000
    },
    {
      name: "Respaldo y recuperación de datos",
      desc: "Sistemas automáticos de copia de seguridad y restauración de información.",
      availability: "Disponible",
      price: 110000
    },
    {
      name: "Capacitación tecnológica",
      desc: "Cursos personalizados para mejorar las habilidades digitales del personal.",
      availability: "Disponible",
      price: 60000
    },
    {
      name: "Integración de sistemas",
      desc: "Conectamos diferentes plataformas y aplicaciones para optimizar procesos.",
      availability: "Disponible",
      price: 95000
    },
    {
      name: "Automatización de procesos",
      desc: "Implementación de flujos automáticos para reducir errores y mejorar eficiencia.",
      availability: "Disponible",
      price: 125000
    },
    {
      name: "Monitoreo de sistemas 24/7",
      desc: "Supervisión constante para garantizar el rendimiento y disponibilidad de los servicios.",
      availability: "Disponible",
      price: 115000
    },
    {
      name: "Análisis de vulnerabilidades",
      desc: "Identificación de riesgos de seguridad antes de que se conviertan en amenazas.",
      availability: "Disponible",
      price: 135000
    },
    {
      name: "Consultoría en transformación digital",
      desc: "Ayudamos a las empresas a digitalizar y modernizar sus operaciones.",
      availability: "Disponible",
      price: 150000
    },
    {
      name: "Servicios de inteligencia artificial",
      desc: "Desarrollo de soluciones basadas en IA para optimizar decisiones empresariales.",
      availability: "Disponible",
      price: 180000
    },
    {
      name: "Análisis de datos empresariales",
      desc: "Informes avanzados y visualizaciones interactivas para toma de decisiones.",
      availability: "Disponible",
      price: 120000
    },
    {
      name: "Gestión de proyectos tecnológicos",
      desc: "Planificación, ejecución y control de proyectos de TI.",
      availability: "Disponible",
      price: 110000
    },
    {
      name: "Auditoría informática",
      desc: "Evaluación integral de la infraestructura tecnológica y cumplimiento de estándares.",
      availability: "Disponible",
      price: 95000
    }
  ];

  // Guardar en localStorage
  function saveToStorage() {
    localStorage.setItem("services", JSON.stringify(services));
  }

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

  function renderTable() {
    table.clear().rows.add(services).draw();
  }

  // Cargar servicios
  function loadServices() {
    const localData = localStorage.getItem("services");

    if (localData) {
      services = JSON.parse(localData);
      renderTable();
    } else {
      $.getJSON("./services.json")
        .done(function (data) {
          services = data;
          saveToStorage();
          renderTable();
        })
        .fail(function () {
          console.warn("No se pudo cargar el archivo JSON. Usando datos locales predeterminados.");
          services = defaultServices;
          saveToStorage();
          renderTable();
        });
    }
  }

  // Botón añadir
  $btnAdd.on("click", function () {
    $("#modalTitle").text("Añadir Servicio");
    $form[0].reset();
    $editIndex.val("");
    $modal.show();
  });

  // Botón cancelar
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
      Swal.fire("Servicio añadido", "El servicio se ha guardado correctamente.", "success");
    } else {
      services[index] = service;
      Swal.fire("Servicio actualizado", "Los cambios se han guardado correctamente.", "success");
    }

    saveToStorage();
    renderTable();
    $modal.hide();
  });

  // Editar
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

  // Eliminar
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
        Swal.fire("Eliminado", "El servicio ha sido eliminado correctamente.", "success");
      }
    });
  });

  // Buscador
  $searchInput.on("input", function () {
    table.column(0).search(this.value).draw();
  });

  // Cargar al inicio
  loadServices();
});
