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
    { id: 'principal_1x', nombre: 'Principal nativa (1x / ~24-26mm eq.)' },
    { id: 'gran_angular_05x', nombre: 'Ultra gran angular nativa (0.5x / ~13-14mm eq.)' },
    { id: 'tele_2x_3x', nombre: 'Teleobjetivo integrado (2x / 3x / ~50-77mm eq.)' },
    { id: 'periscopio_5x', nombre: 'Tele periscópico integrado (5x / ~120mm eq.)' },
    { id: 'macro_celular', nombre: 'Lente / modo macro del celular' },
    { id: 'lente_externo_clip', nombre: 'Lente externo acoplado (gran angular / tele / macro / anamórfico)' },
  ],
  full_frame: [
    { id: '14_24', nombre: '14-24mm f/2.8 (Ultra gran angular zoom)' },
    { id: '24mm', nombre: '24mm f/1.4 (Gran angular)' },
    { id: '35mm', nombre: '35mm f/1.4 (Gran angular / Calle)' },
    { id: '50mm', nombre: '50mm f/1.4 (Normal)' },
    { id: '85mm', nombre: '85mm f/1.4 (Retrato)' },
    { id: '24_70', nombre: '24-70mm f/2.8 (Estándar zoom)' },
    { id: '70_200', nombre: '70-200mm f/2.8 (Tele zoom)' },
    { id: '90_macro', nombre: '90mm / 100mm f/2.8 Macro' },
    { id: '150_600', nombre: '150-600mm (Supertele / Luna / Fauna)' },
  ],
  aps_c: [
    { id: '10_18', nombre: '10-18mm f/4 (15-27mm eq. Ultra gran angular)' },
    { id: '16mm', nombre: '16mm f/1.4 (~24mm eq.)' },
    { id: '23mm', nombre: '23mm f/1.4 (~35mm eq.)' },
    { id: '35mm', nombre: '35mm f/1.4 (~50-52mm eq.)' },
    { id: '56mm', nombre: '56mm f/1.2 (~84-85mm eq. Retrato)' },
    { id: '18_55', nombre: '18-55mm / 17-50mm f/2.8 (~27-82mm eq.)' },
    { id: '55_250', nombre: '55-250mm / 70-300mm (~82-375mm eq. Tele)' },
    { id: '60_macro', nombre: '60mm Macro (~90mm eq.)' },
  ],
  micro_4_3: [
    { id: '7_14', nombre: '7-14mm f/2.8 (14-28mm eq. Ultra gran angular)' },
    { id: '12mm', nombre: '12mm f/1.4 (24mm eq.)' },
    { id: '17mm', nombre: '17mm f/1.8 (34mm eq.)' },
    { id: '25mm', nombre: '25mm f/1.4 (50mm eq.)' },
    { id: '42_5mm', nombre: '42.5mm f/1.2 (85mm eq. Retrato)' },
    { id: '12_40', nombre: '12-40mm f/2.8 (24-80mm eq.)' },
    { id: '40_150', nombre: '40-150mm f/2.8 (80-300mm eq.)' },
    { id: '60_macro_m43', nombre: '60mm Macro (120mm eq.)' },
    { id: '100_400', nombre: '100-400mm (200-800mm eq. Luna)' },
  ],
  formato_medio: [
    { id: '23_30mm', nombre: '23mm / 30mm (Gran angular)' },
    { id: '45_55mm', nombre: '45mm / 55mm (Normal)' },
    { id: '80mm', nombre: '80mm f/1.9 (Estándar)' },
    { id: '110mm', nombre: '110mm f/2 (Retrato)' },
    { id: '120mm_macro', nombre: '120mm Macro' },
  ],
  compacta_bridge: [
    { id: 'optica_fija', nombre: 'Óptica fija integrada' },
    { id: 'zoom_integrado', nombre: 'Zoom óptico integrado' },
    { id: 'conversor_gran_angular', nombre: 'Conversor gran angular acoplado' },
    { id: 'conversor_tele', nombre: 'Conversor teleobjetivo acoplado' },
  ],
  analogica_film: [
    { id: '28mm_film', nombre: '28mm (Gran angular / Calle)' },
    { id: '35mm_film', nombre: '35mm (Documental / Calle)' },
    { id: '50mm_film', nombre: '50mm (Normal)' },
    { id: '85mm_film', nombre: '85mm / 105mm (Retrato)' },
    { id: '135mm_film', nombre: '135mm / 200mm (Tele)' },
    { id: 'lente_nativo_120', nombre: 'Lente nativo de formato 120 (ej. 80mm)' },
  ],
};

