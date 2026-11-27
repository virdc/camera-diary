import React, { useEffect, useId, useRef, useState } from 'react';

/* ============================================================
   DATOS (ESTUDIO)
   ============================================================ */

export const LUGARES = [
  { id: 'estudio', nombre: 'Estudio', icono: '🏢', ayuda: 'Luz controlada en estudio: flash o luces continuas.' },
];

// crop = factor de recorte respecto de full frame (null = no aplica)
export const TIPOS_CAMARA = [
  { id: 'smartphone_raw', nombre: 'Smartphone RAW', crop: 1, nota: 'Disparar en RAW/DNG y bloquear exposición y foco (toque largo) evita sorpresas entre fotos.' },
  { id: 'dslr_aps_c', nombre: 'DSLR / Mirrorless APS-C', crop: 1.5, nota: 'Sensor APS-C: más profundidad de campo que full frame con el mismo encuadre.' },
  { id: 'full_frame', nombre: 'Full Frame', crop: 1, nota: 'Full frame: mejor rendimiento en ISO alto y más desenfoque de fondo.' },
  { id: 'micro_4_3', nombre: 'Micro Cuatro Tercios', crop: 2, nota: 'Sensor 4/3: mucha profundidad de campo; cuidá el ISO alto.' },
  { id: 'formato_medio', nombre: 'Formato Medio', crop: 0.79, nota: 'Formato medio: profundidad de campo muy corta; cerrá un paso más para tener nitidez en todo el sujeto.' },
  { id: 'compacta_bridge', nombre: 'Compacta / Bridge', crop: null, nota: 'Sensor chico: gran profundidad de campo. Para desenfocar, alejá el fondo y usá el zoom.' },
  { id: 'analogica_film', nombre: 'Analógica / Film', crop: 1, nota: 'Película: no hay revisión inmediata. En negativo color conviene sobreexponer ~1 paso.' },
];

const L = (id, nombre, focal, focalMax, cats) => ({ id, nombre, focal, focalMax, cats });

export const LENTES_COMUNES = [
  L('14_24', 'Gran angular 14-24mm', 14, 24, ['ancho']),
  L('24mm_fijo', '24mm fijo', 24, 24, ['ancho']),
  L('35mm_fijo', '35mm fijo', 35, 35, ['normal']),
  L('50mm_fijo', '50mm fijo', 50, 50, ['normal', 'retrato']),
  L('55mm_fijo', '55mm fijo', 55, 55, ['normal', 'retrato']),
  L('85mm_fijo', '85mm fijo (retrato)', 85, 85, ['retrato']),
  L('macro_100', 'Macro 90-105mm', 100, 100, ['macro', 'retrato']),
  L('lente_kit', 'Lente del kit (18-55mm)', 18, 55, ['ancho', 'normal']),
  L('zoom_24_70', 'Zoom 24-70mm', 24, 70, ['ancho', 'normal', 'retrato']),
  L('tele_70_200', 'Tele 70-200mm', 70, 200, ['retrato', 'tele']),
  L('tele_70_300', '70-300mm (Tele)', 70, 300, ['tele']),
  L('super_tele', 'Super tele 150-600mm', 150, 600, ['tele']),
];

// En smartphone las focales son equivalentes a full frame
export const LENTES_SMARTPHONE = [
  { id: 'sin_lente_agregado', nombre: 'Sin lente agregado (cámara nativa del celular)', focal: 24, focalMax: 24, cats: ['normal', 'ancho'], aperturaFija: 'Nativa del celular (f/1.7 - f/2.2)' },
  { id: 'ultra_angular_0_5x', nombre: 'Ultra gran angular nativo (0.5x)', focal: 13, focalMax: 13, cats: ['ancho'], aperturaFija: 'Nativa del celular (f/1.8 - f/2.4)' },
  { id: 'tele_3x', nombre: 'Teleobjetivo nativo (3x)', focal: 77, focalMax: 77, cats: ['retrato'], aperturaFija: 'Nativa del celular (f/2.4 - f/3.4)' },
  { id: 'tele_5x', nombre: 'Teleobjetivo nativo (5x)', focal: 120, focalMax: 120, cats: ['tele', 'retrato'], aperturaFija: 'Nativa del celular (f/2.8 - f/3.4)' },
  { id: 'con_lente_agregado', nombre: 'Con lente agregado (gran angular / macro / tele)', focal: null, focalMax: null, cats: ['ancho', 'macro', 'tele'] },
  { id: '35mm_fijo', nombre: '35mm fijo (equivalente)', focal: 35, focalMax: 35, cats: ['normal'] },
  { id: '55mm_fijo', nombre: '55mm fijo (equivalente)', focal: 55, focalMax: 55, cats: ['normal', 'retrato'] },
  { id: 'lente_kit', nombre: 'Lente del kit / modo zoom estándar', focal: 24, focalMax: 70, cats: ['ancho', 'normal', 'retrato'] },
  { id: 'tele_70_300', nombre: '70-300mm (equivalente / tele acoplado)', focal: 70, focalMax: 300, cats: ['tele'] },
];

