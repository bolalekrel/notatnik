window.onload = () => {
  class Note {
    constructor(title, content, date) {
      this.title = title;
      this.content = content;
      this.date = date;
    }
  }

  let notesArray = [];
  let button = document.querySelector(".button-92");
  let tytulDuzejNotatki = document.querySelector(".notatki_tytul");
  let tekstDuzejNotatki = document.querySelector(".notatki_tekst");
  let currentNoteCount = 0;

  const saveNotesToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notesArray));
  };

  const loadNotesFromLocalStorage = () => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      notesArray = JSON.parse(storedNotes);
      for (const note of notesArray) {
        createMiniNoteElement(note);
      }
    }
  };

  const createMiniNoteElement = (note) => {
    let miniTytulElement = document.createElement("div");
    miniTytulElement.classList.add("magazynNotatki");

    let dataUtworzeniaElement = document.createElement("div");
    dataUtworzeniaElement.classList.add("data_utworzenia");
    dataUtworzeniaElement.textContent = note.date;

    let miniTytulTekst = document.createElement("div");
    miniTytulTekst.classList.add("min_tytul");
    miniTytulTekst.textContent = note.title;

    miniTytulElement.appendChild(dataUtworzeniaElement);
    miniTytulElement.appendChild(miniTytulTekst);

    let notatkiContainer = document.querySelector(".notatki-container");
    notatkiContainer.appendChild(miniTytulElement);

    const usunButton = document.createElement("button");
    usunButton.textContent = "Usuń";
    usunButton.classList.add("usun-button");
    miniTytulElement.appendChild(usunButton);

    const edytujButton = document.createElement("button");
    edytujButton.textContent = "Edytuj";
    edytujButton.classList.add("edytuj-button");
    miniTytulElement.appendChild(edytujButton);

    const zapiszButton = document.createElement("button");
    zapiszButton.textContent = "Zapisz zmiany";
    zapiszButton.classList.add("zapisz-button");
    zapiszButton.style.display = "none";
    miniTytulElement.appendChild(zapiszButton);

    const wyczyscTytulButton = document.createElement("button");
    wyczyscTytulButton.textContent = "Wyczyść tytuł";
    wyczyscTytulButton.classList.add("wyczysc-tytul");
    miniTytulElement.appendChild(wyczyscTytulButton);

    const wyczyscTekstButton = document.createElement("button");
    wyczyscTekstButton.textContent = "Wyczyść tekst";
    wyczyscTekstButton.classList.add("wyczysc-tekst");
    miniTytulElement.appendChild(wyczyscTekstButton);

    edytujButton.addEventListener("click", () => {
      tytulDuzejNotatki.value = note.title;
      tekstDuzejNotatki.value = note.content;
      zapiszButton.style.display = "block";
    });

    zapiszButton.addEventListener("click", () => {
      note.content = tekstDuzejNotatki.value;
      note.title = tytulDuzejNotatki.value;
      miniTytulTekst.textContent = note.title;
      dataUtworzeniaElement.textContent = new Date().toLocaleString();
      zapiszButton.style.display = "none";
      saveNotesToLocalStorage();
    });

    wyczyscTytulButton.addEventListener("click", () => {
      tytulDuzejNotatki.value = "";
    });

    wyczyscTekstButton.addEventListener("click", () => {
      tekstDuzejNotatki.value = "";
    });

    usunButton.addEventListener("click", () => {
      notatkiContainer.removeChild(miniTytulElement);
      notesArray = notesArray.filter(n => n.title !== note.title);
      saveNotesToLocalStorage();
      currentNoteCount--;
    });
  };

  button.addEventListener("click", () => {
    let titleValue = tytulDuzejNotatki.value;
    let contentValue = tekstDuzejNotatki.value;
    if (titleValue.trim() === "" || contentValue.trim() === "") {
      alert("Wprowadź tytuł i treść notatki.");
      return;
    }
    if (currentNoteCount < 8) {
      let currentDate = new Date().toLocaleString();
      let newNote = new Note(titleValue, contentValue, currentDate);
      notesArray.push(newNote);
      createMiniNoteElement(newNote);
      tytulDuzejNotatki.value = "";
      tekstDuzejNotatki.value = "";
      currentNoteCount++;
      saveNotesToLocalStorage();
    } else {
      alert("Osiągnięto limit 8 notatek.");
    }
  });

  updateClock = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const clock = document.querySelector(".clock");
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  };

  setInterval(updateClock, 1000);

  loadNotesFromLocalStorage();
};




