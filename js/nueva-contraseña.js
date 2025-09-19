function togglePassword(id, element) {
  const input = document.getElementById(id);
  const icon = element.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

document.getElementById("passwordForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  alert("Contraseña guardada con éxito ✅");
});
