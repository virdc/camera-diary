import React from 'react';

export const CAMARAS = [
  { id: 'smartphone_raw', nombre: 'Smartphone RAW' },
  { id: 'dslr_aps_c', nombre: 'DSLR / Mirrorless APS-C' },
  { id: 'full_frame', nombre: 'Full Frame' },
  { id: 'micro_4_3', nombre: 'Micro Cuatro Tercios' },
];

export const LENTES_SMARTPHONE = [
  { id: 'celular_nativo', nombre: 'Cámara del celular (sin lente agregado)' },
  { id: 'principal_1x', nombre: 'Principal / Gran angular nativo (1x)' },
  { id: 'ultra_gran_angular', nombre: 'Ultra gran angular (0.5x / 0.6x)' },
  { id: 'teleobjetivo', nombre: 'Teleobjetivo integrado (2x / 3x / 5x)' },
  { id: 'lente_externo', nombre: 'Lente externo acoplado (clip / rosca)' },
];

export const LENTES_CAMARA = [
  { id: '24mm', nombre: '24mm' },
  { id: '35mm', nombre: '35mm' },
  { id: '50mm', nombre: '50mm (Prime)' },
  { id: '85mm', nombre: '85mm (Retrato)' },
  { id: '24_70mm', nombre: '24-70mm f/2.8' },
  { id: '70_200mm', nombre: '70-200mm f/2.8' },
];

const obtenerNombreLente = (camaraId, lenteId) => {
  if (!lenteId) return '—';
  if (camaraId === 'smartphone_raw' && lenteId === 'celular_nativo') {
    return 'Solo cámara del celular';
  }
  const lista = camaraId === 'smartphone_raw' ? LENTES_SMARTPHONE : LENTES_CAMARA;
  const encontrada = lista.find((item) => item.id === lenteId);
  return encontrada ? encontrada.nombre : lenteId;
};

const obtenerNombreCamara = (camaraId) => {
  if (!camaraId) return '—';
  const encontrada = CAMARAS.find((item) => item.id === camaraId);
  return encontrada ? encontrada.nombre : camaraId;
};

export default function Ajustes({
  t = {},
  camara = 'smartphone_raw',
  setCamara,
  lente = 'celular_nativo',
  setLente,
  isoBase = '100',
  setIsoBase,
  onGuardar,
}) {
  const esSmartphone = camara === 'smartphone_raw';
  const opcionesLente = esSmartphone ? LENTES_SMARTPHONE : LENTES_CAMARA;

  const handleCamaraChange = (nuevaCamara) => {
    setCamara?.(nuevaCamara);
    if (nuevaCamara === 'smartphone_raw') {
      setLente?.('celular_nativo');
    } else if (LENTES_SMARTPHONE.some((item) => item.id === lente)) {
      setLente?.('50mm');
    }
  };

  return (
    <div className="tab-pane animate-fade-in">
      <div className="glass-card">
        <h2 className="section-title">⚙️ {t.ajustesTitulo || 'Ajustes'}</h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">
              {t.equipoFotografico || '1. Equipo y óptica'}
            </h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.camara || 'Cámara'}</label>
                <select
                  value={camara}
                  onChange={(e) => handleCamaraChange(e.target.value)}
                  className="modern-select"
                >
                  {CAMARAS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.lente || 'Lente'}</label>
                <select
                  value={lente}
                  onChange={(e) => setLente?.(e.target.value)}
                  className="modern-select"
                >
                  {opcionesLente.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <small className="hint">
              {esSmartphone
                ? (t.ayudaSmartphoneLente ||
                    'En Smartphone RAW se usa la cámara del celular; dejá "Cámara del celular (sin lente agregado)" si no le sumaste óptica externa.')
                : (t.ayudaLenteCamara ||
                    'Elegí la distancia focal o zoom que vas a utilizar en la sesión.')}
            </small>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">
              {t.parametrosBase || '2. Parámetros base'}
            </h3>

            <div className="param-item">
              <span className="param-label">{t.camara || 'Cámara'}</span>
              <span className="param-value">{obtenerNombreCamara(camara)}</span>
            </div>

            <div className="param-item">
              <span className="param-label">{t.lente || 'Lente'}</span>
              <span className="param-value">
                {esSmartphone && lente === 'celular_nativo'
                  ? (t.sinLenteAgregado || 'Solo cámara del celular')
                  : obtenerNombreLente(camara, lente)}
              </span>
            </div>

            {typeof setIsoBase === 'function' && (
              <div className="form-group">
                <label>{t.isoBase || 'ISO base'}</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  inputMode="numeric"
                  className="modern-input"
                  value={isoBase}
                  onChange={(e) => setIsoBase(e.target.value)}
                />
              </div>
            )}
          </div>

          {typeof onGuardar === 'function' && (
            <div className="actions-bar">
              <button type="button" className="btn-save" onClick={onGuardar}>
                💾 {t.guardar || 'Guardar ajustes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}