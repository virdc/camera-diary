import React, { useState } from 'react';

export const TIPOS_CAMARA = [
  { id: 'smartphone_raw', nombre: 'Smartphone RAW' },
  { id: 'dslr_aps_c', nombre: 'DSLR / Mirrorless APS-C' },
  { id: 'full_frame', nombre: 'Full Frame' },
  { id: 'micro_4_3', nombre: 'Micro Cuatro Tercios' },
  { id: 'formato_medio', nombre: 'Formato Medio' },
  { id: 'compacta_bridge', nombre: 'Compacta / Bridge' },
  { id: 'analogica_film', nombre: 'Analógica / Film' },
];

export const LENTES_COMUNES = [
  { id: '35mm_fijo', nombre: '35mm fijo' },
  { id: '55mm_fijo', nombre: '55mm fijo' },
  { id: 'lente_kit', nombre: 'Lente del kit (18-55mm)' },
  { id: 'tele_70_300', nombre: '70-300mm (Tele)' },
];

export const LENTES_SMARTPHONE = [
  { id: 'sin_lente_agregado', nombre: 'Sin lente agregado (cámara nativa del celular)' },
  { id: 'con_lente_agregado', nombre: 'Con lente agregado (gran angular / macro / tele)' },
  { id: '35mm_fijo', nombre: '35mm fijo (equivalente)' },
  { id: '55mm_fijo', nombre: '55mm fijo (equivalente)' },
  { id: 'lente_kit', nombre: 'Lente del kit / modo zoom estándar' },
  { id: 'tele_70_300', nombre: '70-300mm (equivalente / tele acoplado)' },
];

export const LENTES_POR_CAMARA = {
  smartphone_raw: LENTES_SMARTPHONE,
  dslr_aps_c: LENTES_COMUNES,
  full_frame: LENTES_COMUNES,
  micro_4_3: LENTES_COMUNES,
  formato_medio: LENTES_COMUNES,
  compacta_bridge: LENTES_COMUNES,
  analogica_film: LENTES_COMUNES,
};

export const FORMAS_SMARTPHONE = [
  {
    id: 'sin_lente',
    titulo: 'Sin lente agregado (cámara nativa)',
    formasSacar: [
      'Cámara principal 1x en RAW/DNG: encuadre natural, mayor rango dinámico y mejor detalle en luz media/baja.',
      'Modo retrato / 2x con distancia media: separá el sujeto del fondo alejándote un poco y evitando pegar la cara a la lente.',
      'Trípode + temporizador o disparador: clave en tomas nocturnas, arquitectura o detalle sin trepidación.',
    ],
    config: {
      apertura: 'f/1.7 - f/2.2 (fija del sensor nativo)',
      obturacion: '1/125s - 1/500s (1/60s+ en trípode)',
      iso: 'ISO 50 - 200 (evitar ISO alto en RAW)',
      enfoque: 'AF-S puntual / toque en el sujeto o MF',
      medicion: 'Puntual / Matricial en luces altas',
      wb: '5200K - 5600K o Flash 5500K',
      flash: 'Luz continua suave o flash externo rebotado/difundido (evitar flash directo duro)',
    },
  },
  {
    id: 'con_lente',
    titulo: 'Con lente agregado (clip / rosca / adaptador)',
    formasSacar: [
      'Gran angular / 35mm acoplado: espacios reducidos, escenas completas o encuadres ambientales controlando bordes.',
      '55mm / Tele 70-300mm acoplado: retratos más comprimidos y detalles a distancia cuidando el apoyo.',
      'Lente macro acoplado: acercamiento cercano con foco manual o distancia fija sin forzar el zoom digital.',
    ],
    config: {
      apertura: 'f/2 - f/4 (según óptica acoplada)',
      obturacion: '1/200s - 1/500s (más rápido en tele para evitar trepidación)',
      iso: 'ISO 50 - 400',
      enfoque: 'MF / AF puntual al centro (evitar bordes si hay curvatura)',
      medicion: 'Puntual / Ponderada al centro',
      wb: '5200K - 5600K o Flash 5500K',
      flash: 'Flash externo / luz LED lateral (evitar que el lente o el aro hagan sombra)',
    },
  },
];

