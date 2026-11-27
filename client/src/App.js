import React, { useState, useEffect } from 'react';
import { translations } from './translations/i18n';
import './App.css';

import Ajustes from './components/Ajustes';
import Tablas from './components/Tablas';
import Bitacora from './components/Bitacora';
import Presupuesto, { calcularPresupuesto, formatearMoneda, PAISES } from './components/Presupuesto';
import Estado from './components/Estado';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const STORAGE_KEY_BITACORA = 'camera_diary_bitacora_v1';

const escaparHTML = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

const escaparCSV = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

function leerRegistrosGuardados() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BITACORA);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');
  const [activeTab, setActiveTab] = useState('ajustar');
  const [modoRojo, setModoRojo] = useState(() => localStorage.getItem('modoRojo') === 'true');

  const [estadoServidor, setEstadoServidor] = useState('');
  const [registros, setRegistros] = useState(leerRegistrosGuardados);

  // Contexto compartido de toma (Ajustes <-> Tablas <-> Bitácora <-> Presupuesto <-> Estado)
  const [ctxToma, setCtxToma] = useState({
    lugar: 'estudio',
    camara: 'dslr_aps_c',
    lente: '35mm_fijo',
    tipoFoto: 'retrato',
    tipoLuz: 'flash_estudio',
    usaFlash: true,
    configToma: {},
  });

  // Presupuesto
  const [pais, setPais] = useState('AR');
  const [moneda, setMoneda] = useState('ARS');
  const [modoIVA, setModoIVA] = useState('agregar');
  const [tasaIVA, setTasaIVA] = useState(21);
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('Sesión Fotográfica');
  const [ubicacion, setUbicacion] = useState('estudio');
  const [recargoEstudio, setRecargoEstudio] = useState('');
  const [precioHora, setPrecioHora] = useState(30);
  const [horasEstimadas, setHorasEstimadas] = useState(3);
  const [fotosEntregadas, setFotosEntregadas] = useState(25);
  const [gastosViaticos, setGastosViaticos] = useState(20);

  const t = translations[lang] || translations.es;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', modoRojo ? 'red' : 'default');
    localStorage.setItem('modoRojo', String(modoRojo));
  }, [modoRojo]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BITACORA, JSON.stringify(registros));
    } catch {
      // Ignora error de cuota o almacenamiento bloqueado
    }
  }, [registros]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/saludo?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setEstadoServidor(data.mensaje))
      .catch(() =>
        setEstadoServidor(lang === 'es' ? 'Modo Local (PWA Offline)' : 'Local Mode (PWA Offline)')
      );
  }, [lang]);

  // Sincroniza ubicación de presupuesto cuando cambia el lugar en Ajustes
  const handleCambiarLugarAjustes = (nuevoLugar) => {
    setCtxToma((prev) => ({ ...prev, lugar: nuevoLugar }));
    setUbicacion(nuevoLugar === 'estudio' ? 'estudio' : 'exteriores');
  };

  // Aplica un ajuste puntual (por ejemplo desde Tablas) y opcionalmente salta a Ajustes
  const handleAplicarAjusteDesdeTabla = (parcialConfig, irAAjustes = true) => {
    setCtxToma((prev) => ({
      ...prev,
      configToma: {
        ...(prev.configToma || {}),
        ...parcialConfig,
      },
    }));
    if (irAAjustes) {
      setActiveTab('ajustar');
    }
  };

  // Carga una toma guardada en Bitácora de vuelta en Ajustes para reutilizarla
  const handleUsarTomaEnAjustes = (item) => {
    if (!item) return;
    const lugarCargado = item.lugar || (item.tecnica?.includes('Exteriores') ? 'exterior' : 'estudio');
    setCtxToma((prev) => ({
      lugar: lugarCargado,
      camara: item.camaraId || prev.camara,
      lente: item.lenteId || prev.lente,
      tipoFoto: item.tipoFoto || prev.tipoFoto,
      tipoLuz: item.tipoLuz || prev.tipoLuz,
      usaFlash: typeof item.usaFlash === 'boolean' ? item.usaFlash : prev.usaFlash,
      configToma: item.config ? { ...item.config } : prev.configToma,
    }));
    setUbicacion(lugarCargado === 'estudio' ? 'estudio' : 'exteriores');
    setActiveTab('ajustar');
  };

  const handleGuardarToma = (nuevaToma) => {
    if (!nuevaToma) return;
    const ahora = new Date();
    const registroNormalizado = {
      id: nuevaToma.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      fecha: nuevaToma.fecha || ahora.toLocaleDateString('es-AR'),
      hora:
        nuevaToma.hora ||
        ahora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
      tecnica: nuevaToma.tecnica || (lang === 'es' ? 'Toma general' : 'General shot'),
      luz: nuevaToma.luz || '',
      camara: nuevaToma.camara || '',
      lente: nuevaToma.lente || '',
      parametros: nuevaToma.parametros || '',
      flash: nuevaToma.flash || '',
      tomas: nuevaToma.tomas || '',
      nota: nuevaToma.nota ?? '',
      lugar: nuevaToma.lugar ?? ctxToma.lugar,
      camaraId: nuevaToma.camaraId ?? ctxToma.camara,
      lenteId: nuevaToma.lenteId ?? ctxToma.lente,
      tipoFoto: nuevaToma.tipoFoto ?? ctxToma.tipoFoto,
      tipoLuz: nuevaToma.tipoLuz ?? ctxToma.tipoLuz,
      usaFlash: nuevaToma.usaFlash ?? ctxToma.usaFlash,
      config: nuevaToma.config ?? ctxToma.configToma,
      flashDetalle: nuevaToma.flashDetalle,
    };

    setRegistros((prev) => [registroNormalizado, ...prev]);
  };

  const borrarRegistro = (id) => {
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  };

  const limpiarBitacora = () => {
    setRegistros([]);
    localStorage.removeItem(STORAGE_KEY_BITACORA);
  };

  const exportarExcel = () => {
    if (registros.length === 0) {
      return alert(lang === 'es' ? 'No hay tomas para exportar.' : 'No shots to export.');
    }

    const encabezados = [
      'ID',
      'Fecha',
      'Hora',
      'Tecnica',
      'Luz',
      'Camara',
      'Lente',
      'Parametros',
      'Flash',
      'TomasRecomendadas',
      'Notas',
    ];

    const filas = registros.map((r) =>
      [
        escaparCSV(r.id),
        escaparCSV(r.fecha),
        escaparCSV(r.hora),
        escaparCSV(r.tecnica),
        escaparCSV(r.luz),
        escaparCSV(r.camara),
        escaparCSV(r.lente),
        escaparCSV(r.parametros),
        escaparCSV(r.flash),
        escaparCSV(r.tomas),
        escaparCSV(r.nota),
      ].join(';')
    );

    const csvContent = `\uFEFF${[encabezados.map(escaparCSV).join(';'), ...filas].join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Camera_Diary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const { subtotal, iva, total, recargo } = calcularPresupuesto({
    precioHora,
    horasEstimadas,
    gastosViaticos,
    ubicacion,
    recargoEstudio,
    modoIVA,
    tasaIVA,
  });

  const imprimirPresupuestoPDF = () => {
    const es = lang === 'es';
    const nombreImpuesto = (PAISES[pais] || PAISES.OTRO).impuesto;
    const fila = (a, b) =>
      `<tr><td style="padding:6px 0;border-bottom:1px solid #ddd;">${a}</td><td style="padding:6px 0;border-bottom:1px solid #ddd;text-align:right;">${b}</td></tr>`;

    const ventana = window.open('', '', 'width=800,height=600');
    if (!ventana) {
      return alert(
        es
          ? 'Permití las ventanas emergentes para generar el PDF.'
          : 'Allow pop-ups to generate the PDF.'
      );
    }

    ventana.document.write(`
      <html>
        <head><title>${es ? 'Presupuesto' : 'Quote'}</title></head>
        <body style="font-family: Arial, sans-serif; padding: 30px; color: #111;">
          <h1 style="margin-bottom:4px;">${es ? 'PROPUESTA DE SERVICIO FOTOGRÁFICO' : 'PHOTOGRAPHY SERVICE PROPOSAL'}</h1>
          <p style="color:#666;margin-top:0;">${new Date().toLocaleDateString('es-AR')}</p>

          <p><strong>${es ? 'Cliente' : 'Client'}:</strong> ${escaparHTML(cliente) || 'General'}</p>
          <p><strong>${es ? 'Servicio' : 'Service'}:</strong> ${escaparHTML(servicio)}</p>
          <p><strong>${es ? 'Locación' : 'Location'}:</strong> ${
      ubicacion === 'estudio'
        ? es
          ? 'Estudio'
          : 'Studio'
        : es
        ? 'Exteriores'
        : 'Outdoors'
    }</p>
          <p><strong>${es ? 'Fotos entregadas' : 'Delivered photos'}:</strong> ${escaparHTML(fotosEntregadas)}</p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            ${fila(
              `${es ? 'Cobertura' : 'Coverage'} (${escaparHTML(horasEstimadas)} h × ${formatearMoneda(
                Number(precioHora) || 0,
                moneda
              )})`,
              formatearMoneda((Number(precioHora) || 0) * (Number(horasEstimadas) || 0), moneda)
            )}
            ${fila(
              es ? 'Viáticos / extras' : 'Travel / extras',
              formatearMoneda(Number(gastosViaticos) || 0, moneda)
            )}
            ${fila(
              es ? 'Recargo por locación' : 'Location surcharge',
              formatearMoneda(recargo, moneda)
            )}
            ${modoIVA !== 'sin' ? fila('Subtotal', formatearMoneda(subtotal, moneda)) : ''}
            ${
              modoIVA !== 'sin'
                ? fila(
                    `${nombreImpuesto} (${Number(tasaIVA) || 0}%)${
                      modoIVA === 'incluido' ? (es ? ' – incluido' : ' – included') : ''
                    }`,
                    formatearMoneda(iva, moneda)
                  )
                : ''
            }
            <tr>
              <td style="padding:12px 0;font-size:1.2em;"><strong>TOTAL</strong></td>
              <td style="padding:12px 0;font-size:1.2em;text-align:right;"><strong>${formatearMoneda(
                total,
                moneda
              )}</strong></td>
            </tr>
          </table>

          ${
            modoIVA === 'sin'
              ? `<p style="color:#666;font-size:0.85em;">${
                  es ? 'Precio sin impuestos.' : 'Price excludes taxes.'
                }</p>`
              : ''
          }
          <script>window.print();</script>
        </body>
      </html>
    `);
    ventana.document.close();
  };

  return (
    <div className="app-container">
      <header className="glass-header">
        <div className="logo-area">
          <span className="app-logo-badge">📷</span>
          <div className="brand-text">
            <h1 className="brand-title">{t.titulo}</h1>
            <span className="brand-sub">{t.subtitulo}</span>
          </div>
        </div>

        <div className="header-actions">
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Idioma / Language"
          >
            <option value="es">🇦🇷 ES</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          <button
            type="button"
            className={`btn-mode-toggle ${modoRojo ? 'active' : ''}`}
            onClick={() => setModoRojo((v) => !v)}
            title={modoRojo ? 'Cambiar a tema normal' : 'Cambiar a tema rojo'}
            aria-label={modoRojo ? 'Tema normal' : 'Tema rojo'}
          >
            {modoRojo ? '☀️' : '🔴'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeTab === 'ajustar' && (
          <Ajustes
            t={t}
            lang={lang}
            lugar={ctxToma.lugar}
            setLugar={handleCambiarLugarAjustes}
            camara={ctxToma.camara}
            setCamara={(camara) => setCtxToma((prev) => ({ ...prev, camara }))}
            lente={ctxToma.lente}
            setLente={(lente) => setCtxToma((prev) => ({ ...prev, lente }))}
            tipoFoto={ctxToma.tipoFoto}
            setTipoFoto={(tipoFoto) => setCtxToma((prev) => ({ ...prev, tipoFoto }))}
            tipoLuz={ctxToma.tipoLuz}
            setTipoLuz={(tipoLuz) => setCtxToma((prev) => ({ ...prev, tipoLuz }))}
            usaFlash={ctxToma.usaFlash}
            setUsaFlash={(usaFlash) => setCtxToma((prev) => ({ ...prev, usaFlash }))}
            configToma={ctxToma.configToma}
            setConfigToma={(configToma) => setCtxToma((prev) => ({ ...prev, configToma }))}
            onGuardar={handleGuardarToma}
            onIrBitacora={() => setActiveTab('registro')}
            onIrTablas={() => setActiveTab('calculos')}
            onIrPresupuesto={() => setActiveTab('negocio')}
          />
        )}

        {activeTab === 'calculos' && (
          <Tablas
            t={t}
            ctxToma={ctxToma}
            onAplicarAjuste={handleAplicarAjusteDesdeTabla}
            onVolverAjustes={() => setActiveTab('ajustar')}
          />
        )}

        {activeTab === 'registro' && (
          <Bitacora
            t={t}
            registros={registros}
            borrarRegistro={borrarRegistro}
            exportarExcel={exportarExcel}
            onVolverAjustes={() => setActiveTab('ajustar')}
            onUsarEnAjustes={handleUsarTomaEnAjustes}
            onIrPresupuesto={() => setActiveTab('negocio')}
          />
        )}

        {activeTab === 'negocio' && (
          <Presupuesto
            t={t}
            pais={pais} setPais={setPais}
            moneda={moneda} setMoneda={setMoneda}
            modoIVA={modoIVA} setModoIVA={setModoIVA}
            tasaIVA={tasaIVA} setTasaIVA={setTasaIVA}
            ubicacion={ubicacion} setUbicacion={setUbicacion}
            recargoEstudio={recargoEstudio} setRecargoEstudio={setRecargoEstudio}
            cliente={cliente} setCliente={setCliente}
            servicio={servicio} setServicio={setServicio}
            precioHora={precioHora} setPrecioHora={setPrecioHora}
            horasEstimadas={horasEstimadas} setHorasEstimadas={setHorasEstimadas}
            fotosEntregadas={fotosEntregadas} setFotosEntregadas={setFotosEntregadas}
            gastosViaticos={gastosViaticos} setGastosViaticos={setGastosViaticos}
            imprimirPresupuestoPDF={imprimirPresupuestoPDF}
            ctxToma={ctxToma}
            totalRegistros={registros.length}
            onIrAjustes={() => setActiveTab('ajustar')}
            onIrBitacora={() => setActiveTab('registro')}
          />
        )}

        {activeTab === 'datos' && (
          <Estado
            t={t}
            registros={registros}
            estadoServidor={estadoServidor}
            ctxToma={ctxToma}
            resumenPresupuesto={{ total, moneda, cliente, ubicacion }}
            onNavegar={setActiveTab}
            onLimpiarBitacora={limpiarBitacora}
          />
        )}
      </main>

      <nav className="bottom-nav">
        <button
          type="button"
          className={`nav-item ${activeTab === 'ajustar' ? 'active' : ''}`}
          onClick={() => setActiveTab('ajustar')}
        >
          <span className="nav-icon">🎯</span>
          <span className="nav-label">{t.ajustes}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'calculos' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculos')}
        >
          <span className="nav-icon">🧮</span>
          <span className="nav-label">{t.tablas}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'registro' ? 'active' : ''}`}
          onClick={() => setActiveTab('registro')}
        >
          <span className="nav-icon">📝</span>
          <span className="nav-label">{t.bitacora}</span>
          {registros.length > 0 && <span className="nav-badge-count">{registros.length}</span>}
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'negocio' ? 'active' : ''}`}
          onClick={() => setActiveTab('negocio')}
        >
          <span className="nav-icon">💼</span>
          <span className="nav-label">{t.presupuesto}</span>
        </button>

        <button
          type="button"
          className={`nav-item ${activeTab === 'datos' ? 'active' : ''}`}
          onClick={() => setActiveTab('datos')}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">{t.estado}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;