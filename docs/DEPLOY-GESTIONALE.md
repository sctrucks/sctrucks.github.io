# Separazione gestionale SCTRUCKS

## Stato

La versione online su PythonAnywhere resta attiva fino a test completi. Non pubblicare database, backup, file Excel, password o `.env` nel repository pubblico.

## Architettura prevista

- `gestionale.sctrucks.it`: frontend statico su GitHub Pages (HTML/CSS/JavaScript).
- `lorenzofrontonesi.pythonanywhere.com`: backend Python con API `/api/` e SQLite.
- Squarespace DNS: CNAME `gestionale` verso l'host GitHub Pages, solo dopo aver predisposto la pubblicazione Pages corretta.

## Backend PythonAnywhere

1. Fare backup privato di `server.py`, `wsgi.py` e `sctrucks.db`.
2. Sostituire `wsgi.py` con quello del pacchetto di preparazione solo dopo aver confrontato configurazione e credenziali effettive.
3. Configurare `SCTRUCKS_WEB_USER` e `SCTRUCKS_WEB_PASSWORD` come variabili d'ambiente server-side, mai nel repository.
4. Consentire CORS solo da `https://gestionale.sctrucks.it` per `/api/`; la risposta OPTIONS deve arrivare prima del controllo Basic Auth.
5. Ricaricare la web app e testare OPTIONS, 401 senza credenziali, login corretto e operazioni CRUD.
6. Se PythonAnywhere applica autenticazione a monte del WSGI, verificare la preflight: potrebbe richiedere una diversa architettura di autenticazione.

## Frontend

Il pacchetto `SCTRUCKS_separazione_preparazione.zip` contiene `frontend/index.html`, `frontend/app.js` e `frontend/style.css`. Prima della pubblicazione, confermare l'URL dell'API, il comportamento dell'accesso e l'assenza di segreti. Non committare lo ZIP originale: contiene dati aziendali.

## Go-live

Non collegare il sottodominio finché i test HTTPS, CORS, autenticazione, lettura e scrittura non sono superati. Mantenere un piano di rollback al vecchio gestionale PythonAnywhere.
