// Funções utilitárias para requisições
async function fetchAPI(endpoint, options = {}) {
    const res = await fetch(endpoint, options);
    if (!res.ok) throw new Error(await res.text());
    if (res.status === 204) return null;
    return res.json();
}

// Produtos
async function carregarProdutos() {
    try {
        const produtos = await fetchAPI('/api/produtos');
        const categorias = await fetchAPI('/api/categorias');
        const div = document.getElementById('produtos-list');
        let html = '';
        categorias.forEach(cat => {
            const prods = produtos.filter(p => p.categoria && p.categoria.id === cat.id);
            if (prods.length > 0) {
                html += `<div style='margin-bottom:1.5rem;'><h3 style='color:#4e9ed4;'>${cat.nome}</h3>`;
                html += prods.map(p =>
                    `<div><b>${p.nome}</b> - Estoque: ${p.quantidadeEstoque} - R$ ${p.precoUnitario.toFixed(2)}
                    <button onclick='abrirModalProduto(${JSON.stringify(p)})'>Editar</button>
                    <button onclick='removerProduto(${p.id})'>Remover</button>
                    <button onclick='verDetalhesProduto(${JSON.stringify(p)})'>Detalhes</button>
                    </div>`
                ).join('');
                html += '</div>';
            }
        });
        div.innerHTML = html || 'Nenhum produto cadastrado.';
    } catch (e) {
        document.getElementById('produtos-list').innerText = 'Erro ao carregar produtos.';
    }
}

