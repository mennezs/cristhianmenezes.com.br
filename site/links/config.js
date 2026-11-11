/*
 * ============================================================================
 *  CONFIGURAÇÃO DA PÁGINA DE LINKS
 *  Edite só este arquivo. Salve e recarregue a página para ver o resultado.
 * ============================================================================
 *
 *  ÍCONES
 *  - Coloque suas imagens na pasta  links/icons/  (svg, png ou webp).
 *  - No campo  icon  escreva o caminho, ex.:  icon: "icons/instagram.svg"
 *  - Se deixar  icon: ""  aparece um espaço reservado com a primeira letra.
 *
 *  ADICIONAR UM LINK NOVO
 *  - Copie um bloco { ... }, inclusive a vírgula no final, e cole onde
 *    quiser na lista. A ordem na lista é a ordem na página.
 *
 *  REMOVER UM LINK
 *  - Apague o bloco { ... } inteiro.
 */

window.LINKS_CONFIG = {
  // --- Cabeçalho ------------------------------------------------------------
  profile: {
    name: "Cristhian Menezes",
    bio: "Creative Developer. Technology, Design and Films.",
    // Foto/avatar: caminho da imagem, ex.: "icons/avatar.webp". Vazio = espaço reservado.
    avatar: "icons/avatar.png",
  },

  // --- Ícones redondos de redes sociais (fila no topo) ----------------------
  socials: [
    { label: "Instagram", url: "https://instagram.com/mennezzss", icon: "icons/instagram-icon.png" },
    { label: "X / Twitter", url: "https://x.com/itsnotaskull", icon: "icons/x-icon.png" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/cristhianmenezes", icon: "icons/linkedin-icon.png" },
    { label: "E-mail", url: "mailto:hey@cristhianmenezes.com.br", icon: "icons/email-icon.png" },
  ],

  // --- Lista de links (botões grandes) --------------------------------------
  //  title        texto principal do botão (obrigatório)
  //  description  linha menor embaixo do título (opcional, pode apagar)
  //  url          para onde o botão leva
  //  icon         imagem quadrada à esquerda (opcional)
  //  image        imagem grande em destaque em cima do botão (opcional)
  //  section      para criar um título de seção, use só { section: "Nome" }
  links: [
    {
      title: "My page",
      description: "cristhianmenezes.com.br",
      url: "/",
      icon: "icons/avatar2.png",
    },
    {
      title: "Youtube",
      description: "Making of, experiments and projects",
      url: "https://www.youtube.com/@mennezs",
      icon: "icons/youtube-icon.png",
    },
    // {
    //   title: "LinkedIn",
    //   url: "https://www.linkedin.com/in/SEU_USUARIO",
    //   icon: "",
    // },

    // // { section: "Projetos" },

    // // {
    // //   title: "Projeto em destaque",
    // //   description: "Troque este texto, o link e a imagem",
    // //   url: "#",
    // //   icon: "",
    // //   image: "",
    // // },
    // // {
    // //   title: "Mande um e-mail",
    // //   description: "Para freelas e colaborações",
    // //   url: "mailto:SEU@EMAIL.com",
    // //   icon: "",
    // // },
  ],

  // --- Rodapé ---------------------------------------------------------------
  footer: {
    text: "← back to page",
    url: "/",
  },
};