const LENTES_COMPACTA = [
  { id: 'zoom_integrado', nombre: 'Zoom integrado de la cámara', focal: null, focalMax: null, cats: ['ancho', 'normal', 'retrato', 'tele', 'macro'] },
];

export const LENTES_POR_CAMARA = {
  smartphone_raw: LENTES_SMARTPHONE,
  dslr_aps_c: LENTES_COMUNES,
  full_frame: LENTES_COMUNES,
  micro_4_3: LENTES_COMUNES,
  formato_medio: LENTES_COMUNES,
  compacta_bridge: LENTES_COMPACTA,
  analogica_film: LENTES_COMUNES,
};

export const FORMAS_SMARTPHONE = [
  {
    id: 'sin_lente',
    titulo: 'Sin lente agregado (cámara nativa)',
    formasSacar: [
      'Cámara principal 1x en RAW/DNG: encuadre natural, mayor rango dinámico y mejor detalle en luz media/baja.',
      'Modo retrato / 2x con distancia media: separá el sujeto del fondo alejándote un poco y evitando pegar la cara a la lente.',
      'Trípode + temporizador o disparador: clave en tomas de detalle sin trepidación.',
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
  { id: 'flash_estudio', nombre: 'Flash de estudio (Strobe)', wbRef: '5500K', nota: 'La potencia del flash controla la exposición; la apertura controla la profundidad de campo.' },
  { id: 'luz_continua_estudio', nombre: 'Luz continua de estudio (LED)', wbRef: '5200K - 5600K', nota: 'Lo que ves es lo que sacás: compensá con ISO y velocidad de obturación.' },
  { id: 'flash_camara', nombre: 'Flash en cámara / Speedlight', wbRef: '5500K', nota: 'Rebotá el flash en techo o pared, o usá difusor, para evitar sombras duras.' },
  { id: 'luz_mixta_estudio', nombre: 'Luz mixta en estudio', wbRef: '4500K - 5500K', nota: 'Mezclar fuentes de distinta temperatura da tonos raros: igualalas o corregí con geles CTO/CTB.' },
  { id: 'luz_ventana', nombre: 'Luz de ventana (natural en interior)', wbRef: '5500K - 6500K', nota: 'Ubicá al sujeto a 1-2 m de la ventana y un reflector del lado opuesto.' },
];

const LUCES_POR_LUGAR = { estudio: TIPOS_LUZ };

export const CONFIGS_TIPO_FOTO = [
  {
    id: 'retrato', nombre: 'Retrato', icono: '👤', lugares: ['estudio'], rec: ['retrato'],
    apertura: 'f/2.8 - f/5.6', obturacion: '1/125s - 1/200s', iso: '100 - 400',
    enfoque: 'AF-C al ojo / AF-S puntual', medicion: 'Matricial / Puntual',
    tip: 'Foco en el ojo más cercano y modificador suave para piel.',
  },
  {
    id: 'moda', nombre: 'Moda / Editorial', icono: '👗', lugares: ['estudio'], rec: ['retrato'],
    apertura: 'f/5.6 - f/8', obturacion: '1/125s - 1/200s', iso: '100 - 200',
    enfoque: 'AF-C al ojo', medicion: 'Matricial / Puntual',
    tip: 'Luz principal a 45° con relleno suave; disparo en ráfaga para captar micro-movimientos.',
  },
  {
    id: 'producto', nombre: 'Producto', icono: '📦', lugares: ['estudio'], rec: ['macro', 'retrato'],
    apertura: 'f/8 - f/16', obturacion: '1/125s - 1/200s', iso: '64 - 100',
    enfoque: 'MF / AF-S puntual', medicion: 'Puntual / Matricial',
    tip: 'Controlá reflejos y brillos con difusores o banderas.',
  },
  {
    id: 'comida', nombre: 'Comida', icono: '🍽️', lugares: ['estudio'], rec: ['macro', 'normal'],
    apertura: 'f/4 - f/8', obturacion: '1/125s - 1/200s', iso: '100 - 200',
    enfoque: 'AF-S puntual / MF', medicion: 'Matricial',
    tip: 'Luz lateral o contraluz suave con reflector; probá encuadre cenital o a 45°.',
  },
  {
    id: 'macro', nombre: 'Macro / Detalle', icono: '🔍', lugares: ['estudio'], rec: ['macro'],
    apertura: 'f/8 - f/16', obturacion: '1/125s - 1/200s', iso: '100 - 400',
    enfoque: 'MF / AF puntual', medicion: 'Puntual',
    tip: 'Cerrá diafragma para ganar zona nítida en detalles chicos.',
  },
  {
    id: 'deporte', nombre: 'Acción / Movimiento', icono: '⚡', lugares: ['estudio'], rec: ['tele'], sinMinima: true,
    apertura: 'f/4 - f/8', obturacion: '1/1000s o más', obturacionFlash: '1/200s (sincronización)', iso: '200 - 1600',
    enfoque: 'AF-C seguimiento continuo', medicion: 'Matricial',
    tip: 'Con flash en estudio respetá la velocidad máxima de sincronización: el flash es el que congela el movimiento.',
  },
  {
    id: 'barrido', nombre: 'Barrido (Panning)', icono: '🏎️', lugares: ['estudio'], rec: ['normal', 'tele'], sinMinima: true,
    apertura: 'f/8 - f/16', obturacion: '1/15s - 1/60s', iso: '64 - 200',
    enfoque: 'AF-C / Seguimiento continuo', medicion: 'Matricial / Evaluativa',
    tip: 'Seguí el movimiento parejo del sujeto y usá 2ª cortina si sumás flash.',
  },
];

const APERTURA_RETRATO_POR_LENTE = {
  '85mm_fijo': 'f/2 - f/4',
  '55mm_fijo': 'f/2.8 - f/4',
  '50mm_fijo': 'f/2.8 - f/4',
  '35mm_fijo': 'f/2.8 - f/5.6',
  lente_kit: 'f/4 - f/5.6',
  zoom_24_70: 'f/2.8 - f/5.6',
  tele_70_200: 'f/2.8 - f/5.6',
  tele_70_300: 'f/4 - f/5.6',
  macro_100: 'f/4 - f/8',
};

const MODIFICADOR_ESTUDIO = {
  retrato: 'Octabox / beauty dish',
  moda: 'Octabox / beauty dish',
  producto: 'Softbox + difusores y banderas',
  comida: 'Softbox lateral + reflector',
  macro: 'Softbox chico o flash anular',
  deporte: 'Octabox / reflector estándar',
  barrido: 'Softbox / reflector estándar',
};

const CAMPOS_TOMA = ['apertura', 'obturacion', 'iso', 'wb', 'enfoque', 'medicion'];

/* ============================================================
   HELPERS
   ============================================================ */

const presetsDeLugar = (lugar) => CONFIGS_TIPO_FOTO.filter((p) => p.lugares.includes(lugar));
const presetEnLugar = (preset, lugar) => ({ ...preset, ...(preset[lugar] || {}) });
const getCamara = (id) => TIPOS_CAMARA.find((c) => c.id === id) || TIPOS_CAMARA[1];
const getLente = (camaraId, lenteId) => {
  const lista = LENTES_POR_CAMARA[camaraId] || LENTES_COMUNES;
  return lista.find((l) => l.id === lenteId) || lista[0];
};
const familiaCamara = (id) => (id === 'smartphone_raw' ? 'phone' : id === 'compacta_bridge' ? 'compacta' : 'ilc');
const lentePorDefecto = (camaraId) =>
  camaraId === 'smartphone_raw' ? 'sin_lente_agregado' : camaraId === 'compacta_bridge' ? 'zoom_integrado' : '35mm_fijo';

function normalizarContexto(ctx) {
  const lugar = 'estudio';
  const camara = TIPOS_CAMARA.some((c) => c.id === ctx.camara) ? ctx.camara : 'dslr_aps_c';
  const lentes = LENTES_POR_CAMARA[camara];
  const lente = lentes.some((l) => l.id === ctx.lente) ? ctx.lente : lentePorDefecto(camara);
  const luces = LUCES_POR_LUGAR[lugar];
  const tipoLuz = luces.some((l) => l.id === ctx.tipoLuz) ? ctx.tipoLuz : luces[0].id;
  const presets = presetsDeLugar(lugar);
  const tipoFoto = presets.some((p) => p.id === ctx.tipoFoto) ? ctx.tipoFoto : presets[0].id;
  return { lugar, camara, lente, tipoLuz, tipoFoto, usaFlash: Boolean(ctx.usaFlash) };
}

function resolver(ctx) {
  const luces = LUCES_POR_LUGAR[ctx.lugar] || TIPOS_LUZ;
  return {
    lugarInfo: LUGARES[0],
    cam: getCamara(ctx.camara),
    len: getLente(ctx.camara, ctx.lente),
    preset: CONFIGS_TIPO_FOTO.find((p) => p.id === ctx.tipoFoto) || CONFIGS_TIPO_FOTO[0],
    luz: luces.find((l) => l.id === ctx.tipoLuz) || luces[0],
  };
}

function velocidadMinima(focalEq) {
  const pasos = [30, 60, 125, 250, 500, 1000, 2000, 4000];
  return `1/${pasos.find((p) => p >= focalEq) ?? 4000}s`;
}

function textoEquivalencia(cam, len) {
  if (!len.focal || !cam.crop || cam.crop === 1) return '';
  const a = Math.round(len.focal * cam.crop);
  const b = Math.round(len.focalMax * cam.crop);
  return a === b ? `≈ ${a}mm en full frame` : `≈ ${a}-${b}mm en full frame`;
}

function calcularFlash({ esSmartphone, len, preset, luz, usaFlash }) {
  const cats = len.cats || [];
  const esTele = cats.includes('tele');
  const esAncho = cats.includes('ancho');
  const nativo = Boolean(len.aperturaFija);

  if (!usaFlash) {
    return {
      estado: 'Sin flash (Estudio)',
      modo: luz.id === 'luz_continua_estudio' ? 'Luz continua LED' : 'Luz disponible de estudio',
      potencia: 'Ajustar intensidad de la luz + ISO/velocidad',
      modificador: esAncho ? 'Panel LED / softbox amplio' : 'Softbox / octabox dirigido',
      nota: 'Sin flash en estudio, controlá el movimiento con la velocidad de obturación y usá trípode si la bajás.',
    };
  }

  if (esSmartphone) {
    return {
      estado: 'Con flash / luz de apoyo (Smartphone RAW)',
      modo: nativo ? 'Luz continua o flash externo difuso' : 'Flash externo / LED lateral (sin tapar lente)',
      potencia: nativo ? 'Suave / baja (-1 a -1.5 EV)' : 'Baja a media (evitar sombras del clip)',
      modificador: 'Difusor / softbox chico',
      nota: nativo
        ? 'Sin lente agregado: evitá el flash directo duro del celular y priorizá luz continua o difusa.'
        : 'Con lente agregado: verificá que el accesorio acoplado no genere sombra sobre el encuadre.',
    };
  }

  return {
    estado: `Con flash (${luz.nombre})`,
    modo: preset.id === 'barrido' ? 'Manual (M) + 2ª cortina' : 'Manual (M) o TTL de estudio',
    potencia: esTele
      ? '1/4 - 1/1 (mayor distancia con tele)'
      : preset.id === 'macro'
      ? '1/32 - 1/8 (distancia corta)'
      : '1/8 - 1/2 según distancia y apertura',
    modificador: esTele ? 'Reflector / snoot / octabox concentrado' : MODIFICADOR_ESTUDIO[preset.id] || 'Softbox / octabox',
    nota: 'Mantené la velocidad dentro de la sincronización del flash (normalmente 1/160s - 1/250s).',
  };
}

function calcularConfig(ctx) {
  const { cam, len, preset, luz } = resolver(ctx);
  const { lugar, usaFlash } = ctx;
  const esSmartphone = ctx.camara === 'smartphone_raw';
  const base = presetEnLugar(preset, lugar);

  let apertura = base.apertura;
  if (preset.id === 'retrato' && APERTURA_RETRATO_POR_LENTE[len.id]) {
    apertura = APERTURA_RETRATO_POR_LENTE[len.id];
  }
  if (esSmartphone) apertura = len.aperturaFija || 'Óptica acoplada (f/2 - f/5.6)';

  let obturacion = base.obturacion;
  if (usaFlash && !esSmartphone && base.obturacionFlash) obturacion = base.obturacionFlash;

  const iso = cam.id === 'analogica_film' ? 'Según el rollo (ISO 100 - 400)' : base.iso;
  const wb = base.wbManda ? base.wb : luz.wbRef;

  const flash = calcularFlash({ esSmartphone, len, preset, luz, usaFlash });

  const consejos = [base.tip];
  if (luz.nota && !base.wbManda) consejos.push(luz.nota);
  if (cam.nota) consejos.push(cam.nota);

  const focalEqMax = len.focalMax ? len.focalMax * (cam.crop ?? 1) : null;
  const flashDomina = usaFlash;

  if (!preset.sinMinima && focalEqMax && !flashDomina) {
    consejos.push(`A mano alzada no bajes de ${velocidadMinima(focalEqMax)} con este lente, o activá la estabilización.`);
  }
  if (esSmartphone && usaFlash) {
    consejos.push('Con flash de estudio, el celular puede mostrar bandas por el obturador electrónico: probá antes o preferí luz continua.');
  }
  consejos.push(flash.nota);

  return { valores: { apertura, obturacion, iso, wb, enfoque: base.enfoque, medicion: base.medicion }, flash, consejos };
}

function useControlado(valor, setter, inicial) {
  const [local, setLocal] = useState(valor ?? inicial);
  const controlado = typeof setter === 'function';
  const actual = controlado ? valor ?? inicial : local;
  const cambiar = (nuevo) => {
    setLocal(nuevo);
    if (controlado) setter(nuevo);
  };
  return [actual, cambiar];
}

function Campo({ id, label, valor, sugerido, onChange }) {
  const editado = valor !== sugerido;
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {editado && <span className="aj-badge">editado</span>}
      </label>
      <input
        id={id}
        type="text"
        className="modern-input"
        value={valor}
        placeholder={sugerido}
        title={`Sugerido: ${sugerido}`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const ESTILOS = `
.aj-badge{display:inline-block;margin-left:.5rem;padding:.05rem .5rem;border-radius:999px;font-size:.72rem;background:rgba(127,127,127,.22)}
.aj-lista{margin:.6rem 0 0;padding-left:1.1rem;display:grid;gap:.4rem}
.aj-acciones{display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;margin-top:1rem}
.aj-btn-sec{padding:.6rem 1rem;border-radius:10px;border:1px solid rgba(127,127,127,.45);background:transparent;color:inherit;cursor:pointer;font:inherit}
.aj-btn-sec:hover{background:rgba(127,127,127,.14)}
.aj-btn-sec:focus-visible,.btn-toggle:focus-visible,.btn-save:focus-visible{outline:2px solid currentColor;outline-offset:2px}
.aj-aviso{font-size:.9rem}
.aj-details{margin-top:.75rem;border:1px solid rgba(127,127,127,.3);border-radius:10px;padding:.5rem .9rem}
.aj-details summary{cursor:pointer;font-weight:600;padding:.25rem 0}
`;

/* ============================================================
   COMPONENTE
   ============================================================ */

export default function Ajustes(props) {
  const { t = {}, onAplicarPreset, onGuardar } = props;
  const uid = useId();
  const idDe = (nombre) => `${uid}-${nombre}`;

  const [lugar, setLugar] = useControlado(props.lugar, props.setLugar, 'estudio');
  const [camara, setCamara] = useControlado(props.camara, props.setCamara, 'dslr_aps_c');
  const [lente, setLente] = useControlado(props.lente, props.setLente, '35mm_fijo');
  const [tipoFoto, setTipoFoto] = useControlado(props.tipoFoto, props.setTipoFoto, 'retrato');
  const [tipoLuz, setTipoLuz] = useControlado(props.tipoLuz, props.setTipoLuz, 'flash_estudio');
  const [usaFlashRaw, setUsaFlash] = useControlado(props.usaFlash, props.setUsaFlash, true);
  const [overrides, setOverrides] = useControlado(props.configToma, props.setConfigToma, {});

  const [aviso, setAviso] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const ctx = normalizarContexto({ lugar, camara, lente, tipoFoto, tipoLuz, usaFlash: usaFlashRaw });
  const { lugarInfo, cam, len, preset, luz } = resolver(ctx);
  const presetVista = presetEnLugar(preset, ctx.lugar);
  const sugerencia = calcularConfig(ctx);
  const valores = {};
  CAMPOS_TOMA.forEach((k) => {
    valores[k] = overrides?.[k] ?? sugerencia.valores[k];
  });
  const hayEditados = CAMPOS_TOMA.some((k) => valores[k] !== sugerencia.valores[k]);

  const aplicarCambios = (cambios) => {
    const extra = {};
    if (cambios.camara && familiaCamara(cambios.camara) !== familiaCamara(ctx.camara)) {
      extra.lente = lentePorDefecto(cambios.camara);
    }
    const nuevo = normalizarContexto({ ...ctx, ...extra, ...cambios });
    setLugar('estudio');
    setCamara(nuevo.camara);
    setLente(nuevo.lente);
    setTipoFoto(nuevo.tipoFoto);
    setTipoLuz(nuevo.tipoLuz);
    setUsaFlash(nuevo.usaFlash);
    setOverrides(calcularConfig(nuevo).valores);
    if (cambios.tipoFoto) {
      onAplicarPreset?.(presetEnLugar(CONFIGS_TIPO_FOTO.find((p) => p.id === nuevo.tipoFoto), nuevo.lugar));
    }
  };

  const cambiarCampo = (campo, valor) => setOverrides({ ...valores, [campo]: valor });
  const restablecer = () => setOverrides({ ...sugerencia.valores });

  const mostrarAviso = (texto) => {
    setAviso(texto);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(''), 2500);
  };

  const recomendado = (item) => item.cats?.some((c) => preset.rec?.includes(c));
  const equivalencia = textoEquivalencia(cam, len);
  const presetsDisponibles = presetsDeLugar(ctx.lugar);
  const lentesDisponibles = LENTES_POR_CAMARA[ctx.camara];
  const luces = LUCES_POR_LUGAR[ctx.lugar] || TIPOS_LUZ;
  const esSmartphone = ctx.camara === 'smartphone_raw';
  const bloqueActivo = len.aperturaFija ? 'sin_lente' : 'con_lente';

  const resumenTexto = [
    `${lugarInfo.nombre} · ${cam.nombre} · ${len.nombre}`,
    `Toma: ${preset.nombre}`,
    `Luz: ${luz.nombre}${ctx.usaFlash ? ' + flash' : ''}`,
    `Apertura: ${valores.apertura}`,
    `Obturación: ${valores.obturacion}`,
    `ISO: ${valores.iso}`,
    `WB: ${valores.wb}`,
    `Enfoque: ${valores.enfoque}`,
    `Medición: ${valores.medicion}`,
    `${sugerencia.flash.estado}: ${sugerencia.flash.modo} · ${sugerencia.flash.potencia} · ${sugerencia.flash.modificador}`,
  ].join('\n');

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resumenTexto);
      mostrarAviso('Resumen copiado');
    } catch {
      mostrarAviso('No se pudo copiar');
    }
  };

  const guardar = () => {
    onGuardar?.({
      lugar: ctx.lugar,
      camara: ctx.camara,
      lente: ctx.lente,
      tipoFoto: ctx.tipoFoto,
      tipoLuz: ctx.tipoLuz,
      usaFlash: ctx.usaFlash,
      config: valores,
      flash: sugerencia.flash,
    });
    mostrarAviso('Ajustes guardados');
  };

  return (
    <div className="tab-pane animate-fade-in">
      <style>{ESTILOS}</style>

      {/* 1 y 2. Lugar (Estudio), cámara y lente */}
      <div className="glass-card">
        <h2 className="section-title">⚙️ {t.ajustesTitulo || 'Ajustes de toma'}</h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">1. Lugar: Estudio</h3>

            <div className="btn-toggle-group" role="group" aria-label="Lugar">
              {LUGARES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className="btn-toggle active"
                  aria-pressed={true}
                  onClick={() => aplicarCambios({ lugar: 'estudio' })}
                >
                  {l.icono} {l.nombre}
                </button>
              ))}
            </div>
            <small className="hint">{lugarInfo.ayuda}</small>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">2. Cámara y lente</h3>

            <div className="grid-inputs">
              <div className="form-group">
                <label htmlFor={idDe('camara')}>{t.tipoCamara || 'Tipo de cámara'}</label>
                <select
                  id={idDe('camara')}
                  value={ctx.camara}
                  onChange={(e) => aplicarCambios({ camara: e.target.value })}
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
                <label htmlFor={idDe('lente')}>{t.lente || 'Lente / Óptica'}</label>
                <select
                  id={idDe('lente')}
                  value={ctx.lente}
                  onChange={(e) => aplicarCambios({ lente: e.target.value })}
                  className="modern-select"
                >
                  {lentesDisponibles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre}{recomendado(item) ? ' ★' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {equivalencia && <small className="hint">{equivalencia}</small>}
          </div>
        </div>
      </div>

      {/* 3. Tipo de toma y valores */}
      <div className="glass-card">
        <h2 className="section-title">🎯 {t.configsPorTipoFoto || 'Tipo de toma y parámetros'}</h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">3. Tipo de fotografía</h3>

            <div className="btn-toggle-group" role="group" aria-label="Tipo de foto">
              {presetsDisponibles.map((item) => {
                const activo = item.id === ctx.tipoFoto;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`btn-toggle ${activo ? 'active' : ''}`}
                    aria-pressed={activo}
                    onClick={() => aplicarCambios({ tipoFoto: item.id })}
                  >
                    {item.icono} {item.nombre}
                  </button>
                );
              })}
            </div>
            <small className="hint">{presetVista.tip}</small>
          </div>

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">4. Valores de exposición y enfoque</h3>

            <div className="grid-inputs">
              <Campo
                id={idDe('apertura')}
                label="Apertura"
                valor={valores.apertura}
                sugerido={sugerencia.valores.apertura}
                onChange={(v) => cambiarCampo('apertura', v)}
              />
              <Campo
                id={idDe('obturacion')}
                label="Velocidad de obturación"
                valor={valores.obturacion}
                sugerido={sugerencia.valores.obturacion}
                onChange={(v) => cambiarCampo('obturacion', v)}
              />
            </div>

            <div className="grid-inputs">
              <Campo
                id={idDe('iso')}
                label="ISO"
                valor={valores.iso}
                sugerido={sugerencia.valores.iso}
                onChange={(v) => cambiarCampo('iso', v)}
              />
              <Campo
                id={idDe('wb')}
                label="Balance de blancos (WB)"
                valor={valores.wb}
                sugerido={sugerencia.valores.wb}
                onChange={(v) => cambiarCampo('wb', v)}
              />
            </div>

            <div className="grid-inputs">
              <Campo
                id={idDe('enfoque')}
                label="Modo de enfoque"
                valor={valores.enfoque}
                sugerido={sugerencia.valores.enfoque}
                onChange={(v) => cambiarCampo('enfoque', v)}
              />
              <Campo
                id={idDe('medicion')}
                label="Medición de luz"
                valor={valores.medicion}
                sugerido={sugerencia.valores.medicion}
                onChange={(v) => cambiarCampo('medicion', v)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Luz, flash y guías */}
      <div className="glass-card">
        <h2 className="section-title">💡 {t.iluminacionYFlash || 'Luz y flash en estudio'}</h2>

        <div className="biz-form">
          <div className="form-section">
            <h3 className="subsection-title">5. Fuente de luz y flash</h3>

            <div className="form-group">
              <label htmlFor={idDe('tipoLuz')}>{t.tipoLuz || 'Tipo de luz'}</label>
              <select
                id={idDe('tipoLuz')}
                value={ctx.tipoLuz}
                onChange={(e) => aplicarCambios({ tipoLuz: e.target.value })}
                className="modern-select"
              >
                {luces.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre} ({item.wbRef})
                  </option>
                ))}
              </select>
            </div>

            <div className="btn-toggle-group" role="group" aria-label="Uso de flash">
              <button
                type="button"
                className={`btn-toggle ${!ctx.usaFlash ? 'active' : ''}`}
                aria-pressed={!ctx.usaFlash}
                onClick={() => aplicarCambios({ usaFlash: false })}
              >
                🚫 Sin flash
              </button>
              <button
                type="button"
                className={`btn-toggle ${ctx.usaFlash ? 'active' : ''}`}
                aria-pressed={ctx.usaFlash}
                onClick={() => aplicarCambios({ usaFlash: true })}
              >
                ⚡ Con flash
              </button>
            </div>

            <div className="param-item">
              <span className="param-label">Estado</span>
              <span className="param-value">{sugerencia.flash.estado}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Modo</span>
              <span className="param-value">{sugerencia.flash.modo}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Potencia</span>
              <span className="param-value">{sugerencia.flash.potencia}</span>
            </div>
            <div className="param-item">
              <span className="param-label">Modificador</span>
              <span className="param-value">{sugerencia.flash.modificador}</span>
            </div>
          </div>

          {esSmartphone && (
            <>
              <hr className="section-divider" />
              <div className="form-section">
                <h3 className="subsection-title">6. Smartphone RAW en estudio</h3>
                {FORMAS_SMARTPHONE.map((bloque) => (
                  <details
                    key={bloque.id}
                    className="aj-details"
                    open={bloque.id === bloqueActivo}
                  >
                    <summary>{bloque.titulo}</summary>
                    <ul className="aj-lista">
                      {bloque.formasSacar.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="param-item">
                      <span className="param-label">Apertura / Obturación</span>
                      <span className="param-value">
                        {bloque.config.apertura} · {bloque.config.obturacion}
                      </span>
                    </div>
                    <div className="param-item">
                      <span className="param-label">ISO / WB</span>
                      <span className="param-value">
                        {bloque.config.iso} · {bloque.config.wb}
                      </span>
                    </div>
                    <div className="param-item">
                      <span className="param-label">Enfoque / Medición</span>
                      <span className="param-value">
                        {bloque.config.enfoque} · {bloque.config.medicion}
                      </span>
                    </div>
                    <div className="param-item">
                      <span className="param-label">Flash / Luz</span>
                      <span className="param-value">{bloque.config.flash}</span>
                    </div>
                  </details>
                ))}
              </div>
            </>
          )}

          <hr className="section-divider" />

          <div className="form-section">
            <h3 className="subsection-title">Recomendaciones rápidas</h3>
            <ul className="aj-lista">
              {sugerencia.consejos.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="aj-acciones">
            {hayEditados && (
              <button type="button" className="aj-btn-sec" onClick={restablecer}>
                ↺ Restablecer sugeridos
              </button>
            )}
            <button type="button" className="aj-btn-sec" onClick={copiar}>
              📋 Copiar resumen
            </button>
            {typeof onGuardar === 'function' && (
              <button type="button" className="btn-save" onClick={guardar}>
                💾 {t.guardar || 'Guardar ajustes'}
              </button>
            )}
            {aviso && (
              <span className="aj-aviso" role="status" aria-live="polite">
                {aviso}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}