// ==========================================
// SHORTCUTLAB - APPLICATION
// ==========================================

// ---------- DONNÉES DES RACCOURCIS ----------

const shortcutData = {
    "CTRL + C": {
        title: "Copier",
        category: "ESSENTIEL",
        description: "Copie l'élément sélectionné.",
        example: "Sélectionne un texte, une image ou un fichier puis utilise Ctrl + C."
    },

    "CTRL + V": {
        title: "Coller",
        category: "ESSENTIEL",
        description: "Colle l'élément que tu as copié ou coupé.",
        example: "Après Ctrl + C, utilise Ctrl + V pour placer l'élément ailleurs."
    },

    "CTRL + X": {
        title: "Couper",
        category: "ESSENTIEL",
        description: "Coupe l'élément sélectionné pour pouvoir le déplacer.",
        example: "Sélectionne un fichier puis Ctrl + X, ouvre un autre dossier et fais Ctrl + V."
    },

    "CTRL + Z": {
        title: "Annuler",
        category: "ESSENTIEL",
        description: "Annule la dernière action effectuée.",
        example: "Tu as supprimé quelque chose par erreur ? Fais Ctrl + Z."
    },

    "CTRL + A": {
        title: "Tout sélectionner",
        category: "ESSENTIEL",
        description: "Sélectionne tous les éléments disponibles.",
        example: "Dans un dossier, Ctrl + A sélectionne tous les fichiers."
    },

    "CTRL + S": {
        title: "Enregistrer",
        category: "PRODUCTIVITÉ",
        description: "Enregistre ton travail.",
        example: "Dans un logiciel, utilise Ctrl + S régulièrement pour éviter de perdre ton travail."
    },

    "WIN + E": {
        title: "Explorateur de fichiers",
        category: "WINDOWS",
        description: "Ouvre rapidement l'Explorateur de fichiers Windows.",
        example: "Appuie sur Windows + E pour accéder directement à tes dossiers."
    },

    "ALT + TAB": {
        title: "Changer de fenêtre",
        category: "WINDOWS",
        description: "Permet de passer rapidement d'une fenêtre ouverte à une autre.",
        example: "Garde Alt appuyé puis appuie sur Tab pour changer de fenêtre."
    },

    "WIN + D": {
        title: "Afficher le bureau",
        category: "WINDOWS",
        description: "Affiche immédiatement le bureau Windows.",
        example: "Windows + D réduit temporairement toutes les fenêtres."
    },

    "CTRL + SHIFT + ESC": {
        title: "Gestionnaire des tâches",
        category: "SYSTÈME",
        description: "Ouvre directement le Gestionnaire des tâches.",
        example: "Pratique lorsqu'un programme ne répond plus ou pour voir les applications ouvertes."
    }
};


// ==========================================
// ÉLÉMENTS HTML
// ==========================================

const searchInput = document.getElementById("searchInput");
const categories = document.querySelectorAll(".category");
const shortcutCards = document.querySelectorAll(".shortcut-card");

const modal = document.getElementById("shortcutModal");
const closeModal = document.getElementById("closeModal");

const modalCategory = document.getElementById("modalCategory");
const modalKeys = document.getElementById("modalKeys");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalExample = document.getElementById("modalExample");

const knowButton = document.getElementById("knowButton");

const progressFill = document.getElementById("progressFill");
const progressCount = document.getElementById("progressCount");
const progressPercent = document.getElementById("progressPercent");


// ==========================================
// VARIABLES
// ==========================================

let currentCategory = "Tous";
let currentShortcut = null;


// ==========================================
// PROGRESSION
// ==========================================

let masteredShortcuts = JSON.parse(
    localStorage.getItem("masteredShortcuts")
) || [];


// ==========================================
// METTRE À JOUR LA PROGRESSION
// ==========================================

function updateProgress() {

    const total = shortcutCards.length;
    const mastered = masteredShortcuts.length;

    if (total === 0) return;

    const percentage = Math.round((mastered / total) * 100);

    if (progressFill) {
        progressFill.style.width = percentage + "%";
    }

    if (progressCount) {
        progressCount.textContent =
            mastered + " / " + total + " maîtrisés";
    }

    if (progressPercent) {
        progressPercent.textContent = percentage + "%";
    }
}