// CLIENTES
function abrirModalCliente(cliente = null) {
    document.getElementById('modal-cliente').style.display = 'flex';
    document.getElementById('modal-cliente-title').innerText = cliente ? 'Editar Cliente' : 'Adicionar Cliente';
    document.getElementById('cliente-id').value = cliente ? cliente.id : '';
    document.getElementById('cliente-nome').value = cliente ? cliente.nome : '';
    document.getElementById('cliente-email').value = cliente ? cliente.email : '';
    document.getElementById('cliente-telefone').value = cliente ? cliente.telefone : '';
    document.getElementById('cliente-endereco').value = cliente ? cliente.endereco : '';
}
function fecharModalCliente() {
    document.getElementById('modal-cliente').style.display = 'none';
}
document.getElementById('btn-add-cliente').onclick = () => abrirModalCliente();
document.getElementById('close-modal-cliente').onclick = fecharModalCliente;
document.getElementById('modal-cliente').onclick = (e) => { if (e.target.classList.contains('modal')) fecharModalCliente(); };
document.getElementById('form-cliente').onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('cliente-id').value;
    const cliente = {
        nome: document.getElementById('cliente-nome').value,
        email: document.getElementById('cliente-email').value,
        telefone: document.getElementById('cliente-telefone').value,
        endereco: document.getElementById('cliente-endereco').value
    };
    try {
        if (id) {
            await fetchAPI(`/api/clientes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cliente) });
        } else {
            await fetchAPI('/api/clientes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cliente) });
        }
        fecharModalCliente();
        carregarClientes();
    } catch (e) {
        alert('Erro ao salvar cliente: ' + e.message);
    }
};
async function removerCliente(id) {
    if (!confirm('Deseja remover este cliente?')) return;
    try {
        await fetchAPI(`/api/clientes/${id}`, { method: 'DELETE' });
        carregarClientes();
    } catch (e) {
        alert('Erro ao remover cliente: ' + e.message);
    }
}
async function verDetalhesCliente(cliente) {
    alert(`Cliente: ${cliente.nome}\nEmail: ${cliente.email}\nTelefone: ${cliente.telefone}\nEndereço: ${cliente.endereco}`);
}
async function carregarClientes() {
    try {
        const clientes = await fetchAPI('/api/clientes');
        const div = document.getElementById('clientes-list');
        div.innerHTML = clientes.map(c =>
            `<div><b>${c.nome}</b> - ${c.email || ''}
            <button onclick='abrirModalCliente(${JSON.stringify(c)})'>Editar</button>
            <button onclick='removerCliente(${c.id})'>Remover</button>
            <button onclick='verDetalhesCliente(${JSON.stringify(c)})'>Detalhes</button>
            </div>`
        ).join('');
    } catch (e) {
        document.getElementById('clientes-list').innerText = 'Erro ao carregar clientes.';
    }
}

// CATEGORIAS
function abrirModalCategoria(categoria = null) {
    document.getElementById('modal-categoria').style.display = 'flex';
    document.getElementById('modal-categoria-title').innerText = categoria ? 'Editar Categoria' : 'Adicionar Categoria';
    document.getElementById('categoria-id').value = categoria ? categoria.id : '';
    document.getElementById('categoria-nome').value = categoria ? categoria.nome : '';
}
function fecharModalCategoria() {
    document.getElementById('modal-categoria').style.display = 'none';
}
document.getElementById('btn-add-categoria').onclick = () => abrirModalCategoria();
document.getElementById('close-modal-categoria').onclick = fecharModalCategoria;
document.getElementById('modal-categoria').onclick = (e) => { if (e.target.classList.contains('modal')) fecharModalCategoria(); };
document.getElementById('form-categoria').onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('categoria-id').value;
    const categoria = {
        nome: document.getElementById('categoria-nome').value
    };
    try {
        if (id) {
            await fetchAPI(`/api/categorias/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(categoria) });
        } else {
            await fetchAPI('/api/categorias', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(categoria) });
        }
        fecharModalCategoria();
        carregarCategorias();
    } catch (e) {
        alert('Erro ao salvar categoria: ' + e.message);
    }
};
async function removerCategoria(id) {
    if (!confirm('Deseja remover esta categoria?')) return;
    try {
        await fetchAPI(`/api/categorias/${id}`, { method: 'DELETE' });
        carregarCategorias();
    } catch (e) {
        alert('Erro ao remover categoria: ' + e.message);
    }
}
async function verDetalhesCategoria(categoria) {
    alert(`Categoria: ${categoria.nome}`);
}
async function carregarCategorias() {
    try {
        const categorias = await fetchAPI('/api/categorias');
        const div = document.getElementById('categorias-list');
        div.innerHTML = categorias.map(cat =>
            `<div><b>${cat.nome}</b>
            <button onclick='abrirModalCategoria(${JSON.stringify(cat)})'>Editar</button>
            <button onclick='removerCategoria(${cat.id})'>Remover</button>
            <button onclick='verDetalhesCategoria(${JSON.stringify(cat)})'>Detalhes</button>
            </div>`
        ).join('');
    } catch (e) {
        document.getElementById('categorias-list').innerText = 'Erro ao carregar categorias.';
    }
}

// VENDAS
// Carregar clientes no select do formulário de venda
async function preencherSelectClientes() {
    const select = document.getElementById('venda-cliente');
    select.innerHTML = '<option value="">Selecione</option>';
    try {
        const clientes = await fetchAPI('/api/clientes');
        clientes.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = c.nome;
            select.appendChild(opt);
        });
    } catch (e) {
        select.innerHTML = '<option value="">Erro ao carregar clientes</option>';
    }
}

