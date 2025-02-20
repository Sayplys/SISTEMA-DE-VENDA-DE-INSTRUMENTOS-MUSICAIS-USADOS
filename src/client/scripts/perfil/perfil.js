import { getUsuarioById, updateUsuario, deleteUsuario } from "../../scripts/api/usuario.js";
import { getEnderecos, createEndereco, updateEndereco, deleteEndereco } from "../../scripts/api/endereco.js";

// Obtém o ID do usuário a partir do cookie
const usuarioId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
    ?.split("=")[1];
console.log(usuarioId);

// Função para carregar as informações do usuário
async function carregarInformacoesUsuario() {
  try {
    const usuario = await getUsuarioById(usuarioId);
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("cpf").value = usuario.cpf;
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefone").value = usuario.telefone;
    document.getElementById("senha").value = usuario.senha;
    document.getElementById("nivel_acesso").value = usuario.nivel_acesso;
  } catch (error) {
    console.error("Erro ao carregar informações do usuário:", error);
  }
}

// Função para carregar o endereço do usuário
async function carregarEndereco() {
  try {
    const enderecos = await getEnderecos();
    let enderecoUsuario = null;
		for (const endereco of enderecos) {
			if (endereco.usuario_id == usuarioId) {
				enderecoUsuario = endereco;
				break;
			}
		}
    if (enderecoUsuario) {
      document.getElementById("cep").value = enderecoUsuario.cep;
      document.getElementById("rua").value = enderecoUsuario.rua;
      document.getElementById("bairro").value = enderecoUsuario.bairro;
      document.getElementById("uf").value = enderecoUsuario.uf;
      document.getElementById("complemento").value = enderecoUsuario.complemento;
    }
  } catch (error) {
    console.error("Erro ao carregar endereço:", error);
  }
}


// Função para salvar as informações do usuário
document.getElementById("form-usuario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const usuario = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    senha: document.getElementById("senha").value,
    nivel_acesso: document.getElementById("nivel_acesso").value,
  };

  try {
    await updateUsuario(usuarioId, usuario);
    alert("Informações do usuário atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    alert("Erro ao atualizar usuário.");
  }
});

// Função para salvar o endereço
document.getElementById("form-endereco").addEventListener("submit", async (e) => {
  e.preventDefault();
  const endereco = {
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    bairro: document.getElementById("bairro").value,
    uf: document.getElementById("uf").value,
    complemento: document.getElementById("complemento").value,
    usuario_id: usuarioId,
  };

  try {
    const enderecos = await getEnderecos();
		let enderecoExistente = null;
		console.log(enderecos);
		for (const endereco of enderecos) {
			console.log(endereco.usuario_id);
			console.log(usuarioId);	
			if (endereco.usuario_id == usuarioId) {
				enderecoExistente = endereco;
				break;
			}
		}
		console.log(enderecoExistente);

    if (enderecoExistente) {
      await updateEndereco(enderecoExistente.id, endereco);
      alert("Endereço atualizado com sucesso!");
    } else {
      await createEndereco(endereco);
      alert("Endereço criado com sucesso!");
    }

    carregarEndereco();
  } catch (error) {
    console.error("Erro ao salvar endereço:", error);
    alert("Erro ao salvar endereço.");
  }
});

// Função para remover a conta do usuário
document.getElementById("remover-conta").addEventListener("click", async () => {
  const confirmacao = confirm("Tem certeza que deseja remover sua conta? Esta ação não pode ser desfeita.");
  if (!confirmacao) return;

  try {
    // Remove o endereço do usuário (se existir)
    const enderecos = await getEnderecos();
		for (const endereco of enderecos) {
			if (endereco.usuario_id == usuarioId) {
				await deleteEndereco(endereco.id);
				break;
			}
		}

    // Remove o usuário
    await deleteUsuario(usuarioId);

    // Limpa o cookie de autenticação
    document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redireciona para a página inicial
    alert("Conta removida com sucesso.");
    window.location.href = "../../index.html";
  } catch (error) {
    console.error("Erro ao remover conta:", error);
    alert("Erro ao remover conta.");
  }
});

// Carrega as informações ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  carregarInformacoesUsuario();
  carregarEndereco();
  carregarFormasPagamento();
});
