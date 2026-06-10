// ============================================================
//  IMPORTAÇÃO EM LOTE — Divas da Compostagem
// ============================================================

// ---- DADOS 2025 ----
const DADOS_2025 = [
    { tipo: 'ENTRADA', mes: 'FEVEREIRO', valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 20.00 },
    { tipo: 'SAÍDA',   mes: 'MAIO',      valor: 27.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 80.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 180.00 },
    { tipo: 'SAÍDA',   mes: 'MAIO',      valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 150.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 80.00 },
    { tipo: 'SAÍDA',   mes: 'MAIO',      valor: 630.00 },
    { tipo: 'ENTRADA', mes: 'MAIO',      valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 50.00 },
    { tipo: 'SAÍDA',   mes: 'JUNHO',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 3.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 80.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 150.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'JUNHO',     valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'JUNHO',     valor: 259.80 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 20.00 },
    { tipo: 'SAÍDA',   mes: 'JULHO',     valor: 33.99 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'JULHO',     valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'AGOSTO',    valor: 428.27 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 60.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 80.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'AGOSTO',    valor: 35.00 },
    { tipo: 'SAÍDA',   mes: 'AGOSTO',    valor: 170.62 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 80.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 46.70 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 15.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 28.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 100.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 60.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 15.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 496.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 30.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 560.60 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 8.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 40.00 },
    { tipo: 'SAÍDA',   mes: 'SETEMBRO',  valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'SETEMBRO',  valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 60.00 },
    { tipo: 'SAÍDA',   mes: 'OUTUBRO',   valor: 163.19 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 90.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 40.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'OUTUBRO',   valor: 60.00 },
    { tipo: 'SAÍDA',   mes: 'OUTUBRO',   valor: 192.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 43.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 31.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 142.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 12.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 6.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 60.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 10.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 30.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 52.00 },
    { tipo: 'ENTRADA', mes: 'NOVEMBRO',  valor: 60.00 },
    { tipo: 'SAÍDA',   mes: 'NOVEMBRO',  valor: 69.90 },
    { tipo: 'SAÍDA',   mes: 'DEZEMBRO',  valor: 258.85 },
    { tipo: 'ENTRADA', mes: 'DEZEMBRO',  valor: 70.00 },
    { tipo: 'SAÍDA',   mes: 'DEZEMBRO',  valor: 10.00 },
    { tipo: 'SAÍDA',   mes: 'DEZEMBRO',  valor: 7.00 },
    { tipo: 'ENTRADA', mes: 'DEZEMBRO',  valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'DEZEMBRO',  valor: 20.00 }
];

// ---- DADOS 2026 ----
const DADOS_2026 = [
    { tipo: 'SAÍDA',   mes: 'JANEIRO',   valor: 56.00 },
    { tipo: 'ENTRADA', mes: 'JANEIRO',   valor: 174.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 42.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 20.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 25.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 65.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 15.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 25.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'MARÇO',     valor: 70.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 50.00 },
    { tipo: 'SAÍDA',   mes: 'ABRIL',     valor: 73.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 50.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 70.00 },
    { tipo: 'SAÍDA',   mes: 'ABRIL',     valor: 28.00 },
    { tipo: 'SAÍDA',   mes: 'ABRIL',     valor: 36.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 5.00 },
    { tipo: 'ENTRADA', mes: 'ABRIL',     valor: 10.00 }
];

// ============================================================
// IMPORTAÇÃO
// ============================================================

async function iniciarImportacao(ano) {
    var dados = ano === 2025 ? DADOS_2025 : DADOS_2026;

    var btn          = document.getElementById('btnImportar' + ano);
    var progressWrap = document.getElementById('progressWrap' + ano);
    var progressBar  = document.getElementById('progressBar'  + ano);
    var progressText = document.getElementById('progressText' + ano);
    var logBox       = document.getElementById('logBox'       + ano);

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Importando...';
    progressWrap.style.display = 'block';
    progressText.style.display = 'block';
    logBox.style.display = 'block';
    logBox.innerHTML = '';

    try {
        var snapshot = await db.collection('transacoes').get();
        var numeros  = snapshot.docs.map(function(d) { return d.data().numero || 0; });
        var numero   = snapshot.empty ? 1 : Math.max.apply(null, numeros) + 1;

        var lote = db.batch();

        dados.forEach(function(d) {
            var ref = db.collection('transacoes').doc();
            lote.set(ref, {
                numero:    numero++,
                descricao: 'Lançamento ' + ano,
                tipo:      d.tipo,
                mes:       d.mes,
                ano:       ano,
                valor:     d.valor,
                criado:    firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        progressBar.style.width = '60%';
        progressText.textContent = 'Enviando para o banco de dados...';

        await lote.commit();

        progressBar.style.width = '100%';
        progressText.textContent = '✅ ' + dados.length + ' registros importados!';
        logBox.innerHTML = '<span style="color:#27AE60">✅ Concluído! ' + dados.length + ' lançamentos de ' + ano + ' adicionados.</span>';

        btn.innerHTML = '<i class="fas fa-check"></i> Importação Concluída!';
        btn.style.background = 'linear-gradient(135deg, #2ECC71, #27AE60)';
        btn.style.color = '#fff';

        setTimeout(function() { window.location.href = 'index.html'; }, 2500);

    } catch (erro) {
        console.error(erro);
        progressText.textContent = '❌ Erro na importação.';
        logBox.innerHTML = '<span style="color:#E74C3C">❌ Erro: ' + erro.message + '</span>';
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-redo"></i> Tentar Novamente';
    }
}

document.getElementById('loadingOverlay').style.display = 'none';
