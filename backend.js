// simulation de la base de données dans le navigateur
if (!localStorage.getItem('reservations')) {
    localStorage.setItem('reservations', JSON.stringify([
        { id: 1, date: "lundi", creneau: "matin", developpeur: "Lucas", statut: "Confirmé", semaine: 0, annee: 2026},
        { id: 2, date: "mardi", creneau: "apres-midi", developpeur: "Amandine", statut: "Option", semaine: 0, annee: 2026}
    ]));
}

const MockBackend = {
    // Simule un GET /api/reservations
    getReservations: async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simule 500ms de latence réseau
        return localStorage.getItem('reservations');
    },
    // Simule un POST /api/reservations
    addReservation: async (newRes) => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Latence
        let current = JSON.parse(localStorage.getItem('reservations'));
        // Vérification de conflit (Règle métier simple : pas deux réserves sur le même créneau)
        const conflit = current.find(r => r.date === newRes.date && r.creneau === newRes.creneau && r.semaine === newRes.semaine && r.annee === newRes.annee);
        if (conflit) throw new Error("La machine est déjà réservée sur ce créneau !");
        newRes.id = Date.now();
        current.push(newRes);
        localStorage.setItem('reservations', JSON.stringify(current));
        return { success: true, data: newRes };
    },
    /**
     * Supprime une réservation existante dans la base de données (localStorage).
     * * @param {number} id - L'identifiant unique de la réservation à supprimer.
     * @returns {Promise<Object>} - Renvoie un objet { success: true } si la suppression réussit.
     * @throws {Error} - Lève une erreur si l'ID n'existe pas dans la base de données.
     */
    deleteReservation: async (id) => {
        // TODO: Étape 1 - Simuler la latence réseau (ex: attendre 500ms avec une Promise)
        await new Promise(resolve => setTimeout(resolve, 500));
        // TODO: Étape 2 - Récupérer la liste actuelle des réservations depuis le localStorage (attention au JSON.parse !)
        let current = JSON.parse(localStorage.getItem('reservations'));
        // TODO: Étape 3 - Trouver et supprimer la réservation qui possède l'ID passé en paramètre
        // Astuce : Vous pouvez utiliser la méthode .filter() ou chercher l'index avec .findIndex()*
        const nliste = current.filter(resa => resa.id !== id);
            console.log("id reçu :", id);
            console.log("current :", current);
        console.log("nliste :", nliste);
        // TODO: Étape 4 - Si aucune réservation n'a cet ID, lever une erreur avec : throw new Error("...");
        if (nliste.length === current.length) {
            throw new Error("Réservation intouvable");
            return;
        }
        // TODO: Étape 5 - Sauvegarder la nouvelle liste mise à jour dans le localStorage
        localStorage.setItem('reservations', JSON.stringify(nliste));
        // TODO: Étape 6 - Retourner l'objet de succès
        return { success: true};
    },
};

