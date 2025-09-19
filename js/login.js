document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");
  const usuarioInput = document.querySelector("#usuario");
  const passwordInput = document.querySelector("#password");
  const toggleBtn = document.querySelector(".toggle-password");

  // 🔹 Mostrar/ocultar contraseña
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.textContent = isPassword ? "🙈" : "👁️"; // Cambia el icono
  });

  // 🔹 Validar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = usuarioInput.value.trim();
    const password = passwordInput.value.trim();

    const userValido = "admin";
    const passValido = "1234";

    if (usuario === "" || password === "") {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos."
      });
    } else if (usuario === userValido && password === passValido) {
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola ${usuario}, acceso concedido ✅`,
        confirmButtonText: "Continuar"
      }).then(() => {
        window.location.href = "./Index.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos ❌"
      });
    }
  });
});

