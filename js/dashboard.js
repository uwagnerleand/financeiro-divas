// ============================================================
//  DIVAS DA COMPOSTAGEM — Dashboard Financeiro
// ============================================================

const COLECAO = 'transacoes';

const MESES_FULL  = ['JANEIRO','FEVEREIRO','MARÇO','ABRIL','MAIO','JUNHO',
                     'JULHO','AGOSTO','SETEMBRO','OUTUBRO','NOVEMBRO','DEZEMBRO'];
const MESES_ABREV = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];

let transacoes     = [];
let instanciaBar   = null;
let instanciaDough = null;
let instanciaLine  = null;

// ============================================================
// LOADING
// ============================================================

function mostrarLoading() { document.getElementById('loadingOverlay').style.display = 'flex'; }
function ocultarLoading() { document.getElementById('loadingOverlay').style.display = 'none'; }

// ============================================================
// LISTENER FIRESTORE
// ============================================================

function iniciarListener() {
    mostrarLoading();
    db.collection(COLECAO)
      .orderBy('numero', 'asc')
      .onSnapshot(
        snapshot => {
            transacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            ocultarLoading();
            renderizarDashboard();
        },
        erro => {
            ocultarLoading();
            console.error('Erro:', erro);
            mostrarToast('Erro ao carregar dados.', 'error');
        }
      );
}

// ============================================================
// CÁLCULOS
// ============================================================

function calcularTotais(lista) {
    const entradas = lista.filter(t => t.tipo === 'ENTRADA').reduce((s, t) => s + t.valor, 0);
    const saidas   = lista.filter(t => t.tipo === 'SAÍDA')  .reduce((s, t) => s + t.valor, 0);
    return { entradas, saidas, saldo: entradas - saidas };
}

function dadosPorMes() {
    return MESES_FULL.map((mes, i) => {
        const doMes   = transacoes.filter(t => t.mes === mes);
        const entradas = doMes.filter(t => t.tipo === 'ENTRADA').reduce((s, t) => s + t.valor, 0);
        const saidas   = doMes.filter(t => t.tipo === 'SAÍDA')  .reduce((s, t) => s + t.valor, 0);
        return { mes, abrev: MESES_ABREV[i], entradas, saidas, saldo: entradas - saidas };
    });
}

// ============================================================
// RENDERIZAÇÃO PRINCIPAL
// ============================================================

function renderizarDashboard() {
    const totais = calcularTotais(transacoes);
    const porMes = dadosPorMes();
    const comDados = porMes.filter(m => m.entradas > 0 || m.saidas > 0);

    // Cards
    document.getElementById('headerBalance').textContent  = formatBRL(totais.saldo);
    document.getElementById('totalEntradas').textContent  = formatBRL(totais.entradas);
    document.getElementById('totalSaidas').textContent    = formatBRL(totais.saidas);
    document.getElementById('totalSaldo').textContent     = formatBRL(totais.saldo);
    document.getElementById('totalLancamentos').textContent = transacoes.length;

    const saldoEl = document.getElementById('totalSaldo');
    saldoEl.style.color = totais.saldo >= 0 ? 'var(--azul)' : 'var(--vermelho)';

    // Gráficos
    renderizarBarras(comDados);
    renderizarRosca(totais);
    renderizarLinha(porMes);
    renderizarTabela(porMes);
}

// ============================================================
// GRÁFICO 1 — BARRAS (Entradas vs Saídas por mês)
// ============================================================

function renderizarBarras(comDados) {
    if (instanciaBar) { instanciaBar.destroy(); instanciaBar = null; }

    const labels = comDados.length ? comDados.map(d => d.abrev) : ['Sem dados'];
    const ctx = document.getElementById('barChart').getContext('2d');

    instanciaBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Entradas',
                    data: comDados.map(d => d.entradas),
                    backgroundColor: 'rgba(46,204,113,0.75)',
                    borderColor: '#27AE60',
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Saídas',
                    data: comDados.map(d => d.saidas),
                    backgroundColor: 'rgba(231,76,60,0.75)',
                    borderColor: '#C0392B',
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
                tooltip: { callbacks: { label: ctx => ' ' + formatBRL(ctx.raw) } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: v => 'R$ ' + v.toLocaleString('pt-BR'), font: { family: 'Poppins', size: 10 } },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: { ticks: { font: { family: 'Poppins', size: 11 } }, grid: { display: false } }
            }
        }
    });
}

// ============================================================
// GRÁFICO 2 — ROSCA (Proporção Entradas vs Saídas)
// ============================================================

