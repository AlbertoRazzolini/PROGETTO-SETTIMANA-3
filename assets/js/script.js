/* INIZIALIZZAZIONE */
//Creo array vuoto per contenere gli anime inseriti dall'utente. Creo variabili per filtro, ordinamento e ricerca, inizializzate a valori di default (es. "Tutti", "titolo-asc", "").
let anime = [
  {
    titolo: "Naruto",
    stato: "Visto",
    voto: 9,
    categoria: "Shonen",
  },
  {
    titolo: "One Piece",
    stato: "Visto",
    voto: 10,
    categoria: "Shonen",
  },
  {
    titolo: "Bleach",
    stato: "Visto",
    voto: 8,
    categoria: "Shonen",
  },
  {
    titolo: "Death Note",
    stato: "Visto",
    voto: 9,
    categoria: "Shonen",
  },
  {
    titolo: "Attack on Titan",
    stato: "Visto",
    voto: 10,
    categoria: "Seinen",
  },
  {
    titolo: "My Hero Academia",
    stato: "Visto",
    voto: 8,
    categoria: "Shonen",
  },
  {
    titolo: "Demon Slayer",
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
  let copiaAnime = [...anime];

  // Filtro
  if (filtroCorrente !== "Tutti") {
    copiaAnime = copiaAnime.filter(
      (animeTutti) => animeTutti.stato === filtroCorrente,
    );
  }

  // Ricerca
  if (ricercaCorrente !== "") {
    copiaAnime = copiaAnime.filter(
      (animeTutti) =>
        animeTutti.titolo.toLowerCase().includes(ricercaCorrente.toLowerCase()), // Per fare la ricerca case-insensitive, converto sia il titolo che la stringa di ricerca in minuscolo prima di confrontarli.
    );
  }

  // Ordinamento
  if (ordinamentoCorrente === "titolo-asc") {
    copiaAnime.sort((anime1, anime2) =>
      anime1.titolo.localeCompare(anime2.titolo),
    );
  } else if (ordinamentoCorrente === "titolo-desc") {
    copiaAnime.sort((anime1, anime2) =>
      anime2.titolo.localeCompare(anime1.titolo),
    );
  } else if (ordinamentoCorrente === "voto-asc") {
    copiaAnime.sort((anime1, anime2) => anime1.voto - anime2.voto);
  } else if (ordinamentoCorrente === "voto-desc") {
    copiaAnime.sort((anime1, anime2) => anime2.voto - anime1.voto);
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
  copiaAnime.forEach((a) => {
    const li = document.createElement("li");

    const titolo = document.createElement("span");
    titolo.textContent = a.titolo;

    const info = document.createElement("span");
    info.textContent = `${a.categoria} — Voto: ${a.voto} — ${a.stato}`;

    const btnElimina = document.createElement("button");
    btnElimina.textContent = "Elimina";
    btnElimina.addEventListener("click", () => {
      const indice = anime.indexOf(a);
      anime.splice(indice, 1);
      render();
    });

    li.appendChild(titolo);
    li.appendChild(info);
    li.appendChild(btnElimina);
    lista.appendChild(li);
  });
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
