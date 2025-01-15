let pescadores = [];

// Função para validar a chave PIX
function validarChavePix() {
    const totalComprasInput = document.getElementById('totalCompras');
    const totalCompras = totalComprasInput.value ? parseFloat(totalComprasInput.value) : 0;
    const chavePix = document.getElementById('chavePix');
    const pixAlert = document.getElementById('pixAlert');
    
    if (totalCompras > 0) {
        chavePix.required = true;
        pixAlert.style.display = 'block';
    } else {
        chavePix.required = false;
        pixAlert.style.display = 'none';
    }
}

// Função para resetar o formulário
function resetarFormulario() {
    const form = document.getElementById('formPescador');
    form.reset();
    document.getElementById('totalCompras').value = '';  // Garante que fique vazio, não zero
    document.getElementById('chavePix').required = false;
    document.getElementById('pixAlert').style.display = 'none';
}

// Função para calcular distribuição de pagamentos
function calcularDistribuicaoPagamentos() {
    const pagadores = pescadores.filter(p => p.totalApagar > 0)
        .sort((a, b) => b.totalApagar - a.totalApagar);
    const recebedores = pescadores.filter(p => p.totalAReceber > 0)
        .sort((a, b) => b.totalAReceber - a.totalAReceber);

    const distribuicao = [];
    
    pagadores.forEach(pagador => {
        let valorRestante = pagador.totalApagar;
        const pagamentos = [];
        
        recebedores.forEach(recebedor => {
            if (valorRestante > 0 && recebedor.totalAReceber > 0) {
                const valorPagamento = Math.min(valorRestante, recebedor.totalAReceber);
                if (valorPagamento > 0) {
                    pagamentos.push({
                        de: pagador.nome,
                        para: recebedor.nome,
                        valor: valorPagamento,
                        chavePix: recebedor.chavePix
                    });
                    valorRestante -= valorPagamento;
                    recebedor.totalAReceber -= valorPagamento;
                }
            }
        });
        
        if (pagamentos.length > 0) {
            distribuicao.push({
                pagador: pagador.nome,
                pagamentos: pagamentos
            });
        }
    });
    
    return distribuicao;
}

// Função para atualizar o resumo
function atualizarResumo() {
    const totalPescadores = pescadores.length;
    const totalGastos = pescadores.reduce((total, p) => total + p.totalCompras, 0);
    const valorPorPescador = totalPescadores > 0 ? totalGastos / totalPescadores : 0;

    document.getElementById('totalPescadores').textContent = totalPescadores;
    document.getElementById('totalGastos').textContent = totalGastos.toFixed(2);
    document.getElementById('valorPorPescador').textContent = valorPorPescador.toFixed(2);

    // Atualiza os valores para cada pescador
    pescadores.forEach(p => {
        p.totalPescador = valorPorPescador;
        p.totalApagar = Math.max(0, valorPorPescador - p.totalCompras);
        p.totalAReceber = Math.max(0, p.totalCompras - valorPorPescador);
    });

    atualizarTabelaPescadores();
}

// Função para criar a linha expandida com os detalhes de pagamento
function criarLinhaDetalhePagamento(distribuicao, pagadorNome) {
    const pagamentos = distribuicao.find(d => d.pagador === pagadorNome)?.pagamentos || [];
    
    if (pagamentos.length === 0) return '';
    
    const pagamentosHtml = pagamentos.map(p => `
        <div class="alert alert-info mb-2">
            Pagar R$ ${p.valor.toFixed(2)} para ${p.para}<br>
            <small class="text-muted d-flex align-items-center justify-content-between">
                <span>PIX: ${p.chavePix}</span>
                <button class="btn btn-sm btn-outline-secondary ms-2" 
                        onclick="copiarChavePix('${p.chavePix}', '${p.para}')">
                    <i class="bi bi-files"></i>
                </button>
            </small>
        </div>
    `).join('');
    
    return `
        <tr class="detalhe-pagamento">
            <td colspan="8">
                <div class="p-3 bg-light">
                    <h6 class="mb-3">Instruções de Pagamento para ${pagadorNome}:</h6>
                    ${pagamentosHtml}
                </div>
            </td>
        </tr>
    `;
}

