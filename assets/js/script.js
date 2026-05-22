/* INIZIALIZZAZIONE */
//Creo array vuoto per contenere gli anime inseriti dall'utente. Creo variabili per filtro, ordinamento e ricerca, inizializzate a valori di default (es. "Tutti", "titolo-asc", "").
let anime = [
  {
    titolo: "Naruto",
    stato: "Visto",
    voto: 8,
    categoria: "Shonen",
  },
  {
    titolo: "One Piece",
    stato: "In visione",
    voto: 9,
    categoria: "Shonen",
  },
  {
    titolo: "Death Note",
    stato: "Da vedere",
    voto: 10,
    categoria: "Shonen",
  },
  {
    titolo: "Attack on Titan",
    stato: "Visto",
    voto: 9,
    categoria: "Shonen",
  },
];
let filtroCorrente = "Tutti";
let ordinamentoCorrente = "titolo-asc";
let ricercaCorrente = "";
//Funzione render() che ridipinge la lista. La chiamo subito per mostrare eventuali dati salvati in localStorage.
function render() {
  let filtrati = [...anime];

  // Filtro
  if (filtroCorrente !== "Tutti") {
    filtrati = filtrati.filter(
      (animeTutti) => animeTutti.stato === filtroCorrente,
    );
  }

  // Ricerca
  if (ricercaCorrente !== "") {
    filtrati = filtrati.filter(
      (animeTutti) =>
        animeTutti.titolo.toLowerCase().includes(ricercaCorrente.toLowerCase()), // Per fare la ricerca case-insensitive, converto sia il titolo che la stringa di ricerca in minuscolo prima di confrontarli.
    );
  }

  // Ordinamento
  if (ordinamentoCorrente === "titolo-asc") {
    filtrati.sort((anime1, anime2) =>
      anime1.titolo.localeCompare(anime2.titolo),
    );
  } else if (ordinamentoCorrente === "titolo-desc") {
    filtrati.sort((anime1, anime2) =>
      anime2.titolo.localeCompare(anime1.titolo),
    );
  } else if (ordinamentoCorrente === "voto-asc") {
    filtrati.sort((anime1, anime2) => anime1.voto - anime2.voto);
  } else if (ordinamentoCorrente === "voto-desc") {
    filtrati.sort((anime1, anime2) => anime2.voto - anime1.voto);
  }

  // Statistiche
  const visti = anime.filter((a) => a.stato === "Visto").length;
  const inVisione = anime.filter((a) => a.stato === "In visione").length;
  const daVedere = anime.filter((a) => a.stato === "Da vedere").length;

  document.getElementById("stat-visti").textContent = visti;
  document.getElementById("stat-in-visione").textContent = inVisione;
  document.getElementById("stat-da-vedere").textContent = daVedere;

  const percentuale = anime.length > 0 ? (visti / anime.length) * 100 : 0;
  document.getElementById("barra-visti").style.width = percentuale + "%";

  // Svuota il container
  const lista = document.querySelector(".lista");
  lista.textContent = "";

  // Ricrea gli elementi DOM
  filtrati.forEach(function (a) {
    const li = document.createElement("li");
    const classeStato = {
      Visto: "card-visto",
      "In visione": "card-in-visione",
      "Da vedere": "card-da-vedere",
    };
    li.className = classeStato[a.stato];

    const divInfo = document.createElement("div");
    divInfo.className = "card-info";

    const titolo = document.createElement("h3");
    titolo.textContent = a.titolo;

    const info = document.createElement("p");
    info.textContent = `${a.categoria} — Voto: ${a.voto}`;

    divInfo.appendChild(titolo);
    divInfo.appendChild(info);

    const divAzioni = document.createElement("div");
    divAzioni.className = "card-azioni";

    const badge = document.createElement("span");
    badge.textContent = a.stato;
    badge.className = "badge badge-" + a.stato.replace(" ", "-").toLowerCase();

    const btnSegna = document.createElement("button");
    btnSegna.className = "btn-segna";
    btnSegna.textContent =
      a.stato === "Visto" ? "Segna da vedere" : "Segna visto";
    btnSegna.addEventListener("click", () => {
      const indice = anime.indexOf(a);
      anime[indice].stato = a.stato === "Visto" ? "Da vedere" : "Visto";
      render();
    });

    const btnModifica = document.createElement("button");
    btnModifica.className = "btn-card";
    btnModifica.textContent = "Modifica";

    const btnElimina = document.createElement("button");
    btnElimina.className = "btn-card";
    btnElimina.textContent = "Elimina";
    btnElimina.addEventListener("click", () => {
      const indice = anime.indexOf(a);
      anime.splice(indice, 1);
      render();
    });

    divAzioni.appendChild(badge);
    divAzioni.appendChild(btnSegna);
    divAzioni.appendChild(btnModifica);
    divAzioni.appendChild(btnElimina);

    li.appendChild(divAzioni);
    li.appendChild(divInfo);
    lista.appendChild(li);
  });

  if (filtrati.length === 0) {
    const vuoto = document.createElement("p");
    vuoto.className = "lista-vuota";
    vuoto.textContent = "Nessun anime trovato";
    lista.appendChild(vuoto);
  }

  // Salva in localStorage
  localStorage.setItem("anime", JSON.stringify(anime));
}

// Submit form
const formAnime = document.getElementById("form-anime");

formAnime.addEventListener("submit", (e) => {
  e.preventDefault();

  const titolo = document.getElementById("input-titolo").value.trim();
  const stato = document.getElementById("input-stato").value;
  const voto = document.getElementById("input-voto").value;
  const categoria = document.getElementById("input-categoria").value;

  if (titolo === "") {
    alert("Il titolo è obbligatorio");
    return;
  }
  if (stato === "Stato") {
    alert("Seleziona uno stato");
    return;
  }

  anime.push({
    titolo,
    stato,
    voto: Number(voto),
    categoria,
  });

  formAnime.reset();
  render();
  notifica("Anime aggiunto!");
});

// Event listener filtri
document.getElementById("input-ricerca").addEventListener("input", (e) => {
  ricercaCorrente = e.target.value.trim();
  render();
});

document.getElementById("filtro-stato").addEventListener("change", (e) => {
  filtroCorrente = e.target.value;
  render();
});

document.getElementById("ordinamento").addEventListener("change", (e) => {
  ordinamentoCorrente = e.target.value;
  render();
});

// Carica da localStorage
const salvato = localStorage.getItem("anime");
if (salvato) anime = JSON.parse(salvato);

render();
// Creo const per bottone toggle-theme e aggiungo event listener per il click. Al click toggle della classe "scuro" su body e cambio testo del bottone.
const toggleThemeButton = document.getElementById("toggle-theme");

if (toggleThemeButton) {
  toggleThemeButton.addEventListener("click", (e) => {
    const scuroMode = document.body.classList.toggle("scuro");
    if (scuroMode) {
      toggleThemeButton.textContent = "Tema chiaro";
    } else {
      toggleThemeButton.textContent = "Tema scuro";
    }
  });
}

// Notifica temporanea

function notifica(testo) {
  const divNotifica = document.querySelector("#notifica");
  divNotifica.textContent = testo;
  divNotifica.classList.add("visibile");
  setTimeout(function () {
    divNotifica.classList.remove("visibile");
  }, 3000);
}