function abrirModalVenda(venda = null) {
    preencherSelectClientes().then(() => {
        document.getElementById('modal-venda').style.display = 'flex';
        document.getElementById('modal-venda-title').innerText = venda ? 'Editar Venda' : 'Adicionar Venda';
        document.getElementById('venda-id').value = venda ? venda.id : '';
        document.getElementById('venda-cliente').value = venda && venda.cliente ? venda.cliente.id : '';
        document.getElementById('venda-valor-total').value = venda ? venda.valorTotal : '';
    });
}
function fecharModalVenda() {
    document.getElementById('modal-venda').style.display = 'none';
}
document.getElementById('btn-add-venda').onclick = () => abrirModalVenda();
document.getElementById('close-modal-venda').onclick = fecharModalVenda;
document.getElementById('modal-venda').onclick = (e) => { if (e.target.classList.contains('modal')) fecharModalVenda(); };
document.getElementById('form-venda').onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('venda-id').value;
    const clienteId = document.getElementById('venda-cliente').value;
    const venda = {
        cliente: clienteId ? { id: parseInt(clienteId) } : null,
        valorTotal: parseFloat(document.getElementById('venda-valor-total').value)
    };
    try {
        if (id) {
            await fetchAPI(`/api/vendas/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(venda) });
        } else {
            await fetchAPI('/api/vendas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(venda) });
        }
        fecharModalVenda();
        carregarVendas();
    } catch (e) {
        alert('Erro ao salvar venda: ' + e.message);
    }
};
async function removerVenda(id) {
    if (!confirm('Deseja remover esta venda?')) return;
    try {
        await fetchAPI(`/api/vendas/${id}`, { method: 'DELETE' });
        carregarVendas();
    } catch (e) {
        alert('Erro ao remover venda: ' + e.message);
    }
}
async function verDetalhesVenda(venda) {
    alert(`Venda #${venda.id}\nCliente: ${venda.cliente?.nome || ''}\nTotal: R$ ${venda.valorTotal}`);
}
async function carregarVendas() {
    try {
        const vendas = await fetchAPI('/api/vendas');
        const div = document.getElementById('vendas-list');
        div.innerHTML = vendas.map(v =>
            `<div>Venda #${v.id} - Cliente: ${v.cliente?.nome || ''} - Total: R$ ${v.valorTotal?.toFixed(2) || '0.00'}
            <button onclick='abrirModalVenda(${JSON.stringify(v)})'>Editar</button>
            <button onclick='removerVenda(${v.id})'>Remover</button>
            <button onclick='verDetalhesVenda(${JSON.stringify(v)})'>Detalhes</button>
            </div>`
        ).join('');
    } catch (e) {
        document.getElementById('vendas-list').innerText = 'Erro ao carregar vendas.';
    }
}

// Relatórios
async function carregarRelatorios() {
    try {
        const estoqueBaixo = await fetchAPI('/api/produtos/estoque-baixo?minimo=5');
        const div = document.getElementById('relatorios-list');
        div.innerHTML = `<b>Produtos com estoque baixo:</b><ul>${estoqueBaixo.map(p => `<li>${p.nome} (${p.quantidadeEstoque})</li>`).join('')}</ul>`;
    } catch (e) {
        document.getElementById('relatorios-list').innerText = 'Erro ao carregar relatórios.';
    }
}

// Funções para modal de produto
// Carregar categorias no select do formulário de produto
async function preencherSelectCategorias() {
    const select = document.getElementById('produto-categoria');
    select.innerHTML = '<option value="">Selecione</option>';
    try {
        const categorias = await fetchAPI('/api/categorias');
        categorias.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.nome;
            select.appendChild(opt);
        });
    } catch (e) {
        select.innerHTML = '<option value="">Erro ao carregar categorias</option>';
    }
}

// Carregar fornecedores no select do formulário de produto
async function preencherSelectFornecedores() {
    const select = document.getElementById('produto-fornecedor');
    select.innerHTML = '<option value="">Nenhum</option>';
    try {
        const fornecedores = await fetchAPI('/api/fornecedores');
        fornecedores.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.id;
            opt.textContent = f.nome;
            select.appendChild(opt);
        });
    } catch (e) {
        select.innerHTML = '<option value="">Erro ao carregar fornecedores</option>';
    }
}

function abrirModalProduto(produto = null) {
    Promise.all([preencherSelectCategorias(), preencherSelectFornecedores()]).then(() => {
        document.getElementById('modal-produto').style.display = 'flex';
        document.getElementById('modal-produto-title').innerText = produto ? 'Editar Produto' : 'Adicionar Produto';
        document.getElementById('produto-id').value = produto ? produto.id : '';
        document.getElementById('produto-nome').value = produto ? produto.nome : '';
        document.getElementById('produto-descricao').value = produto ? produto.descricao : '';
        document.getElementById('produto-preco').value = produto ? produto.precoUnitario : '';
        document.getElementById('produto-estoque').value = produto ? produto.quantidadeEstoque : '';
        document.getElementById('produto-categoria').value = produto && produto.categoria ? produto.categoria.id : '';
        document.getElementById('produto-fornecedor').value = produto && produto.fornecedor ? produto.fornecedor.id : '';
    });
}