// Função para copiar texto para a área de transferência
function copiarChavePix(chavePix, nome) {
    navigator.clipboard.writeText(chavePix).then(() => {
        alert(`Chave PIX de ${nome} copiada com sucesso!`);
    }).catch(() => {
        alert('Erro ao copiar chave PIX. Por favor, tente copiar manualmente.');
    });
}

// Função para atualizar a tabela de pescadores
function atualizarTabelaPescadores() {
    const tbody = document.getElementById('listaPescadores');
    tbody.innerHTML = '';
    
    const distribuicao = calcularDistribuicaoPagamentos();

    pescadores.forEach((pescador, index) => {
        const tr = document.createElement('tr');
        
        // Cria o texto de detalhamento
        let detalhamento = '';
        if (pescador.totalCompras > 0) {
            if (pescador.totalCompras < pescador.totalPescador) {
                detalhamento = `Comprou R$ ${pescador.totalCompras.toFixed(2)}, 
                               falta pagar R$ ${pescador.totalApagar.toFixed(2)}`;
            } else if (pescador.totalCompras > pescador.totalPescador) {
                detalhamento = `Comprou R$ ${pescador.totalCompras.toFixed(2)}, 
                               receberá R$ ${pescador.totalAReceber.toFixed(2)}`;
            } else {
                detalhamento = 'Pagamento completo';
            }
        } else {
            detalhamento = 'Nenhuma compra registrada';
        }

        const temPagamentos = distribuicao.some(d => d.pagador === pescador.nome);
        
        tr.innerHTML = `
            <td>${pescador.nome}</td>
            <td>R$ ${pescador.totalCompras.toFixed(2)}</td>
            <td><small class="text-muted">${detalhamento}</small></td>
            <td>R$ ${pescador.totalPescador.toFixed(2)}</td>
            <td class="text-danger">
                R$ ${pescador.totalApagar.toFixed(2)}
                ${temPagamentos ? `
                    <button class="btn btn-sm btn-outline-primary ms-2" 
                            onclick="toggleDetalhePagamento(${index})">
                        <i class="bi bi-info-circle"></i> Ver Pagamentos
                    </button>
                ` : ''}
            </td>
            <td class="text-success">R$ ${pescador.totalAReceber.toFixed(2)}</td>
            <td>${pescador.chavePix || '-'}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="removerPescador(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
        
        // Adiciona a linha de detalhe (inicialmente oculta)
        if (temPagamentos) {
            const trDetalhe = document.createElement('tr');
            trDetalhe.style.display = 'none';
            trDetalhe.id = `detalhe-${index}`;
            trDetalhe.innerHTML = criarLinhaDetalhePagamento(distribuicao, pescador.nome);
            tbody.appendChild(trDetalhe);
        }
    });
}

// Função para mostrar/ocultar detalhes de pagamento
function toggleDetalhePagamento(index) {
    const trDetalhe = document.getElementById(`detalhe-${index}`);
    if (trDetalhe) {
        trDetalhe.style.display = trDetalhe.style.display === 'none' ? 'table-row' : 'none';
    }
}

// Função para adicionar um novo pescador
function adicionarPescador(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const totalComprasInput = document.getElementById('totalCompras');
    const totalCompras = totalComprasInput.value ? parseFloat(totalComprasInput.value) : 0;
    const chavePix = document.getElementById('chavePix').value;

    // Só valida a chave PIX se houver compras
    if (totalCompras > 0 && !chavePix) {
        alert('Chave PIX é obrigatória quando há compras registradas!');
        return;
    }

    pescadores.push({
        nome,
        totalCompras,
        chavePix,
        totalPescador: 0,
        totalApagar: 0,
        totalAReceber: 0
    });

    // Reseta o formulário com campos vazios
    resetarFormulario();
    
    // Atualiza a interface
    atualizarResumo();
}

// Função para remover um pescador
function removerPescador(index) {
    if (confirm('Tem certeza que deseja remover este pescador?')) {
        pescadores.splice(index, 1);
        atualizarResumo();
    }
}

// Event Listeners
document.getElementById('formPescador').addEventListener('submit', adicionarPescador);

// Inicialização
atualizarResumo();
