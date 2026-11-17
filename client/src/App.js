import React, { useState, useEffect } from 'react';
import { translations } from './translations/i18n';
import './App.css';

import Ajustes from './components/Ajustes';
import Tablas from './components/Tablas';
import Bitacora from './components/Bitacora';
import Presupuesto, { calcularPresupuesto, formatearMoneda, PAISES } from './components/Presupuesto';
import Estado from './components/Estado';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const escaparHTML = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'es');
  const [activeTab, setActiveTab] = useState('ajustar');
  const [modoRojo, setModoRojo] = useState(() => localStorage.getItem('modoRojo') === 'true');

  const [condicionLuz, setCondicionLuz] = useState('soleado');
  const [tecnica, setTecnica] = useState('retrato');
  const [tipoCamara, setTipoCamara] = useState('Full Frame (DSLR/Mirrorless)');
  const [lenteUsado, setLenteUsado] = useState('50mm f/1.8 (Fijo Retrato)');
  const [estadoServidor, setEstadoServidor] = useState('');
  const [nota, setNota] = useState('');
  const [registros, setRegistros] = useState([]);

  // Presupuesto
  const [pais, setPais] = useState('AR');
  const [moneda, setMoneda] = useState('ARS');
  const [modoIVA, setModoIVA] = useState('agregar');
  const [tasaIVA, setTasaIVA] = useState(21);
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('Sesión Fotográfica');
  const [ubicacion, setUbicacion] = useState('exteriores');
  const [precioHora, setPrecioHora] = useState(30);
  const [horasEstimadas, setHorasEstimadas] = useState(3);
  const [fotosEntregadas, setFotosEntregadas] = useState(25);
  const [gastosViaticos, setGastosViaticos] = useState(20);

  const t = translations[lang] || translations.es;

  // ===== TEMA: aplica data-theme al <html> =====
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', modoRojo ? 'red' : 'default');
    localStorage.setItem('modoRojo', String(modoRojo));
  }, [modoRojo]);

  // ===== IDIOMA: persiste =====
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const baseTecnicas = {
    retrato: {
      nombre: lang === 'es' ? 'Retrato Pro' : 'Pro Portrait',
      tomasRecomendadas: lang === 'es' ? '3 - 5 tomas' : '3 - 5 shots',
      luzIdeal: 'soleado',
      ajustes: {
        soleado: { f: 'f/2.8 - f/4', v: '1/1000s', iso: 'ISO 100', flash: 'TTL HSS a -1 EV con Softbox', tip: lang === 'es' ? 'Usa el flash en HSS como luz de relleno.' : 'Use HSS flash as fill light.' },
        nublado: { f: 'f/1.8 - f/2.8', v: '1/250s', iso: 'ISO 200', flash: 'Manual 1/32 con Paraguas', tip: lang === 'es' ? 'Flash suave lateral a 45°.' : 'Soft side flash at 45°.' },
        interior: { f: 'f/1.8 - f/2.8', v: '1/160s', iso: 'ISO 400', flash: 'Manual 1/16 rebotado', tip: lang === 'es' ? 'Rebota el flash al techo.' : 'Bounce flash to ceiling.' },
        noche: { f: 'f/1.4 - f/2.0', v: '1/60s', iso: 'ISO 1600', flash: 'Manual 1/64 (2ª cortinilla)', tip: lang === 'es' ? 'Congela sujeto y registra fondo.' : 'Freeze subject and capture background.' }
      }
    },
    paisaje: {
      nombre: lang === 'es' ? 'Paisajes' : 'Landscapes',
      tomasRecomendadas: lang === 'es' ? '1 - 3 tomas' : '1 - 3 shots',
      luzIdeal: 'soleado',
      ajustes: {
        soleado: { f: 'f/8 - f/11', v: '1/250s', iso: 'ISO 100', flash: lang === 'es' ? 'Desactivado (Luz Natural)' : 'Off (Natural Light)', tip: lang === 'es' ? 'Usa filtro polarizador.' : 'Use polarizing filter.' },
        nublado: { f: 'f/8', v: '1/125s', iso: 'ISO 200', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Aprovecha nubes dramáticas.' : 'Leverage dramatic clouds.' },
        interior: { f: 'f/8', v: '1/30s', iso: 'ISO 400', flash: 'Manual 1/8 rebotado', tip: lang === 'es' ? 'Trípode recomendado.' : 'Tripod recommended.' },
        noche: { f: 'f/2.8 - f/4', v: '15s - 25s', iso: 'ISO 1600', flash: 'Manual 1/128 (Light Painting)', tip: lang === 'es' ? 'Ilumina con destellos a mano.' : 'Illuminate with manual bursts.' }
      }
    },
    luna: {
      nombre: lang === 'es' ? 'Luna 🌙' : 'Moon 🌙',
      tomasRecomendadas: lang === 'es' ? '10 - 20 tomas' : '10 - 20 shots',
      luzIdeal: 'noche',
      ajustes: {
        noche: { f: 'f/8 - f/11', v: '1/125s - 1/250s', iso: 'ISO 100', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Si sale borrosa, subí la velocidad.' : 'If blurry, raise the shutter speed.' },
        soleado: { f: 'f/8 - f/11', v: '1/500s', iso: 'ISO 100', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Un polarizador mejora el contraste.' : 'A polarizer improves contrast.' }
      }
    },
    viaLactea: {
      nombre: lang === 'es' ? 'Vía Láctea ✨' : 'Milky Way ✨',
      tomasRecomendadas: lang === 'es' ? '10 - 30 tomas' : '10 - 30 shots',
      luzIdeal: 'noche',
      ajustes: {
        noche: { f: 'f/1.4 - f/2.8', v: '15s - 20s', iso: 'ISO 3200 - 6400', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Apertura máxima y trípode firme.' : 'Widest aperture and sturdy tripod.' }
      }
    },
    fuegos: {
      nombre: lang === 'es' ? 'Fuegos artificiales 🎆' : 'Fireworks 🎆',
      tomasRecomendadas: lang === 'es' ? '20 - 40 tomas' : '20 - 40 shots',
      luzIdeal: 'noche',
      ajustes: {
        noche: { f: 'f/8 - f/11', v: 'Bulb 2s - 6s', iso: 'ISO 100', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Modo Bulb durante la explosión.' : 'Bulb mode during the burst.' }
      }
    },
    agua: {
      nombre: lang === 'es' ? 'Agua sedosa 💧' : 'Silky Water 💧',
      tomasRecomendadas: lang === 'es' ? '3 - 6 tomas' : '3 - 6 shots',
      luzIdeal: 'nublado',
      ajustes: {
        nublado: { f: 'f/11 - f/16', v: '1/2s - 2s', iso: 'ISO 100', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Trípode y disparador remoto.' : 'Tripod and remote release.' },
        soleado: { f: 'f/16 - f/22', v: '1s - 2s con ND', iso: 'ISO 50 - 100', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Filtro ND de 6-10 pasos.' : '6-10 stop ND filter.' }
      }
    },
    accion: {
      nombre: lang === 'es' ? 'Deportes / Acción 🏃' : 'Sports / Action 🏃',
      tomasRecomendadas: lang === 'es' ? 'Ráfaga de 5 - 10' : 'Burst of 5 - 10',
      luzIdeal: 'soleado',
      ajustes: {
        soleado: { f: 'f/4 - f/5.6', v: '1/1000s - 1/2000s', iso: 'ISO 100 - 200', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Enfoque continuo (AF-C).' : 'Continuous AF (AF-C).' },
        nublado: { f: 'f/2.8 - f/4', v: '1/800s - 1/1000s', iso: 'ISO 400 - 800', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Abrí el diafragma.' : 'Open up the aperture.' },
        interior: { f: 'f/2.8', v: '1/500s', iso: 'ISO 3200 - 6400', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Prioriza velocidad.' : 'Prioritize speed.' },
        noche: { f: 'f/2.8', v: '1/500s', iso: 'ISO 6400 - 12800', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Dispara en RAW.' : 'Shoot RAW.' }
      }
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/saludo?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => setEstadoServidor(data.mensaje))
      .catch(() => setEstadoServidor(lang === 'es' ? 'Modo Local (PWA Offline)' : 'Local Mode (PWA Offline)'));
  }, [lang]);

  const registrarTomaDirecta = () => {
    const nuevaToma = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tecnica: datosTecnica.nombre.toUpperCase(),
      luz: condicionLuz.toUpperCase(),
      camara: tipoCamara,
      lente: lenteUsado,
      parametros: `${ajusteActual.f} | ${ajusteActual.v} | ${ajusteActual.iso}`,
      flash: ajusteActual.flash,
      tomas: datosTecnica.tomasRecomendadas,
      nota: nota || (lang === 'es' ? 'Toma optimizada' : 'Optimized shot')
    };
    setRegistros([nuevaToma, ...registros]);
    setNota('');
  };

  const borrarRegistro = (id) => {
    setRegistros(registros.filter(r => r.id !== id));
  };

  const exportarExcel = () => {
    if (registros.length === 0) return alert(lang === 'es' ? 'No hay tomas para exportar.' : 'No shots to export.');
    let csvContent = "data:text/csv;charset=utf-8,ID,Fecha,Hora,Tecnica,Luz,Camara,Lente,Parametros,Flash,TomasRecomendadas,Notas\n";
    registros.forEach(r => {
      csvContent += `"${r.id}","${r.fecha}","${r.hora}","${r.tecnica}","${r.luz}","${r.camara}","${r.lente}","${r.parametros}","${r.flash}","${r.tomas ?? r.tomas}","${r.nota}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Camera_Diary_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { subtotal, iva, total, recargo } = calcularPresupuesto({
    precioHora, horasEstimadas, gastosViaticos, ubicacion, modoIVA, tasaIVA,
  });

  const imprimirPresupuestoPDF = () => {
    const es = lang === 'es';
    const nombreImpuesto = (PAISES[pais] || PAISES.OTRO).impuesto;
    const fila = (a, b) =>
      `<tr><td style="padding:6px 0;border-bottom:1px solid #ddd;">${a}</td><td style="padding:6px 0;border-bottom:1px solid #ddd;text-align:right;">${b}</td></tr>`;

    const ventana = window.open('', '', 'width=800,height=600');
    if (!ventana) {
      return alert(es ? 'Permití las ventanas emergentes para generar el PDF.' : 'Allow pop-ups to generate the PDF.');
    }

    ventana.document.write(`
      <html>
        <head><title>${es ? 'Presupuesto' : 'Quote'}</title></head>
        <body style="font-family: Arial, sans-serif; padding: 30px; color: #111;">
          <h1 style="margin-bottom:4px;">${es ? 'PROPUESTA DE SERVICIO FOTOGRÁFICO' : 'PHOTOGRAPHY SERVICE PROPOSAL'}</h1>
          <p style="color:#666;margin-top:0;">${new Date().toLocaleDateString()}</p>

          <p><strong>${es ? 'Cliente' : 'Client'}:</strong> ${escaparHTML(cliente) || 'General'}</p>
          <p><strong>${es ? 'Servicio' : 'Service'}:</strong> ${escaparHTML(servicio)}</p>
          <p><strong>${es ? 'Locación' : 'Location'}:</strong> ${ubicacion === 'estudio' ? (es ? 'Estudio' : 'Studio') : (es ? 'Exteriores' : 'Outdoors')}</p>
          <p><strong>${es ? 'Fotos entregadas' : 'Delivered photos'}:</strong> ${escaparHTML(fotosEntregadas)}</p>

          <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            ${fila(`${es ? 'Cobertura' : 'Coverage'} (${escaparHTML(horasEstimadas)} h × ${formatearMoneda(Number(precioHora) || 0, moneda)})`, formatearMoneda((Number(precioHora) || 0) * (Number(horasEstimadas) || 0), moneda))}
            ${fila(es ? 'Viáticos / extras' : 'Travel / extras', formatearMoneda(Number(gastosViaticos) || 0, moneda))}
            ${fila(es ? 'Recargo por locación' : 'Location surcharge', formatearMoneda(recargo, moneda))}
            ${modoIVA !== 'sin' ? fila('Subtotal', formatearMoneda(subtotal, moneda)) : ''}
            ${modoIVA !== 'sin' ? fila(`${nombreImpuesto} (${Number(tasaIVA) || 0}%)${modoIVA === 'incluido' ? (es ? ' – incluido' : ' – included') : ''}`, formatearMoneda(iva, moneda)) : ''}
            <tr>
              <td style="padding:12px 0;font-size:1.2em;"><strong>TOTAL</strong></td>
              <td style="padding:12px 0;font-size:1.2em;text-align:right;"><strong>${formatearMoneda(total, moneda)}</strong></td>
            </tr>
          </table>

          ${modoIVA === 'sin' ? `<p style="color:#666;font-size:0.85em;">${es ? 'Precio sin impuestos.' : 'Price excludes taxes.'}</p>` : ''}
          <script>window.print();</script>
        </body>
      </html>
    `);
    ventana.document.close();
  };

  const datosTecnica = baseTecnicas[tecnica] || baseTecnicas.retrato;
  const ajusteActual =
    datosTecnica.ajustes[condicionLuz] ||
    datosTecnica.ajustes[datosTecnica.luzIdeal] ||
    datosTecnica.ajustes.soleado ||
    Object.values(datosTecnica.ajustes)[0];

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
            className={`btn-mode-toggle ${modoRojo ? 'active' : ''}`}
            onClick={() => setModoRojo(v => !v)}
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
            tipoCamara={tipoCamara} setTipoCamara={setTipoCamara}
            lenteUsado={lenteUsado} setLenteUsado={setLenteUsado}
            condicionLuz={condicionLuz} setCondicionLuz={setCondicionLuz}
            tecnica={tecnica} setTecnica={setTecnica}
            baseTecnicas={baseTecnicas}
            ajusteActual={ajusteActual}
            datosTecnica={datosTecnica}
            nota={nota} setNota={setNota}
            registrarTomaDirecta={registrarTomaDirecta}
          />
        )}

        {activeTab === 'calculos' && <Tablas t={t} />}

        {activeTab === 'registro' && (
          <Bitacora
            t={t}
            registros={registros}
            borrarRegistro={borrarRegistro}
            exportarExcel={exportarExcel}
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
            cliente={cliente} setCliente={setCliente}
            servicio={servicio} setServicio={setServicio}
            precioHora={precioHora} setPrecioHora={setPrecioHora}
            horasEstimadas={horasEstimadas} setHorasEstimadas={setHorasEstimadas}
            fotosEntregadas={fotosEntregadas} setFotosEntregadas={setFotosEntregadas}
            gastosViaticos={gastosViaticos} setGastosViaticos={setGastosViaticos}
            imprimirPresupuestoPDF={imprimirPresupuestoPDF}
          />
        )}

        {activeTab === 'datos' && (
          <Estado
            t={t}
            registros={registros}
            estadoServidor={estadoServidor}
          />
        )}
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeTab === 'ajustar' ? 'active' : ''}`}
          onClick={() => setActiveTab('ajustar')}
        >
          <span className="nav-icon">🎯</span>
          <span className="nav-label">{t.ajustes}</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'calculos' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculos')}
        >
          <span className="nav-icon">🧮</span>
          <span className="nav-label">{t.tablas}</span>
        </button>

        <button
          className={`nav-item ${activeTab === 'registro' ? 'active' : ''}`}
          onClick={() => setActiveTab('registro')}
        >
          <span className="nav-icon">📝</span>
          <span className="nav-label">{t.bitacora}</span>
          {registros.length > 0 && <span className="nav-badge-count">{registros.length}</span>}
        </button>

        <button
          className={`nav-item ${activeTab === 'negocio' ? 'active' : ''}`}
          onClick={() => setActiveTab('negocio')}
        >
          <span className="nav-icon">💼</span>
          <span className="nav-label">{t.presupuesto}</span>
        </button>

        <button
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