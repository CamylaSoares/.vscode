document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("material-form");
    const materiaisList = document.getElementById("materiais-list");

    let materiais = [];

    // Função para renderizar os materiais na tabela
    function renderMateriais() {
        materiaisList.innerHTML = "";

        materiais.forEach((material, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${material.nome}</td>
                <td>${material.descricao}</td>
                <td>${material.preco}</td>
                <td class="action-buttons">
                    <button onclick="editMaterial(${index})" id="edit-btn-${index}">Editar</button>
                    <button onclick="deleteMaterial(${index})" id="delete-btn-${index}">Excluir</button>
                </td>
            `;
            materiaisList.appendChild(tr);
        });
    }

    // Função para adicionar ou atualizar um material
    function addOrUpdateMaterial(event) {
        event.preventDefault();

        const id = document.getElementById("material-id").value;
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const preco = parseFloat(document.getElementById("preco").value);

        if (nome.trim() === "" || descricao.trim() === "" || isNaN(preco)) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const material = { id, nome, descricao, preco };

        if (id === "") {
            materiais.push(material);
        } else {
            materiais[id] = material;
        }

        form.reset();
        renderMateriais();
    }

    // Função para editar um material
    function editMaterial(index) {
        const material = materiais[index];
        document.getElementById("material-id").value = index;
        document.getElementById("nome").value = material.nome;
        document.getElementById("descricao").value = material.descricao;
        document.getElementById("preco").value = material.preco;
    }

   // Função para excluir um material
function deleteMaterial(index) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este material?");
    if (confirmDelete) {
        materiais.splice(index, 1);
        renderMateriais(); // Atualiza a tela após excluir o material
    }
}


    // Adicionar evento de submit ao formulário
    form.addEventListener("submit", addOrUpdateMaterial);

    // Exemplo de materiais pré-carregados (pode ser substituído pela integração com o backend)
    materiais.push({ nome: "Tijolo", descricao: "9 furos", preco: 1.89 });
    
    // Renderizar os materiais na inicialização
    renderMateriais();
});