export const TIPOS_LUZ = [
  { id: 'flash_estudio', nombre: 'Flash de estudio (Strobe)', wbRef: '5500K' },
  { id: 'luz_continua_estudio', nombre: 'Luz continua de estudio (LED)', wbRef: '5200K - 5600K' },
  { id: 'flash_camara', nombre: 'Flash en cámara / Speedlight', wbRef: '5500K' },
  { id: 'luz_mixta_estudio', nombre: 'Luz mixta en estudio', wbRef: '4500K - 5500K' },
];

export const CONFIGS_TIPO_FOTO = [
  {
    id: 'barrido',
    nombre: 'Barrido (Panning)',
    icono: '🏎️',
    apertura: 'f/8 - f/16',
    obturacion: '1/15s - 1/60s',
    iso: '64 - 200',
    enfoque: 'AF-C / Seguimiento continuo',
    medicion: 'Matricial / Evaluativa',
    wb: '5200K - 5500K',
    tip: 'Seguí el movimiento parejo del sujeto y usá 2ª cortina si sumás flash.',
  },
  {
    id: 'luna',
    nombre: 'Luna',
    icono: '🌕',
    apertura: 'f/8 - f/11',
    obturacion: '1/125s - 1/250s',
    iso: '100 - 200',
    enfoque: 'MF con Live View / AF-S puntual',
    medicion: 'Puntual sobre la Luna',
    wb: '5200K - 5600K',
    tip: 'Exponé para la Luna y usá trípode + disparador/temporizador.',
  },
  {
    id: 'retrato',
    nombre: 'Retrato',
    icono: '👤',
    apertura: 'f/2.8 - f/5.6',
    obturacion: '1/125s - 1/200s',
    iso: '100 - 400',
    enfoque: 'AF-C al ojo / AF-S puntual',
    medicion: 'Matricial / Puntual',
    wb: '5500K (Flash) / 5200K - 5600K',
    tip: 'Foco en el ojo más cercano y modificador suave para piel.',
  },
  {
    id: 'paisaje',
    nombre: 'Paisaje / Escenografía',
    icono: '🏔️',
    apertura: 'f/8 - f/11',
    obturacion: '1/60s - 1/125s (o trípode)',
    iso: '64 - 200',
    enfoque: 'Hiperfocal / AF-S',
    medicion: 'Matricial / Evaluativa',
    wb: '5200K - 5500K',
    tip: 'Buscá profundidad de campo pareja de adelante hacia atrás.',
  },
  {
    id: 'producto',
    nombre: 'Producto',
    icono: '📦',
    apertura: 'f/8 - f/16',
    obturacion: '1/125s - 1/200s',
    iso: '64 - 100',
    enfoque: 'MF / AF-S puntual',
    medicion: 'Puntual / Matricial',
    wb: '5500K',
    tip: 'Controlá reflejos y brillos con difusores o banderas.',
  },
  {
    id: 'deporte',
    nombre: 'Acción / Movimiento',
    icono: '⚡',
    apertura: 'f/4 - f/8',
    obturacion: '1/200s (sync) o 1/1000s+',
    iso: '200 - 1600',
    enfoque: 'AF-C seguimiento continuo',
    medicion: 'Matricial',
    wb: '5500K',
    tip: 'Con flash en estudio respetá la velocidad máxima de sincronización.',
  },
  {
    id: 'macro',
    nombre: 'Macro / Detalle',
    icono: '🔍',
    apertura: 'f/8 - f/16',
    obturacion: '1/125s - 1/200s',
    iso: '100 - 400',
    enfoque: 'MF / AF puntual',
    medicion: 'Puntual',
    wb: '5500K',
    tip: 'Cerrá diafragma para ganar zona nítida en detalles chicos.',
  },
];

