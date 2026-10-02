# Vortrag: Sterbehilfe

Interaktive Präsentationsseite (PowerPoint-/Zoom-Stil) zum Thema Sterbehilfe.
Platzhalterversion – alle Inhalte sind mit `[Platzhalter]` markiert.

## Aufbau

Die Seite besteht aus einer Bühne, in der die Folien im Raum liegen
(Titelfolie links, Übersichtsboard rechts). Beim Klicken fährt eine Kamera
von Folie zu Folie.

| Klick | Ansicht |
| --- | --- |
| 1 | Titelfolie → **Inhaltsangabe** (die 6 Folien als kleine Rechtecke) |
| 2 | Zoom in **Folie 1** (Einleitung) |
| 3 | Unterteilung 1.1/1.2 erscheint, tieferer Zoom in **1.1** |
| 4 | zurück zur Inhaltsangabe |
| 5 | Zoom in **Folie 2** (Rechtliche Lage) |
| 6 | zurück zur Inhaltsangabe |
| 7 / 8 | **Folie 3** (Argumente) rein / raus |
| 9 – 11 | **Folie 4** (Internationale Beispiele): rein → Unterteilung → raus |
| 12 / 13 | **Folie 5** (Fazit) rein / raus |
| 14 / 15 | **Folie 6** (Quellen) rein / raus |
| 16 | zurück zur Titelfolie (Neustart) |

Folie 1 und 4 sind Splittfolien (3 Klicks), die Folien 2, 3, 5 und 6 sind
Einzelfolien (2 Klicks).

**Tastatur:** `→` / `Leertaste` weiter · `←` zurück · `Home` Titel ·
`Ende` letzte Ansicht · `F` Vollbild.

## Dateien

- `index.html` – Titelfolie, Inhaltsangabe und die 6 Folien
- `css/style.css` – Folienlayout (Festes Format 1600×900) und Kamera-Optik
- `js/main.js` – Kamera (Zoom/Pan), Klick-Folge und Bedienung

## Lokal ansehen

Einfach `index.html` im Browser öffnen oder einen kleinen Webserver starten:

```bash
python3 -m http.server 8080
```

## Deployment

Da die Seite statisch ist, kann sie direkt über GitHub Pages ausgeliefert
werden (Settings → Pages → Branch: `main`).
