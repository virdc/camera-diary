import React, { useState, useEffect } from 'react';
import { translations } from './translations/i18n';
import './App.css';

import Ajustes from './components/Ajustes';
import Tablas from './components/Tablas';
import Bitacora from './components/Bitacora';
import Presupuesto from './components/Presupuesto';
import Estado from './components/Estado';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [lang, setLang] = useState('es');
  const [activeTab, setActiveTab] = useState('ajustar');
  const [modoRojo, setModoRojo] = useState(false);

  const [condicionLuz, setCondicionLuz] = useState('soleado');
  const [tecnica, setTecnica] = useState('retrato');
  const [tipoCamara, setTipoCamara] = useState('Full Frame (DSLR/Mirrorless)');
  const [lenteUsado, setLenteUsado] = useState('50mm f/1.8 (Fijo Retrato)');
  const [estadoServidor, setEstadoServidor] = useState('');
  const [nota, setNota] = useState('');
  const [registros, setRegistros] = useState([]);

  const [moneda, setMoneda] = useState('USD');
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('Sesión Fotográfica');
  const [ubicacion, setUbicacion] = useState('exteriores');
  const [precioHora, setPrecioHora] = useState(30);
  const [horasEstimadas, setHorasEstimadas] = useState(3);
  const [fotosEntregadas, setFotosEntregadas] = useState(25);
  const [gastosViaticos, setGastosViaticos] = useState(20);

  const t = translations[lang] || translations.es;

  const baseTecnicas = {
    retrato: {
      nombre: lang === 'es' ? 'Retrato Pro' : 'Pro Portrait',
      tomasRecomendadas: lang === 'es' ? '3 - 5 tomas' : '3 - 5 shots',
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
      ajustes: {
        soleado: { f: 'f/8 - f/11', v: '1/250s', iso: 'ISO 100', flash: lang === 'es' ? 'Desactivado (Luz Natural)' : 'Off (Natural Light)', tip: lang === 'es' ? 'Usa filtro polarizador.' : 'Use polarizing filter.' },
        nublado: { f: 'f/8', v: '1/125s', iso: 'ISO 200', flash: lang === 'es' ? 'Desactivado' : 'Off', tip: lang === 'es' ? 'Aprovecha nubes dramáticas.' : 'Leverage dramatic clouds.' },
        interior: { f: 'f/8', v: '1/30s', iso: 'ISO 400', flash: 'Manual 1/8 rebotado', tip: lang === 'es' ? 'Trípode recomendado.' : 'Tripod recommended.' },
        noche: { f: 'f/2.8 - f/4', v: '15s - 25s', iso: 'ISO 1600', flash: 'Manual 1/128 (Light Painting)', tip: lang === 'es' ? 'Ilumina con destellos a mano.' : 'Illuminate with manual bursts.' }
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
      csvContent += `"${r.id}","${r.fecha}","${r.hora}","${r.tecnica}","${r.luz}","${r.camara}","${r.lente}","${r.parametros}","${r.flash}","${r.tomas}","${r.nota}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Camera_Diary_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const recargoUbicacion = ubicacion === 'estudio' ? 40 : 15;
  const presupuestoTotal = (Number(precioHora) * Number(horasEstimadas)) + Number(gastosViaticos) + recargoUbicacion;

  const imprimirPresupuestoPDF = () => {
    const ventana = window.open('', '', 'width=800,height=600');
    ventana.document.write(`
      <html>
        <head><title>Presupuesto</title></head>
        <body style="font-family: Arial; padding: 20px;">
          <h1>${lang === 'es' ? 'PROPUESTA DE SERVICIO FOTOGRÁFICO' : 'PHOTOGRAPHY SERVICE PROPOSAL'}</h1>
          <p><strong>Cliente:</strong> ${cliente || 'General'}</p>
          <p><strong>Total:</strong> ${presupuestoTotal} ${moneda}</p>
          <script>window.print();</script>
        </body>
      </html>
    `);
    ventana.document.close();
  };

  const datosTecnica = baseTecnicas[tecnica] || baseTecnicas.retrato;
  const ajusteActual = datosTecnica.ajustes[condicionLuz] || datosTecnica.ajustes.soleado;

  return (
    <div className={`app-container ${modoRojo ? 'dark-red-mode' : ''}`}>
      <header className="main-header glass-header">
        <div className="logo-area">
          <span className="app-logo-badge">📷</span>
          <div>
            <h1 className="brand-title">{t.titulo}</h1>
            <span className="brand-sub">{t.subtitulo}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            style={{ background: '#1e293b', color: '#fff', border: '1px solid #334155', padding: '5px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}
          >
            <option value="es">🇦🇷 ES</option>
            <option value="en">🇺🇸 EN</option>
          </select>

          <button 
            className={`btn-mode-toggle ${modoRojo ? 'active' : ''}`} 
            onClick={() => setModoRojo(!modoRojo)}
          >
            {modoRojo ? '☀️ Normal' : '🔴 Rojo'}
          </button>
        </div>
      </header>

      <main className="content-area">
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
            moneda={moneda} setMoneda={setMoneda}
            ubicacion={ubicacion} setUbicacion={setUbicacion}
            cliente={cliente} setCliente={setCliente}
            servicio={servicio} setServicio={setServicio}
            precioHora={precioHora} setPrecioHora={setPrecioHora}
            horasEstimadas={horasEstimadas} setHorasEstimadas={setHorasEstimadas}
            fotosEntregadas={fotosEntregadas} setFotosEntregadas={setFotosEntregadas}
            gastosViaticos={gastosViaticos} setGastosViaticos={setGastosViaticos}
            presupuestoTotal={presupuestoTotal}
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

      <nav className="bottom-nav-bar">
        <button className={`nav-item ${activeTab === 'ajustar' ? 'active' : ''}`} onClick={() => setActiveTab('ajustar')}>
          <span className="nav-icon">🎯</span>
          <span className="nav-label">{t.ajustes}</span>
        </button>

        <button className={`nav-item ${activeTab === 'calculos' ? 'active' : ''}`} onClick={() => setActiveTab('calculos')}>
          <span className="nav-icon">🧮</span>
          <span className="nav-label">{t.tablas}</span>
        </button>

        <button className={`nav-item ${activeTab === 'registro' ? 'active' : ''}`} onClick={() => setActiveTab('registro')}>
          <span className="nav-icon">📝</span>
          <span className="nav-label">{t.bitacora}</span>
          {registros.length > 0 && <span className="nav-badge-count">{registros.length}</span>}
        </button>

        <button className={`nav-item ${activeTab === 'negocio' ? 'active' : ''}`} onClick={() => setActiveTab('negocio')}>
          <span className="nav-icon">💼</span>
          <span className="nav-label">{t.presupuesto}</span>
        </button>

        <button className={`nav-item ${activeTab === 'datos' ? 'active' : ''}`} onClick={() => setActiveTab('datos')}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">{t.estado}</span>
        </button>
      </nav>
    </div>
  );
}

export default App;