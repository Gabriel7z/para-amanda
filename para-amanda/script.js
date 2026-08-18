(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function aplicarTextos() {
    $$("[data-campo]").forEach((el) => {
      const chave = el.dataset.campo;
      if (CONFIG[chave] != null) el.textContent = CONFIG[chave];
    });
    document.title = "Para " + CONFIG.nomeDela;
  }

  function montarCarta() {
    const caixa = $("#textoCarta");
    CONFIG.carta
      .trim()
      .split(/\n\s*\n/)
      .forEach((paragrafo) => {
        const p = document.createElement("p");
        p.textContent = paragrafo.trim();
        caixa.appendChild(p);
      });
  }

  function montarMotivos() {
    const grade = $("#gradeMotivos");
    CONFIG.motivos.forEach((item, i) => {
      const art = document.createElement("article");
      art.className = "cartao revelar";
      art.innerHTML =
        '<p class="cartao-num">' +
        String(i + 1).padStart(2, "0") +
        "</p><h3></h3><p></p>";
      art.querySelector("h3").textContent = item.titulo;
      art.querySelectorAll("p")[1].textContent = item.texto;
      grade.appendChild(art);
    });
  }

  function montarHistoria() {
    const lista = $("#linhaTempo");
    CONFIG.historia.forEach((item) => {
      const li = document.createElement("li");
      li.className = "revelar";
      li.innerHTML =
        '<p class="evento-data"></p><h3 class="evento-titulo"></h3><p class="evento-texto"></p>';
      li.querySelector(".evento-data").textContent = item.data;
      li.querySelector(".evento-titulo").textContent = item.titulo;
      li.querySelector(".evento-texto").textContent = item.texto;
      lista.appendChild(li);
    });
  }

  function candidatosFoto(src) {
    const m = String(src).match(/^(.*)\.([a-z0-9]+)$/i);
    if (!m) return [src];
    const base = m[1];
    return [
      src,
      base + ".jpeg",
      base + ".png",
      base + ".webp",
      base + ".JPG",
      base + ".JPEG",
      base + ".PNG",
    ];
  }

  const GIROS = [-3.2, 2.4, -1.6, 3.5, -2.8, 1.9, -3.6, 2.8, -1.2, 3.1];
  const album = [];
  let tocarMusica = null;

  function carregarFoto(quadro, src, alt) {
    const img = document.createElement("img");
    img.alt = alt;
    const tentativas = candidatosFoto(src);
    let i = 0;
    const tentar = () => {
      if (i >= tentativas.length) {
        img.remove();
        return;
      }
      img.src = tentativas[i];
      i += 1;
    };
    img.addEventListener("load", () => {
      quadro.textContent = "";
      quadro.appendChild(img);
    });
    img.addEventListener("error", tentar);
    tentar();
    return img;
  }

  function criarPolaroid(foto, indice, extraClass) {
    const fig = document.createElement("figure");
    fig.className = "polaroid revelar" + (extraClass ? " " + extraClass : "");
    fig.style.setProperty("--giro", GIROS[indice % GIROS.length] + "deg");
    const quadro = document.createElement("div");
    quadro.className = "polaroid-foto";
    quadro.textContent = "♥";
    carregarFoto(quadro, foto.src, foto.legenda);
    const cap = document.createElement("figcaption");
    cap.textContent = foto.legenda;
    fig.append(quadro, cap);
    fig.addEventListener("click", () => abrirFoto(indice));
    return fig;
  }

  function montarCapaFoto() {
    const caixa = $("#capaPolaroid");
    const foto = CONFIG.fotos[0];
    if (!caixa || !foto) return;
    caixa.appendChild(criarPolaroid(foto, 0, "polaroid-capa"));
  }

  function montarFotos() {
    const grade = $("#polaroides");
    CONFIG.fotos.forEach((foto, i) => {
      album.push(foto);
      grade.appendChild(criarPolaroid(foto, i));
    });
  }

  function iniciarLightbox() {
    const caixa = $("#lightbox");
    const img = $("#lightboxImg");
    const cap = $("#lightboxLegenda");
    if (!caixa) return;

    let atual = 0;

    function mostrar(i) {
      if (!album.length) return;
      atual = (i + album.length) % album.length;
      const foto = album[atual];
      img.src = foto.src;
      img.alt = foto.legenda;
      cap.textContent = foto.legenda;
      caixa.hidden = false;
      document.body.classList.add("lightbox-aberto");
    }

    function fechar() {
      caixa.hidden = true;
      document.body.classList.remove("lightbox-aberto");
    }

    window.abrirFoto = mostrar;
    $("#lightboxFechar").addEventListener("click", fechar);
    $("#lightboxPrev").addEventListener("click", (e) => {
      e.stopPropagation();
      mostrar(atual - 1);
    });
    $("#lightboxNext").addEventListener("click", (e) => {
      e.stopPropagation();
      mostrar(atual + 1);
    });
    caixa.addEventListener("click", (e) => {
      if (e.target === caixa) fechar();
    });
    document.addEventListener("keydown", (e) => {
      if (caixa.hidden) return;
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") mostrar(atual - 1);
      if (e.key === "ArrowRight") mostrar(atual + 1);
    });
  }

  function montarMotivoDoDia() {
    const secao = $("#motivoDoDia");
    const alvo = $("#motivoDiaTexto");
    const lista = CONFIG.motivosDoDia;
    if (!secao || !alvo || !Array.isArray(lista) || !lista.length) return;

    const inicio = new Date(CONFIG.dataNamoro + "T00:00:00");
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dias = Math.floor((hoje - inicio) / 86400000);
    const i = ((dias % lista.length) + lista.length) % lista.length;

    alvo.textContent = lista[i];
    secao.hidden = false;
  }

  const CHAVE_BILHETES = "para-amanda:bilhetes";

  function bilhetesAbertos() {
    try {
      const lista = JSON.parse(localStorage.getItem(CHAVE_BILHETES) || "[]");
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return [];
    }
  }

  function marcarBilhete(indice) {
    try {
      const lista = bilhetesAbertos();
      if (lista.indexOf(indice) === -1) {
        lista.push(indice);
        localStorage.setItem(CHAVE_BILHETES, JSON.stringify(lista));
      }
    } catch (e) {
      // sem armazenamento o bilhete abre igual, só não fica marcado
    }
  }

  function abrirBilhete(indice, botao) {
    const bilhete = CONFIG.bilhetes[indice];
    const modal = $("#bilheteModal");
    if (!bilhete || !modal) return;

    $("#bilheteQuando").textContent = bilhete.quando;
    const corpo = $("#bilheteTexto");
    corpo.textContent = "";
    bilhete.texto
      .trim()
      .split(/\n\s*\n/)
      .forEach((paragrafo) => {
        const p = document.createElement("p");
        p.textContent = paragrafo.trim();
        corpo.appendChild(p);
      });

    modal.hidden = false;
    document.body.classList.add("bilhete-aberto");
    marcarBilhete(indice);

    if (botao) {
      botao.classList.add("aberto");
      botao.querySelector(".bilhete-abrir").textContent = "ler de novo";
    }
  }

  function montarBilhetes() {
    const secao = $("#bilhetes");
    const grade = $("#gradeBilhetes");
    const lista = CONFIG.bilhetes;
    if (!secao || !grade || !Array.isArray(lista) || !lista.length) return;

    const abertos = bilhetesAbertos();
    lista.forEach((bilhete, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bilhete revelar";
      btn.innerHTML =
        '<span class="bilhete-lacre" aria-hidden="true">♥</span>' +
        '<span class="bilhete-quando"></span>' +
        '<span class="bilhete-abrir"></span>';
      btn.querySelector(".bilhete-quando").textContent = bilhete.quando;
      const jaAberto = abertos.indexOf(i) !== -1;
      btn.classList.toggle("aberto", jaAberto);
      btn.querySelector(".bilhete-abrir").textContent = jaAberto
        ? "ler de novo"
        : "abrir";
      btn.addEventListener("click", () => abrirBilhete(i, btn));
      grade.appendChild(btn);
    });

    secao.hidden = false;
  }

  function iniciarBilhetes() {
    const modal = $("#bilheteModal");
    if (!modal) return;

    function fechar() {
      modal.hidden = true;
      document.body.classList.remove("bilhete-aberto");
    }

    $("#bilheteFechar").addEventListener("click", fechar);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) fechar();
    });
    document.addEventListener("keydown", (e) => {
      if (!modal.hidden && e.key === "Escape") fechar();
    });
  }

  function iniciarCinema() {
    const caixa = $("#cinema");
    const botao = $("#btnCinema");
    if (!caixa || !botao) return;
    if (!album.length) {
      botao.hidden = true;
      return;
    }

    const camadas = [$("#cinemaA"), $("#cinemaB")];
    const legenda = $("#cinemaLegenda");
    const progresso = $("#cinemaProgresso");
    const fim = $("#cinemaFim");
    const pausa = $("#cinemaPausa");
    const DURACAO = 4600;

    let indice = 0;
    let ativa = 1;
    let timer = null;
    let pausado = false;

    function preCarregar(i) {
      if (!album[i]) return;
      const img = new Image();
      img.src = album[i].src;
    }

    function pintar(i) {
      const foto = album[i];
      if (!foto) return;

      const proxima = camadas[1 - ativa];
      const img = proxima.querySelector("img");
      img.src = foto.src;
      img.alt = foto.legenda;
      proxima.querySelector(".cinema-fundo").style.backgroundImage =
        'url("' + foto.src + '")';
      proxima.classList.remove("visivel");
      void proxima.offsetWidth;
      proxima.classList.add("visivel");
      camadas[ativa].classList.remove("visivel");
      ativa = 1 - ativa;

      legenda.textContent = foto.legenda;
      legenda.classList.remove("aparecer");
      void legenda.offsetWidth;
      legenda.classList.add("aparecer");

      progresso.style.width = ((i + 1) / album.length) * 100 + "%";
      preCarregar(i + 1);
      preCarregar(i + 2);
    }

    function agendar() {
      clearTimeout(timer);
      timer = setTimeout(avancar, DURACAO);
    }

    function avancar() {
      if (indice + 1 >= album.length) {
        clearTimeout(timer);
        $("#cinemaFimFrase").textContent = CONFIG.fraseFinal;
        fim.hidden = false;
        return;
      }
      indice += 1;
      pintar(indice);
      agendar();
    }

    function comecar() {
      indice = 0;
      pausado = false;
      fim.hidden = true;
      caixa.classList.remove("pausado");
      pausa.textContent = "❚❚";
      pintar(0);
      agendar();
    }

    function abrir() {
      caixa.hidden = false;
      document.body.classList.add("cinema-aberto");
      comecar();
      if (tocarMusica) tocarMusica();
    }

    function fechar() {
      clearTimeout(timer);
      caixa.hidden = true;
      document.body.classList.remove("cinema-aberto");
    }

    function alternarPausa() {
      pausado = !pausado;
      caixa.classList.toggle("pausado", pausado);
      pausa.textContent = pausado ? "▶" : "❚❚";
      if (pausado) clearTimeout(timer);
      else agendar();
    }

    botao.addEventListener("click", abrir);
    $("#cinemaFechar").addEventListener("click", fechar);
    pausa.addEventListener("click", alternarPausa);
    $("#cinemaRepetir").addEventListener("click", comecar);
    document.addEventListener("keydown", (e) => {
      if (caixa.hidden) return;
      if (e.key === "Escape") fechar();
      if (e.code === "Space" && !e.target.closest("button")) {
        e.preventDefault();
        alternarPausa();
      }
    });
  }

  function montarPromessas() {
    const ul = $("#listaPromessas");
    CONFIG.promessas.forEach((texto) => {
      const li = document.createElement("li");
      li.className = "revelar";
      li.textContent = texto;
      ul.appendChild(li);
    });
  }

  function montarContador(id, prefixo) {
    const caixa = $(id);
    const unidades = [
      ["dias", prefixo + "-dias"],
      ["horas", prefixo + "-horas"],
      ["min", prefixo + "-min"],
      ["seg", prefixo + "-seg"],
    ];
    unidades.forEach(([nome, elId]) => {
      const bloco = document.createElement("div");
      bloco.className = "contador-bloco";
      bloco.innerHTML = "<strong id=\"" + elId + "\">0</strong><span></span>";
      bloco.querySelector("span").textContent = nome;
      caixa.appendChild(bloco);
    });
  }

  function iniciarContadores() {
    montarContador("#contadorConheceu", "conheceu");
    montarContador("#contadorNamoro", "namoro");

    const conheceu = new Date(CONFIG.dataConheceu + "T00:00:00");
    const namoro = new Date(CONFIG.dataNamoro + "T00:00:00");

    function preencher(prefixo, inicio) {
      if (Number.isNaN(inicio.getTime())) return;
      let diff = Math.max(0, Date.now() - inicio.getTime());
      const dias = Math.floor(diff / 86400000);
      diff -= dias * 86400000;
      const horas = Math.floor(diff / 3600000);
      diff -= horas * 3600000;
      const min = Math.floor(diff / 60000);
      diff -= min * 60000;
      const seg = Math.floor(diff / 1000);
      $("#" + prefixo + "-dias").textContent = dias;
      $("#" + prefixo + "-horas").textContent = String(horas).padStart(2, "0");
      $("#" + prefixo + "-min").textContent = String(min).padStart(2, "0");
      $("#" + prefixo + "-seg").textContent = String(seg).padStart(2, "0");
    }

    function tick() {
      preencher("conheceu", conheceu);
      preencher("namoro", namoro);
    }

    tick();
    setInterval(tick, 1000);
  }

  function observarRevelar() {
    const els = $$(".revelar");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visto"));
      return;
    }
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visto");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    els.forEach((el) => io.observe(el));
  }

  function petalas() {
    const canvas = $("#petalas");
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    const flakes = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function criar(qtd) {
      for (let i = 0; i < qtd; i += 1) {
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 4 + Math.random() * 7,
          s: 0.4 + Math.random() * 0.9,
          a: Math.random() * Math.PI * 2,
          cor: Math.random() > 0.5 ? "rgba(232,180,196,0.7)" : "rgba(196,92,116,0.55)",
        });
      }
    }

    function desenhar() {
      ctx.clearRect(0, 0, w, h);
      flakes.forEach((p) => {
        p.y += p.s;
        p.x += Math.sin(p.a) * 0.6;
        p.a += 0.01;
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.cor;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(desenhar);
    }

    resize();
    criar(28);
    window.addEventListener("resize", resize);
    desenhar();
  }

  function soltarCoracao(x, y) {
    const span = document.createElement("span");
    span.className = "coracao-solto";
    span.textContent = ["♥", "♡", "❤"][Math.floor(Math.random() * 3)];
    span.style.left = x - 8 + "px";
    span.style.top = y - 8 + "px";
    span.style.fontSize = 1.1 + Math.random() + "rem";
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1600);
  }

  function chuvaDeCoracoes() {
    const total = 28;
    for (let i = 0; i < total; i += 1) {
      setTimeout(() => {
        soltarCoracao(
          Math.random() * window.innerWidth,
          window.innerHeight - 40 - Math.random() * 80
        );
      }, i * 50);
    }
  }

  function musica() {
    const btn = $("#btnMusica");
    if (!CONFIG.youtubeId) {
      btn.hidden = true;
      return;
    }

    let player = null;
    let pronto = false;
    let querTocar = false;
    let pedidoDePlayer = false;

    function estadoTocando() {
      if (!player || typeof YT === "undefined" || !YT.PlayerState) return false;
      const estado = player.getPlayerState();
      return estado === YT.PlayerState.PLAYING || estado === YT.PlayerState.BUFFERING;
    }

    function atualizarBotao() {
      btn.classList.toggle("tocando", estadoTocando());
    }

    const criarPlayer = function () {
      if (player || !document.getElementById("ytplayer")) return;
      player = new YT.Player("ytplayer", {
        width: "100%",
        height: "100%",
        videoId: CONFIG.youtubeId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: CONFIG.youtubeId,
        },
        events: {
          onReady: function () {
            pronto = true;
            if (querTocar) player.playVideo();
            atualizarBotao();
          },
          onStateChange: atualizarBotao,
          onError: function () {
            btn.hidden = true;
          },
        },
      });
    };

    function garantirPlayer() {
      pedidoDePlayer = true;
      if (window.YT && YT.Player) criarPlayer();
    }

    window.onYouTubeIframeAPIReady = function () {
      if (pedidoDePlayer) criarPlayer();
    };

    if (!(window.YT && YT.Player)) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    function tocar() {
      querTocar = true;
      garantirPlayer();
      if (pronto && player) {
        player.playVideo();
        atualizarBotao();
      }
    }

    function pausar() {
      querTocar = false;
      if (pronto && player) player.pauseVideo();
      atualizarBotao();
    }

    btn.addEventListener("click", () => {
      if (estadoTocando()) pausar();
      else tocar();
    });

    return tocar;
  }

  function abrirCarta() {
    const capa = $("#capa");
    const envelope = $("#envelope");
    const site = $("#site");
    tocarMusica = musica();

    function abrir() {
      envelope.classList.add("aberto");
      setTimeout(() => {
        capa.classList.add("saida");
        site.hidden = false;
        site.classList.add("visivel");
        observarRevelar();
        if (tocarMusica) tocarMusica();
        setTimeout(() => capa.remove(), 1000);
      }, 650);
    }

    envelope.addEventListener("click", abrir);
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrir();
      }
    });
  }

  aplicarTextos();
  montarCarta();
  montarMotivoDoDia();
  montarMotivos();
  montarHistoria();
  montarCapaFoto();
  montarFotos();
  iniciarLightbox();
  iniciarCinema();
  montarBilhetes();
  iniciarBilhetes();
  montarPromessas();
  iniciarContadores();
  petalas();
  abrirCarta();

  $("#btnCoracoes").addEventListener("click", chuvaDeCoracoes);
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(
        ".capa, .btn-musica, a, button, .player-moldura, .lightbox, .polaroid, .cinema, .bilhete-modal"
      )
    ) {
      return;
    }
    soltarCoracao(e.clientX, e.clientY);
  });
})();