function fecharModalProduto() {
    document.getElementById('modal-produto').style.display = 'none';
}
document.getElementById('btn-add-produto').onclick = () => abrirModalProduto();
document.getElementById('close-modal-produto').onclick = fecharModalProduto;
document.getElementById('modal-produto').onclick = (e) => { if (e.target.classList.contains('modal')) fecharModalProduto(); };

document.getElementById('form-produto').onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('produto-id').value;
    const categoriaId = document.getElementById('produto-categoria').value;
    const fornecedorId = document.getElementById('produto-fornecedor').value;
    const produto = {
        nome: document.getElementById('produto-nome').value,
        descricao: document.getElementById('produto-descricao').value,
        precoUnitario: parseFloat(document.getElementById('produto-preco').value),
        quantidadeEstoque: parseInt(document.getElementById('produto-estoque').value),
        categoria: categoriaId ? { id: parseInt(categoriaId) } : null,
        fornecedor: fornecedorId ? { id: parseInt(fornecedorId) } : null
    };
    try {
        if (id) {
            await fetchAPI(`/api/produtos/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(produto) });
        } else {
            await fetchAPI('/api/produtos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(produto) });
        }
        fecharModalProduto();
        carregarProdutos();
    } catch (e) {
        alert('Erro ao salvar produto: ' + e.message);
    }
};

async function removerProduto(id) {
    if (!confirm('Deseja remover este produto?')) return;
    try {
        await fetchAPI(`/api/produtos/${id}`, { method: 'DELETE' });
        carregarProdutos();
    } catch (e) {
        alert('Erro ao remover produto: ' + e.message);
    }
}

async function verDetalhesProduto(produto) {
    alert(`Produto: ${produto.nome}\nDescrição: ${produto.descricao}\nPreço: R$ ${produto.precoUnitario}\nEstoque: ${produto.quantidadeEstoque}`);
}

// FORNECEDORES
function abrirModalFornecedor(fornecedor = null) {
    document.getElementById('modal-fornecedor').style.display = 'flex';
    document.getElementById('modal-fornecedor-title').innerText = fornecedor ? 'Editar Fornecedor' : 'Adicionar Fornecedor';
    document.getElementById('fornecedor-id').value = fornecedor ? fornecedor.id : '';
    document.getElementById('fornecedor-nome').value = fornecedor ? fornecedor.nome : '';
    document.getElementById('fornecedor-contato').value = fornecedor ? fornecedor.contato : '';
}
function fecharModalFornecedor() {
    document.getElementById('modal-fornecedor').style.display = 'none';
}
document.getElementById('btn-add-fornecedor').onclick = () => abrirModalFornecedor();
document.getElementById('close-modal-fornecedor').onclick = fecharModalFornecedor;
document.getElementById('modal-fornecedor').onclick = (e) => { if (e.target.classList.contains('modal')) fecharModalFornecedor(); };
document.getElementById('form-fornecedor').onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('fornecedor-id').value;
    const fornecedor = {
        nome: document.getElementById('fornecedor-nome').value,
        contato: document.getElementById('fornecedor-contato').value
    };
    try {
        if (id) {
            await fetchAPI(`/api/fornecedores/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fornecedor) });
        } else {
            await fetchAPI('/api/fornecedores', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(fornecedor) });
        }
        fecharModalFornecedor();
        carregarFornecedores();
    } catch (e) {
        alert('Erro ao salvar fornecedor: ' + e.message);
    }
};
async function removerFornecedor(id) {
    if (!confirm('Deseja remover este fornecedor?')) return;
    try {
        await fetchAPI(`/api/fornecedores/${id}`, { method: 'DELETE' });
        carregarFornecedores();
    } catch (e) {
        alert('Erro ao remover fornecedor: ' + e.message);
    }
}
async function verDetalhesFornecedor(fornecedor) {
    alert(`Fornecedor: ${fornecedor.nome}\nContato: ${fornecedor.contato}`);
}
async function carregarFornecedores() {
    try {
        const fornecedores = await fetchAPI('/api/fornecedores');
        const div = document.getElementById('fornecedores-list');
        div.innerHTML = fornecedores.map(f =>
            `<div><b>${f.nome}</b> - ${f.contato || ''}
            <button onclick='abrirModalFornecedor(${JSON.stringify(f)})'>Editar</button>
            <button onclick='removerFornecedor(${f.id})'>Remover</button>
            <button onclick='verDetalhesFornecedor(${JSON.stringify(f)})'>Detalhes</button>
            </div>`
        ).join('');
    } catch (e) {
        document.getElementById('fornecedores-list').innerText = 'Erro ao carregar fornecedores.';
    }
}

