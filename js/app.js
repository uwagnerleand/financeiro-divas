// ============================================================
//  DIVAS DA COMPOSTAGEM — Gestão Financeira (Transações)
//  Banco de dados: Firebase Firestore (nuvem, gratuito)
// ============================================================

const COLECAO = 'transacoes';

let transacoes  = [];
let editandoId  = null;
let deletandoId = null;
let filtros     = { mes: '', tipo: '', busca: '' };

// ============================================================
// LOADING
// ============================================================

function mostrarLoading() { document.getElementById('loadingOverlay').style.display = 'flex'; }
function ocultarLoading() { document.getElementById('loadingOverlay').style.display = 'none'; }

// ============================================================
// LISTENER EM TEMPO REAL (READ)
// ============================================================

function iniciarListener() {
    mostrarLoading();
    db.collection(COLECAO)
      .orderBy('numero', 'asc')
      .onSnapshot(
        snapshot => {
            transacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            ocultarLoading();
            renderizar();
        },
        erro => {
            ocultarLoading();
            console.error('Erro Firestore:', erro);
            mostrarToast('Erro ao conectar com o banco de dados.', 'error');
        }
      );
}

// ============================================================
// CREATE
// ============================================================

async function adicionar(dados) {
    const nova = {
        numero:    proximoNumero(),
        descricao: dados.descricao.trim(),
        tipo:      dados.tipo,
        mes:       dados.mes,
        valor:     parseFloat(dados.valor),
        criado:    firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection(COLECAO).add(nova);
}

// ============================================================
// UPDATE
// ============================================================

async function atualizar(id, dados) {
    await db.collection(COLECAO).doc(id).update({
        descricao:  dados.descricao.trim(),
        tipo:       dados.tipo,
        mes:        dados.mes,
        valor:      parseFloat(dados.valor),
        atualizado: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// ============================================================
// DELETE
// ============================================================

async function remover(id) {
    await db.collection(COLECAO).doc(id).delete();
}

// ============================================================
// AUXILIARES
// ============================================================

function proximoNumero() {
    if (transacoes.length === 0) return 1;
    return Math.max(...transacoes.map(t => t.numero || 0)) + 1;
}

function obterFiltradas() {
    return transacoes.filter(t => {
        if (filtros.mes  && t.mes  !== filtros.mes)  return false;
        if (filtros.tipo && t.tipo !== filtros.tipo) return false;
        if (filtros.busca && !t.descricao.toLowerCase().includes(filtros.busca.toLowerCase())) return false;
        return true;
    });
}

function calcularTotais(lista) {
    const entradas = lista.filter(t => t.tipo === 'ENTRADA').reduce((s, t) => s + t.valor, 0);
    const saidas   = lista.filter(t => t.tipo === 'SAÍDA')  .reduce((s, t) => s + t.valor, 0);
    return { entradas, saidas, saldo: entradas - saidas };
}

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
    const totaisGeral = calcularTotais(transacoes);
    const totaisFilt  = calcularTotais(filtradas);

    const headerSaldo = document.getElementById('headerBalance');
    headerSaldo.textContent = formatBRL(totaisGeral.saldo);
    headerSaldo.style.color = totaisGeral.saldo >= 0 ? '#fff' : '#FFCDD2';

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

    const n = filtradas.length, total = transacoes.length;
    document.getElementById('countLabel').textContent =
        n === total
            ? `${n} transaç${n === 1 ? 'ão' : 'ões'}`
            : `${n} de ${total} transaç${total === 1 ? 'ão' : 'ões'} (filtrado)`;

    const tbody   = document.getElementById('transactionsBody');
    const emptySt = document.getElementById('emptyState');

    if (filtradas.length === 0) {
        tbody.innerHTML = '';
        emptySt.style.display = 'block';
        return;
    }
    emptySt.style.display = 'none';

    tbody.innerHTML = filtradas.map(t => `
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
                    <button class="btn btn-icon btn-edit" onclick="abrirEdicao('${t.id}')" title="Editar">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="btn btn-icon btn-delete" onclick="confirmarExclusao('${t.id}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// MODAIS
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

function confirmarExclusao(id) {
    deletandoId = id;
    document.getElementById('deleteOverlay').classList.add('active');
}

function closeDeleteModal() {
    deletandoId = null;
    document.getElementById('deleteOverlay').classList.remove('active');
}

// ============================================================
// SALVAR TRANSAÇÃO
// ============================================================

async function saveTransaction(e) {
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
    const btn = document.getElementById('saveBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    try {
        if (editandoId) {
            await atualizar(editandoId, dados);
            mostrarToast('Transação atualizada!', 'success');
        } else {
            await adicionar(dados);
            mostrarToast('Transação adicionada!', 'success');
        }
        closeModal();
    } catch (err) {
        console.error(err);
        mostrarToast('Erro ao salvar. Tente novamente.', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-save"></i> Salvar';
    }
}

document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    if (!deletandoId) return;
    const btn = document.getElementById('confirmDeleteBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Excluindo...';
    try {
        await remover(deletandoId);
        closeDeleteModal();
        mostrarToast('Transação excluída.', 'info');
    } catch (err) {
        console.error(err);
        mostrarToast('Erro ao excluir.', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-trash"></i> Excluir';
    }
});

// ============================================================
// FILTROS
// ============================================================

document.getElementById('searchInput').addEventListener('input', e => { filtros.busca = e.target.value; renderizar(); });
document.getElementById('mesFilter').addEventListener('change',  e => { filtros.mes   = e.target.value; renderizar(); });
document.getElementById('tipoFilter').addEventListener('change', e => { filtros.tipo  = e.target.value; renderizar(); });

// ============================================================
// EXPORTAR CSV
// ============================================================

function exportCSV() {
    const lista = obterFiltradas();
    if (lista.length === 0) { mostrarToast('Nenhuma transação para exportar.', 'error'); return; }
    const linhas = lista.map(t =>
        [t.numero, `"${t.descricao.replace(/"/g,'""')}"`, t.tipo, t.mes, t.valor.toFixed(2).replace('.',',')].join(';')
    );
    const csv  = '﻿Nº;Descrição;Tipo;Mês;Valor (R$)\r\n' + linhas.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `divas-${new Date().toISOString().slice(0,10)}.csv`;
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
// TECLADO
// ============================================================

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeDeleteModal(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); openModal(); }
});

// ============================================================
// INICIAR
// ============================================================

iniciarListener();
