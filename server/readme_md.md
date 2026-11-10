# 📷 Camera Diary (Cuaderno de Cámara) - Beta v1.0

> **Asistente de campo profesional, móvil y full-stack** diseñado para fotógrafos que buscan dominar los ajustes técnicos, llevar un registro de campo impecable y calcular presupuestos para clientes aplicando la filosofía de **"cero-edición"**.

## 🚀 Características Principales (Beta Release)

* **🎯 Ajustes Contextuales (Módulo Ajustes):** Separación inteligente entre **Luz Ambiente** (Sol Directo, Nublado/Sombra, Interior, Noche) y **Técnicas Fotográficas** (Retrato, Paisaje, Deporte, Macro, Stop Motion, Timelapse, Focus Stacking, Larga Exposición). Incluye estimación automática de **tomas recomendadas**, selección de **cuerpo de cámara y lente**, y configuración precisa de **Flash**.

* **🧮 Tablas de Consulta Rápida (Módulo Tablas):** Tablas técnicas integradas de reciprocidad de exposición, guía de filtros ND (Densidad Neutra) y equivalencias de factor de recorte (*Crop Factor*).

* **📝 Bitácora de Campo Interactiva (Módulo Bitácora):** Registro en 1-clic con persistencia local/remota, eliminación individual de tomas y **exportación a Excel (.csv)**.

* **💼 Calculadora de Negocio y Presupuestos (Módulo Presupuesto):** Estimador de honorarios por horas con soporte para múltiples monedas (USD, EUR, ARS, MXN, CLP), recargo por locación (Estudio Pro / Exteriores) y **generador de propuestas en PDF** listas para imprimir o enviar.

* **🔴 Modo Rojo Nocturno:** Interfaz adaptada para preservar la visión nocturna en astrofotografía y sesiones en oscuridad total.

* **🌐 Multilingüe (ES / EN):** Soporte completo de traducción en tiempo real.

* **📱 PWA Ready:** Optimizado como Progressive Web App para instalarse directamente en dispositivos móviles como aplicación nativa.

## 🛠️ Stack Tecnológico

* **Frontend:** React (Arquitectura modular en `src/components/`), CSS Moderno (Glassmorphism / Mobile-First).
* **Backend:** Python con Flask y extensiones CORS.
* **Base de Datos:** SQLite (`database.db`).

## 📦 Estructura del Proyecto

```text
CameraDiary/
├── client/
│   ├── public/
│   │   ├── index.html        (Favicon e íconos PWA integrados)
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Ajustes.jsx
│   │   │   ├── Tablas.jsx
│   │   │   ├── Bitacora.jsx
│   │   │   ├── Presupuesto.jsx
│   │   │   └── Estado.jsx
│   │   ├── translations/
│   │   │   └── i18n.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── server/
    ├── app.py
    └── requirements.txt
```

## ⚙️ Guía de Instalación y Ejecución Local

Sigue estos pasos para poner en marcha la aplicación en tu entorno de desarrollo:

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/camera-diary.git
cd camera-diary
```

### 2. Iniciar el Servidor (Backend Flask)
```bash
cd server
pip install -r requirements.txt
python app.py
```
*(El servidor API se ejecutará por defecto en `http://localhost:5000`)*

### 3. Iniciar la Aplicación (Frontend React)
Abre una nueva pestaña o ventana de tu terminal:
```bash
cd client
npm install
npm start
```
*(La aplicación web móvil se abrirá automáticamente en `http://localhost:3000`)*

## 🗺️ Próximos Pasos (Roadmap v1.1)
* [ ] Sincronización offline avanzada mediante Service Workers.
* [ ] Gráficos estadísticos de rendimiento de disparos en el módulo Estado.
* [ ] Mayor personalización de plantillas de presupuesto PDF corporativas.

## 📄 Licencia
Este proyecto se distribuye bajo la licencia MIT. ¡Las contribuciones y reportes de errores (*Issues*) para esta versión Beta son bienvenidos!