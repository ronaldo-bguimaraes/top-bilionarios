const url = "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10&destaque=1";

function sucessJson(json) {

  $("#spinner").remove();

  for (const item of json.items) {

    // console.log(item);

    const imagens = JSON.parse(item.imagens);

    const card_img = `<img class="card-img-top" src="https://ibge.gov.br/${imagens.image_intro}">`;

    $("#news").append(`
      <div class="card mb-3 bg-light">
        ${imagens.image_intro ? card_img : ""}
        <div class="card-body text-justify">
          <h5 class="card-title">${item.titulo}</h5>
          <p class="card-text">${item.introducao}</p>
          <a class="card-link" href="${item.link}" target="_blank">Abrir em nova guia</a>
        </div>
        <div class="card-footer bg-light">
          <p class="card-text">
            <small class="text-muted">Publicado em: ${item.data_publicacao}</small>
          </p>
        </div>
      </div>
    `);
  }
}

fetch(url).then(e => e.json()).then(sucessJson);