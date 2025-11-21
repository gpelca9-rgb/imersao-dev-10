document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const buscaAcervo = document.getElementById('busca-acervo');
    const botaoBusca = document.getElementById('botao-busca');
    const modal = document.getElementById('comment-modal');
    const closeModalButton = document.querySelector('.close-button');
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const modalBookDetails = document.getElementById('modal-book-details');

    let livros = [];
    let currentBookId = null;

    // Carrega os dados dos livros
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            livros = data;
            displayLivros(livros);
            displayRandomQuote();
            
            
        });

    // Função para exibir uma citação aleatória no footer
    function displayRandomQuote() {
        const citacaoFooter = document.getElementById('citacao-footer');
        if (livros.length > 0 && citacaoFooter) {
            const livrosComCitacao = livros.filter(livro => livro.citacao);
            if (livrosComCitacao.length > 0) {
                const randomIndex = Math.floor(Math.random() * livrosComCitacao.length);
                const randomBook = livrosComCitacao[randomIndex];
                citacaoFooter.innerHTML = `"${randomBook.citacao}" - <em>${randomBook.autor}</em>`;
            }
        }
    }
    // Função para criar o card "Me Surpreenda"
    function createSurpriseCard() {
        const card = document.createElement('div');
        card.classList.add('card', 'surprise-card');

        card.innerHTML = `
            <div class="card-info">
                
                
            </div>
        `;
        card.addEventListener('click', () => {
            if (livros.length > 0) {
                const randomIndex = Math.floor(Math.random() * livros.length);
                const randomBook = livros[randomIndex];
                window.open(randomBook.link, '_blank', 'noopener,noreferrer');
            }
        });
        cardContainer.appendChild(card);
    }

    // Função para exibir os livros na página
    function displayLivros(livrosParaExibir) {
        cardContainer.innerHTML = '';
        livrosParaExibir.forEach((livro, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.bookId = index; // Usando o índice como ID

            card.innerHTML = `
                <img src="${livro.imagem}" alt="Capa do livro ${livro.nome}">
                <div class="card-info">
                    <h2>${livro.nome}</h2>
                    <p>por ${livro.autor} (${livro.ano})</p>
                    <p class="descricao">${livro.descricao}</p>
                    <a href="${livro.link}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Ver na fonte</a>
                </div>
            `;
            card.addEventListener('click', () => openModal(index));
            cardContainer.appendChild(card);
        });

        // Adiciona o card "Me Surpreenda" no final
        createSurpriseCard();
    }

    // Função de busca
    function buscar() {
        const termo = buscaAcervo.value.toLowerCase();
        const livrosFiltrados = livros.filter(livro => 
            livro.nome.toLowerCase().includes(termo) ||
            livro.autor.toLowerCase().includes(termo) ||
            livro.descricao.toLowerCase().includes(termo)
        );
        displayLivros(livrosFiltrados);
    }

    botaoBusca.addEventListener('click', buscar);
    buscaAcervo.addEventListener('input', buscar);

    // Funções do Modal e Comentários

    function openModal(bookId) {
        currentBookId = `book_${bookId}`;
        const livro = livros[bookId];

        modalBookDetails.innerHTML = `
            <h2>${livro.nome}</h2>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Ano:</strong> ${livro.ano}</p>
            <p>${livro.descricao}</p>
        `;

        loadComments();
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
        currentBookId = null;
        commentsList.innerHTML = '';
        modalBookDetails.innerHTML = '';
    }

    function getComments() {
        if (!currentBookId) return [];
        const allComments = JSON.parse(localStorage.getItem('comments')) || {};
        return allComments[currentBookId] || [];
    }

    function saveComment(commentText) {
        if (!currentBookId) return;
        const allComments = JSON.parse(localStorage.getItem('comments')) || {};
        if (!allComments[currentBookId]) {
            allComments[currentBookId] = [];
        }
        
        const newComment = {
            text: commentText,
            date: new Date().toISOString()
        };

        allComments[currentBookId].push(newComment);
        localStorage.setItem('comments', JSON.stringify(allComments));
    }

    function loadComments() {
        commentsList.innerHTML = '';
        const comments = getComments();
        if (comments.length === 0) {
            commentsList.innerHTML = '<p>Nenhum comentário ainda. Seja o primeiro!</p>';
            return;
        }

        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.classList.add('comment');
            const commentDate = new Date(comment.date).toLocaleString('pt-BR');
            commentEl.innerHTML = `<p>${comment.text}</p><small>${commentDate}</small>`;
            commentsList.appendChild(commentEl);
        });
    }

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = document.getElementById('comment-text').value;
        if (commentText.trim()) {
            saveComment(commentText);
            loadComments();
            document.getElementById('comment-text').value = '';
        }
    });

    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
});