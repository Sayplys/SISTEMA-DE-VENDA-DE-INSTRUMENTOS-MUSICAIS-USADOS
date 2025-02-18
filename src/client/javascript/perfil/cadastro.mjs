// cadastro.js

import { createUsuario } from "/javascript/api/apiUsuarios.mjs";

const API_BASE_URL = "http://localhost:8000"; // URL da API

document.getElementById("form-cadastro").addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const telefone = document.getElementById("telefone").value;
	const cpf = document.getElementById("cpf").value;

  const usuario = {
    nome,
    email,
    senha,
    telefone,
		cpf,
		nivel_acesso: "cliente",
		endereco: null,
		produtos: null,
		pedidos: null,
		vendas: null,
  };

  try {
		response = await createUsuario(usuario);
	
		if (!response.ok) {
			throw new Error("Erro ao criar usuário");
		}

    alert("Cadastro realizado com sucesso!");
    window.location.href = "/html/perfil/login.html"; // Redireciona para a página de login
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao cadastrar usuário. Tente novamente.");
  }
});
