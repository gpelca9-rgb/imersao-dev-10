O "Mini Acervo" é uma aplicação web front-end elegante e interativa, projetada para exibir uma coleção pessoal de livros. Funciona como uma estante virtual, onde cada livro é apresentado em um card com sua capa, informações e um link para uma fonte externa. A interface é moderna, com um tema escuro, e totalmente responsiva, adaptando-se a diferentes tamanhos de tela, de desktops a dispositivos móveis.

A aplicação é construída inteiramente com tecnologias client-side (HTML, CSS e JavaScript), não necessitando de um back-end. Os dados dos livros são carregados dinamicamente a partir de um arquivo JSON local, tornando simples a adição, remoção ou edição de livros no acervo.

Funcionalidades Principais
Visualização em Cards: Os livros são exibidos em um layout de grade responsivo, com cards que revelam mais informações ao passar o mouse.
Busca em Tempo Real: Uma barra de busca permite filtrar os livros por título, autor ou descrição, com os resultados sendo atualizados instantaneamente.
Modal de Detalhes e Comentários: Clicar em um livro abre uma janela modal com seus detalhes e uma seção de comentários.
Sistema de Comentários Persistente: Os usuários podem deixar comentários em cada livro. Esses comentários são salvos no localStorage do navegador, permanecendo disponíveis entre as sessões.
Funcionalidade "Me Surpreenda": Um card especial permite que o usuário seja redirecionado para um livro aleatório do acervo, incentivando a descoberta.
Citação Aleatória no Rodapé: A cada carregamento da página, uma citação de um dos livros do acervo é exibida no rodapé.
Design Moderno e Responsivo: A interface utiliza CSS moderno (Flexbox e Grid) para garantir uma ótima experiência de usuário em qualquer dispositivo.
Tecnologias Utilizadas
HTML5: Para a estrutura semântica do conteúdo.
CSS3: Para a estilização completa, incluindo:
Variáveis CSS: Para um tema consistente e de fácil manutenção.
Flexbox e Grid Layout: Para a criação de layouts complexos e responsivos.
Media Queries: Para adaptar a interface a diferentes resoluções de tela.
Transições e Animações: Para uma experiência de usuário mais fluida e interativa.
JavaScript (ES6+): Para toda a lógica da aplicação, incluindo:
Fetch API: Para carregar os dados dos livros de forma assíncrona do arquivo data.json.
Manipulação do DOM: Para criar e atualizar dinamicamente os cards de livros e outros elementos da página.
Event Listeners: Para gerenciar a interatividade do usuário (buscas, cliques, envio de formulários).
Local Storage API: Para armazenar e recuperar os comentários dos usuários, garantindo a persistência dos dados no navegador.
JSON: Como formato de arquivo para armazenar os dados do acervo de livros de forma estruturada.
