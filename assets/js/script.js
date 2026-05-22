/* INIZIALIZZAZIONE */
let anime = [
  { titolo: "Naruto", stato: "Visto", voto: 8, categoria: "Shonen" },
  { titolo: "Naruto", stato: "Visto", voto: 8, categoria: "Shonen" },
  { titolo: "Naruto", stato: "Visto", voto: 8, categoria: "Shonen" },
  { titolo: "Naruto", stato: "Visto", voto: 8, categoria: "Shonen" },
];
// Creo const per bottone toggle-theme e aggiungo event listener per il click. Al click toggle della classe "scuro" su body e cambio testo del bottone.
const toggleThemeButton = document.getElementById("toggle-theme");

if (toggleThemeButton) {
  toggleThemeButton.addEventListener("click", () => {
    const scuroMode = document.body.classList.toggle("scuro");
    if (scuroMode) {
      toggleThemeButton.textContent = "Tema chiaro";
    } else {
      toggleThemeButton.textContent = "Tema scuro";
    }
  });
}
