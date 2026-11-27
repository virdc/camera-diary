import React, { useState } from 'react';

export const TIPOS_CAMARA = [
  { id: 'smartphone_raw', nombre: 'Smartphone RAW' },
  { id: 'full_frame', nombre: 'Full Frame (FF)' },
  { id: 'aps_c', nombre: 'APS-C (DSLR / Mirrorless)' },
  { id: 'micro_4_3', nombre: 'Micro Cuatro Tercios (M4/3)' },
  { id: 'formato_medio', nombre: 'Formato Medio' },
  { id: 'compacta_bridge', nombre: 'Compacta / Bridge' },
  { id: 'analogica_film', nombre: 'Analógica / Film (35mm / 120)' },
];

export const LENTES_POR_CAMARA = {
  smartphone_raw: [
    { id: 'sin_lente_nativo', nombre: 'Cámara del celular (sin lente agregado)' },
    { id: 'principal_1x', nombre: 'Cámara principal nativa (1x / 24mm eq.)' },
    { id: 'gran_angular_05x', nombre: 'Ultra gran angular integrada (0.5x / 13mm eq.)' },
    { id: 'tele_zoom', nombre: 'Teleobjetivo integrado (2x / 3x / 5x)' },
    { id: 'macro_celular', nombre: 'Modo / lente macro del celular' },
    { id: 'lente_externo_clip', nombre: 'Lente externo acoplado (gran angular / tele / anamórfico)' },
  ],
  full_frame: [
    { id: '14mm', nombre: '14mm f/1.8 (Ultra gran angular)' },
    { id: '24mm', nombre: '24mm f/1.4' },
    { id: '35mm', nombre: '35mm f/1.4' },
    { id: '50mm', nombre: '50mm f/1.4 (Normal)' },
    { id: '85mm', nombre: '85mm f/1.4 (Retrato)' },
    { id: '24_70', nombre: '24-70mm f/2.8' },
    { id: '70_200', nombre: '70-200mm f/2.8 (Tele)' },
    { id: '150_600', nombre: '150-600mm / Supertele (Luna / Fauna)' },
    { id: '90_macro', nombre: '90mm / 100mm Macro' },
  ],
  aps_c: [
    { id: '16mm', nombre: '16mm f/1.4 (24mm eq.)' },
    { id: '23mm', nombre: '23mm f/1.4 (35mm eq.)' },
    { id: '35mm', nombre: '35mm f/1.4 (50mm eq.)' },
    { id: '56mm', nombre: '56mm f/1.2 (85mm eq. Retrato)' },
    { id: '18_55', nombre: '18-55mm / 17-50mm f/2.8' },
    { id: '55_250', nombre: '55-250mm / 70-300mm (Tele)' },
    { id: '60_macro', nombre: '60mm Macro' },
  ],
  micro_4_3: [
    { id: '12mm', nombre: '12mm f/1.4 (24mm eq.)' },
    { id: '17mm', nombre: '17mm f/1.8 (34mm eq.)' },
    { id: '25mm', nombre: '25mm f/1.4 (50mm eq.)' },
    { id: '42_5mm', nombre: '42.5mm f/1.2 (85mm eq. Retrato)' },
    { id: '12_40', nombre: '12-40mm f/2.8' },
    { id: '40_150', nombre: '40-150mm f/2.8 (80-300mm eq.)' },
    { id: '100_400', nombre: '100-400mm (200-800mm eq. Luna)' },
  ],
  formato_medio: [
    { id: '30mm', nombre: '30mm (Gran angular)' },
    { id: '45mm', nombre: '45mm / 55mm (Normal)' },
    { id: '80mm', nombre: '80mm f/1.9 (Estándar / Retrato)' },
    { id: '110mm', nombre: '110mm f/2 (Retrato)' },
    { id: '120mm_macro', nombre: '120mm Macro' },
  ],
  compacta_bridge: [
    { id: 'lente_integrado_fijo', nombre: 'Óptica fija integrada' },
    { id: 'zoom_optico_integrado', nombre: 'Zoom óptico integrado' },
    { id: 'adaptador_gran_angular', nombre: 'Adaptador gran angular' },
    { id: 'adaptador_tele', nombre: 'Adaptador teleobjetivo' },
  ],
  analogica_film: [
    { id: '28mm_film', nombre: '28mm (Calle / Paisaje)' },
    { id: '50mm_film', nombre: '50mm (Estándar)' },
    { id: '85mm_film', nombre: '85mm / 105mm (Retrato)' },
    { id: '135mm_film', nombre: '135mm / 200mm (Tele)' },
    { id: 'lente_nativo_120', nombre: 'Lente nativo de formato 120' },
  ],
};

