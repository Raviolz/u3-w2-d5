# Weather App ☀️

Applicazione meteo sviluppata con **React e Vite** che permette di cercare città in tutto il mondo, consultare le condizioni meteorologiche attuali e visualizzare previsioni orarie e giornaliere.

Il progetto nasce come esercizio durante il percorso Full Stack Development di EPICODE ed è stato successivamente rivisto e ampliato, migliorandone struttura, funzionalità, gestione dei dati e interfaccia.

---

## Funzionalità

- Ricerca del meteo per città
- Geolocalizzazione tramite browser
- Condizioni meteorologiche attuali
- Temperatura percepita, minima e massima
- Umidità, vento, pressione, visibilità e copertura nuvolosa
- Orario locale della città
- Alba e tramonto
- Previsioni per le successive 24 ore
- Previsioni aggregate dei prossimi 5 giorni
- Probabilità di precipitazioni
- Conversione tra **°C e °F**
- Salvataggio delle città preferite
- Cronologia delle ricerche recenti
- Impostazione di una città predefinita
- Profilo e preferenze salvati tramite `localStorage`
- Gestione degli stati di loading ed errore
- Pagina 404 personalizzata
- Layout responsive

---

## Previsioni giornaliere

L'API utilizzata restituisce previsioni meteorologiche a intervalli di circa **3 ore**.

Per il forecast giornaliero, i dati vengono elaborati lato client:

1. le previsioni vengono raggruppate per giorno;
2. viene calcolata la temperatura minima e massima tra gli intervalli disponibili;
3. viene individuata la probabilità massima di precipitazioni;
4. viene utilizzata una previsione vicina alle ore centrali della giornata come condizione rappresentativa.

In questo modo il forecast non mostra semplicemente un singolo intervallo arbitrario, ma utilizza i dati disponibili per ottenere una panoramica giornaliera più completa.

---

## Tecnologie

- **React**
- **Vite**
- **JavaScript ES6+**
- **React Router**
- **React Bootstrap**
- **Bootstrap Icons**
- **OpenWeather API**
- **Web Geolocation API**
- **Local Storage**
- **CSS3**

---

## Struttura del progetto

```text
src/
├── Components/
│   ├── CityDetails.jsx
│   ├── Forecasts.jsx
│   ├── ForecastSearch.jsx
│   ├── NotFound.jsx
│   ├── Profile.jsx
│   ├── WFooter.jsx
│   ├── WHomepage.jsx
│   └── WNavBar.jsx
│
├── services/
│   └── weatherApi.js
│
├── utils/
│   ├── storageUtils.js
│   └── weatherUtils.js
│
├── App.jsx
├── App.css
└── main.jsx
```

Le chiamate all'API sono centralizzate nel service `weatherApi.js`, mentre le funzioni di elaborazione dei dati meteorologici e di gestione del `localStorage` sono separate in utility dedicate.

---

## Avvio del progetto

### 1. Clonare la repository

```bash
git clone <repository-url>
```

### 2. Installare le dipendenze

```bash
npm install
```

### 3. Configurare OpenWeather

Creare un file `.env` nella root del progetto:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

È disponibile anche `.env.example` come riferimento.

> La variabile viene utilizzata dal client Vite. Non inserire la propria API key direttamente nel codice sorgente o nel repository.

### 4. Avviare il progetto

```bash
npm run dev
```

---

## API

I dati meteorologici sono forniti da **OpenWeather**.

L'app utilizza principalmente:

- Current Weather Data
- 5 Day / 3 Hour Forecast

Le richieste all'API sono gestite attraverso un service dedicato per evitare duplicazione della logica di fetching nei componenti React.

---

## Persistenza locale

Non è necessario creare un account.

Il browser utilizza `localStorage` per conservare:

- nome del profilo;
- città predefinita;
- unità di temperatura selezionata;
- città preferite;
- ultime ricerche.

I dati rimangono disponibili anche dopo il refresh della pagina.

---

## Design

L'interfaccia utilizza una palette ispirata direttamente al tema meteorologico:

- blu e azzurro per cielo e informazioni principali;
- giallo e arancione per sole, temperature e highlights.

L'obiettivo del redesign è stato mantenere un'identità visiva semplice e riconoscibile, evitando di trasformare il progetto in una dashboard generica.

---

# 🇬🇧 English

## Weather App

Weather App is a **React + Vite** application that allows users to search for cities around the world, view current weather conditions and explore hourly and multi-day forecasts.

The project originally started as an exercise during the EPICODE Full Stack Development course and was later redesigned and expanded with improved structure, functionality, data processing and UI.

---

## Features

- Search weather by city
- Browser geolocation
- Current weather conditions
- Feels-like, minimum and maximum temperature
- Humidity, wind, pressure, visibility and cloud coverage
- Local city time
- Sunrise and sunset
- Next 24-hour forecast
- Aggregated 5-day forecast
- Precipitation probability
- **Celsius / Fahrenheit** switch
- Favourite cities
- Recent search history
- Default home city
- Profile and preferences stored with `localStorage`
- Loading and error states
- Custom 404 page
- Responsive layout

---

## Daily forecast processing

The weather API provides forecast data in approximately **3-hour intervals**.

To generate the daily forecast, the application processes the API response on the client:

1. forecast entries are grouped by local day;
2. minimum and maximum temperatures are calculated from the available intervals;
3. the highest precipitation probability is selected;
4. a forecast close to midday is used as the representative weather condition.

This provides a more meaningful daily overview than simply displaying one arbitrary forecast interval.

---

## Tech Stack

- **React**
- **Vite**
- **JavaScript ES6+**
- **React Router**
- **React Bootstrap**
- **Bootstrap Icons**
- **OpenWeather API**
- **Web Geolocation API**
- **Local Storage**
- **CSS3**

---

## Project Structure

```text
src/
├── Components/
│   ├── CityDetails.jsx
│   ├── Forecasts.jsx
│   ├── ForecastSearch.jsx
│   ├── NotFound.jsx
│   ├── Profile.jsx
│   ├── WFooter.jsx
│   ├── WHomepage.jsx
│   └── WNavBar.jsx
│
├── services/
│   └── weatherApi.js
│
├── utils/
│   ├── storageUtils.js
│   └── weatherUtils.js
│
├── App.jsx
├── App.css
└── main.jsx
```

API requests are centralised inside `weatherApi.js`, while weather data processing and local storage logic are separated into dedicated utility modules.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure OpenWeather

Create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

An `.env.example` file is also included as reference.

> The variable is used by the Vite client. Do not hardcode your API key directly inside the source code or commit it to the repository.

### 4. Run the application

```bash
npm run dev
```

---

## API

Weather data is provided by **OpenWeather**.

The application mainly uses:

- Current Weather Data
- 5 Day / 3 Hour Forecast

API calls are handled through a dedicated service to keep fetching logic separate from React components.

---

## Local Persistence

No account is required.

The application uses browser `localStorage` to save:

- profile name;
- default home city;
- preferred temperature unit;
- favourite cities;
- recent searches.

Preferences remain available after refreshing or reopening the application.

---

## UI & Design

The interface uses a weather-inspired colour palette:

- blue and light blue for the sky and primary information;
- yellow and orange for the sun, temperatures and highlights.

The redesign focuses on maintaining a simple and recognisable visual identity while keeping the interface responsive and easy to navigate.
