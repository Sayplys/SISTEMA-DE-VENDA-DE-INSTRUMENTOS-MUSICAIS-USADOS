import { getUsuarios } from "/scripts/api/usuario.js";

// Função para buscar um usuário pelo e-mail
export async function buscarUsuarioPorEmail(email) {
  try {
    const usuarios = await getUsuarios(); // Busca todos os usuários
    const usuario = usuarios.find((user) => user.email === email); // Filtra pelo e-mail
    return usuario || null; // Retorna o usuário encontrado ou null
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    throw error;
  }
}

// Função para validar o login
async function validarLogin(email, senha) {
  try {
    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      throw new Error("E-mail não encontrado.");
    }

    // Verifica se a senha fornecida corresponde à senha do usuário
    if (usuario.senha !== senha) {
      throw new Error("Senha incorreta.");
    }

    // Simula a criação de um token de autenticação
    const token = usuario.id;
    document.cookie = `authToken=${token}; path=/; max-age=3600`; // Expira em 1 hora

    // Redireciona para a página de perfil
    window.location.href = "/paginas/perfil/perfil.html";
  } catch (error) {
    alert(error.message);
  }
}

// Verifica se o token de autenticação está presente nos cookies
function checkAuthToken() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];

  if (token) {
    // Redireciona para a página de perfil se o token existir
    window.location.href = "/paginas/perfil/perfil.html";
  }
}

// Evento de carregamento da página
document.addEventListener("DOMContentLoaded", () => {
  checkAuthToken(); // Verifica o token ao carregar a página

  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    validarLogin(email, senha);
  });
});