export const TIPOS_LUZ = [
  { id: 'luz_natural_dia', nombre: 'Luz natural de día', wbRef: '5200K - 5600K' },
  { id: 'luz_dorada', nombre: 'Golden hour / Atardecer', wbRef: '4500K - 5200K' },
  { id: 'sombra_nublado', nombre: 'Sombra / Día nublado', wbRef: '6000K - 6800K' },
  { id: 'luz_mixta_urbana', nombre: 'Luz mixta urbana / Nocturna', wbRef: '3600K - 4500K' },
  { id: 'tungsteno_interior', nombre: 'Luz cálida interior / Tungsteno', wbRef: '2800K - 3200K' },
  { id: 'flash_estudio_strobe', nombre: 'Flash / Strobe de estudio', wbRef: '5500K' },
  { id: 'flash_camara_fill', nombre: 'Flash en cámara / Relleno', wbRef: '5500K' },
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
    wb: 'Luz de día (5200K - 5500K)',
    tip: 'Seguí el sujeto suavemente al mismo ritmo mientras disparás: el sujeto queda nítido y el fondo sale barrido con sensación de velocidad.',
  },
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
    icono: '👤',
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

const getNombreLuz = (luzId) =>
  TIPOS_LUZ.find((item) => item.id === luzId)?.nombre || luzId || '—';

function getConfigFlashRecomendada({ camara, lente, lugar, tipoLuz, usaFlash }) {
  if (!usaFlash) {
    return {
      modo: 'Sin flash',
      potencia: 'N/A',
      zoomCabezal: 'N/A',
      sincronizacion: 'Luz disponible / continua',
      nota:
        lugar === 'estudio'
          ? 'Trabajás en estudio sin flash: usá luz continua o luz natural controlada y cuidá la velocidad de obturación.'
          : 'Sin flash: ajustá ISO y obturación según la luz ambiente y el movimiento del sujeto.',
    };
  }

  const esSmartphone = camara === 'smartphone_raw';
  const esEstudio = lugar === 'estudio';
  const esMacro = ['macro_celular', '90_macro', '60_macro', '60_macro_m43', '120mm_macro'].includes(lente);
  const esTele = ['tele_2x_3x', 'periscopio_5x', '70_200', '150_600', '55_250', '40_150', '100_400', '135mm_film'].includes(lente);
  const esAngular = ['sin_lente_nativo', 'principal_1x', 'gran_angular_05x', '14_24', '24mm', '35mm', '10_18', '16mm', '23mm', '7_14', '12mm', '17mm', '23_30mm', '28mm_film', '35mm_film'].includes(lente);

  if (esSmartphone) {
    return {
      modo: 'Luz de apoyo / LED continuo o flash externo sincronizado',
      potencia: esEstudio ? 'Baja a media (evitar reflejos en RAW)' : 'Relleno suave (-1 a -1.5 EV)',
      zoomCabezal: esTele ? 'Concentrada / snoot' : 'Amplia / difusa',
      sincronizacion: 'Velocidad moderada (evitar barridos no deseados)',
      nota:
        'En Smartphone RAW el flash nativo del celular suele ser duro y chico: si podés, usá un difusor o luz continua externa.',
    };
  }

  if (esEstudio) {
    return {
      modo: 'Manual (M) o TTL con modificador (softbox / octabox / sombrilla)',
      potencia: esMacro ? '1/64 - 1/16 (cerca del sujeto)' : '1/8 - 1/2 según distancia y f/',
      zoomCabezal: esTele ? '70mm - 105mm o reflector concentrado' : '24mm - 50mm / cobertura de modificador',
      sincronizacion: 'Normal (1/125s - 1/200s, dentro del límite de sync)',
      nota:
        'En estudio tenés control total de luz: medí con fotómetro o revisá el histograma y la velocidad máxima de sincronización.',
    };
  }

  if (esMacro) {
    return {
      modo: 'TTL o Manual con difusor macro / twin flash',
      potencia: '1/64 - 1/16 (muy cerca del motivo)',
      zoomCabezal: 'Cabezal macro / difusor frontal',
      sincronizacion: '1/160s - 1/200s (o HSS si hay mucho sol)',
      nota:
        'En macro la distancia es mínima: usá difusor amplio para no quemar brillos y mantener nitidez.',
    };
  }

  return {
    modo: tipoLuz === 'luz_natural_dia' || tipoLuz === 'luz_dorada' ? 'HSS / Relleno (Fill Flash)' : 'TTL / Manual de relleno',
    potencia: esTele ? '1/4 - 1/1 (mayor alcance en tele)' : esAngular ? '1/16 - 1/4 (cobertura amplia)' : '1/8 - 1/2',
    zoomCabezal: esTele ? '70mm - 135mm (mayor alcance)' : esAngular ? '24mm - 35mm (con difusor)' : '50mm',
    sincronizacion: tipoLuz === 'luz_natural_dia' ? 'HSS (si superás 1/200s) o 1/200s' : '1/125s - 1/200s (2ª cortina si hay movimiento)',
    nota:
      lugar === 'exteriores'
        ? 'En exteriores el flash sirve para levantar sombras o equilibrar contraluz sin congelar de más el ambiente.'
        : 'Ajustá el rebote o la potencia según el techo y las paredes del lugar.',
  };
}

