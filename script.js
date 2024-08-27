document.getElementById('buscar-cachorro').addEventListener('click', buscarCachorro);

function buscarCachorro() {
    const cabecalhos = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
    });

    const opcoesRequisicao = {
        method: 'GET',
        headers: cabecalhos,
        redirect: 'follow'
    };

    fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", opcoesRequisicao)
        .then(response => response.json())
        .then(resultado => {
            const cachorroImagem = document.getElementById('cachorro-imagem');
            const cachorroInfo = document.getElementById('cachorro-info');

            if (resultado.length > 0 && resultado[0].breeds.length > 0) {
                const cachorroDados = resultado[0];
                const raca = cachorroDados.breeds[0];

                cachorroImagem.src = cachorroDados.url;
                cachorroInfo.innerHTML = `
                    <p><strong>Breed:</strong> ${raca.name}</p>
                    <p><strong>Temperament:</strong> ${raca.temperament}</p>
                    <p><strong>Life Span:</strong> ${raca.life_span}</p>
                `;
            } else {
                cachorroInfo.textContent = 'Informações da raça não disponíveis.';
            }
        })
        .catch(error => console.log('Erro:', error));
}

// Buscar um cachorro quando a página carregar
buscarCachorro();
