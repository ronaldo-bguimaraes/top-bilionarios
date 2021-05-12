const news = $("#news");

$.ajax({
  type: "GET",
  url: "https://g1.globo.com/rss/g1/",
  dataType: "xml",
  success: function (xml) {

    const items = $(xml).find("item");

    items.each(function (index) {

      function isMedia() {
        return this.nodeName === "media:content";
      }

      const media = $(this).contents().filter(isMedia).attr("url");

      const title = $(this).find("title");

      const description = $(this).find("description");

      const link = $(this).find("link");

      function isCDATA() {
        return this.nodeName === "#cdata-section";
      }

      description.contents().filter(isCDATA).remove();

      const img = media ? `<img class="card-img-top" src="${media}">` : "";

      const item = $.parseHTML(`
        <div class="card my-3 bg-light">
          ${img}
          <div class="card-body text-justify">
            <h5 class="card-title">${title.text()}</h5>
            <p class="card-text">${description.text().slice(0, 200)}...</p>
            <a href="${link.text()}" target="_blank" class="btn btn-outline-primary">Abrir em nova guia</a>
          </div>
        </div>
      `);

      news.append(item);
    });
  }
});