// FUNCIONÁRIOS
function abrirModalFuncionario(funcionario = null) {
    document.getElementById('modal-funcionario').style.display = 'flex';
    document.getElementById('modal-funcionario-title').innerText = funcionario ? 'Editar Funcionário' : 'Adicionar Funcionário';
    document.getElementById('funcionario-id').value = funcionario ? funcionario.id : '';
    document.getElementById('funcionario-nome').value = funcionario ? funcionario.nome : '';
    document.getElementById('funcionario-cargo').value = funcionario ? funcionario.cargo : '';
    document.getElementById('funcionario-salario').value = funcionario ? funcionario.salario : '';
}
function fecharModalFuncionario() {
    document.getElementById('modal-funcionario').style.display = 'none';
}
document.getElementById('btn-add-funcionario').onclick = () => abrirModalFuncionario();
document.getElementById('close-modal-funcionario').onclick = fecharModalFuncionario;
document.getElementById('modal-funcionario').onclick = (e) => { if (e.target.classList.contains('modal')) fecharModalFuncionario(); };
document.getElementById('form-funcionario').onsubmit = async function (e) {
    e.preventDefault();
    const id = document.getElementById('funcionario-id').value;
    const funcionario = {
        nome: document.getElementById('funcionario-nome').value,
        cargo: document.getElementById('funcionario-cargo').value,
        salario: parseFloat(document.getElementById('funcionario-salario').value)
    };
    try {
        if (id) {
            await fetchAPI(`/api/funcionarios/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(funcionario) });
        } else {
            await fetchAPI('/api/funcionarios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(funcionario) });
        }
        fecharModalFuncionario();
        carregarFuncionarios();
    } catch (e) {
        alert('Erro ao salvar funcionário: ' + e.message);
    }
};
async function removerFuncionario(id) {
    if (!confirm('Deseja remover este funcionário?')) return;
    try {
        await fetchAPI(`/api/funcionarios/${id}`, { method: 'DELETE' });
        carregarFuncionarios();
    } catch (e) {
        alert('Erro ao remover funcionário: ' + e.message);
    }
}
async function verDetalhesFuncionario(funcionario) {
    alert(`Funcionário: ${funcionario.nome}\nCargo: ${funcionario.cargo}\nSalário: R$ ${funcionario.salario}`);
}
async function carregarFuncionarios() {
    try {
        const funcionarios = await fetchAPI('/api/funcionarios');
        const div = document.getElementById('funcionarios-list');
        div.innerHTML = funcionarios.map(f =>
            `<div><b>${f.nome}</b> - ${f.cargo || ''}
            <button onclick='abrirModalFuncionario(${JSON.stringify(f)})'>Editar</button>
            <button onclick='removerFuncionario(${f.id})'>Remover</button>
            <button onclick='verDetalhesFuncionario(${JSON.stringify(f)})'>Detalhes</button>
            </div>`
        ).join('');
    } catch (e) {
        document.getElementById('funcionarios-list').innerText = 'Erro ao carregar funcionários.';
    }
}

// Inicialização
window.onload = () => {
    carregarProdutos();
    carregarClientes();
    carregarCategorias();
    carregarVendas();
    carregarFornecedores();
    carregarFuncionarios();
    carregarRelatorios();
};