function renderizarRosca(totais) {
    if (instanciaDough) { instanciaDough.destroy(); instanciaDough = null; }

    const semDados = totais.entradas === 0 && totais.saidas === 0;
    const ctx = document.getElementById('doughnutChart').getContext('2d');

    instanciaDough = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: semDados ? ['Sem dados'] : ['Entradas', 'Saídas'],
            datasets: [{
                data:            semDados ? [1] : [totais.entradas, totais.saidas],
                backgroundColor: semDados ? ['#ECF0F1'] : ['rgba(46,204,113,0.85)', 'rgba(231,76,60,0.85)'],
                borderColor:     semDados ? ['#DDD'] : ['#27AE60', '#C0392B'],
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
                tooltip: { callbacks: { label: ctx => semDados ? '' : ' ' + formatBRL(ctx.raw) } }
            }
        }
    });

    const total = totais.entradas + totais.saidas;
    const pctE  = total > 0 ? ((totais.entradas / total) * 100).toFixed(1) : 0;
    const pctS  = total > 0 ? ((totais.saidas   / total) * 100).toFixed(1) : 0;

    document.getElementById('doughnutLegend').innerHTML = semDados
        ? '<span style="color:var(--cinza);font-size:0.82rem">Nenhum dado ainda</span>'
        : `<div class="legend-item"><div class="legend-dot" style="background:#2ECC71"></div>Entradas ${pctE}%</div>
           <div class="legend-item"><div class="legend-dot" style="background:#E74C3C"></div>Saídas ${pctS}%</div>`;
}

// ============================================================
// GRÁFICO 3 — LINHA (Rendimento por Mês com labels nos pontos)
// ============================================================

function formatLabel(v) {
    if (v === 0) return '0';
    return v % 1 === 0
        ? v.toLocaleString('pt-BR')
        : v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderizarLinha(porMes) {
    if (instanciaLine) { instanciaLine.destroy(); instanciaLine = null; }

    const ctx = document.getElementById('lineChart').getContext('2d');

    // Sempre mostra todos os 12 meses
    const entradas = porMes.map(m => m.entradas);
    const saidas   = porMes.map(m => m.saidas);

    instanciaLine = new Chart(ctx, {
        type: 'line',
        plugins: [ChartDataLabels],
        data: {
            labels: MESES_ABREV,
            datasets: [
                {
                    label: 'Entradas',
                    data: entradas,
                    borderColor: '#5B9BD5',
                    backgroundColor: 'transparent',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#5B9BD5',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.2,
                    fill: false,
                    datalabels: {
                        color: '#2471A3',
                        anchor: 'top',
                        align: 'top',
                        offset: 4,
                        font: { size: 10, weight: '700', family: 'Poppins' },
                        formatter: formatLabel
                    }
                },
                {
                    label: 'Saídas',
                    data: saidas,
                    borderColor: '#C0392B',
                    backgroundColor: 'transparent',
                    borderWidth: 2.5,
                    pointBackgroundColor: '#C0392B',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    tension: 0.2,
                    fill: false,
                    datalabels: {
                        color: '#C0392B',
                        anchor: 'end',
                        align: 'bottom',
                        offset: 4,
                        font: { size: 10, weight: '700', family: 'Poppins' },
                        formatter: formatLabel
                    }
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 28, bottom: 18 } },
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { font: { family: 'Poppins', size: 11 }, boxWidth: 14 }
                },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.dataset.label}: ${formatBRL(ctx.raw)}`
                    }
                },
                datalabels: { display: true }
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
                    ticks: { font: { family: 'Poppins', size: 10 } },
                    grid: { display: false }
                }
            }
        }
    });
}

// ============================================================
// TABELA — Resumo por Mês
// ============================================================

function renderizarTabela(porMes) {
    const comDados = porMes.filter(m => m.entradas > 0 || m.saidas > 0);
    const tbody    = document.getElementById('resumoMesBody');
    const emptySt  = document.getElementById('emptyState');

    if (comDados.length === 0) {
        tbody.innerHTML = '';
        emptySt.style.display = 'block';
        return;
    }
    emptySt.style.display = 'none';

    let acumulado = 0;
    tbody.innerHTML = comDados.map(m => {
        acumulado += m.saldo;
        const corMes  = m.saldo >= 0 ? 'valor-entrada' : 'valor-saida';
        const corAcum = acumulado   >= 0 ? 'valor-entrada' : 'valor-saida';
        return `
            <tr>
                <td><strong>${m.mes}</strong></td>
                <td class="valor-col valor-entrada">${formatBRL(m.entradas)}</td>
                <td class="valor-col valor-saida">${formatBRL(m.saidas)}</td>
                <td class="valor-col ${corMes}">${formatBRL(m.saldo)}</td>
                <td class="valor-col ${corAcum}"><strong>${formatBRL(acumulado)}</strong></td>
            </tr>
        `;
    }).join('');
}

// ============================================================
// FORMATAÇÃO
// ============================================================

function formatBRL(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
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
// INICIAR
// ============================================================

iniciarListener();
