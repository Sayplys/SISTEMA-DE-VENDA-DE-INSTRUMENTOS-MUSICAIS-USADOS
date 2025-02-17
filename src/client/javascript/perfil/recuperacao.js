// recuperacao.js

const API_BASE_URL = "http://localhost:8000"; // URL da API

document.getElementById("form-recuperacao").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const response = await fetch(`${API_BASE_URL}/recuperacao-senha/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar link de recuperação");
    }

    alert("Link de recuperação enviado para o seu email!");
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao enviar link de recuperação. Tente novamente.");
  }
});
