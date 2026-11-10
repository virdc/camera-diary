import React from 'react';

export default function Ajustes({ 
  t,
  tipoCamara, setTipoCamara, 
  lenteUsado, setLenteUsado, 
  condicionLuz, setCondicionLuz, 
  tecnica, setTecnica, 
  baseTecnicas, 
  ajusteActual, 
  datosTecnica, 
  nota, setNota, 
  registrarTomaDirecta 
}) {
  const luces = [
    { id: 'soleado', label: t.solDirecto, icon: '☀️' },
    { id: 'nublado', label: t.nubladoSombra, icon: '☁️' },
    { id: 'interior', label: t.interiorLuz, icon: '💡' },
    { id: 'noche', label: t.nocturnaNeon, icon: '🌙' }
  ];

  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card equipment-section">
        <h3 className="section-title">📷 {t.equipo}</h3>
        <div className="grid-inputs">
          <div className="form-group">
            <label>{t.camara}</label>
            <div className="select-wrapper">
              <select value={tipoCamara} onChange={(e) => setTipoCamara(e.target.value)} className="modern-select">
                <option value="Full Frame (DSLR/Mirrorless)">📷 Full Frame (35mm)</option>
                <option value="APS-C / Recorte (Crop Sensor)">📸 APS-C / Crop Sensor</option>
                <option value="Micro 4/3">🎥 Micro 4/3</option>
                <option value="Formato Medio">🖼️ Formato Medio Pro</option>
                <option value="Cámara de Smartphone Pro">📱 Smartphone RAW (Modo Pro)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t.lente}</label>
            <div className="select-wrapper">
              <select value={lenteUsado} onChange={(e) => setLenteUsado(e.target.value)} className="modern-select">
                <option value="50mm f/1.8 (Fijo Retrato)">🎯 50mm f/1.8 (Lente Fijo)</option>
                <option value="85mm f/1.4 (Fijo Tele Corto)">👤 85mm f/1.4 (Retrato Pro)</option>
                <option value="35mm f/1.4 (Fijo Angular)">🌆 35mm f/1.4 (Callejero)</option>
                <option value="24-70mm f/2.8 (Zoom Todoterreno)">🔄 24-70mm f/2.8 (Zoom Todoterreno)</option>
                <option value="70-200mm f/2.8 (Teleobjetivo)">🔭 70-200mm f/2.8 (Tele Zoom)</option>
                <option value="100mm f/2.8 (Macro)">🔍 100mm f/2.8 Macro (1:1)</option>
                <option value="14-24mm f/2.8 (Gran Angular)">🏔️ 14-24mm Gran Angular</option>
                <option value="150-600mm (Super Tele Aves/Fauna)">🦅 150-600mm Super Tele</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="section-block">
        <h4 className="sub-title">{t.luzAmbiente}</h4>
        <div className="cards-grid-4">
          {luces.map((item) => (
            <button
              key={item.id}
              className={`light-card ${condicionLuz === item.id ? 'active' : ''}`}
              onClick={() => setCondicionLuz(item.id)}
            >
              <span className="light-icon">{item.icon}</span>
              <span className="light-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="section-block">
        <h4 className="sub-title">{t.tecnicaEscena}</h4>
        <div className="chips-scroll-container">
          {Object.keys(baseTecnicas).map((key) => (
            <button 
              key={key} 
              className={`modern-chip ${tecnica === key ? 'active' : ''}`}
              onClick={() => setTecnica(key)}
            >
              {baseTecnicas[key].nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card readout-hero-card">
        <div className="readout-header">
          <div>
            <span className="badge-category">{datosTecnica.nombre.toUpperCase()}</span>
            <h2 className="hero-title">{t.parametrosIdeales}</h2>
          </div>
          <span className="tomas-badge">📸 {datosTecnica.tomasRecomendadas}</span>
        </div>

        <div className="exposure-grid">
          <div className="readout-item">
            <span className="readout-label">{t.apertura}</span>
            <span className="readout-value highlight-cyan">{ajusteActual.f}</span>
            <span className="readout-sub">Diafragma (f)</span>
          </div>
          <div className="readout-item">
            <span className="readout-label">{t.velocidad}</span>
            <span className="readout-value highlight-orange">{ajusteActual.v}</span>
            <span className="readout-sub">Obturación (s)</span>
          </div>
          <div className="readout-item">
            <span className="readout-label">{t.sensibilidad}</span>
            <span className="readout-value highlight-green">{ajusteActual.iso}</span>
            <span className="readout-sub">ISO</span>
          </div>
        </div>

        <div className="flash-banner">
          <span className="flash-icon">⚡</span>
          <div>
            <strong>{t.configFlash}</strong>
            <p>{ajusteActual.flash}</p>
          </div>
        </div>

        <div className="tip-banner">
          <span className="tip-icon">💡</span>
          <p><strong>{t.tecnicaCeroEdicion}</strong> {ajusteActual.tip}</p>
        </div>

        <div className="action-box">
          <input 
            type="text" 
            className="modern-input"
            placeholder={t.notaPlaceholder} 
            value={nota} 
            onChange={(e) => setNota(e.target.value)}
          />
          <button className="btn-hero-action" onClick={registrarTomaDirecta}>
            <span>{t.guardarToma}</span>
          </button>
        </div>
      </div>
    </div>
  );
}