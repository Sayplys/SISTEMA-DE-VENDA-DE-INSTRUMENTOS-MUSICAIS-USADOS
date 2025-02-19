// login.mjs
import { getUsuarios } from "../api/apiUsuarios.mjs";

const API_BASE_URL = "http://127.0.0.1:8000"; // URL da API

document.getElementById("form-login").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const credenciais = {
    email,
    senha,
  };

  try {
		const data = JSON.parse(localStorage.getItem("token"));
		if (data !== null) { 
			if (data.id) {
				alert("Usuário já está logado");
				return;
			}
		}


		const usuarios = await getUsuarios();
		const usuario = usuarios.find((usuario) => usuario.email === email);
		if (!usuario) {
			throw new Error("Credenciais inválidas");
		}
		if (usuario.senha !== senha) {
			throw new Error("Credenciais inválidas");
		}
		
		localStorage.setItem("token", usuario.id);

    alert("Login realizado com sucesso!");
    window.location.href = "index.html"; // Redireciona para a página inicial
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao fazer login. Verifique suas credenciais.");
  }
});
