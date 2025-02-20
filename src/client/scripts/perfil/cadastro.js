import { createUsuario, getUsuarios } from "/scripts/api/usuario.js";

// Função para buscar um usuário pelo e-mail
async function buscarUsuarioPorEmail(email) {
  try {
    const usuarios = await getUsuarios(); // Busca todos os usuários
    const usuario = usuarios.find((user) => user.email === email); // Filtra pelo e-mail
    return usuario || null; // Retorna o usuário encontrado ou null
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
}

// Função para realizar o cadastro
async function cadastrarUsuario(usuario) {
  try {
    // Verifica se o e-mail já está cadastrado
		console.log(usuario.email);
    const user = await buscarUsuarioPorEmail(usuario.email);
		console.log(user);
    if (user) {
      alert("E-mail já cadastrado!");
      return;
    }

    // Cria o usuário
    const novoUsuario = await createUsuario(usuario);
    alert("Usuário cadastrado com sucesso!");

    // Redireciona para a página de login
    window.location.href = "login.html";
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    alert("Erro ao cadastrar usuário. Tente novamente.");
  }
}

// Evento de carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  const cadastroForm = document.getElementById("cadastro-form");
  cadastroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Coleta os dados do formulário
    const usuario = {
      nome: document.getElementById("nome").value,
      cpf: document.getElementById("cpf").value,
      email: document.getElementById("email").value,
      senha: document.getElementById("senha").value,
      telefone: document.getElementById("telefone").value,
      nivel_acesso: document.getElementById("nivel_acesso").value,
    };

    // Chama a função de cadastro
    cadastrarUsuario(usuario);
  });
});