// ==========================================
// BOUTON "JE CONNAIS"
// ==========================================

function updateKnowButton() {

    if (!knowButton || !currentShortcut) return;

    if (masteredShortcuts.includes(currentShortcut)) {

        knowButton.textContent = "✓ RACCOURCI MAÎTRISÉ";

        knowButton.classList.add("mastered");

    } else {

        knowButton.textContent = "✓ JE CONNAIS CE RACCOURCI";

        knowButton.classList.remove("mastered");
    }
}


if (knowButton) {

    knowButton.addEventListener("click", function () {

        if (!currentShortcut) return;

        if (!masteredShortcuts.includes(currentShortcut)) {

            masteredShortcuts.push(currentShortcut);

        } else {

            masteredShortcuts =
                masteredShortcuts.filter(
                    shortcut => shortcut !== currentShortcut
                );
        }

        localStorage.setItem(
            "masteredShortcuts",
            JSON.stringify(masteredShortcuts)
        );

        updateProgress();
        updateKnowButton();

    });

}


// ==========================================
// OUVRIR LE POPUP
// ==========================================

shortcutCards.forEach(card => {

    card.addEventListener("click", function () {

        const keys = card.dataset.keys;

        if (!keys) return;

        const data = shortcutData[keys];

        if (!data) {
            console.log("Raccourci inconnu :", keys);
            return;
        }

        currentShortcut = keys;

        modalCategory.textContent =
            "01 // " + data.category;

        modalTitle.textContent =
            data.title;

        modalDescription.textContent =
            data.description;

        modalExample.textContent =
            data.example;

        modalKeys.innerHTML = "";

        keys.split(" + ").forEach(key => {

            const kbd = document.createElement("kbd");

            kbd.textContent = key;

            modalKeys.appendChild(kbd);

        });

        updateKnowButton();

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// FERMER LE POPUP
// ==========================================

function closeShortcutModal() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeShortcutModal
    );

}


if (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeShortcutModal();

        }

    });

}


// Touche Échap

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeShortcutModal();

    }

});


// ==========================================
// RECHERCHE + CATÉGORIES
// ==========================================

function filterShortcuts() {

    const search =
        searchInput ?
        searchInput.value.toLowerCase().trim() :
        "";

    let visibleCards = 0;

    shortcutCards.forEach(card => {

        const keys =
            (card.dataset.keys || "").toLowerCase();

        const text =
            card.textContent.toLowerCase();

        const number =
            card.querySelector(".number");

        const categoryText =
            number ?
            number.textContent.toLowerCase() :
            "";

        const data =
            shortcutData[card.dataset.keys];

        const realCategory =
            data ?
            data.category.toLowerCase() :
            "";

        const matchesSearch =
            keys.includes(search) ||
            text.includes(search);

        const matchesCategory =
            currentCategory === "Tous" ||
            realCategory === currentCategory.toLowerCase();

        if (matchesSearch && matchesCategory) {

            card.style.display = "";

            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });


    updateNoResults(visibleCards);

}


// ==========================================
// MESSAGE AUCUN RÉSULTAT
// ==========================================

function updateNoResults(count) {

    let noResults =
        document.getElementById("noResults");

    if (count === 0) {

        if (!noResults) {

            noResults =
                document.createElement("div");

            noResults.id = "noResults";

            noResults.textContent =
                "Aucun raccourci trouvé.";

            noResults.style.textAlign = "center";
            noResults.style.padding = "40px";
            noResults.style.color = "#888";
            noResults.style.fontFamily = "Poppins, sans-serif";

            const container =
                document.querySelector(".shortcuts-grid");

            if (container) {
                container.appendChild(noResults);
            }

        }

    } else {

        if (noResults) {

            noResults.remove();

        }

    }

}


// ==========================================
// CLIC SUR LES CATÉGORIES
// ==========================================

categories.forEach(category => {

    category.addEventListener("click", function () {

        categories.forEach(button => {

            button.classList.remove("active");

        });

        this.classList.add("active");

        currentCategory =
            this.textContent.trim();

        filterShortcuts();

    });

});


// ==========================================
// RECHERCHE
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterShortcuts
    );

}


// ==========================================
// DÉMARRAGE
// ==========================================

updateProgress();

filterShortcuts();

console.log("ShortcutLab chargé avec succès 🚀");