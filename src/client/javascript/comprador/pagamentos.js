// pagamentos.js

// Dados de exemplo (simulação de métodos de pagamento)
let pagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];

// Elementos do DOM
const pagamentosContainer = document.getElementById("pagamentos-container");
const modal = document.getElementById("modal-pagamento");
const formPagamento = document.getElementById("form-pagamento");
const btnAdicionarPagamento = document.getElementById("btn-adicionar-pagamento");
const modalTitulo = document.getElementById("modal-titulo-pagamento");
const tipoPagamentoInput = document.getElementById("tipo-pagamento");
const detalhesPagamentoInput = document.getElementById("detalhes-pagamento");
let pagamentoEditando = null;

// Função para exibir os métodos de pagamento na página
function exibirPagamentos() {
  pagamentosContainer.innerHTML = "";

  pagamentos.forEach((pagamento, index) => {
    const pagamentoDiv = document.createElement("div");
    pagamentoDiv.className = "pagamento";

    pagamentoDiv.innerHTML = `
      <p><strong>Tipo:</strong> ${pagamento.tipo}</p>
      <p><strong>Detalhes:</strong> ${pagamento.detalhes}</p>
      <div class="acoes">
        <button class="btn-editar" data-index="${index}">Editar</button>
        <button class="btn-remover" data-index="${index}">Remover</button>
      </div>
    `;

    pagamentosContainer.appendChild(pagamentoDiv);
  });
}

// Função para abrir o modal de adicionar/editar método de pagamento
function abrirModal(editar = false, index = null) {
  if (editar) {
    modalTitulo.textContent = "Editar Método de Pagamento";
    tipoPagamentoInput.value = pagamentos[index].tipo;
    detalhesPagamentoInput.value = pagamentos[index].detalhes;
    pagamentoEditando = index;
  } else {
    modalTitulo.textContent = "Adicionar Método de Pagamento";
    tipoPagamentoInput.value = "pix";
    detalhesPagamentoInput.value = "";
    pagamentoEditando = null;
  }
  modal.style.display = "block";
}

// Função para fechar o modal
function fecharModal() {
  modal.style.display = "none";
}

// Função para salvar método de pagamento (adicionar ou editar)
function salvarPagamento(event) {
  event.preventDefault();

  const tipo = tipoPagamentoInput.value;
  const detalhes = detalhesPagamentoInput.value.trim();

  if (pagamentoEditando !== null) {
    // Editar método de pagamento existente
    pagamentos[pagamentoEditando] = { tipo, detalhes };
  } else {
    // Adicionar novo método de pagamento
    pagamentos.push({ tipo, detalhes });
  }

  localStorage.setItem("pagamentos", JSON.stringify(pagamentos));
  exibirPagamentos();
  fecharModal();
}

// Função para remover método de pagamento
function removerPagamento(index) {
  pagamentos.splice(index, 1);
  localStorage.setItem("pagamentos", JSON.stringify(pagamentos));
  exibirPagamentos();
}

// Eventos
btnAdicionarPagamento.addEventListener("click", () => abrirModal());
formPagamento.addEventListener("submit", salvarPagamento);
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-editar")) {
    const index = event.target.getAttribute("data-index");
    abrirModal(true, index);
  }
  if (event.target.classList.contains("btn-remover")) {
    const index = event.target.getAttribute("data-index");
    removerPagamento(index);
  }
  if (event.target.classList.contains("close")) {
    fecharModal();
  }
});

// Carrega os métodos de pagamento quando a página é aberta
document.addEventListener("DOMContentLoaded", exibirPagamentos);
