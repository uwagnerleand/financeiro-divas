// ============================================================
//  DIVAS DA COMPOSTAGEM — Gestão Financeira
//  Banco de dados: Firebase Firestore (nuvem, gratuito)
// ============================================================

const COLECAO = 'transacoes';

// Estado global
let transacoes  = [];
let editandoId  = null;
let deletandoId = null;
let filtros     = { mes: '', tipo: '', busca: '' };

// Instâncias dos gráficos
let instanciaBar      = null;
let instanciaDoughnut = null;

const MESES_ABREV = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
const MESES_FULL  = ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO',
                     'JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'];

// ============================================================
// LOADING
// ============================================================

function mostrarLoading()  { document.getElementById('loadingOverlay').style.display = 'flex'; }
function ocultarLoading()  { document.getElementById('loadingOverlay').style.display = 'none'; }

// ============================================================
// LISTENER EM TEMPO REAL (READ)
// Atualiza a tela automaticamente sempre que o banco muda
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
            mostrarToast('Erro ao conectar com o banco de dados. Verifique o firebase-config.js', 'error');
        }
      );
}

// ============================================================
// CREATE — Adicionar transação
// ============================================================

async function adicionar(dados) {
    const numero = proximoNumero();
    const nova = {
        numero,
        descricao: dados.descricao.trim(),
        tipo:      dados.tipo,
        mes:       dados.mes,
        valor:     parseFloat(dados.valor),
        criado:    firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection(COLECAO).add(nova);
}

// ============================================================
// UPDATE — Editar transação
// ============================================================

async function atualizar(id, dados) {
    await db.collection(COLECAO).doc(id).update({
        descricao:   dados.descricao.trim(),
        tipo:        dados.tipo,
        mes:         dados.mes,
        valor:       parseFloat(dados.valor),
        atualizado:  firebase.firestore.FieldValue.serverTimestamp()
    });
}

// ============================================================
// DELETE — Excluir transação
// ============================================================

async function remover(id) {
    await db.collection(COLECAO).doc(id).delete();
}

// ============================================================
// AUXILIAR — Próximo número sequencial
// ============================================================

function proximoNumero() {
    if (transacoes.length === 0) return 1;
    return Math.max(...transacoes.map(t => t.numero || 0)) + 1;
}

// ============================================================
// FILTROS E CÁLCULOS
// ============================================================

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
    const totaisGeral = calcularTotais(transacoes);
    const totaisFilt  = calcularTotais(filtradas);

    // Atualiza gráficos
    renderizarGraficos();

    // Saldo no header (sempre total geral)
    const headerSaldo = document.getElementById('headerBalance');
    headerSaldo.textContent = formatBRL(totaisGeral.saldo);
    headerSaldo.style.color = totaisGeral.saldo >= 0 ? '#fff' : '#FFCDD2';

    // Cards (conforme filtro ativo)
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
// GRÁFICOS (Chart.js)
// ============================================================

function renderizarGraficos() {
    // Dados por mês (apenas meses que têm algum lançamento)
    const dadosMeses = MESES_FULL.map((mes, i) => {
        const doMes   = transacoes.filter(t => t.mes === mes);
        const entradas = doMes.filter(t => t.tipo === 'ENTRADA').reduce((s, t) => s + t.valor, 0);
        const saidas   = doMes.filter(t => t.tipo === 'SAÍDA')  .reduce((s, t) => s + t.valor, 0);
        return { label: MESES_ABREV[i], entradas, saidas };
    }).filter(d => d.entradas > 0 || d.saidas > 0);

    // Totais gerais para o doughnut
    const totalEntradas = transacoes.filter(t => t.tipo === 'ENTRADA').reduce((s, t) => s + t.valor, 0);
    const totalSaidas   = transacoes.filter(t => t.tipo === 'SAÍDA')  .reduce((s, t) => s + t.valor, 0);

    // ── Gráfico de Barras ──────────────────────────────────
    if (instanciaBar) instanciaBar.destroy();

    const ctxBar = document.getElementById('barChart').getContext('2d');
    instanciaBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: dadosMeses.length ? dadosMeses.map(d => d.label) : ['Sem dados'],
            datasets: [
                {
                    label: 'Entradas',
                    data: dadosMeses.map(d => d.entradas),
                    backgroundColor: 'rgba(46,204,113,0.75)',
                    borderColor:     'rgba(39,174,96,1)',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Saídas',
                    data: dadosMeses.map(d => d.saidas),
                    backgroundColor: 'rgba(231,76,60,0.75)',
                    borderColor:     'rgba(192,57,43,1)',
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top', labels: { font: { family: 'Poppins', size: 11 }, boxWidth: 14 } },
                tooltip: {
                    callbacks: {
                        label: ctx => ' ' + formatBRL(ctx.raw)
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: v => 'R$ ' + v.toLocaleString('pt-BR'),
                        font: { family: 'Poppins', size: 10 }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    ticks: { font: { family: 'Poppins', size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });

    // ── Gráfico Rosca ──────────────────────────────────────
    if (instanciaDoughnut) instanciaDoughnut.destroy();

    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
    const semDados    = totalEntradas === 0 && totalSaidas === 0;

    instanciaDoughnut = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: semDados ? ['Sem dados'] : ['Entradas', 'Saídas'],
            datasets: [{
                data:            semDados ? [1] : [totalEntradas, totalSaidas],
                backgroundColor: semDados ? ['#ECF0F1'] : ['rgba(46,204,113,0.8)', 'rgba(231,76,60,0.8)'],
                borderColor:     semDados ? ['#ECF0F1'] : ['#27AE60', '#C0392B'],
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => semDados ? '' : ' ' + formatBRL(ctx.raw)
                    }
                }
            }
        }
    });

    // Legenda personalizada
    const total = totalEntradas + totalSaidas;
    const pctE  = total > 0 ? ((totalEntradas / total) * 100).toFixed(1) : 0;
    const pctS  = total > 0 ? ((totalSaidas  / total) * 100).toFixed(1) : 0;

    document.getElementById('doughnutLegend').innerHTML = semDados
        ? '<span style="color:var(--cinza);font-size:0.82rem">Nenhum dado ainda</span>'
        : `
            <div class="legend-item">
                <div class="legend-dot" style="background:#2ECC71"></div>
                Entradas ${pctE}%
            </div>
            <div class="legend-item">
                <div class="legend-dot" style="background:#E74C3C"></div>
                Saídas ${pctS}%
            </div>
        `;
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
// SALVAR (CREATE ou UPDATE)
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
            mostrarToast('Transação atualizada com sucesso!', 'success');
        } else {
            await adicionar(dados);
            mostrarToast('Transação adicionada com sucesso!', 'success');
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

// ============================================================
// DELETE
// ============================================================

function confirmarExclusao(id) {
    deletandoId = id;
    document.getElementById('deleteOverlay').classList.add('active');
}

function closeDeleteModal() {
    deletandoId = null;
    document.getElementById('deleteOverlay').classList.remove('active');
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
        mostrarToast('Erro ao excluir. Tente novamente.', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-trash"></i> Excluir';
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

    const linhas = lista.map(t => [
        t.numero,
        `"${t.descricao.replace(/"/g, '""')}"`,
        t.tipo,
        t.mes,
        t.valor.toFixed(2).replace('.', ',')
    ].join(';'));

    const csv  = '﻿Nº;Descrição;Tipo;Mês;Valor (R$)\r\n' + linhas.join('\r\n');
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
    if (e.key === 'Escape') { closeModal(); closeDeleteModal(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); openModal(); }
});

// ============================================================
// INICIAR
// ============================================================

iniciarListener();