const getNombreCamara = (id) =>
  TIPOS_CAMARA.find((c) => c.id === id)?.nombre || id || '—';

const getNombreLente = (camaraId, lenteId) => {
  const lista = LENTES_POR_CAMARA[camaraId] || LENTES_COMUNES;
  return lista.find((l) => l.id === lenteId)?.nombre || lenteId || '—';
};

const getNombreLuz = (luzId) =>
  TIPOS_LUZ.find((item) => item.id === luzId)?.nombre || luzId || '—';

function getConfigCombinada({ camara, lente, tipoFoto, tipoLuz, usaFlash }) {
  const esSmartphone = camara === 'smartphone_raw';
  const esTele = lente === 'tele_70_300';
  const esFijo55 = lente === '55mm_fijo';
  const esFijo35 = lente === '35mm_fijo';
  const esKit = lente === 'lente_kit';

  let aperturaSugerida =
    tipoFoto === 'retrato'
      ? esFijo55
        ? 'f/2.8 - f/4'
        : esFijo35
        ? 'f/2.8 - f/5.6'
        : esKit
        ? 'f/4 - f/5.6'
        : 'f/4 - f/5.6'
      : tipoFoto === 'barrido' || tipoFoto === 'luna' || tipoFoto === 'paisaje' || tipoFoto === 'producto' || tipoFoto === 'macro'
      ? 'f/8 - f/11'
      : 'f/4 - f/8';

  if (esSmartphone) {
    aperturaSugerida =
      lente === 'sin_lente_agregado'
        ? 'Nativa del celular (f/1.7 - f/2.2)'
        : 'Óptica acoplada (f/2 - f/5.6)';
  }

  let obturacionSugerida =
    tipoFoto === 'barrido'
      ? '1/15s - 1/60s'
      : tipoFoto === 'luna'
      ? '1/125s - 1/250s'
      : esTele
      ? '1/200s - 1/320s (cuidado con trepidación)'
      : '1/125s - 1/200s (sync estudio)';

  if (esSmartphone && lente === 'sin_lente_agregado') {
    obturacionSugerida = tipoFoto === 'barrido' ? '1/30s - 1/60s' : '1/125s - 1/500s';
  }

  const flashConfig = !usaFlash
    ? {
        estado: 'Sin flash (Estudio)',
        modo: tipoLuz === 'luz_continua_estudio' ? 'Luz continua LED' : 'Luz disponible de estudio',
        potencia: 'Ajustar intensidad de luz continua + ISO/velocidad',
        modificador: esFijo35 || esKit ? 'Panel LED / softbox amplio' : 'Softbox / octabox dirigido',
        nota: 'En estudio sin flash, controlá el movimiento cuidando la velocidad de obturación y usá trípode si bajás la velocidad.',
      }
    : esSmartphone
    ? {
        estado: 'Con flash / luz de apoyo (Smartphone RAW)',
        modo: lente === 'sin_lente_agregado' ? 'Luz continua o flash externo difuso' : 'Flash externo / LED lateral (sin tapar lente)',
        potencia: lente === 'sin_lente_agregado' ? 'Suave / baja (-1 a -1.5 EV)' : 'Baja a media (evitar sombras del clip)',
        modificador: 'Difusor / softbox chico',
        nota:
          lente === 'sin_lente_agregado'
            ? 'Sin lente agregado: evitá el flash directo duro del celular y priorizá luz continua o difusa.'
            : 'Con lente agregado: verificá que el accesorio acoplado no genere sombra sobre el encuadre.',
      }
    : {
        estado: `Con flash (${getNombreLuz(tipoLuz)})`,
        modo: tipoFoto === 'barrido' ? 'Manual (M) + 2ª cortina' : 'Manual (M) o TTL de estudio',
        potencia:
          esTele
            ? '1/4 - 1/1 (mayor distancia en 70-300mm)'
            : esFijo55 || esFijo35
            ? '1/8 - 1/2 según distancia y apertura'
            : '1/8 - 1/4 (18-55mm kit en estudio)',
        modificador:
          esTele
            ? 'Reflector / snoot / octabox concentrado'
            : esFijo35 || esKit
            ? 'Softbox / octabox mediano-grande'
            : 'Octabox / softbox para retrato o producto',
        nota: `Combinación activa en Estudio: ${getNombreCamara(camara)} + ${getNombreLente(camara, lente)} + ${tipoFoto}. Mantené la velocidad dentro de la sincronización del flash.`,
      };

  return {
    aperturaSugerida,
    obturacionSugerida,
    flashConfig,
  };
}

