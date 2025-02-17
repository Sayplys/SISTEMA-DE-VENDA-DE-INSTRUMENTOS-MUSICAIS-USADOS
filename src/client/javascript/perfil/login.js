// login.js

const API_BASE_URL = "http://localhost:8000"; // URL da API

document.getElementById("form-login").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const credenciais = {
    email,
    senha,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciais),
    });

    if (!response.ok) {
      throw new Error("Credenciais inválidas");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // Salva o token no localStorage
    alert("Login realizado com sucesso!");
    window.location.href = "index.html"; // Redireciona para a página inicial
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
});
