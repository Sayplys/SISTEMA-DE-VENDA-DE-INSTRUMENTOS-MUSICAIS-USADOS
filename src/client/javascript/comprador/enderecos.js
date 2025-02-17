// enderecos.js

// Dados de exemplo (simulação de endereços)
let enderecos = JSON.parse(localStorage.getItem("enderecos")) || [];

// Elementos do DOM
const enderecosContainer = document.getElementById("enderecos-container");
const modal = document.getElementById("modal-endereco");
const formEndereco = document.getElementById("form-endereco");
const btnAdicionarEndereco = document.getElementById("btn-adicionar-endereco");
const modalTitulo = document.getElementById("modal-titulo");
const enderecoInput = document.getElementById("endereco");
let enderecoEditando = null;

// Função para exibir os endereços na página
function exibirEnderecos() {
  enderecosContainer.innerHTML = "";

  enderecos.forEach((endereco, index) => {
    const enderecoDiv = document.createElement("div");
    enderecoDiv.className = "endereco";

    enderecoDiv.innerHTML = `
      <p>${endereco}</p>
      <div class="acoes">
        <button class="btn-editar" data-index="${index}">Editar</button>
        <button class="btn-remover" data-index="${index}">Remover</button>
      </div>
    `;

    enderecosContainer.appendChild(enderecoDiv);
  });
}

// Função para abrir o modal de adicionar/editar endereço
function abrirModal(editar = false, index = null) {
  if (editar) {
    modalTitulo.textContent = "Editar Endereço";
    enderecoInput.value = enderecos[index];
    enderecoEditando = index;
  } else {
    modalTitulo.textContent = "Adicionar Endereço";
    enderecoInput.value = "";
    enderecoEditando = null;
  }
  modal.style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
  modal.style.display = "none";
}

// Função para salvar endereço (adicionar ou editar)
function salvarEndereco(event) {
  event.preventDefault();

  const endereco = enderecoInput.value.trim();

  if (enderecoEditando !== null) {
    // Editar endereço existente
    enderecos[enderecoEditando] = endereco;
  } else {
    // Adicionar novo endereço
    enderecos.push(endereco);
  }

  localStorage.setItem("enderecos", JSON.stringify(enderecos));
  exibirEnderecos();
  fecharModal();
}

// Função para remover endereço
function removerEndereco(index) {
  enderecos.splice(index, 1);
  localStorage.setItem("enderecos", JSON.stringify(enderecos));
  exibirEnderecos();
}

// Eventos
btnAdicionarEndereco.addEventListener("click", () => abrirModal());
formEndereco.addEventListener("submit", salvarEndereco);
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-editar")) {
    const index = event.target.getAttribute("data-index");
    abrirModal(true, index);
  }
  if (event.target.classList.contains("btn-remover")) {
    const index = event.target.getAttribute("data-index");
    removerEndereco(index);
  }
  if (event.target.classList.contains("close")) {
    fecharModal();
  }
});

// Carrega os endereços quando a página é aberta
document.addEventListener("DOMContentLoaded", exibirEnderecos);
