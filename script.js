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

  const ESTRELAS = [
    { ra: 6.752, de: -16.72, mag: -1.46 },
    { ra: 6.399, de: -52.7, mag: -0.74 },
    { ra: 14.66, de: -60.84, mag: -0.27 },
    { ra: 14.261, de: 19.18, mag: -0.05 },
    { ra: 18.616, de: 38.78, mag: 0.03 },
    { ra: 5.278, de: 46.0, mag: 0.08 },
    { ra: 5.242, de: -8.2, mag: 0.13 },
    { ra: 7.655, de: 5.22, mag: 0.34 },
    { ra: 1.629, de: -57.24, mag: 0.46 },
    { ra: 5.919, de: 7.41, mag: 0.5 },
    { ra: 14.064, de: -60.37, mag: 0.61 },
    { ra: 19.846, de: 8.87, mag: 0.76 },
    { ra: 12.443, de: -63.1, mag: 0.77, nome: "Cruzeiro do Sul", id: "acr" },
    { ra: 4.599, de: 16.51, mag: 0.85 },
    { ra: 13.42, de: -11.16, mag: 0.98 },
    { ra: 16.49, de: -26.43, mag: 0.96, id: "ant" },
    { ra: 7.755, de: 28.03, mag: 1.14 },
    { ra: 22.96, de: -29.62, mag: 1.16 },
    { ra: 20.69, de: 45.28, mag: 1.25 },
    { ra: 12.795, de: -59.69, mag: 1.25, id: "mim" },
    { ra: 10.139, de: 11.97, mag: 1.35 },
    { ra: 6.977, de: -28.97, mag: 1.5 },
    { ra: 7.577, de: 31.89, mag: 1.58 },
    { ra: 17.56, de: -37.1, mag: 1.62, id: "sha" },
    { ra: 5.418, de: 6.35, mag: 1.64, id: "bel" },
    { ra: 12.519, de: -57.11, mag: 1.63, id: "gac" },
    { ra: 5.533, de: -0.3, mag: 1.69, id: "nil" },
    { ra: 5.679, de: -1.94, mag: 1.74, id: "nit" },
    { ra: 5.419, de: -1.94, mag: 2.23, id: "min" },
    { ra: 12.252, de: -58.75, mag: 2.79, id: "del" },
    { ra: 16.836, de: -34.29, mag: 1.87, id: "sar" },
    { ra: 18.403, de: -34.38, mag: 1.79, id: "nun" },
    { ra: 18.921, de: -26.3, mag: 2.05, id: "kau" },
    { ra: 17.792, de: -40.13, mag: 2.39, id: "eta" },
    { ra: 16.353, de: -25.59, mag: 2.29, id: "pi" },
    { ra: 16.09, de: -19.81, mag: 2.54, id: "gra" },
    { ra: 16.598, de: -28.22, mag: 2.82, id: "tau" },
    { ra: 17.621, de: -42.99, mag: 1.79, id: "kaus" },
    { ra: 22.711, de: -46.96, mag: 1.74 },
    { ra: 13.792, de: -41.69, mag: 2.06 },
    { ra: 5.919, de: -9.67, mag: 2.07, id: "sai" },
    { ra: 6.126, de: 22.51, mag: 1.65 },
    { ra: 0.79, de: -17.99, mag: 2.04 },
    { ra: 5.242, de: 6.35, mag: 1.64 },
    { ra: 17.792, de: -27.83, mag: 2.81 },
    { ra: 18.349, de: -29.83, mag: 2.6, id: "asc" },
    { ra: 19.043, de: -29.88, mag: 2.89 },
    { ra: 20.428, de: -56.74, mag: 1.94 },
    { ra: 14.661, de: -47.29, mag: 2.55 },
    { ra: 16.766, de: -69.03, mag: 1.91 },
    { ra: 12.9, de: 55.96, mag: 1.77 },
    { ra: 13.398, de: 54.92, mag: 1.86 },
    { ra: 11.062, de: 61.75, mag: 1.81 },
    { ra: 11.898, de: 53.69, mag: 2.37 },
    { ra: 2.53, de: 89.26, mag: 1.98 },
    { ra: 0.139, de: 29.09, mag: 2.06 },
    { ra: 2.119, de: 23.46, mag: 2.01 },
    { ra: 3.405, de: 49.86, mag: 1.79 },
    { ra: 5.242, de: 28.61, mag: 1.65 },
    { ra: 7.401, de: -29.3, mag: 1.84 },
    { ra: 9.132, de: -43.43, mag: 1.68 },
    { ra: 10.746, de: -49.42, mag: 1.86 },
    { ra: 11.596, de: 55.96, mag: 2.37 },
    { ra: 15.345, de: -36.37, mag: 2.3 },
    { ra: 17.247, de: -15.43, mag: 2.43 },
    { ra: 19.921, de: 8.87, mag: 2.72 },
    { ra: 21.444, de: 62.59, mag: 2.45 },
    { ra: 22.137, de: -46.96, mag: 2.39 },
    { ra: 23.079, de: 28.08, mag: 2.42 },
  ];

  const LINHAS_CEU = [
    ["acr", "gac"],
    ["mim", "del"],
    ["acr", "mim"],
    ["gac", "del"],
    ["bel", "min"],
    ["min", "nil"],
    ["nil", "nit"],
    ["gra", "pi"],
    ["pi", "ant"],
    ["ant", "tau"],
    ["tau", "sha"],
    ["sha", "sar"],
    ["sar", "eta"],
    ["nun", "asc"],
    ["asc", "kau"],
  ];

  function julianDate(ano, mes, dia, horaUtc) {
    if (mes <= 2) {
      ano -= 1;
      mes += 12;
    }
    const A = Math.floor(ano / 100);
    const B = 2 - A + Math.floor(A / 4);
    return (
      Math.floor(365.25 * (ano + 4716)) +
      Math.floor(30.6001 * (mes + 1)) +
      dia +
      B -
      1524.5 +
      horaUtc / 24
    );
  }

  function lstHoras(jd, lon) {
    const d = jd - 2451545.0;
    const T = d / 36525;
    let gst =
      280.46061837 +
      360.98564736629 * d +
      0.000387933 * T * T -
      (T * T * T) / 38710000;
    gst = ((gst % 360) + 360) % 360;
    return (((gst / 15 + lon / 15) % 24) + 24) % 24;
  }

  function projetarEstrela(estrela, lst, lat) {
    const ha = ((lst - estrela.ra) * 15 * Math.PI) / 180;
    const dec = (estrela.de * Math.PI) / 180;
    const phi = (lat * Math.PI) / 180;
    const sinAlt =
      Math.sin(dec) * Math.sin(phi) + Math.cos(dec) * Math.cos(phi) * Math.cos(ha);
    const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
    if (alt <= 0.02) return null;
    const cosAz =
      (Math.sin(dec) - Math.sin(alt) * Math.sin(phi)) /
      (Math.cos(alt) * Math.cos(phi) || 1e-6);
    let az = Math.acos(Math.max(-1, Math.min(1, cosAz)));
    if (Math.sin(ha) > 0) az = Math.PI * 2 - az;
    const r = (Math.PI / 2 - alt) / (Math.PI / 2);
    return {
      x: r * Math.sin(az),
      y: -r * Math.cos(az),
      alt: alt,
      mag: estrela.mag,
      nome: estrela.nome,
      id: estrela.id,
    };
  }

  function desenharCeu() {
    const canvas = $("#ceuCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const css = Math.min(640, canvas.clientWidth || 520);
    canvas.width = Math.round(css * dpr);
    canvas.height = Math.round(css * dpr);
    const W = canvas.width;
    const cx = W / 2;
    const R = W * 0.48;

    const lat = -23.55;
    const lon = -46.63;
    const jd = julianDate(2022, 10, 22, 23);
    const lst = lstHoras(jd, lon);
    const visiveis = ESTRELAS.map((e) => projetarEstrela(e, lst, lat)).filter(Boolean);
    const porId = {};
    visiveis.forEach((e) => {
      if (e.id) porId[e.id] = e;
    });

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, W);
    ctx.beginPath();
    ctx.arc(cx, cx, R, 0, Math.PI * 2);
    ctx.clip();

    const fundo = ctx.createRadialGradient(cx, cx * 0.72, R * 0.05, cx, cx, R);
    fundo.addColorStop(0, "#2a1230");
    fundo.addColorStop(0.55, "#140814");
    fundo.addColorStop(1, "#07040a");
    ctx.fillStyle = fundo;
    ctx.fillRect(0, 0, W, W);

    ctx.save();
    ctx.translate(cx, cx);
    ctx.rotate(-0.55);
    const via = ctx.createLinearGradient(-R, 0, R, 0);
    via.addColorStop(0, "rgba(232,180,196,0)");
    via.addColorStop(0.5, "rgba(232,180,196,0.13)");
    via.addColorStop(1, "rgba(232,180,196,0)");
    ctx.fillStyle = via;
    ctx.beginPath();
    ctx.ellipse(R * 0.18, R * 0.12, R * 0.92, R * 0.18, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const aleatorio = (function (semente) {
      return function () {
        semente = (semente * 16807) % 2147483647;
        return (semente - 1) / 2147483646;
      };
    })(22102022);

    for (let i = 0; i < 220; i += 1) {
      const a = aleatorio() * Math.PI * 2;
      const r = Math.sqrt(aleatorio()) * 0.98;
      const x = cx + Math.cos(a) * r * R;
      const y = cx + Math.sin(a) * r * R;
      const tam = 0.4 + aleatorio() * 1.1;
      ctx.fillStyle = "rgba(255,246,234," + (0.18 + aleatorio() * 0.45) + ")";
      ctx.beginPath();
      ctx.arc(x, y, tam * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "rgba(240,222,189,0.28)";
    ctx.lineWidth = 1 * dpr;
    LINHAS_CEU.forEach(([a, b]) => {
      const pa = porId[a];
      const pb = porId[b];
      if (!pa || !pb) return;
      ctx.beginPath();
      ctx.moveTo(cx + pa.x * R, cx + pa.y * R);
      ctx.lineTo(cx + pb.x * R, cx + pb.y * R);
      ctx.stroke();
    });

    visiveis.forEach((e) => {
      const x = cx + e.x * R;
      const y = cx + e.y * R;
      const tam = Math.max(0.8, (3.4 - e.mag) * 1.15) * dpr;
      const brilho = ctx.createRadialGradient(x, y, 0, x, y, tam * 4);
      brilho.addColorStop(0, "rgba(255,246,234,0.95)");
      brilho.addColorStop(0.35, "rgba(240,222,189,0.45)");
      brilho.addColorStop(1, "rgba(240,222,189,0)");
      ctx.fillStyle = brilho;
      ctx.beginPath();
      ctx.arc(x, y, tam * 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff6ea";
      ctx.beginPath();
      ctx.arc(x, y, tam, 0, Math.PI * 2);
      ctx.fill();
    });

    const cruz = visiveis.find((e) => e.nome === "Cruzeiro do Sul");
    if (cruz) {
      ctx.fillStyle = "rgba(240,222,189,0.85)";
      ctx.font = 11 * dpr + "px Outfit, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Cruzeiro do Sul", cx + cruz.x * R, cx + cruz.y * R + 18 * dpr);
    }

    ctx.beginPath();
    ctx.arc(cx, cx, R - 1, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212,180,131,0.35)";
    ctx.lineWidth = 2 * dpr;
    ctx.stroke();
  }

  function iniciarCeu() {
    const canvas = $("#ceuCanvas");
    if (!canvas) return;
    desenharCeu();
    window.addEventListener("resize", desenharCeu);
    if ("ResizeObserver" in window) {
      new ResizeObserver(desenharCeu).observe(canvas);
    }
  }

  function montarRoleta() {
    const roda = $("#roletaRoda");
    const botao = $("#btnRoleta");
    const resultado = $("#roletaResultado");
    const frases = CONFIG.roleta;
    if (!roda || !botao || !Array.isArray(frases) || !frases.length) return;

    const n = frases.length;
    const fatia = 360 / n;

    function fraseDaRoleta(item) {
      if (item === "mil milhões") return "eu te amo mil milhões";
      if (item === "o seu sorriso") return "eu te amo pelo seu sorriso";
      if (item.indexOf("meu ") === 0 || item.indexOf("minha ") === 0) {
        return "eu te amo, " + item;
      }
      return "eu te amo porque você é " + item;
    }
    const cores = ["#fff7ee", "#f4d5df"];
    const partes = frases
      .map((_, i) => cores[i % 2] + " " + i * fatia + "deg " + (i + 1) * fatia + "deg")
      .join(", ");
    roda.style.background = "conic-gradient(from -90deg, " + partes + ")";

    frases.forEach((texto, i) => {
      const span = document.createElement("span");
      span.className = "roleta-legenda";
      span.textContent = texto;
        const ang = (i + 0.5) * fatia;
        const raio = Math.round(Math.min(340, window.innerWidth * 0.82) * 0.33);
        span.style.transform = "rotate(" + ang + "deg) translateY(-" + raio + "px)";
      roda.appendChild(span);
    });

    let girando = false;
    let atual = 0;

    botao.addEventListener("click", () => {
      if (girando) return;
      girando = true;
      resultado.hidden = true;
      const escolhido = Math.floor(Math.random() * n);
      const voltas = 6 + Math.floor(Math.random() * 3);
      const destino =
        atual +
        voltas * 360 +
        (360 - ((escolhido * fatia + fatia / 2 + (atual % 360)) % 360));
      atual = destino;
      roda.style.transition = "transform 4.4s cubic-bezier(0.12, 0.64, 0.08, 1)";
      roda.style.transform = "rotate(" + destino + "deg)";

      const terminar = () => {
        roda.removeEventListener("transitionend", terminar);
        resultado.textContent = fraseDaRoleta(frases[escolhido]);
        resultado.hidden = false;
        girando = false;
        chuvaDeCoracoes();
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        roda.style.transition = "none";
        terminar();
        return;
      }
      roda.addEventListener("transitionend", terminar);
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
  const CHAVE_ANIV = "para-amanda:aniv-abertos";

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

  function listaAniversario() {
    return Array.isArray(CONFIG.bilhetesAniversario)
      ? CONFIG.bilhetesAniversario.filter((item) => item && item.id)
      : [];
  }

  function anivPorProximidade() {
    return listaAniversario()
      .slice()
      .sort((a, b) => {
        const aAgora = podeAbrirAniv(a) && !anivJaAberto(a.id);
        const bAgora = podeAbrirAniv(b) && !anivJaAberto(b.id);
        if (aAgora !== bAgora) return aAgora ? -1 : 1;
        return msAteBilheteAniv(a) - msAteBilheteAniv(b);
      });
  }

  function anivAbertos() {
    try {
      const lista = JSON.parse(localStorage.getItem(CHAVE_ANIV) || "[]");
      return Array.isArray(lista) ? lista : [];
    } catch (e) {
      return [];
    }
  }

  function anivJaAberto(id) {
    return anivAbertos().indexOf(id) !== -1;
  }

  function marcarAniv(id) {
    try {
      const lista = anivAbertos();
      if (lista.indexOf(id) === -1) {
        lista.push(id);
        localStorage.setItem(CHAVE_ANIV, JSON.stringify(lista));
      }
    } catch (e) {}
  }

  function msAteBilheteAniv(item) {
    const b = partesBrasil();
    let ano = b.ano;
    if (b.mes * 100 + b.dia >= item.mes * 100 + item.dia) ano += 1;
    return instanteLocalBrasilParaMs(ano, item.mes, item.dia, 0, 0, 0) - Date.now();
  }

  function podeAbrirAniv(item) {
    if (anivJaAberto(item.id) || item.liberado) return true;
    const b = partesBrasil();
    return b.mes * 100 + b.dia >= item.mes * 100 + item.dia;
  }

  function textoPodeAbrirDaqui(ms) {
    if (ms <= 0) return "Você já pode abrir este bilhete.";
    const horasCheias = ms / 3600000;
    if (horasCheias < 1) {
      const min = Math.max(1, Math.ceil(ms / 60000));
      return min === 1
        ? "Você pode abrir daqui 1 minuto."
        : "Você pode abrir daqui " + min + " minutos.";
    }
    const horas = Math.max(1, Math.ceil(horasCheias));
    return horas === 1
      ? "Você pode abrir daqui 1 hora."
      : "Você pode abrir daqui " + horas + " horas.";
  }

  function preencherPapelBilhete(bilhete) {
    const modal = $("#bilheteModal");
    if (!bilhete || !modal) return false;
    $("#bilheteQuando").textContent = bilhete.titulo || bilhete.quando || "";
    const corpo = $("#bilheteTexto");
    corpo.textContent = "";
    String(bilhete.texto || "")
      .trim()
      .split(/\n\s*\n/)
      .forEach((paragrafo) => {
        const p = document.createElement("p");
        p.textContent = paragrafo.trim();
        corpo.appendChild(p);
      });
    modal.hidden = false;
    document.body.classList.add("bilhete-aberto");
    return true;
  }

  function abrirBilhete(indice, botao) {
    const bilhete = CONFIG.bilhetes[indice];
    if (!preencherPapelBilhete(bilhete)) return;
    marcarBilhete(indice);
    if (botao) {
      botao.classList.add("aberto");
      const abrir = botao.querySelector(".bilhete-abrir");
      if (abrir) abrir.textContent = "ler de novo";
    }
  }

  function mostrarAvisoAniv(texto, id) {
    const aviso = $("#anuncioAnivAviso");
    if (!aviso) return;
    aviso.hidden = false;
    aviso.textContent = texto;
    if (id) aviso.dataset.anivAviso = id;
  }

  function fecharAnuncioAniv() {
    const anuncio = $("#anuncioAniversario");
    if (!anuncio) return;
    anuncio.hidden = true;
    const aviso = $("#anuncioAnivAviso");
    if (aviso) {
      aviso.hidden = true;
      delete aviso.dataset.anivAviso;
    }
  }

  function pintarCartaoAniv(btn, item) {
    const aberto = anivJaAberto(item.id);
    const liberado = podeAbrirAniv(item);
    btn.classList.toggle("aberto", aberto);
    btn.classList.toggle("lacrado", !liberado);
    const acao = btn.querySelector(".bilhete-abrir");
    const espera = btn.querySelector(".bilhete-espera");
    if (acao) {
      acao.textContent = aberto ? "ler de novo" : liberado ? "abrir" : "lacrado";
    }
    if (espera) {
      espera.hidden = liberado;
      espera.textContent = liberado ? "" : textoPodeAbrirDaqui(msAteBilheteAniv(item));
    }
  }

  function tentarAbrirAniv(item, botao) {
    if (!podeAbrirAniv(item)) {
      const msg = textoPodeAbrirDaqui(msAteBilheteAniv(item));
      if (botao) {
        botao.classList.remove("balancar");
        void botao.offsetWidth;
        botao.classList.add("balancar");
        pintarCartaoAniv(botao, item);
      }
      mostrarAvisoAniv(msg, item.id);
      return;
    }
    const primeira = !anivJaAberto(item.id);
    fecharAnuncioAniv();
    if (!preencherPapelBilhete(item)) return;
    marcarAniv(item.id);
    $$("[data-aniv-id='" + item.id + "']").forEach((card) => pintarCartaoAniv(card, item));
    if (primeira && (item.fogos || item.id === "conheceu" || String(item.id || "").indexOf("namoro") === 0)) {
      window.setTimeout(soltarFogos, 220);
    }
  }

  function criarCartaoAniv(item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bilhete especial";
    btn.dataset.anivId = item.id;
    btn.innerHTML =
      '<span class="bilhete-lacre" aria-hidden="true">♥</span>' +
      '<span class="bilhete-quando"></span>' +
      '<span class="bilhete-abrir"></span>' +
      '<span class="bilhete-espera" data-aniv-espera></span>';
    btn.querySelector(".bilhete-quando").textContent = item.quando;
    pintarCartaoAniv(btn, item);
    btn.addEventListener("click", () => tentarAbrirAniv(item, btn));
    btn.addEventListener("animationend", () => btn.classList.remove("balancar"));
    return btn;
  }

  function atualizarEsperasAniv() {
    listaAniversario().forEach((item) => {
      $$("[data-aniv-id='" + item.id + "']").forEach((card) => pintarCartaoAniv(card, item));
    });
    const aviso = $("#anuncioAnivAviso");
    const anuncio = $("#anuncioAniversario");
    if (aviso && anuncio && !anuncio.hidden && !aviso.hidden && aviso.dataset.anivAviso) {
      const item = listaAniversario().find((x) => x.id === aviso.dataset.anivAviso);
      if (item) {
        aviso.textContent = podeAbrirAniv(item)
          ? "Você já pode abrir este bilhete."
          : textoPodeAbrirDaqui(msAteBilheteAniv(item));
      }
    }
  }

  function mostrarAnuncioAniversario() {
    const anuncio = $("#anuncioAniversario");
    const grade = $("#anuncioAnivGrade");
    const lista = listaAniversario();
    if (!anuncio || !grade || !lista.length) return;
    const faltaAbrir = lista.some((item) => !anivJaAberto(item.id));
    if (!faltaAbrir) return;
    grade.textContent = "";
    anivPorProximidade().forEach((item) => grade.appendChild(criarCartaoAniv(item)));
    anuncio.hidden = false;
  }

  function soltarFogos() {
    const canvas = $("#fogos");
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chuvaDeCoracoes();
      return;
    }

    const celular = window.matchMedia("(max-width: 800px), (pointer: coarse)").matches;
    canvas.hidden = false;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, celular ? 1.25 : 1.5);
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const foguetes = [];
    const faiscas = [];
    const cores = ["#fff6ea", "#d4b483", "#e8b4c4", "#c45c74", "#ffd166", "#ff6b8a"];
    const porEstouro = celular ? 28 : 48;
    const maxLanc = celular ? 5 : 8;

    function lancar() {
      foguetes.push({
        x: w * (0.18 + Math.random() * 0.64),
        y: h + 8,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(5.4 + Math.random() * 2.4),
        alvoY: h * (0.22 + Math.random() * 0.22),
        cor: cores[(Math.random() * cores.length) | 0],
        vivo: true,
      });
    }

    function estourar(f) {
      for (let i = 0; i < porEstouro; i += 1) {
        const ang = (Math.PI * 2 * i) / porEstouro;
        const vel = 1.1 + Math.random() * 2.6;
        faiscas.push({
          x: f.x,
          y: f.y,
          vx: Math.cos(ang) * vel,
          vy: Math.sin(ang) * vel,
          vida: 1,
          dec: 0.016 + Math.random() * 0.01,
          r: celular ? 2.2 : 2.6,
          cor: f.cor,
        });
      }
    }

    let lancamentos = 0;
    lancar();
    const timer = window.setInterval(() => {
      if (lancamentos < maxLanc) {
        lancar();
        lancamentos += 1;
      } else {
        window.clearInterval(timer);
      }
    }, celular ? 480 : 380);

    const inicio = performance.now();
    let quadro = 0;
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      foguetes.forEach((f) => {
        if (!f.vivo) return;
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.05;
        ctx.fillStyle = f.cor;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 3, 0, Math.PI * 2);
        ctx.fill();
        if (f.vy >= -0.35 || f.y <= f.alvoY) {
          f.vivo = false;
          estourar(f);
        }
      });
      for (let i = faiscas.length - 1; i >= 0; i -= 1) {
        const p = faiscas[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.vx *= 0.99;
        p.vida -= p.dec;
        if (p.vida <= 0) {
          faiscas.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.vida);
        ctx.fillStyle = p.cor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      const acabou =
        t - inicio > 5600 &&
        foguetes.every((f) => !f.vivo) &&
        faiscas.length === 0;
      if (acabou) {
        ctx.clearRect(0, 0, w, h);
        canvas.hidden = true;
        return;
      }
      quadro = window.requestAnimationFrame(frame);
    }
    quadro = window.requestAnimationFrame(frame);
  }

  function montarBilhetes() {
    const secao = $("#bilhetes");
    const grade = $("#gradeBilhetes");
    const comuns = CONFIG.bilhetes;
    const especiais = listaAniversario();
    if (!secao || !grade) return;
    const temComuns = Array.isArray(comuns) && comuns.length;
    if (!temComuns && !especiais.length) return;

    anivPorProximidade().forEach((item) => {
      const btn = criarCartaoAniv(item);
      btn.classList.add("revelar");
      grade.appendChild(btn);
    });

    const abertos = bilhetesAbertos();
    if (temComuns) {
      comuns.forEach((bilhete, i) => {
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
    }

    secao.hidden = false;
    window.setInterval(atualizarEsperasAniv, 1000);
    agendarLiberacaoAniv();
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") atualizarEsperasAniv();
    });
  }

  function agendarLiberacaoAniv() {
    listaAniversario().forEach((item) => {
      if (podeAbrirAniv(item)) return;
      const ms = msAteBilheteAniv(item);
      if (ms <= 0 || ms > 48 * 3600000) return;
      window.setTimeout(function () {
        atualizarEsperasAniv();
        agendarLiberacaoAniv();
      }, ms + 400);
    });
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

    const depois = $("#anuncioAnivDepois");
    if (depois) depois.addEventListener("click", fecharAnuncioAniv);
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
    canvas.style.pointerEvents = "none";
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

  function partesBrasil(date) {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const map = {};
    fmt.formatToParts(date || new Date()).forEach((p) => {
      if (p.type !== "literal") map[p.type] = p.value;
    });
    return {
      ano: Number(map.year),
      mes: Number(map.month),
      dia: Number(map.day),
      hora: Number(map.hour),
      minuto: Number(map.minute),
      segundo: Number(map.second),
    };
  }

  function horaTrocaMusica() {
    const n = Number(CONFIG.horaTrocaMusica);
    return Number.isFinite(n) ? n : 20;
  }

  function instanteLocalBrasilParaMs(ano, mes, dia, hora, min, sec) {
    const wanted = Date.UTC(ano, mes - 1, dia, hora, min || 0, sec || 0);
    const visto = partesBrasil(new Date(wanted));
    const atual = Date.UTC(
      visto.ano,
      visto.mes - 1,
      visto.dia,
      visto.hora,
      visto.minuto,
      visto.segundo
    );
    return wanted + (wanted - atual);
  }

  function msAteProximaTrocaMusica() {
    const hora = horaTrocaMusica();
    const b = partesBrasil();
    let ano = b.ano;
    let mes = b.mes;
    let dia = b.dia;
    if (b.hora >= hora) {
      const amanha = new Date(Date.UTC(ano, mes - 1, dia + 1));
      ano = amanha.getUTCFullYear();
      mes = amanha.getUTCMonth() + 1;
      dia = amanha.getUTCDate();
    }
    const alvo = instanteLocalBrasilParaMs(ano, mes, dia, hora, 0, 0);
    return Math.max(1500, alvo - Date.now() + 400);
  }

  function musicaDoDia() {
    const lista =
      CONFIG.musicas && CONFIG.musicas.length
        ? CONFIG.musicas
        : [
            {
              youtubeId: CONFIG.youtubeId,
              titulo: CONFIG.musicaTitulo || "Duas Metades",
              artista: CONFIG.musicaArtista || "Jorge & Mateus",
              frase: "Porque a gente se completa.",
            },
          ];
    const validas = lista.filter((item) => item && item.youtubeId);
    if (!validas.length) return null;
    const b = partesBrasil();
    let utc = Date.UTC(b.ano, b.mes - 1, b.dia);
    if (b.hora < horaTrocaMusica()) utc -= 86400000;
    const dias = Math.floor(utc / 86400000);
    return validas[((dias % validas.length) + validas.length) % validas.length];
  }

  function aplicarMusicaDoDia(hoje) {
    if (!hoje) return;
    const btn = $("#btnMusica");
    const nome = $("#musicaBotaoTexto");
    const titulo = $("#musicaTitulo");
    const artista = $("#musicaArtista");
    const frase = $("#musicaFrase");
    if (nome) nome.textContent = hoje.titulo;
    if (titulo) titulo.textContent = hoje.titulo;
    if (artista) artista.textContent = hoje.artista;
    if (frase) frase.textContent = hoje.frase || "";
    if (btn) btn.setAttribute("aria-label", "Tocar " + hoje.titulo);
  }

  function musica() {
    const btn = $("#btnMusica");
    let atual = musicaDoDia();
    aplicarMusicaDoDia(atual);
    if (!atual || !atual.youtubeId) {
      btn.hidden = true;
      return;
    }

    let player = null;
    let pronto = false;
    let querTocar = false;
    let pedidoDePlayer = false;

    function estadoTocando() {
      if (!player || typeof YT === "undefined" || !YT.PlayerState) return false;
      try {
        const estado = player.getPlayerState();
        return estado === YT.PlayerState.PLAYING || estado === YT.PlayerState.BUFFERING;
      } catch (e) {
        return false;
      }
    }

    function atualizarBotao() {
      btn.classList.toggle("tocando", estadoTocando());
    }

    function mesmaMusica(a, b) {
      return (
        a &&
        b &&
        a.youtubeId === b.youtubeId &&
        (a.inicio || 0) === (b.inicio || 0)
      );
    }

    function carregarMusica(nova) {
      if (!nova || !nova.youtubeId || !player || !pronto) return;
      const opts = {
        videoId: nova.youtubeId,
        startSeconds: nova.inicio || 0,
      };
      try {
        if (querTocar) player.loadVideoById(opts);
        else player.cueVideoById(opts);
      } catch (err) {}
    }

    function trocarSeMudou() {
      const nova = musicaDoDia();
      if (!nova) return;
      const mudou = !mesmaMusica(atual, nova);
      atual = nova;
      aplicarMusicaDoDia(nova);
      if (mudou) carregarMusica(nova);
    }

    function agendarProximaTroca() {
      window.setTimeout(() => {
        trocarSeMudou();
        agendarProximaTroca();
      }, msAteProximaTrocaMusica());
    }

    const criarPlayer = function () {
      if (player || !document.getElementById("ytplayer") || !(window.YT && YT.Player)) return;
      player = new YT.Player("ytplayer", {
        width: "100%",
        height: "100%",
        videoId: atual.youtubeId,
        playerVars: {
          autoplay: querTocar ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: atual.youtubeId,
          start: atual.inicio || 0,
          origin: window.location.origin,
          enablejsapi: 1,
        },
        events: {
          onReady: function (e) {
            pronto = true;
            try {
              const iframe = player.getIframe();
              if (iframe) {
                iframe.setAttribute(
                  "allow",
                  "autoplay; encrypted-media; fullscreen; picture-in-picture"
                );
              }
            } catch (err) {}
            if (querTocar) {
              try {
                player.playVideo();
              } catch (err) {}
            }
            atualizarBotao();
            trocarSeMudou();
          },
          onStateChange: function (e) {
            atualizarBotao();
            if (
              querTocar &&
              window.YT &&
              YT.PlayerState &&
              e.data === YT.PlayerState.ENDED
            ) {
              try {
                player.seekTo(atual.inicio || 0, true);
                player.playVideo();
              } catch (err) {}
            }
          },
          onError: function () {
            atualizarBotao();
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
        try {
          player.playVideo();
        } catch (err) {}
        atualizarBotao();
      }
    }

    function pausar() {
      querTocar = false;
      if (pronto && player) {
        try {
          player.pauseVideo();
        } catch (err) {}
      }
      atualizarBotao();
    }

    btn.addEventListener("click", () => {
      if (estadoTocando()) pausar();
      else tocar();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") trocarSeMudou();
    });
    agendarProximaTroca();

    return tocar;
  }

  function aplicarAvatares() {
    const amanda = CONFIG.avatarAmanda || (CONFIG.fotos[0] && CONFIG.fotos[0].src);
    const gabriel = CONFIG.avatarGabriel || "";
    $$("[data-avatar='amanda']").forEach((img) => {
      if (!amanda) return;
      img.src = amanda;
      img.alt = CONFIG.nomeDela;
      img.addEventListener("error", () => {
        img.removeAttribute("src");
      });
    });
    $$("[data-avatar='gabriel']").forEach((img) => {
      if (!gabriel) return;
      img.src = gabriel;
      img.alt = CONFIG.seuNome;
      img.addEventListener("error", () => {
        img.removeAttribute("src");
      });
    });
  }

  const AMOR_GUARDA = "para-amanda-disputa-v1";
  const AMOR_API = "https://countapi.mileshilliard.com/api/v1";
  const AMOR_CHAVES = {
    gabriel: "gabriel7z-para-amanda-disputa-gabriel-v1",
    amanda: "gabriel7z-para-amanda-disputa-amanda-v1",
  };

  const placarAmor = { gabriel: 0, amanda: 0 };
  const pendentesAmor = { gabriel: 0, amanda: 0 };
  let mandandoAmor = false;

  function numeroApi(dado) {
    const n = Number(dado && dado.value);
    return Number.isFinite(n) ? n : 0;
  }

  function pintarBarraAmor() {
    const g = placarAmor.gabriel;
    const a = placarAmor.amanda;
    const total = g + a;
    const pctDele = total === 0 ? 50 : (g / total) * 100;
    const fill = $("#amorFill");
    const coracao = $("#amorCoracao");
    const pct = $("#amorPct");
    const frase = $("#amorPlacar");
    const ptsG = $("#ptsGabriel");
    const ptsA = $("#ptsAmanda");
    if (fill) fill.style.width = pctDele + "%";
    if (coracao) coracao.style.left = pctDele + "%";
    if (ptsG) ptsG.textContent = g;
    if (ptsA) ptsA.textContent = a;
    $$(".amor-lado").forEach((btn) => {
      const lado = btn.dataset.lado;
      const outro = lado === "gabriel" ? "amanda" : "gabriel";
      btn.classList.toggle("na-frente", total > 0 && placarAmor[lado] > placarAmor[outro]);
    });
    if (pct && frase) {
      if (total === 0 || g === a) {
        pct.textContent = "50%";
        frase.textContent =
          "Empate. Você toca no seu retrato, ela no dela — os dois celulares atualizam juntos.";
      } else if (g > a) {
        pct.textContent = Math.round(pctDele) + "%";
        frase.textContent =
          CONFIG.seuNome + " está amando mais. O coração foi até " + CONFIG.nomeDela + ".";
      } else {
        pct.textContent = Math.round(100 - pctDele) + "%";
        frase.textContent =
          CONFIG.nomeDela + " está amando mais. O coração voltou até " + CONFIG.seuNome + ".";
      }
    }
  }

  async function lerLadoRemoto(lado) {
    try {
      const r = await fetch(AMOR_API + "/get/" + AMOR_CHAVES[lado]);
      if (r.status === 404) return 0;
      if (!r.ok) throw new Error("get");
      return numeroApi(await r.json());
    } catch (e) {
      try {
        return Number(localStorage.getItem(AMOR_GUARDA + "-" + lado) || 0);
      } catch (err) {
        return 0;
      }
    }
  }

  async function somarLadoRemoto(lado) {
    const r = await fetch(AMOR_API + "/hit/" + AMOR_CHAVES[lado]);
    if (!r.ok) throw new Error("hit");
    const n = numeroApi(await r.json());
    try {
      localStorage.setItem(AMOR_GUARDA + "-" + lado, String(n));
    } catch (e) {}
    return n;
  }

  async function enviarAmorPendente() {
    if (mandandoAmor) return;
    mandandoAmor = true;
    for (const lado of ["gabriel", "amanda"]) {
      while (pendentesAmor[lado] > 0) {
        pendentesAmor[lado] -= 1;
        try {
          const n = await somarLadoRemoto(lado);
          placarAmor[lado] = Math.max(placarAmor[lado], n);
        } catch (e) {
          try {
            localStorage.setItem(AMOR_GUARDA + "-" + lado, String(placarAmor[lado]));
          } catch (err) {}
        }
      }
    }
    mandandoAmor = false;
    pintarBarraAmor();
    if (pendentesAmor.gabriel > 0 || pendentesAmor.amanda > 0) enviarAmorPendente();
    else atualizarAmorRemoto();
  }

  function clicarLado(lado, evento) {
    if (lado !== "gabriel" && lado !== "amanda") return;
    placarAmor[lado] += 1;
    pendentesAmor[lado] += 1;
    pintarBarraAmor();
    enviarAmorPendente();
    if (evento && typeof evento.clientX === "number") {
      soltarCoracao(evento.clientX, evento.clientY);
    }
  }

  async function atualizarAmorRemoto() {
    const [g, a] = await Promise.all([lerLadoRemoto("gabriel"), lerLadoRemoto("amanda")]);
    placarAmor.gabriel = Math.max(placarAmor.gabriel, g);
    placarAmor.amanda = Math.max(placarAmor.amanda, a);
    pintarBarraAmor();
  }

  function iniciarBarraAmor() {
    const barra = $("#barraAmor");
    const trilho = $("#trilhoAmor");
    if (!barra) return;
    pintarBarraAmor();
    atualizarAmorRemoto();
    barra.addEventListener("click", (e) => {
      const botao = e.target.closest(".amor-lado");
      if (botao) {
        clicarLado(botao.dataset.lado, e);
        return;
      }
      if (!trilho || !trilho.contains(e.target)) return;
      const caixa = trilho.getBoundingClientRect();
      const meio = caixa.left + caixa.width / 2;
      clicarLado(e.clientX < meio ? "gabriel" : "amanda", e);
    });
    setInterval(atualizarAmorRemoto, 2000);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") atualizarAmorRemoto();
    });
  }

  function iniciarCalendario() {
    const MESES = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    const GUARDA = "para-amanda-cal-";
    const API = "https://countapi.mileshilliard.com/api/v1";
    const CHAVE = "gabriel7z-para-amanda-cal-";
    const mascaras = {};
    const hoje = dataBrasil();
    let vista = { ano: hoje.ano, mes: hoje.mes };
    const inicio = (CONFIG.dataConheceu || "2022-10-22").split("-").map(Number);
    const minAno = inicio[0];
    const minMes = inicio[1];

    function dataBrasil() {
      const txt = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());
      const partes = txt.split("-").map(Number);
      return { ano: partes[0], mes: partes[1], dia: partes[2] };
    }

    function chaveMes(ano, mes) {
      return String(ano) + String(mes).padStart(2, "0");
    }

    function bitDoDia(dia) {
      return 1 << (dia - 1);
    }

    function temDia(mask, dia) {
      return (mask & bitDoDia(dia)) !== 0;
    }

    function diasNoMes(ano, mes) {
      return new Date(ano, mes, 0).getDate();
    }

    function lerLocal(ano, mes) {
      try {
        return Number(localStorage.getItem(GUARDA + chaveMes(ano, mes)) || 0) >>> 0;
      } catch (e) {
        return 0;
      }
    }

    function salvarLocal(ano, mes, mask) {
      try {
        localStorage.setItem(GUARDA + chaveMes(ano, mes), String(mask >>> 0));
      } catch (e) {}
    }

    async function lerRemoto(ano, mes) {
      try {
        const r = await fetch(API + "/get/" + CHAVE + chaveMes(ano, mes));
        if (r.status === 404) return 0;
        if (!r.ok) throw new Error("get");
        return Number((await r.json()).value || 0) >>> 0;
      } catch (e) {
        return lerLocal(ano, mes);
      }
    }

    async function salvarRemoto(ano, mes, mask) {
      try {
        await fetch(API + "/set/" + CHAVE + chaveMes(ano, mes) + "?value=" + (mask >>> 0));
      } catch (e) {}
    }

    async function mascaraDoMes(ano, mes) {
      const id = chaveMes(ano, mes);
      const local = lerLocal(ano, mes);
      const remoto = await lerRemoto(ano, mes);
      const junta = (local | remoto) >>> 0;
      mascaras[id] = junta;
      if (junta !== local) salvarLocal(ano, mes, junta);
      return junta;
    }

    function pintar() {
      const grade = $("#calGrade");
      const titulo = $("#calMes");
      const legenda = $("#calLegenda");
      const ant = $("#calAnt");
      const prox = $("#calProx");
      if (!grade || !titulo) return;
      const { ano, mes } = vista;
      const id = chaveMes(ano, mes);
      const mask = mascaras[id] || lerLocal(ano, mes);
      const totalDias = diasNoMes(ano, mes);
      const primeiro = new Date(ano, mes - 1, 1).getDay();
      const ehAtual = ano === hoje.ano && mes === hoje.mes;
      titulo.textContent = MESES[mes - 1] + " " + ano;
      if (ant) {
        ant.disabled = ano < minAno || (ano === minAno && mes <= minMes);
      }
      if (prox) {
        prox.disabled = ano > hoje.ano || (ano === hoje.ano && mes >= hoje.mes);
      }
      grade.innerHTML = "";
      for (let i = 0; i < primeiro; i += 1) {
        const vazio = document.createElement("div");
        vazio.className = "cal-dia vazio";
        vazio.textContent = "♥";
        grade.appendChild(vazio);
      }
      let acesos = 0;
      for (let dia = 1; dia <= totalDias; dia += 1) {
        const cel = document.createElement("div");
        const futuro = ehAtual && dia > hoje.dia;
        const aceso = temDia(mask, dia) && !futuro;
        if (aceso) acesos += 1;
        cel.className = "cal-dia";
        if (aceso) cel.classList.add("aceso");
        if (ehAtual && dia === hoje.dia) cel.classList.add("hoje");
        if (futuro) cel.classList.add("futuro");
        cel.setAttribute("aria-label", "Dia " + dia + (aceso ? ", coração aceso" : ""));
        cel.innerHTML = "♥<span>" + dia + "</span>";
        grade.appendChild(cel);
      }
      if (legenda) {
        if (ehAtual) {
          const veioHoje = temDia(mask, hoje.dia);
          legenda.textContent = veioHoje
            ? "Hoje você veio. " + acesos + (acesos === 1 ? " coração aceso" : " corações acesos") + " neste mês."
            : acesos + (acesos === 1 ? " coração aceso" : " corações acesos") + " neste mês.";
        } else {
          legenda.textContent =
            acesos + (acesos === 1 ? " coração aceso" : " corações acesos") + " em " + MESES[mes - 1] + ".";
        }
      }
    }

    async function marcarHoje() {
      const agora = dataBrasil();
      hoje.ano = agora.ano;
      hoje.mes = agora.mes;
      hoje.dia = agora.dia;
      const id = chaveMes(hoje.ano, hoje.mes);
      const atual = await mascaraDoMes(hoje.ano, hoje.mes);
      const nova = (atual | bitDoDia(hoje.dia)) >>> 0;
      mascaras[id] = nova;
      salvarLocal(hoje.ano, hoje.mes, nova);
      if (nova !== atual) await salvarRemoto(hoje.ano, hoje.mes, nova);
      if (vista.ano === hoje.ano && vista.mes === hoje.mes) pintar();
    }

    async function irPara(ano, mes) {
      if (mes < 1) {
        ano -= 1;
        mes = 12;
      }
      if (mes > 12) {
        ano += 1;
        mes = 1;
      }
      if (ano < minAno || (ano === minAno && mes < minMes)) return;
      if (ano > hoje.ano || (ano === hoje.ano && mes > hoje.mes)) return;
      vista = { ano: ano, mes: mes };
      await mascaraDoMes(ano, mes);
      pintar();
    }

    $("#calAnt").addEventListener("click", () => irPara(vista.ano, vista.mes - 1));
    $("#calProx").addEventListener("click", () => irPara(vista.ano, vista.mes + 1));
    marcarHoje();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") marcarHoje();
    });
    setInterval(async () => {
      const id = chaveMes(vista.ano, vista.mes);
      const antes = mascaras[id] || 0;
      const agora = await mascaraDoMes(vista.ano, vista.mes);
      if (agora !== antes) pintar();
    }, 4000);
  }

  function abrirCarta() {
    const capa = $("#capa");
    const envelope = $("#envelope");
    const site = $("#site");
    tocarMusica = musica();

    function abrir() {
      site.hidden = false;
      if (tocarMusica) tocarMusica();
      envelope.classList.add("aberto");
      setTimeout(() => {
        capa.classList.add("saida");
        site.classList.add("visivel");
        observarRevelar();
        try {
          desenharCeu();
        } catch (err) {}
        setTimeout(() => capa.remove(), 1000);
        setTimeout(mostrarAnuncioAniversario, 900);
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
  aplicarAvatares();
  aplicarMusicaDoDia(musicaDoDia());
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
  iniciarCeu();
  montarRoleta();
  montarPromessas();
  iniciarContadores();
  petalas();
  iniciarBarraAmor();
  iniciarCalendario();
  abrirCarta();

  $("#btnCoracoes").addEventListener("click", chuvaDeCoracoes);
  document.addEventListener("click", (e) => {
    if (
      e.target.closest(
        ".capa, .barra-amor, .calendario, .btn-musica, a, button, .player-moldura, .lightbox, .polaroid, .cinema, .bilhete-modal, .anuncio-aniv, .roleta-cena, .ceu-moldura"
      )
    ) {
      return;
    }
    soltarCoracao(e.clientX, e.clientY);
  });
})();
