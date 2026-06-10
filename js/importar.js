// ============================================================
//  IMPORTAÇÃO EM LOTE — Lançamentos 2025
//  Divas da Compostagem
// ============================================================

const DADOS_2025 = [
    // FEVEREIRO
    { tipo: 'ENTRADA', mes: 'FEVEREIRO', valor: 70.00 },
    // MARÇO
    { tipo: 'ENTRADA', mes: 'MARÇO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO', valor: 90.00 },
    // ABRIL
    { tipo: 'ENTRADA', mes: 'ABRIL', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL', valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL', valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL', valor: 20.00 },
    // MAIO
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 20.00 },
    { tipo: 'SAÍDA',   mes: 'MAIO', valor: 27.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 80.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 180.00 },
    { tipo: 'SAÍDA',   mes: 'MAIO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 150.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 80.00 },
    { tipo: 'SAÍDA',   mes: 'MAIO', valor: 630.00 },
    { tipo: 'ENTRADA', mes: 'MAIO', valor: 20.00 },
    // JUNHO
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 50.00 },
    { tipo: 'SAÍDA',   mes: 'JUNHO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 3.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 80.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 150.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO', valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'JUNHO', valor: 259.80 },
    // JULHO
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 20.00 },
    { tipo: 'SAÍDA',   mes: 'JULHO', valor: 33.99 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO', valor: 50.00 },
    // AGOSTO
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'AGOSTO', valor: 428.27 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 60.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 80.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO', valor: 35.00 },
    { tipo: 'SAÍDA',   mes: 'AGOSTO', valor: 170.62 },
    // SETEMBRO
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 80.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 46.70 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 15.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 28.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 60.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 15.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 496.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 560.60 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 8.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 40.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO', valor: 70.00 },
    // OUTUBRO
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 60.00 },
    { tipo: 'SAÍDA',   mes: 'OUTUBRO', valor: 163.19 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO', valor: 60.00 },
    { tipo: 'SAÍDA',   mes: 'OUTUBRO', valor: 192.00 },
    // NOVEMBRO
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 43.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 31.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 142.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 12.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 6.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 60.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 52.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO', valor: 60.00 },
    { tipo: 'SAÍDA',   mes: 'NOVEMBRO', valor: 69.90 },
    // DEZEMBRO
    { tipo: 'SAÍDA',   mes: 'DEZEMBRO', valor: 258.85 },
    { tipo: 'ENTRADA', mes: 'DEZEMBRO', valor: 70.00 },
    { tipo: 'SAÍDA',   mes: 'DEZEMBRO', valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'DEZEMBRO', valor: 7.00 },
    { tipo: 'ENTRADA', mes: 'DEZEMBRO', valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'DEZEMBRO', valor: 20.00 }
];

// ============================================================
// IMPORTAÇÃO
// ============================================================

async function iniciarImportacao() {
    const btn = document.getElementById('btnImportar');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Importando...';

    const progressWrap = document.getElementById('progressWrap');
    const progressBar  = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const logBox       = document.getElementById('logBox');

    progressWrap.style.display = 'block';
    progressText.style.display = 'block';
    logBox.style.display = 'block';
    logBox.innerHTML = '';

    try {
        // Pega o maior número atual para continuar a sequência
        const snapshot = await db.collection('transacoes').get();
        let numero = snapshot.empty ? 1 : Math.max(...snapshot.docs.map(d => d.data().numero || 0)) + 1;

        const total = DADOS_2025.length;
        let importados = 0;

        // Firestore batch (até 500 operações por lote)
        const lote = db.batch();

        DADOS_2025.forEach(d => {
            const ref = db.collection('transacoes').doc();
            lote.set(ref, {
                numero:    numero++,
                descricao: 'Lançamento 2025',
                tipo:      d.tipo,
                mes:       d.mes,
                ano:       2025,
                valor:     d.valor,
                criado:    firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        progressBar.style.width = '60%';
        progressText.textContent = 'Enviando para o banco de dados...';

        await lote.commit();

        progressBar.style.width = '100%';
        progressText.textContent = `✅ ${total} registros importados com sucesso!`;
        logBox.innerHTML = `<span style="color:#27AE60">✅ Importação concluída! ${total} lançamentos de 2025 foram adicionados ao banco de dados.</span>`;

        btn.innerHTML = '<i class="fas fa-check"></i> Importação Concluída!';
        btn.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';
        btn.style.color = '#fff';

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2500);

    } catch (erro) {
        console.error(erro);
        progressText.textContent = '❌ Erro na importação.';
        logBox.innerHTML = `<span style="color:#E74C3C">❌ Erro: ${erro.message}</span>`;
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-redo"></i> Tentar Novamente';
    }
}

// Esconde loading inicial
document.getElementById('loadingOverlay').style.display = 'none';
