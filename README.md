# DP2 | Technische Grundlagen 2 und Datenbanken | SoSe 2023

Die Abgabe des Projekts erfolgt in den beiden Fächern Technische Grundlagen 2 und Datenbanken als ein Gesamtprojekt.

## Projektbeschreibung

- Verteiltes System, prototypisch-funktional umgesetzt
- Datenbank-Anbindung
- testbar

## Must Have (bestehens-relevant)

- Sensormodul, das Daten erhebt und in ein System einspeist
- Backend mit eigener dokumentierter API für HTTP-Requests
- Anzeige der gespeicherten Sensorwerte
- Nutzung von .env oder Ähnlichem, um Credentials auf github zu verbergen.
- Ausformuliertes Datenmodell inkl. Entity-Relationship-Model
- github Monorepo
- .gitignore, in der node_modules enthalten ist. Hochgeladener node_modules-Ordner = Schelle.
- Projekt-Doku als README.md
- Screencast (in Google Drive, nicht im Repo!)

## Should Have (~ relevant für die Note vor dem Komma)

- UX-getriebenes Konzept
- Frontend für User
- User-Authentifizierung (Register / Login / Logout)
- Anzeige / Visualisierung der Sensorwerte
- Interessantere, komplexere Datenabfragen und -darstellungen
- Skalierbarkeit des Systems (mehr User / mehr Sensoren / etc.)
- Microservices-Infrastruktur (User Service, Data Service, etc.)


## Could Have (~ relevant für die Note nach dem Komma)

- Gestaltetes Frontend / ggf. mit Framework (next.js / vue / …)
- Prototyping: Cases für Komponenten usw., 3d-gedruckt oder Lasercuts
- Aufwändige Datenvisualisierungen über Graphen hinaus
- Zuordnung neue Sensormodule zu User (Pairing-Prozess), zumindest als Überlegung
- Zuordnung der User zu ihren Sensormodulen, damit sie nur ihre eigenen bzw. berechtigten Sensoren sehen
- User-Authentifizierung über distinguierte Libraries / Frameworks (z. B. Passport, JSON Web Tokens)
- Session-Timeouts
- Sensor- / ESP-Informationen im Frontend bearbeiten
- Sensor objektorientiert programmiert
- Deep Sleep-Implementierung
- Onboarding: Logon speichern / Cookie setzen / localStorage / Wizard statistische / prognostische Auswertung der Daten (AI?)
- User-Authentifizierung über externen Dienst (z. B. Google)
- Alerts / Alarme Konfigurieren einzelner Sensormodule (z. B. Intervalle ändern)
- OpenAPI / Swagger.io / [apicur.io](http://apicur.io) nutzen
- Benutzerrollen (nur ansehen, editieren, etc.)
- Überlegungen zur Energieversorgung (Laufzeit, Energiespeicher, Lademöglichkeit, etc.)
- Lauffähige Docker-Container / shell + batch für alle Images + Container

## Bewertungskriterien

- Anforderungen erfüllt?
- lauffähig?
- eigener Code über Unterrichtsprojekt hinaus?
- kein absoluter Quatsch?
→ bestanden

Von der 4,0 zur 1,0 dann relevant:
- Herangehensweise, Umgang mit Schwierigkeiten im Verlauf
- the more, the better (Anzahl sinnvoller Features)
- the better, the better (Codequalität, Struktur von System und Code)
- the smarter, the better (Konzept, Komplexität)

**Hinweis:** Anwesenheit, Mitarbeit und Beiträge im Kurs (Quantität und Qualität) sind mit 30% der Gesamtnote gewichtet.

**Tipp:** Macht irgendwo eine übersichtliche Dokumentationsseite, in der ihr eure Must / Should / Could Haves auflistet, damit ich nichts übersehe.

## Themenideen

- Aquarienüberwachung / Poolüberwachung
- Luftqualitäts-Monitoring
- Indoor-Positionierung (Lab-Heatmap)
- Zimmerpflanzen
- Vogelhäuschen
- Sauerteig-Überwachung