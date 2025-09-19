$(document).ready(function () {
  const $inputCodigo = $("#codigo");
  const $toggleBtn = $(".toggle-visibility");
  const $siguienteBtn = $("#siguiente");

  // 🔹 Mostrar/ocultar código
  $toggleBtn.on("click", function () {
    const esPassword = $inputCodigo.attr("type") === "password";
    $inputCodigo.attr("type", esPassword ? "text" : "password");

    // Cambiar icono
    $toggleBtn.text(esPassword ? "🙈" : "👁");
  });

  // 🔹 Validación con SweetAlert2
  $siguienteBtn.on("click", function () {
    const codigo = $inputCodigo.val().trim();

    if (!codigo) {
      Swal.fire({
        icon: "warning",
        title: "Atención",
        text: "Por favor, ingrese el código de verificación.",
        confirmButtonColor: "#6c63ff"
      });
      $inputCodigo.focus();
      return;
    }

    if (codigo === "12335") {
      Swal.fire({
        icon: "success",
        title: "¡Código correcto!",
        text: "El código ha sido verificado correctamente ✅",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#6c63ff"
      }).then(() => {
        window.location.href = "./nueva-contraseña.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Código incorrecto",
        text: "El código ingresado no es válido ❌",
        confirmButtonColor: "#6c63ff"
      });
      $inputCodigo.val("").focus();
    }
  });

  // 🔹 Permitir Enter
  $inputCodigo.on("keypress", function (e) {
    if (e.which === 13) {
      $siguienteBtn.click();
    }
  });
});