export default function Ajustes({
  t = {},
  camara = 'smartphone_raw',
  setCamara,
  lente = 'sin_lente_nativo',
  setLente,
  tipoFoto = 'barrido',
  setTipoFoto,
  lugar = 'exteriores',
  setLugar,
  tipoLuz = 'luz_natural_dia',
  setTipoLuz,
  usaFlash = false,
  setUsaFlash,
  configToma,
  setConfigToma,
  onAplicarPreset,
  onGuardar,
}) {
  const [presetSeleccionadoId, setPresetSeleccionadoId] = useState(
    CONFIGS_TIPO_FOTO.find((item) => item.id === tipoFoto)?.id || 'barrido'
  );
  const [lugarLocal, setLugarLocal] = useState(lugar);
  const [luzLocal, setLuzLocal] = useState(tipoLuz);
  const [flashLocal, setFlashLocal] = useState(Boolean(usaFlash));

  const lugarActual = setLugar ? lugar : lugarLocal;
  const cambiarLugar = (nuevoLugar) => {
    setLugarLocal(nuevoLugar);
    setLugar?.(nuevoLugar);
  };

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

  const configFlash = getConfigFlashRecomendada({
    camara,
    lente,
    lugar: lugarActual,
    tipoLuz: luzActual,
    usaFlash: flashActual,
  });

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

      {/* Tarjeta 2: Tipo de fotografía y valores base */}
      <div className="glass-card">
        <h2 className="section-title">
          🎯 {t.configsPorTipoFoto || 'Configuración según tipo de foto'}
        </h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">
              2. Elegí el tipo de foto (Barrido, Luna, Retrato, etc.)
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
        </div>
      </div>

      {/* Tarjeta 3: Tipos de luz y configuración de flash */}
      <div className="glass-card">
        <h2 className="section-title">
          💡 {t.iluminacionYFlash || 'Iluminación, lugar y flash'}
        </h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">
              4. Lugar, tipo de luz y uso de flash
            </h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label>{t.locacion || 'Lugar'}</label>
                <select
                  value={lugarActual}
                  onChange={(e) => cambiarLugar(e.target.value)}
                  className="modern-select"
                >
                  <option value="exteriores">{t.exteriores || 'Exteriores'}</option>
                  <option value="estudio">{t.estudioPro || 'Estudio'}</option>
                </select>
              </div>

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
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">
              5. Configuración recomendada de flash ({getNombreCamara(camara)} · {getNombreLuz(luzActual)})
            </h3>

            <div className="param-item">
              <span className="param-label">Óptica</span>
              <span className="param-value">{getNombreLente(camara, lente)}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Modo de flash</span>
              <span className="param-value">{configFlash.modo}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Potencia sugerida</span>
              <span className="param-value">{configFlash.potencia}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Cabezal / Modificador</span>
              <span className="param-value">{configFlash.zoomCabezal}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Sincronización</span>
              <span className="param-value">{configFlash.sincronizacion}</span>
            </div>

            <small className="hint">{configFlash.nota}</small>
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