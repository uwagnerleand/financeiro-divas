// ============================================================
//  DIVAS DA COMPOSTAGEM — Gestão Financeira
//  Dados salvos no localStorage do navegador
// ============================================================

const STORAGE_KEY = 'divas_financeiro_v1';

// Estado global
let transacoes = [];
let editandoId  = null;
let deletandoId = null;
let filtros = { mes: '', tipo: '', busca: '' };

// ============================================================
// PERSISTÊNCIA (localStorage)
// ============================================================

function carregarDados() {
    try {
        const salvo = localStorage.getItem(STORAGE_KEY);
        transacoes = salvo ? JSON.parse(salvo) : [];
    } catch (_) {
        transacoes = [];
    }
}

function salvarDados() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transacoes));
}

// ============================================================
// CRUD
// ============================================================

function gerarId() {
    return 'tx_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

function proximoNumero() {
    if (transacoes.length === 0) return 1;
    return Math.max(...transacoes.map(t => t.numero || 0)) + 1;
}

function adicionar(dados) {
    const nova = {
        id:        gerarId(),
        numero:    proximoNumero(),
        descricao: dados.descricao.trim(),
        tipo:      dados.tipo,
        mes:       dados.mes,
        valor:     parseFloat(dados.valor),
        criado:    new Date().toISOString()
    };
    transacoes.push(nova);
    salvarDados();
    return nova;
}

function atualizar(id, dados) {
    const idx = transacoes.findIndex(t => t.id === id);
    if (idx !== -1) {
        transacoes[idx] = {
            ...transacoes[idx],
            descricao:   dados.descricao.trim(),
            tipo:        dados.tipo,
            mes:         dados.mes,
            valor:       parseFloat(dados.valor),
            atualizado:  new Date().toISOString()
        };
        salvarDados();
    }
}

function remover(id) {
    transacoes = transacoes.filter(t => t.id !== id);
    salvarDados();
}

// ============================================================
// FILTROS E CÁLCULOS
// ============================================================

function obterFiltradas() {
    return transacoes.filter(t => {
        if (filtros.mes  && t.mes  !== filtros.mes)                                         return false;
        if (filtros.tipo && t.tipo !== filtros.tipo)                                        return false;
        if (filtros.busca && !t.descricao.toLowerCase().includes(filtros.busca.toLowerCase())) return false;
        return true;
    });
}

function calcularTotais(lista) {
    const entradas = lista.filter(t => t.tipo === 'ENTRADA').reduce((s, t) => s + t.valor, 0);
    const saidas   = lista.filter(t => t.tipo === 'SAÍDA')  .reduce((s, t) => s + t.valor, 0);
    return { entradas, saidas, saldo: entradas - saidas };
}

// ============================================================
// FORMATAÇÃO
// ============================================================

function formatBRL(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function escaparHtml(texto) {
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(texto));
    return el.innerHTML;
}

// ============================================================
// RENDERIZAÇÃO
// ============================================================

function renderizar() {
    const filtradas   = obterFiltradas();
    const totaisGeral = calcularTotais(transacoes);   // saldo do header = sempre total geral
    const totaisFilt  = calcularTotais(filtradas);    // cards = conforme filtro

    // Header saldo (sempre total)
    const headerSaldo = document.getElementById('headerBalance');
    headerSaldo.textContent = formatBRL(totaisGeral.saldo);
    headerSaldo.style.color = totaisGeral.saldo >= 0 ? '#fff' : '#FFCDD2';

    // Cards
    document.getElementById('totalEntradas').textContent = formatBRL(totaisFilt.entradas);
    document.getElementById('totalSaidas').textContent   = formatBRL(totaisFilt.saidas);
    document.getElementById('totalSaldo').textContent    = formatBRL(totaisFilt.saldo);

    const saldoEl   = document.getElementById('totalSaldo');
    const saldoCard = saldoEl.closest('.summary-card');
    if (totaisFilt.saldo >= 0) {
        saldoEl.style.color = 'var(--azul)';
        saldoCard.style.borderLeftColor = 'var(--azul)';
    } else {
        saldoEl.style.color = 'var(--vermelho)';
        saldoCard.style.borderLeftColor = 'var(--vermelho)';
    }

    // Contador
    const n = filtradas.length;
    const total = transacoes.length;
    document.getElementById('countLabel').textContent =
        n === total
            ? `${n} transaç${n === 1 ? 'ão' : 'ões'}`
            : `${n} de ${total} transaç${total === 1 ? 'ão' : 'ões'} (filtrado)`;

    // Tabela
    const tbody    = document.getElementById('transactionsBody');
    const emptySt  = document.getElementById('emptyState');

    if (filtradas.length === 0) {
        tbody.innerHTML = '';
        emptySt.style.display = 'block';
        return;
    }
    emptySt.style.display = 'none';

    const ordenadas = [...filtradas].sort((a, b) => (a.numero || 0) - (b.numero || 0));

    tbody.innerHTML = ordenadas.map(t => `
        <tr>
            <td class="num-col">${t.numero}</td>
            <td class="descricao-col">${escaparHtml(t.descricao)}</td>
            <td>
                <span class="tipo-badge ${t.tipo === 'ENTRADA' ? 'tipo-entrada' : 'tipo-saida'}">
                    ${t.tipo === 'ENTRADA' ? '▲ ENTRADA' : '▼ SAÍDA'}
                </span>
            </td>
            <td><span class="mes-text">${t.mes}</span></td>
            <td class="valor-col ${t.tipo === 'ENTRADA' ? 'valor-entrada' : 'valor-saida'}">
                ${formatBRL(t.valor)}
            </td>
            <td>
                <div class="acoes-col">
                    <button class="btn btn-icon btn-edit"
                        onclick="abrirEdicao('${t.id}')" title="Editar">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn btn-icon btn-delete"
                        onclick="confirmarExclusao('${t.id}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// MODAL — NOVA / EDITAR TRANSAÇÃO
// ============================================================

function openModal() {
    editandoId = null;
    document.getElementById('modalTitle').textContent = 'Nova Transação';
    document.getElementById('transactionForm').reset();
    document.getElementById('saveBtn').innerHTML = '<i class="fas fa-save"></i> Salvar';
    document.getElementById('modalOverlay').classList.add('active');
    setTimeout(() => document.getElementById('descricao').focus(), 100);
}

function abrirEdicao(id) {
    const t = transacoes.find(tx => tx.id === id);
    if (!t) return;
    editandoId = id;
    document.getElementById('modalTitle').textContent = 'Editar Transação';
    document.getElementById('descricao').value = t.descricao;
    document.getElementById('tipo').value  = t.tipo;
    document.getElementById('mes').value   = t.mes;
    document.getElementById('valor').value = t.valor;
    document.getElementById('saveBtn').innerHTML = '<i class="fas fa-save"></i> Atualizar';
    document.getElementById('modalOverlay').classList.add('active');
    setTimeout(() => document.getElementById('descricao').focus(), 100);
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    editandoId = null;
}

function closeModalOnOverlay(e) {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// ============================================================
// SALVAR TRANSAÇÃO (submit do form)
// ============================================================

function saveTransaction(e) {
    e.preventDefault();

    const dados = {
        descricao: document.getElementById('descricao').value,
        tipo:      document.getElementById('tipo').value,
        mes:       document.getElementById('mes').value,
        valor:     document.getElementById('valor').value
    };

    if (!dados.descricao || !dados.tipo || !dados.mes || !dados.valor || parseFloat(dados.valor) <= 0) {
        mostrarToast('Preencha todos os campos corretamente.', 'error');
        return;
    }

    if (editandoId) {
        atualizar(editandoId, dados);
        mostrarToast('Transação atualizada com sucesso!', 'success');
    } else {
        adicionar(dados);
        mostrarToast('Transação adicionada com sucesso!', 'success');
    }

    closeModal();
    renderizar();
}

// ============================================================
// EXCLUIR TRANSAÇÃO
// ============================================================

function confirmarExclusao(id) {
    deletandoId = id;
    document.getElementById('deleteOverlay').classList.add('active');
}

function closeDeleteModal() {
    deletandoId = null;
    document.getElementById('deleteOverlay').classList.remove('active');
}

document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (deletandoId) {
        remover(deletandoId);
        closeDeleteModal();
        renderizar();
        mostrarToast('Transação excluída.', 'info');
    }
});

// ============================================================
// FILTROS
// ============================================================

document.getElementById('searchInput').addEventListener('input', e => {
    filtros.busca = e.target.value;
    renderizar();
});

document.getElementById('mesFilter').addEventListener('change', e => {
    filtros.mes = e.target.value;
    renderizar();
});

document.getElementById('tipoFilter').addEventListener('change', e => {
    filtros.tipo = e.target.value;
    renderizar();
});

// ============================================================
// EXPORTAR CSV
// ============================================================

function exportCSV() {
    const lista = obterFiltradas();
    if (lista.length === 0) {
        mostrarToast('Nenhuma transação para exportar.', 'error');
        return;
    }

    const linhas = lista
        .sort((a, b) => (a.numero || 0) - (b.numero || 0))
        .map(t => [
            t.numero,
            `"${t.descricao.replace(/"/g, '""')}"`,
            t.tipo,
            t.mes,
            t.valor.toFixed(2).replace('.', ',')
        ].join(';'));

    const cabecalho = 'Nº;Descrição;Tipo;Mês;Valor (R$)';
    const csv = '﻿' + [cabecalho, ...linhas].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href     = url;
    link.download = `divas-compostagem-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarToast(`${lista.length} registros exportados!`, 'success');
}

// ============================================================
// TOAST
// ============================================================

let toastTimer;
function mostrarToast(msg, tipo = 'success') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = `toast show ${tipo}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.className = 'toast'; }, 3200);
}

// ============================================================
// ATALHOS DE TECLADO
// ============================================================

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
        closeDeleteModal();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================

carregarDados();
renderizar();