export default function Ajustes({
  t = {},
  camara = 'dslr_aps_c',
  setCamara,
  lente = '35mm_fijo',
  setLente,
  tipoFoto = 'retrato',
  setTipoFoto,
  tipoLuz = 'flash_estudio',
  setTipoLuz,
  usaFlash = true,
  setUsaFlash,
  configToma,
  setConfigToma,
  onAplicarPreset,
  onGuardar,
}) {
  const lugarFijo = 'estudio';

  const [presetSeleccionadoId, setPresetSeleccionadoId] = useState(
    CONFIGS_TIPO_FOTO.find((item) => item.id === tipoFoto)?.id || 'retrato'
  );
  const [luzLocal, setLuzLocal] = useState(tipoLuz);
  const [flashLocal, setFlashLocal] = useState(Boolean(usaFlash));

  const luzActual = setTipoLuz ? tipoLuz : luzLocal;
  const cambiarLuz = (nuevaLuz) => {
    setLuzLocal(nuevaLuz);
    setTipoLuz?.(nuevaLuz);
    const infoLuz = TIPOS_LUZ.find((item) => item.id === nuevaLuz);
    if (infoLuz && typeof setConfigToma === 'function') {
      setConfigToma({
        ...valoresActuales,
        wb: infoLuz.wbRef,
      });
    }
  };

  const flashActual = setUsaFlash ? Boolean(usaFlash) : flashLocal;
  const cambiarFlash = (estadoFlash) => {
    setFlashLocal(estadoFlash);
    setUsaFlash?.(estadoFlash);
  };

  const lentesDisponibles = LENTES_POR_CAMARA[camara] || LENTES_COMUNES;
  const presetActivo =
    CONFIGS_TIPO_FOTO.find((item) => item.id === presetSeleccionadoId) || CONFIGS_TIPO_FOTO[0];

  const handleCamaraChange = (nuevaCamara) => {
    setCamara?.(nuevaCamara);
    const nuevosLentes = LENTES_POR_CAMARA[nuevaCamara] || LENTES_COMUNES;
    if (nuevaCamara === 'smartphone_raw') {
      setLente?.('sin_lente_agregado');
    } else if (!nuevosLentes.some((item) => item.id === lente)) {
      setLente?.('35mm_fijo');
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

  const combinada = getConfigCombinada({
    camara,
    lente,
    tipoFoto: presetActivo.id,
    tipoLuz: luzActual,
    usaFlash: flashActual,
  });

  return (
    <div className="tab-pane animate-fade-in">
      {/* 1. Cámara y Lente (Estudio) */}
      <div className="glass-card">
        <h2 className="section-title">⚙️ {t.ajustesTitulo || 'Ajustes de Estudio'}</h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">1. Lugar: Estudio · Cámara y lente</h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.locacion || 'Lugar'}</label>
                <select
                  value={lugarFijo}
                  disabled
                  className="modern-select"
                >
                  <option value="estudio">{t.estudioPro || 'Estudio'}</option>
                </select>
              </div>

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

            <div className="param-item">
              <span className="param-label">Lugar</span>
              <span className="param-value">Estudio</span>
            </div>
            <div className="param-item">
              <span className="param-label">Cámara</span>
              <span className="param-value">{getNombreCamara(camara)}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Lente</span>
              <span className="param-value">{getNombreLente(camara, lente)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Configuración por tipo de toma + combinación con cámara, lente y flash */}
      <div className="glass-card">
        <h2 className="section-title">
          🎯 {t.configsPorTipoFoto || 'Configuración por toma y equipo'}
        </h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">2. Elegí el tipo de toma</h3>

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
              <strong>Guía ({presetActivo.nombre}):</strong> {presetActivo.tip}
            </small>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">
              3. Configuración para {presetActivo.nombre} con {getNombreCamara(camara)} y {getNombreLente(camara, lente)}
            </h3>

            <div className="param-item">
              <span className="param-label">Apertura sugerida</span>
              <span className="param-value">{combinada.aperturaSugerida}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Obturación sugerida</span>
              <span className="param-value">{combinada.obturacionSugerida}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Flash / Luz</span>
              <span className="param-value">{combinada.flashConfig.modo}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Potencia / Modificador</span>
              <span className="param-value">
                {combinada.flashConfig.potencia} · {combinada.flashConfig.modificador}
              </span>
            </div>

            <small className="hint">{combinada.flashConfig.nota}</small>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">4. Ajuste manual de valores de toma</h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label>Apertura</label>
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
                <label>ISO</label>
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
                <label>Medición</label>
                <input
                  type="text"
                  className="modern-input"
                  value={valoresActuales.medicion}
                  onChange={(e) => handleCampoToma('medicion', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Luz, Flash y Smartphone RAW (sin lente vs con lente agregado) */}
      <div className="glass-card">
        <h2 className="section-title">
          💡 {t.iluminacionYFlash || 'Luz, flash y Smartphone RAW'}
        </h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">5. Tipo de luz y uso de flash en estudio</h3>

            <div className="form-group">
              <label>{t.tipoLuz || 'Tipo de luz'}</label>
              <select
                value={luzActual}
                onChange={(e) => cambiarLuz(e.target.value)}
                className="modern-select"
              >
                {TIPOS_LUZ.map((luz) => (
                  <option key={luz.id} value={luz.id}>
                    {luz.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="btn-toggle-group">
              <button
                type="button"
                className={`btn-toggle ${!flashActual ? 'active' : ''}`}
                onClick={() => cambiarFlash(false)}
              >
                🚫 Sin flash
              </button>
              <button
                type="button"
                className={`btn-toggle ${flashActual ? 'active' : ''}`}
                onClick={() => cambiarFlash(true)}
              >
                ⚡ Con flash
              </button>
            </div>

            <div className="param-item">
              <span className="param-label">Configuración</span>
              <span className="param-value">{combinada.flashConfig.estado}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Modo</span>
              <span className="param-value">{combinada.flashConfig.modo}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Potencia</span>
              <span className="param-value">{combinada.flashConfig.potencia}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Modificador</span>
              <span className="param-value">{combinada.flashConfig.modificador}</span>
            </div>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">
              6. Smartphone RAW: sin lente agregado vs. con lente agregado
            </h3>

            {FORMAS_SMARTPHONE.map((bloque) => (
              <div key={bloque.id} className="form-section">
                <h4 className="subsection-title">{bloque.titulo}</h4>
                <ul className="hint">
                  {bloque.formasSacar.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="param-item">
                  <span className="param-label">Apertura</span>
                  <span className="param-value">{bloque.config.apertura}</span>
                </div>
                <div className="param-item">
                  <span className="param-label">Obturación</span>
                  <span className="param-value">{bloque.config.obturacion}</span>
                </div>
                <div className="param-item">
                  <span className="param-label">ISO</span>
                  <span className="param-value">{bloque.config.iso}</span>
                </div>
                <div className="param-item">
                  <span className="param-label">Enfoque / Medición</span>
                  <span className="param-value">
                    {bloque.config.enfoque} · {bloque.config.medicion}
                  </span>
                </div>
                <div className="param-item">
                  <span className="param-label">WB / Flash</span>
                  <span className="param-value">
                    {bloque.config.wb} · {bloque.config.flash}
                  </span>
                </div>
              </div>
            ))}
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