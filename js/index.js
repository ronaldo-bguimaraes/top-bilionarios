const url = "https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=99";

function sucessJson(json) {

  for (const item of json.items) {

    const imagens = JSON.parse(item.imagens);

    const card_img = `<img class="card-img" src="https://ibge.gov.br/${imagens.image_intro}">`;

    $("#news").append(`
      <div class="col-lg">
        <div class="card my-3 text-justify">
          ${imagens.image_intro ? card_img : ""}
          <div class="card-body">
            <h5 class="card-title">${item.titulo}</h5>
            <p class="card-text">${item.introducao}</p>
            <a href="${item.link}" target="_blank" class="btn btn-primary">Abrir em nova guia</a>
          </div>
        </div>
      </div>
    `);
  }
}

fetch(url).then(e => e.json()).then(sucessJson);