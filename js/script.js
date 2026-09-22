(function () {
  "use strict";

  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("nav-panel");
  var iconOpen = document.getElementById("icon-open");
  var iconClose = document.getElementById("icon-close");

  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var willOpen = panel.classList.contains("hidden");
      panel.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", String(willOpen));
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle("hidden", willOpen);
        iconClose.classList.toggle("hidden", !willOpen);
      }
    });
  }

  var relatedList = document.getElementById("related-links");
  if (!relatedList) return;

  var currentPath = window.location.pathname.replace(/\/index\.html$/, "/");

  fetch("/data/site_data.json")
    .then(function (res) {
      if (!res.ok) throw new Error("site_data.json недоступен");
      return res.json();
    })
    .then(function (articles) {
      if (!Array.isArray(articles) || articles.length === 0) {
        hideSection();
        return;
      }

      var currentMeta = articles.find(function (a) { return a.url === currentPath; });
      var related = currentMeta && Array.isArray(currentMeta.related) ? currentMeta.related : [];

      if (related.length === 0) {
        hideSection();
        return;
      }

      relatedList.innerHTML = related.map(function (a) {
        return (
          '<li><a class="related-card" href="' + a.url + '">' +
          '<span class="related-card__category">' + a.category_label + '</span>' +
          '<span class="related-card__title">' + a.title + '</span>' +
          '</a></li>'
        );
      }).join("");
    })
    .catch(hideSection);

  function hideSection() {
    var section = relatedList.closest("section");
    if (section) section.style.display = "none";
  }
})();
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||
[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)
[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym")
ym(112936269, "init", {
id:112936269,
clickmap:true,
trackLinks:true,
accurateTrackBounce:true
});
