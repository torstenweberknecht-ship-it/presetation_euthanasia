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
| 2 – 7 | **Folie 1** (Einleitung) → **1.1** → Folie 1 → **1.2** → Folie 1 → Inhaltsangabe |
| 8 / 9 | **Folie 2** (Rechtliche Lage) rein / raus |
| 10 / 11 | **Folie 3** (Argumente) rein / raus |
| 12 – 17 | **Folie 4** (Internationale Beispiele) → **4.1** → Folie 4 → **4.2** → Folie 4 → Inhaltsangabe |
| 18 / 19 | **Folie 5** (Fazit) rein / raus |
| 20 / 21 | **Folie 6** (Quellen) rein / raus |
| 22 | zurück zur Titelfolie (Neustart) |

Folie 1 und 4 sind Splittfolien (6 Klicks), die Folien 2, 3, 5 und 6 sind
Einzelfolien (2 Klicks). Jede Unterfolie (1.1, 1.2, 4.1, 4.2) ist eine eigene
Vollbildseite im gleichen 16:9-Format – sie liegt auf ihrer Mutterfolie und
wird per Überblendung eingeblendet. Die Karte der nächsten Unterfolie ist auf
der Mutterfolie hervorgehoben.

**Tastatur:** `→` / `Leertaste` weiter · `←` zurück · `Home` Titel ·
`Ende` letzte Ansicht · `F` Vollbild.

## Dateien

- `index.html` – Titelfolie, Inhaltsangabe, die 6 Folien und die 4 Unterfolien
- `css/style.css` – Folienlayout (Format 1600×900) und Kamera-Optik
- `js/main.js` – Kamera (Zoom/Pan), Klick-Folge und Bedienung

## Lokal ansehen

Einfach `index.html` im Browser öffnen oder einen kleinen Webserver starten:

```bash
python3 -m http.server 8080
```

## Deployment

Da die Seite statisch ist, kann sie direkt über GitHub Pages ausgeliefert
werden (Settings → Pages → Branch: `main`).