export const CONFIGS_TIPO_FOTO = [
  {
    id: 'luna',
    nombre: 'Luna',
    icono: '🌕',
    apertura: 'f/8 - f/11',
    obturacion: '1/125s - 1/250s',
    iso: '100 - 200',
    enfoque: 'AF-S / Manual (MF) con Live View',
    medicion: 'Puntual (en la Luna)',
    wb: 'Luz de día (5200K - 5600K)',
    tip: 'La Luna está iluminada por el sol: no subas el ISO por ser de noche o se quema el detalle de cráteres. Usá trípode y disparador o temporizador.',
  },
  {
    id: 'retrato',
    nombre: 'Retrato',
    icono: ' portrait'.trim(),
    apertura: 'f/1.8 - f/2.8',
    obturacion: '1/160s - 1/250s',
    iso: '100 - 400',
    enfoque: 'AF-C al ojo (Eye-AF)',
    medicion: 'Matricial / Evaluativa',
    wb: 'Auto / Nublado (6000K) o Luz de flash',
    tip: 'Priorizá foco nítido en el ojo más cercano a la cámara y mantené velocidad suficiente para evitar trepidación.',
  },
  {
    id: 'paisaje',
    nombre: 'Paisaje',
    icono: '🏔️',
    apertura: 'f/8 - f/11',
    obturacion: '1/60s o trípode',
    iso: '64 - 200',
    enfoque: 'Hiperfocal / AF-S',
    medicion: 'Matricial / Evaluativa',
    wb: 'Luz de día (5200K - 5500K)',
    tip: 'Usá trípode si bajás la velocidad y evitá aperturas extremas como f/22 si notás difracción.',
  },
  {
    id: 'calle',
    nombre: 'Calle / Documental',
    icono: '🚶',
    apertura: 'f/4 - f/8',
    obturacion: '1/250s - 1/500s',
    iso: 'Auto (100 - 1600)',
    enfoque: 'AF-C / Zona o distancia hiperfocal',
    medicion: 'Matricial / Ponderada al centro',
    wb: 'Auto',
    tip: 'Con 1/250s o más congelás pasos y movimientos cotidianos sin perder profundidad de campo.',
  },
  {
    id: 'producto',
    nombre: 'Producto / Estudio',
    icono: '📦',
    apertura: 'f/8 - f/11',
    obturacion: '1/125s - 1/200s (sync flash)',
    iso: '64 - 100',
    enfoque: 'Manual (MF) o AF-S puntual',
    medicion: 'Puntual / Matricial',
    wb: 'Personalizado / Flash (5500K)',
    tip: 'Asegurate de no superar la velocidad máxima de sincronización de flash de tu cámara.',
  },
  {
    id: 'deporte',
    nombre: 'Deporte / Acción',
    icono: '⚡',
    apertura: 'f/2.8 - f/4',
    obturacion: '1/1000s - 1/2000s',
    iso: 'Auto (400 - 3200)',
    enfoque: 'AF-C seguimiento continuo',
    medicion: 'Matricial',
    wb: 'Auto / Luz de día',
    tip: 'Subí el ISO antes de bajar la velocidad por debajo de 1/500s si hay movimiento rápido.',
  },
  {
    id: 'macro',
    nombre: 'Macro / Detalle',
    icono: '🔍',
    apertura: 'f/8 - f/16',
    obturacion: '1/200s o flash difuso',
    iso: '100 - 400',
    enfoque: 'Manual (MF) acercando/alejando cuerpo',
    medicion: 'Puntual',
    wb: 'Luz de día / Flash',
    tip: 'A corta distancia la profundidad de campo es mínima; cerrá diafragma para ganar zona enfocable.',
  },
];

const getNombreCamara = (id) =>
  TIPOS_CAMARA.find((c) => c.id === id)?.nombre || id || '—';

const getNombreLente = (camaraId, lenteId) => {
  if (camaraId === 'smartphone_raw' && (!lenteId || lenteId === 'sin_lente_nativo')) {
    return 'Solo cámara del celular (sin lente agregado)';
  }
  const lista = LENTES_POR_CAMARA[camaraId] || [];
  return lista.find((l) => l.id === lenteId)?.nombre || lenteId || '—';
};

export default function Ajustes({
  t = {},
  camara = 'smartphone_raw',
  setCamara,
  lente = 'sin_lente_nativo',
  setLente,
  tipoFoto = 'retrato',
  setTipoFoto,
  configToma,
  setConfigToma,
  onAplicarPreset,
  onGuardar,
}) {
  const [presetSeleccionadoId, setPresetSeleccionadoId] = useState(
    CONFIGS_TIPO_FOTO.find((item) => item.id === tipoFoto)?.id || 'luna'
  );

  const lentesDisponibles = LENTES_POR_CAMARA[camara] || LENTES_POR_CAMARA.full_frame;
  const presetActivo =
    CONFIGS_TIPO_FOTO.find((item) => item.id === presetSeleccionadoId) || CONFIGS_TIPO_FOTO[0];

  const handleCamaraChange = (nuevaCamara) => {
    setCamara?.(nuevaCamara);
    const nuevosLentes = LENTES_POR_CAMARA[nuevaCamara] || [];
    if (nuevaCamara === 'smartphone_raw') {
      setLente?.('sin_lente_nativo');
    } else if (nuevosLentes.length > 0 && !nuevosLentes.some((item) => item.id === lente)) {
      setLente?.(nuevosLentes[0].id);
    }
  };

  const handleSeleccionarPreset = (preset) => {
    setPresetSeleccionadoId(preset.id);
    setTipoFoto?.(preset.id);
    if (typeof setConfigToma === 'function') {
      setConfigToma({
        apertura: preset.apertura,
        obturacion: preset.obturacion,
        iso: preset.iso,
        enfoque: preset.enfoque,
        medicion: preset.medicion,
        wb: preset.wb,
      });
    }
    onAplicarPreset?.(preset);
  };

  const valoresActuales = {
    apertura: configToma?.apertura ?? presetActivo.apertura,
    obturacion: configToma?.obturacion ?? presetActivo.obturacion,
    iso: configToma?.iso ?? presetActivo.iso,
    enfoque: configToma?.enfoque ?? presetActivo.enfoque,
    medicion: configToma?.medicion ?? presetActivo.medicion,
    wb: configToma?.wb ?? presetActivo.wb,
  };

  const handleCampoToma = (campo, valor) => {
    if (typeof setConfigToma === 'function') {
      setConfigToma({
        ...valoresActuales,
        [campo]: valor,
      });
    }
  };

  return (
    <div className="tab-pane animate-fade-in">
      {/* Tarjeta 1: Cámara y Lente */}
      <div className="glass-card">
        <h2 className="section-title">⚙️ {t.ajustesTitulo || 'Ajustes de equipo'}</h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">
              {t.equipoYOptica || '1. Tipo de cámara y lente'}
            </h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.tipoCamara || 'Tipo de cámara'}</label>
                <select
                  value={camara}
                  onChange={(e) => handleCamaraChange(e.target.value)}
                  className="modern-select"
                >
                  {TIPOS_CAMARA.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t.lente || 'Lente / Óptica'}</label>
                <select
                  value={lente}
                  onChange={(e) => setLente?.(e.target.value)}
                  className="modern-select"
                >
                  {lentesDisponibles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <small className="hint">
              {camara === 'smartphone_raw'
                ? 'En Smartphone RAW se usa la cámara del teléfono; dejá "Cámara del celular (sin lente agregado)" si no colocaste ningún lente extra.'
                : 'Seleccioná el tipo de cámara y la lente o distancia focal que vas a usar.'}
            </small>

            <div className="param-item">
              <span className="param-label">Equipo activo</span>
              <span className="param-value">{getNombreCamara(camara)}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Óptica</span>
              <span className="param-value">{getNombreLente(camara, lente)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta 2: Configuración según tipo de foto y tomas especiales */}
      <div className="glass-card">
        <h2 className="section-title">
          🎯 {t.configsPorTipoFoto || 'Configuración según tipo de foto'}
        </h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">
              2. Elegí el tipo de foto o toma especial (Luna, Retrato, etc.)
            </h3>

            <div className="btn-toggle-group">
              {CONFIGS_TIPO_FOTO.map((preset) => {
                const activo = preset.id === presetActivo.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    className={`btn-toggle ${activo ? 'active' : ''}`}
                    onClick={() => handleSeleccionarPreset(preset)}
                  >
                    {preset.icono ? `${preset.icono} ` : ''}
                    {preset.nombre}
                  </button>
                );
              })}
            </div>

            <small className="hint">
              <strong>Consejo para {presetActivo.nombre}:</strong> {presetActivo.tip}
            </small>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">
              3. Valores de referencia para {presetActivo.nombre}
            </h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label>Apertura / Diafragma</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.apertura}
                  onChange={(e) => handleCampoToma('apertura', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Velocidad de obturación</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.obturacion}
                  onChange={(e) => handleCampoToma('obturacion', e.target.value)}
                />
              </div>
            </div>

            <div className="grid-inputs">
              <div className="form-group">
                <label>ISO recomendado</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.iso}
                  onChange={(e) => handleCampoToma('iso', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Balance de blancos (WB)</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.wb}
                  onChange={(e) => handleCampoToma('wb', e.target.value)}
                />
              </div>
            </div>

            <div className="grid-inputs">
              <div className="form-group">
                <label>Modo de enfoque</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.enfoque}
                  onChange={(e) => handleCampoToma('enfoque', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Medición de luz</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.medicion}
                  onChange={(e) => handleCampoToma('medicion', e.target.value)}
                />
              </div>
            </div>
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