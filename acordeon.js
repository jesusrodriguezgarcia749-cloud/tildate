/* =====================================================================
   TÍLDATE · MI ACORDEÓN DE TILDES
   Modo Práctica (alumno) + Modo Pizarrón (docente, para proyector)
   Además: ajusta el modo RETO a 40 preguntas.
   Requiere: datos-acordeon.js cargado antes que este archivo.
   ===================================================================== */

/* ---------------- 1. LÓGICA (sílabas, tónica, reglas) ---------------- */
const AC_TIPOS = {
  aguda:         { nombre:'aguda',         plural:'Agudas',         regla:'Llevan tilde si terminan en <b>N, S o vocal</b>',      color:'#00e5ff' },
  grave:         { nombre:'grave',         plural:'Graves',         regla:'Llevan tilde si <b>NO</b> terminan en N, S o vocal',  color:'#69f0ae' },
  esdrujula:     { nombre:'esdrújula',     plural:'Esdrújulas',     regla:'<b>Todas</b> llevan tilde',                            color:'#ffab40' },
  sobresdrujula: { nombre:'sobresdrújula', plural:'Sobresdrújulas', regla:'<b>Todas</b> llevan tilde',                            color:'#b388ff' }
};
const AC_ORDEN = ['aguda','grave','esdrujula','sobresdrujula']; // 1ª, 2ª, 3ª, 4ª+ sílaba desde el final
const AC_SIN = { 'á':'a','é':'e','í':'i','ó':'o','ú':'u' };
function acSinTilde(s){ return s.replace(/[áéíóú]/g, c => AC_SIN[c]); }

/* Analiza una palabra ya separada en sílabas (bien escrita). */
function acAnalizar(silabas){
  const sil = silabas.map(s => s.toLowerCase());
  const palabra = sil.join('');
  const n = sil.length;
  let t = sil.findIndex(s => /[áéíóú]/.test(s));
  if(t < 0){ t = (n === 1) ? 0 : (/[aeiouns]$/.test(palabra) ? n - 2 : n - 1); }
  const desdeFinal = n - t;
  const tipo = AC_ORDEN[Math.min(desdeFinal, 4) - 1];
  const ult = acSinTilde(palabra.slice(-1));
  const termina = 'aeiou'.includes(ult) ? 'vocal' : (ult === 'n' ? 'n' : (ult === 's' ? 's' : 'otra'));
  const enNSV = termina !== 'otra';
  const reglaDice = tipo === 'aguda' ? enNSV : (tipo === 'grave' ? !enNSV : true);
  const lleva = /[áéíóú]/.test(palabra);
  const hiato = /[íú]h?[aeoáéó]|[aeoáéó]h?[íú]/.test(palabra);
  const posTilde = lleva ? [...sil[t]].findIndex(c => /[áéíóú]/.test(c)) : -1;
  return { sil, palabra, n, t, desdeFinal, tipo, termina, reglaDice, lleva, rompe: lleva !== reglaDice, hiato, posTilde };
}

/* Separador automático de sílabas (para el Pizarrón). */
const AC_VOCALES = 'aeiouáéíóúü';
const AC_FUERTES = 'aeoáéóíú';   // í y ú con tilde se comportan como fuertes (hiato)
const AC_GRUPOS = ['pr','br','tr','dr','cr','gr','fr','kr','pl','bl','cl','gl','fl','kl','tl'];
function acSilabear(entrada){
  const w = entrada.toLowerCase().trim();
  const u = [];
  for(let i = 0; i < w.length; i++){
    const c = w[i], d = w.substr(i, 2);
    if(d === 'ch' || d === 'll' || d === 'rr'){ u.push({ t:'c', s:d }); i++; continue; }
    if(c === 'y'){
      if(i === w.length - 1 && i > 0 && AC_VOCALES.includes(w[i-1])){ u.push({ t:'v', s:'y' }); continue; }
      u.push({ t:'c', s:'y' }); continue;
    }
    u.push({ t: AC_VOCALES.includes(c) ? 'v' : 'c', s:c });
  }
  // Núcleos vocálicos y consonantes entre ellos
  const nucleos = [], entre = [[]];
  let k = 0;
  while(k < u.length){
    if(u[k].t === 'c'){ entre[entre.length-1].push(u[k].s); k++; continue; }
    let nuc = u[k].s; k++;
    while(k < u.length && u[k].t === 'v'){
      const prev = nuc.slice(-1), cur = u[k].s;
      if(AC_FUERTES.includes(prev) && AC_FUERTES.includes(cur)){ nucleos.push(nuc); entre.push([]); nuc = cur; }
      else { nuc += cur; }
      k++;
    }
    nucleos.push(nuc); entre.push([]);
  }
  if(!nucleos.length) return [w];
  const sil = nucleos.map(() => ({ ini:'', nuc:'', fin:'' }));
  nucleos.forEach((nv, i) => sil[i].nuc = nv);
  sil[0].ini = entre[0].join('');
  for(let i = 0; i < nucleos.length - 1; i++){
    const cs = entre[i+1];
    let coda = [], ataque = [];
    if(cs.length === 1){ ataque = cs; }
    else if(cs.length === 2){
      if(AC_GRUPOS.includes(cs[0] + cs[1])) ataque = cs; else { coda = [cs[0]]; ataque = [cs[1]]; }
    } else if(cs.length === 3){
      if(AC_GRUPOS.includes(cs[1] + cs[2])){ coda = [cs[0]]; ataque = [cs[1], cs[2]]; }
      else { coda = [cs[0], cs[1]]; ataque = [cs[2]]; }
    } else if(cs.length >= 4){
      coda = cs.slice(0, cs.length - 2); ataque = cs.slice(cs.length - 2);
    }
    sil[i].fin = coda.join(''); sil[i+1].ini = ataque.join('');
  }
  sil[sil.length-1].fin = entre[nucleos.length].join('');
  return sil.map(s => s.ini + s.nuc + s.fin);
}

const AC_NIVELES = [
  { nombre:'Agudas y graves',          mezcla:[['agudas',5],['graves',5]] },
  { nombre:'Esdrújulas',               mezcla:[['esdrujulas',6],['agudas',2],['graves',2]] },
  { nombre:'Sobresdrújulas',           mezcla:[['sobresdrujulas',5],['esdrujulas',3],['agudas',1],['graves',1]] },
  { nombre:'Hiatos · jefe final',      mezcla:[['hiatos',7],['agudas',1],['graves',1],['esdrujulas',1]] },
  { nombre:'Mezcla total',             mezcla:[['agudas',2],['graves',2],['esdrujulas',2],['sobresdrujulas',2],['hiatos',2]] }
];
const AC_PASOS = ['Cortar','Acomodar','Tónica','Regla','Tildar'];
const AC_DIAG = {
  cortar:'separar en sílabas', tonica:'encontrar la sílaba tónica', tipo:'reconocer el tipo de palabra',
  termina:'fijarte en la última letra', regla:'aplicar la regla', tildar:'poner la tilde en la vocal correcta'
};
function acMezclar(a){ const b = [...a]; for(let i = b.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

if(typeof module !== 'undefined'){ module.exports = { acAnalizar, acSilabear, acSinTilde }; }

/* ---------------- 2. INTERFAZ ---------------- */

const AC_CSS = `
.btn-acordeon{background:linear-gradient(135deg,#7c4dff,#00e5ff);color:#0b0230;}
#acordeon{padding:16px;}
.ac-wrap{max-width:720px;margin:0 auto;}
.ac-vista{display:none;}
.ac-vista.on{display:block;}
.ac-titulo{font-family:'Fredoka One',cursive;font-size:2.1rem;color:var(--amarillo);margin:6px 0 2px;text-shadow:0 3px 12px rgba(255,109,0,.45);}
.ac-sub{color:#b3e5fc;font-weight:700;font-size:.92rem;margin-bottom:6px;}
.ac-p{color:#e1f5fe;font-size:.9rem;margin:0 0 10px;}
.ac-niveles{display:grid;grid-template-columns:1fr;gap:8px;margin-top:10px;}
.ac-nivel{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;border:2px solid rgba(255,255,255,.18);background:rgba(255,255,255,.08);color:#fff;font-family:'Nunito',sans-serif;font-weight:800;font-size:1rem;cursor:pointer;text-align:left;}
.ac-nivel:hover,.ac-nivel:focus-visible{border-color:var(--amarillo);outline:none;}
.ac-nivel .num{font-family:'Fredoka One',cursive;font-size:1.3rem;width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:var(--amarillo);color:#1a0000;flex:none;}
.ac-pasos{display:flex;gap:4px;margin:6px 0 10px;}
.ac-pasos span{flex:1;font-size:.68rem;font-weight:800;padding:5px 2px;border-radius:8px;background:rgba(0,0,0,.35);color:#90a4ae;border:1px solid rgba(255,255,255,.08);}
.ac-pasos span.hecho{color:#69f0ae;}
.ac-pasos span.actual{background:var(--amarillo);color:#1a0000;}
.ac-zona{min-height:64px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;}
.ac-letras{display:flex;align-items:center;justify-content:center;flex-wrap:nowrap;max-width:100%;overflow-x:auto;padding:4px 0;}
.ac-letra{font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(1.4rem,6.5vw,2.4rem);color:#fff;}
.ac-gap{width:clamp(14px,3.6vw,22px);height:clamp(2rem,9vw,3rem);margin:0 1px;border:none;background:transparent;cursor:pointer;position:relative;border-radius:6px;}
.ac-gap::after{content:'';position:absolute;left:50%;top:18%;bottom:18%;width:2px;transform:translateX(-50%);background:rgba(255,255,255,.18);border-radius:2px;}
.ac-gap:hover::after{background:rgba(255,215,0,.6);}
.ac-gap.on::after{width:5px;top:0;bottom:0;background:#ff5252;box-shadow:0 0 10px rgba(255,82,82,.8);}
.ac-gap.bien::after{background:#69f0ae;box-shadow:0 0 10px rgba(105,240,174,.8);}
.ac-chips{font-family:'Fredoka One',cursive;font-size:clamp(1.5rem,6vw,2.3rem);color:#b3e5fc;letter-spacing:1px;}
.ac-chips i{font-style:normal;color:#ff5252;margin:0 .25em;}
.ac-final{font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(2rem,9vw,3.2rem);color:#fff;}
.ac-final .ton{color:var(--amarillo);}
.ac-final .tilde{color:#ff6d00;text-shadow:0 0 14px rgba(255,109,0,.9);}
.ac-oir{margin-top:8px;background:rgba(0,229,255,.12);border:1px solid rgba(0,229,255,.45);color:#b3e5fc;border-radius:50px;padding:6px 16px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;}
/* --- el acordeón --- */
.ac-acordeon{display:flex;align-items:stretch;margin:12px 0;border-radius:16px;overflow:hidden;border:2px solid rgba(255,215,0,.35);background:#0d1b22;box-shadow:0 10px 30px rgba(0,0,0,.45);}
.ac-col{flex:1;min-width:0;display:flex;flex-direction:column;border-left:2px solid rgba(255,255,255,.07);
  background:repeating-linear-gradient(90deg,rgba(255,255,255,.035) 0 7px,rgba(0,0,0,.18) 7px 14px);transform-origin:right center;transition:box-shadow .3s,background-color .3s;}
.ac-col:first-child{border-left:none;}
.ac-col.fuelle{animation:acFuelle .55s cubic-bezier(.2,.9,.3,1.3) both;}
@keyframes acFuelle{0%{transform:scaleX(.15);opacity:0;}100%{transform:scaleX(1);opacity:1;}}
.ac-head{font-family:'Fredoka One',cursive;font-size:clamp(.72rem,2.8vw,1.05rem);padding:8px 3px 2px;color:var(--c);}
.ac-regla{font-size:clamp(.58rem,2.2vw,.78rem);color:#cfd8dc;padding:0 4px 8px;line-height:1.25;min-height:4.4em;border-bottom:2px dashed rgba(255,255,255,.12);}
.ac-regla b{color:var(--c);}
.ac-celda{flex:1;min-height:76px;display:flex;align-items:center;justify-content:center;padding:8px 3px;}
.ac-col.activa{background-color:rgba(255,215,0,.13);box-shadow:inset 0 0 0 3px var(--c);}
.ac-sil{font-family:'Fredoka One',cursive;font-size:clamp(1.05rem,5vw,1.7rem);padding:8px clamp(4px,1.6vw,12px);border-radius:12px;border:2px solid rgba(255,255,255,.35);background:rgba(255,255,255,.14);color:#fff;cursor:pointer;max-width:100%;}
.ac-sil:disabled{cursor:default;}
.ac-sil:not(:disabled):hover{border-color:var(--amarillo);}
.ac-sil.cae{animation:acCae .45s cubic-bezier(.3,1.4,.5,1) both;}
@keyframes acCae{0%{transform:translateY(-60px);opacity:0;}100%{transform:translateY(0);opacity:1;}}
.ac-sil.tonica{background:linear-gradient(135deg,#FFD700,#ff9100);color:#1a0000;border-color:#fff;box-shadow:0 0 18px rgba(255,215,0,.75);}
.ac-sil.mal{animation:acTiembla .4s;border-color:#ff5252;}
@keyframes acTiembla{0%,100%{transform:translateX(0);}25%{transform:translateX(-6px);}75%{transform:translateX(6px);}}
.ac-pregunta{font-family:'Fredoka One',cursive;font-size:1.08rem;color:#fff;margin:8px 0 4px;min-height:1.3em;}
.ac-opciones{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0 12px;}
.ac-vocales{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;}
.ac-vocal{font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(2rem,9vw,3rem);min-width:56px;padding:4px 12px;border-radius:14px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:#fff;cursor:pointer;}
.ac-vocal.cons{opacity:.45;}
.ac-jefe{background:linear-gradient(135deg,rgba(255,23,68,.25),rgba(124,77,255,.25));border:2px solid #ff5252;border-radius:16px;padding:14px;margin:10px 0;text-align:left;color:#fff;}
.ac-jefe h3{font-family:'Fredoka One',cursive;color:#ff8a80;font-size:1.35rem;margin-bottom:6px;}
.ac-res{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0;}
.ac-res div{background:rgba(255,255,255,.07);border-radius:12px;padding:10px 4px;}
.ac-res b{display:block;font-family:'Fredoka One',cursive;font-size:1.8rem;color:var(--amarillo);}
.ac-res small{color:#b3e5fc;font-weight:700;font-size:.75rem;}
/* --- pizarrón --- */
.pz-fila{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:8px;}
.pz-aviso{font-size:.85rem;color:#ffcc80;font-weight:700;margin-top:6px;text-align:left;}
.pz-palabra{font-family:'Nunito',sans-serif;font-weight:900;font-size:clamp(2.6rem,10vw,5.5rem);color:#fff;margin:10px 0;line-height:1.1;}
.pz-palabra .ton{color:var(--amarillo);}
.pz-palabra .tilde{color:#ff6d00;text-shadow:0 0 20px rgba(255,109,0,.9);}
.pz-palabra i{font-style:normal;color:#ff5252;margin:0 .2em;}
#pz-acordeon .ac-sil{font-size:clamp(1.2rem,4.6vw,2.6rem);}
#pz-acordeon .ac-head{font-size:clamp(.8rem,2.6vw,1.5rem);}
#pz-acordeon .ac-regla{font-size:clamp(.62rem,1.8vw,1rem);}
#pz-acordeon .ac-celda{min-height:110px;}
.pz-explica{font-size:clamp(1rem,2.6vw,1.45rem);color:#e1f5fe;font-weight:700;min-height:2.4em;margin:8px 0;line-height:1.4;}
.pz-explica b{color:var(--amarillo);}
.pz-nav{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;margin:10px 0;}
.pz-nav button{font-family:'Fredoka One',cursive;font-size:1.1rem;border:none;border-radius:50px;padding:12px 22px;cursor:pointer;}
.pz-prev{background:#546e7a;color:#fff;}
.pz-next{background:linear-gradient(135deg,var(--amarillo),var(--naranja));color:#1a0000;}
.pz-oir{background:rgba(0,229,255,.18);color:#e1f5fe;border:1px solid rgba(0,229,255,.5)!important;}
.pz-paso{font-weight:800;color:#b3e5fc;font-size:.95rem;}
.mx-desc{display:block;font-size:.75rem;color:#b3e5fc;font-weight:700;}
.mx-frase{font-family:'Nunito',sans-serif;font-weight:800;font-size:clamp(1.25rem,5vw,1.9rem);line-height:1.45;color:#fff;}
.mx-hueco{display:inline-block;min-width:3.5em;border-bottom:3px dashed var(--amarillo);color:transparent;}
.mx-ok{color:#69f0ae;}
.mx-mal{color:#ff8a80;text-decoration:line-through;}
.mx-tu{font-weight:700;color:#cfd8dc;margin-bottom:6px;}
.mx-comp{display:flex;flex-direction:column;gap:8px;margin:10px 0;}
.mx-fila{border:2px solid rgba(255,255,255,.12);border-radius:14px;padding:8px 10px;background:rgba(0,0,0,.25);text-align:left;}
.mx-fila.ok{border-color:#69f0ae;background:rgba(0,200,83,.12);}
.mx-pal{font-family:'Nunito',sans-serif;font-weight:900;font-size:1.6rem;color:#fff;}
.mx-pal .ton{color:var(--amarillo);}
.mx-pal .tilde{color:#ff6d00;}
.mx-sig{font-size:.88rem;color:#e1f5fe;font-weight:700;}
.mx-sig i{color:#b3e5fc;}
.ac-mini{margin:6px 0 0;border-width:1px;box-shadow:none;}
.ac-mini .ac-regla{display:none;}
.ac-mini .ac-head{font-size:.62rem;padding:4px 1px;}
.ac-mini .ac-celda{min-height:44px;padding:4px 2px;}
.ac-mini .ac-sil{font-size:1rem;padding:3px 6px;border-radius:8px;}
.mx-oir-grande{font-family:'Fredoka One',cursive;font-size:1.3rem;padding:12px 26px;border:none;border-radius:50px;background:linear-gradient(135deg,#00e5ff,#00b0ff);color:#00222b;cursor:pointer;}
.mx-input{text-align:center;font-size:1.6rem!important;margin:12px 0 6px!important;}
.mx-teclas{display:flex;justify-content:center;gap:6px;flex-wrap:wrap;}
.mx-teclas button{font-family:'Nunito',sans-serif;font-weight:900;font-size:1.25rem;width:40px;height:44px;border-radius:12px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);color:#fff;cursor:pointer;}
@media (prefers-reduced-motion: reduce){.ac-col.fuelle,.ac-sil.cae,.ac-sil.mal{animation:none!important;}}
`;

const AC_HTML = `
<div class="ac-wrap">
  <!-- INICIO -->
  <div id="ac-inicio" class="ac-vista">
    <div class="ac-titulo">🪗 Mi Acordeón de Tildes</div>
    <div class="ac-sub">Divide la palabra, acomódala, encuentra la sílaba fuerte y deja que la regla decida.</div>
    <div class="form-card">
      <h2>🎒 Práctica</h2>
      <p class="ac-p">Elige tu nivel. Cada ronda tiene 10 palabras.</p>
      <div class="ac-niveles" id="ac-niveles"></div>
    </div>
    <div class="form-card">
      <h2>🎯 Más juegos</h2>
      <div class="ac-niveles">
        <button class="ac-nivel" onclick="mxIniciar('cambia')"><span class="num">🔀</span><span>La tilde cambia el significado<small class="mx-desc">término, termino, terminó</small></span></button>
        <button class="ac-nivel" onclick="mxIniciar('dictado')"><span class="num">🎧</span><span>Dictado<small class="mx-desc">escucha y escribe con tilde</small></span></button>
        <button class="ac-nivel" onclick="mxIniciar('diacritica')"><span class="num">✋</span><span>Tilde diacrítica<small class="mx-desc">tú / tu, sí / si, qué / que…</small></span></button>
      </div>
    </div>
    <div class="form-card">
      <h2>🖥️ Pizarrón</h2>
      <p class="ac-p">Para explicar en el proyector: escribe cualquier palabra y el acordeón se arma paso a paso.</p>
      <button class="btn-iniciar" onclick="pzAbrir()">Abrir pizarrón</button>
    </div>
    <button class="btn-accion btn-volver" onclick="volverMenu()">← Menú</button>
  </div>

  <!-- PRÁCTICA -->
  <div id="ac-practica" class="ac-vista">
    <div class="hud">
      <div class="hud-modo" id="ac-hud-nivel"></div>
      <div class="hud-score">⭐ <span id="ac-hud-pts">0</span></div>
      <div class="hud-modo" id="ac-hud-prog"></div>
    </div>
    <div class="combo-display" id="ac-combo"></div>
    <div class="ac-pasos" id="ac-pasos"></div>
    <div class="palabra-card">
      <div class="ac-zona" id="ac-zona"></div>
      <button class="ac-oir" onclick="acOir()">🔊 Escuchar</button>
    </div>
    <div class="ac-acordeon" id="ac-acordeon"></div>
    <div class="ac-pregunta" id="ac-pregunta"></div>
    <div id="ac-opciones"></div>
    <div id="ac-extra"></div>
    <div class="explicacion-box" id="ac-coach"></div>
    <button class="btn-siguiente" id="ac-btn" style="display:none;"></button>
    <div style="margin-top:12px;"><button class="btn-accion btn-volver" onclick="acSalir()">← Salir</button></div>
  </div>

  <!-- RESULTADOS -->
  <div id="ac-final" class="ac-vista">
    <div class="final-card">
      <div class="ac-titulo" id="ac-fin-titulo">¡Ronda terminada!</div>
      <div class="ac-res">
        <div><b id="ac-fin-pts">0</b><small>puntos</small></div>
        <div><b id="ac-fin-perf">0</b><small>palabras perfectas</small></div>
        <div><b id="ac-fin-racha">0</b><small>mejor racha</small></div>
      </div>
      <div class="diagnostico-txt" id="ac-fin-diag"></div>
      <div class="pz-fila">
        <button class="btn-accion btn-guardar" onclick="acIniciarNivel(acEstado.nivel)">🔁 Repetir nivel</button>
        <button class="btn-accion btn-guardar" id="ac-fin-sig" onclick="acIniciarNivel(acEstado.nivel+1)">Siguiente nivel</button>
      </div>
      <button class="btn-accion btn-volver" onclick="acSalir()">← Mi Acordeón</button>
    </div>
  </div>

  <!-- MÁS JUEGOS -->
  <div id="ac-mas" class="ac-vista">
    <div class="hud">
      <div class="hud-modo" id="mx-titulo"></div>
      <div class="hud-score">⭐ <span id="mx-pts">0</span></div>
      <div class="hud-modo" id="mx-prog"></div>
    </div>
    <div class="combo-display" id="mx-combo"></div>
    <div class="palabra-card" id="mx-card"></div>
    <div id="mx-opc"></div>
    <div id="mx-vis"></div>
    <div class="explicacion-box" id="mx-coach"></div>
    <button class="btn-siguiente" id="mx-btn" style="display:none;"></button>
    <div style="margin-top:12px;"><button class="btn-accion btn-volver" onclick="acSalir()">← Salir</button></div>
  </div>

  <!-- PIZARRÓN -->
  <div id="ac-pizarron" class="ac-vista">
    <div class="ac-titulo">🖥️ Pizarrón del acordeón</div>
    <div class="form-card">
      <input type="text" id="pz-input" class="input-full" placeholder="Escribe la palabra bien escrita (ej. camión)" autocomplete="off" onkeydown="if(event.key==='Enter')pzArmar()">
      <div class="pz-fila">
        <button class="btn-export btn-gen-codigo" onclick="pzArmar()">🪗 Armar acordeón</button>
        <button class="btn-export btn-exp-csv" onclick="pzAzar()">🎲 Palabra al azar</button>
      </div>
      <div id="pz-silwrap" style="display:none;">
        <div class="label-mini">Sílabas (si algo está mal, corrígelo con guiones)</div>
        <input type="text" id="pz-sil" class="input-full" autocomplete="off" oninput="pzEditarSil()">
        <div class="pz-aviso" id="pz-aviso"></div>
      </div>
    </div>
    <div id="pz-escena" style="display:none;">
      <div class="pz-palabra" id="pz-palabra"></div>
      <div class="ac-acordeon" id="pz-acordeon"></div>
      <div class="pz-explica" id="pz-explica"></div>
      <div class="pz-nav">
        <button class="pz-prev" onclick="pzMover(-1)">◀ Atrás</button>
        <span class="pz-paso" id="pz-paso"></span>
        <button class="pz-next" id="pz-next" onclick="pzMover(1)">Siguiente ▶</button>
        <button class="pz-oir" onclick="acOir(pz.w && pz.w.palabra)">🔊</button>
      </div>
    </div>
    <button class="btn-accion btn-volver" onclick="acSalir()">← Mi Acordeón</button>
  </div>
</div>`;

/* ---- utilidades de pantalla ---- */
function acVista(id){
  document.querySelectorAll('#acordeon .ac-vista').forEach(v => v.classList.toggle('on', v.id === id));
  window.scrollTo(0, 0);
}
function acAbrir(){ mostrar('acordeon'); acVista('ac-inicio'); iniciarMusica('estudio'); }
function acSalir(){ acVista('ac-inicio'); }
function acCoach(html){ document.getElementById('ac-coach').innerHTML = html; }

function acOir(texto){
  const t = texto || (acEstado.w && acEstado.w.palabra);
  if(!t) return;
  if(!('speechSynthesis' in window)){ showToast('🔇 Tu navegador no tiene voz: léela en voz alta'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t);
  u.lang = 'es-MX'; u.rate = 0.75;
  const v = speechSynthesis.getVoices().find(x => /^es/i.test(x.lang));
  if(v) u.voice = v;
  speechSynthesis.speak(u);
}

/* Dibuja el acordeón. o = {silabas, tonica, final, animar, onTap} */
function acRenderAcordeon(el, w, o){
  o = o || {};
  const cols = Math.max(4, w.n);
  let html = '';
  for(let c = 0; c < cols; c++){
    const pos = cols - c;                       // 1 = última sílaba (agudas)
    const tipo = pos <= 4 ? AC_ORDEN[pos - 1] : null;
    const info = tipo ? AC_TIPOS[tipo] : null;
    const s = w.n - pos;                        // índice de la sílaba que cae aquí
    const esTon = o.tonica && s === w.t;
    let celda = '';
    if(o.silabas && s >= 0){
      const txt = o.final ? w.sil[s] : acSinTilde(w.sil[s]);
      const delay = o.animar ? (0.45 + 0.28 * (w.n - 1 - s)) : 0;
      celda = '<button class="ac-sil' + (o.animar ? ' cae' : '') + (esTon ? ' tonica' : '') + '" data-s="' + s + '" style="animation-delay:' + delay + 's">' + txt + '</button>';
    }
    html += '<div class="ac-col' + (esTon ? ' activa' : '') + (o.animar ? ' fuelle' : '') + '" style="--c:' + (info ? info.color : '#90a4ae') + ';animation-delay:' + (o.animar ? 0.07 * (cols - 1 - c) : 0) + 's">'
          + '<div class="ac-head">' + (info ? info.plural : '·') + '</div>'
          + '<div class="ac-regla">' + (info ? info.regla : '') + '</div>'
          + '<div class="ac-celda">' + celda + '</div></div>';
  }
  el.innerHTML = html;
  el.querySelectorAll('.ac-sil').forEach(b => {
    if(o.onTap) b.onclick = () => o.onTap(+b.dataset.s, b);
    else b.disabled = true;
  });
}

/* Palabra con la sílaba tónica y la tilde resaltadas */
function acPalabraFinalHTML(w){
  return w.sil.map((s, i) => {
    if(i !== w.t) return s;
    const letras = [...s].map((ch, j) => (j === w.posTilde) ? '<span class="tilde">' + ch + '</span>' : ch).join('');
    return '<span class="ton">' + letras + '</span>';
  }).join('');
}

/* ---------------- PRÁCTICA ---------------- */
const acEstado = { nivel:0, ronda:[], i:0, w:null, paso:'', fallos:0, errPal:0, puntos:0, racha:0, maxRacha:0, perfectas:0, err:{}, cortes:new Set(), bloqueo:false };

function acPintarNiveles(){
  document.getElementById('ac-niveles').innerHTML = AC_NIVELES.map((n, i) =>
    '<button class="ac-nivel" onclick="acIniciarNivel(' + i + ')"><span class="num">' + (i + 1) + '</span>' + n.nombre + '</button>').join('');
}

function acArmarRonda(k){
  let lista = [];
  AC_NIVELES[k].mezcla.forEach(([banco, cant]) => { lista = lista.concat(acMezclar(DB_ACORDEON[banco] || []).slice(0, cant)); });
  return acMezclar(lista).map(e => acAnalizar(e.split('-')));
}

function acIniciarNivel(k){
  if(k >= AC_NIVELES.length) k = 0;
  Object.assign(acEstado, { nivel:k, ronda:acArmarRonda(k), i:0, puntos:0, racha:0, maxRacha:0, perfectas:0,
    err:{ cortar:0, tonica:0, tipo:0, termina:0, regla:0, tildar:0 } });
  document.getElementById('ac-hud-nivel').innerText = 'NIVEL ' + (k + 1);
  acVista('ac-practica');
  iniciarMusica('estudio');
  acSiguientePalabra();
}

function acPasosUI(actual){
  const idx = actual === 'fin' ? AC_PASOS.length : AC_PASOS.indexOf(actual);
  document.getElementById('ac-pasos').innerHTML = AC_PASOS.map((p, i) =>
    '<span class="' + (i < idx ? 'hecho' : (i === idx ? 'actual' : '')) + '">' + (i < idx ? '✔ ' : '') + p + '</span>').join('');
}
function acPuntos(n){ acEstado.puntos += n; document.getElementById('ac-hud-pts').innerText = acEstado.puntos; }
function acLimpiarPregunta(){
  document.getElementById('ac-pregunta').innerHTML = '';
  document.getElementById('ac-opciones').innerHTML = '';
  document.getElementById('ac-extra').innerHTML = '';
  document.getElementById('ac-btn').style.display = 'none';
}

function acSiguientePalabra(){
  const E = acEstado;
  if(E.i >= E.ronda.length){ acFinal(); return; }
  E.w = E.ronda[E.i]; E.i++;
  E.errPal = 0; E.cortes = new Set();
  document.getElementById('ac-hud-prog').innerText = 'Palabra ' + E.i + ' de ' + E.ronda.length;
  acLimpiarPregunta();
  acRenderAcordeon(document.getElementById('ac-acordeon'), E.w, {});
  acPasoCortar();
}

/* Paso 1: cortar */
function acCortesCorrectos(){
  const set = new Set(); let acc = 0;
  acEstado.w.sil.slice(0, -1).forEach(s => { acc += [...s].length; set.add(acc); });
  return set;
}
function acPintarCortes(marcarBien){
  const E = acEstado, letras = [...acSinTilde(E.w.palabra)];
  let h = '<div class="ac-letras">';
  letras.forEach((l, i) => {
    h += '<span class="ac-letra">' + l + '</span>';
    if(i < letras.length - 1){
      const on = E.cortes.has(i + 1);
      h += '<button class="ac-gap' + (on ? ' on' : '') + (on && marcarBien ? ' bien' : '') + '" aria-label="Cortar aquí" onclick="acToggleCorte(' + (i + 1) + ')"' + (marcarBien ? ' disabled' : '') + '></button>';
    }
  });
  document.getElementById('ac-zona').innerHTML = h + '</div>';
}
function acToggleCorte(p){
  if(acEstado.paso !== 'cortar') return;
  acEstado.cortes.has(p) ? acEstado.cortes.delete(p) : acEstado.cortes.add(p);
  acPintarCortes(false);
}
function acPasoCortar(){
  const E = acEstado;
  E.paso = 'cortar'; E.fallos = 0;
  acPasosUI('Cortar');
  acPintarCortes(false);
  acCoach('✂️ <b>Paso 1 · Cortar.</b> Toca entre las letras para separar la palabra en sílabas. Si dudas, escúchala con 🔊 y cuenta los golpes de voz.');
  document.getElementById('ac-opciones').innerHTML = '<div class="ac-opciones" style="grid-template-columns:1fr;"><button class="opt" onclick="acComprobarCortes()">Comprobar</button></div>';
}
function acComprobarCortes(){
  const E = acEstado;
  if(E.paso !== 'cortar') return;
  const ok = acCortesCorrectos();
  const igual = ok.size === E.cortes.size && [...ok].every(x => E.cortes.has(x));
  if(igual){
    sfxCorrecto();
    if(E.fallos === 0) acPuntos(10);
    acPasoAcomodar();
    return;
  }
  sfxIncorrecto();
  E.fallos++; E.errPal++; E.err.cortar++;
  if(E.fallos === 1){
    acCoach('🤔 Todavía no. Recuerda: cada sílaba tiene <b>una vocal o un grupo de vocales que suenan juntas</b>. Las letras <b>ch, ll, rr</b> nunca se separan.');
  } else if(E.fallos === 2){
    acCoach('💡 Pista: la palabra tiene <b>' + E.w.n + ' sílabas</b>. Tú marcaste ' + (E.cortes.size + 1) + '.');
  } else {
    E.cortes = ok;
    acPintarCortes(true);
    acCoach('📖 Así se separa: <b>' + E.w.sil.map(acSinTilde).join(' - ') + '</b>. Sigamos.');
    E.paso = 'esperando';
    setTimeout(acPasoAcomodar, 2200);
  }
}

/* Paso 2: acomodar (automático, con el fuelle) */
function acPasoAcomodar(){
  const E = acEstado;
  E.paso = 'acomodar';
  acPasosUI('Acomodar');
  acLimpiarPregunta();
  document.getElementById('ac-zona').innerHTML = '<div class="ac-chips">' + E.w.sil.map(acSinTilde).join('<i>|</i>') + '</div>';
  acCoach('🪗 <b>Paso 2 · Acomodar.</b> Cada sílaba cae en su columna, de derecha a izquierda: la última siempre queda en <b>Agudas</b>.');
  acRenderAcordeon(document.getElementById('ac-acordeon'), E.w, { silabas:true, animar:true });
  setTimeout(acPasoTonica, 900 + 280 * E.w.n);
}

/* Paso 3: sílaba tónica */
function acPasoTonica(){
  const E = acEstado;
  E.paso = 'tonica'; E.fallos = 0;
  acPasosUI('Tónica');
  document.getElementById('ac-pregunta').innerText = '¿Cuál es la sílaba tónica?';
  acCoach('💪 <b>Paso 3 · Sílaba tónica.</b> Di la palabra en voz alta (o toca 🔊) y toca la sílaba que suena <b>más fuerte</b>.');
  acRenderAcordeon(document.getElementById('ac-acordeon'), E.w, { silabas:true, onTap:acTocarSilaba });
}
function acTocarSilaba(s, btn){
  const E = acEstado;
  if(E.paso !== 'tonica') return;
  if(s === E.w.t){
    sfxCorrecto();
    if(E.fallos === 0) acPuntos(10);
    acMarcarTonica();
    return;
  }
  sfxIncorrecto();
  E.fallos++; E.errPal++; E.err.tonica++;
  btn.classList.remove('mal'); void btn.offsetWidth; btn.classList.add('mal');
  if(E.fallos === 1){
    acCoach('🤔 Esa no. Truco: di la palabra como si llamaras a alguien de lejos, «¡' + acSinTilde(E.w.palabra) + '!», y fíjate dónde se alarga la voz.');
  } else {
    acCoach('📖 La sílaba tónica es <b>«' + acSinTilde(E.w.sil[E.w.t]) + '»</b>. Escúchala otra vez con 🔊.');
    E.paso = 'esperando';
    setTimeout(acMarcarTonica, 1800);
  }
}
function acMarcarTonica(){
  const E = acEstado;
  acRenderAcordeon(document.getElementById('ac-acordeon'), E.w, { silabas:true, tonica:true });
  acPasoTipo();
}

/* Paso 4: la regla (tipo → terminación → ¿lleva tilde?) */
function acPreguntar(texto, opciones, correcta, clave, pista, alAcertar){
  const E = acEstado;
  E.paso = clave; E.fallos = 0;
  document.getElementById('ac-pregunta').innerHTML = texto;
  const cont = document.createElement('div');
  cont.className = 'ac-opciones';
  opciones.forEach(([etq, val]) => {
    const b = document.createElement('button');
    b.className = 'opt'; b.innerHTML = etq;
    b.onclick = () => {
      if(E.paso !== clave) return;
      if(val === correcta){
        sfxCorrecto();
        b.classList.add('correct');
        if(E.fallos === 0) acPuntos(10);
        E.paso = 'esperando';
        setTimeout(alAcertar, 650);
      } else {
        sfxIncorrecto();
        b.classList.add('incorrect'); b.disabled = true;
        E.fallos++; E.errPal++; E.err[clave]++;
        acCoach(pista);
        if(E.fallos >= 2){
          cont.querySelectorAll('.opt').forEach(x => { if(x.dataset.v === String(correcta)) x.classList.add('show-correct'); });
          E.paso = 'esperando';
          setTimeout(alAcertar, 1900);
        }
      }
    };
    b.dataset.v = String(val);
    cont.appendChild(b);
  });
  const op = document.getElementById('ac-opciones');
  op.innerHTML = ''; op.appendChild(cont);
}

function acPasoTipo(){
  const E = acEstado, w = E.w;
  acPasosUI('Regla');
  acCoach('📏 <b>Paso 4 · La regla.</b> La sílaba tónica quedó en la columna iluminada. Lee su título.');
  acPreguntar('¿Qué tipo de palabra es?',
    AC_ORDEN.map(t => [AC_TIPOS[t].nombre[0].toUpperCase() + AC_TIPOS[t].nombre.slice(1), t]),
    w.tipo, 'tipo',
    '💡 Mira el título de la columna donde quedó la sílaba tónica.',
    () => (w.tipo === 'aguda' || w.tipo === 'grave') ? acPasoTermina() : acPasoRegla());
}
function acPasoTermina(){
  const w = acEstado.w;
  acCoach('🔎 Las ' + AC_TIPOS[w.tipo].plural.toLowerCase() + ' dependen de la <b>última letra</b>.');
  acPreguntar('¿En qué termina «' + acSinTilde(w.palabra) + '»?',
    [['En vocal','vocal'],['En N','n'],['En S','s'],['En otra consonante','otra']],
    w.termina, 'termina',
    '💡 Fíjate en la última letra: «' + acSinTilde(w.palabra).slice(-1) + '».',
    acPasoRegla);
}
function acPasoRegla(){
  const w = acEstado.w, info = AC_TIPOS[w.tipo];
  const fin = { vocal:'en vocal', n:'en N', s:'en S', otra:'en otra consonante' }[w.termina];
  acCoach('📏 Regla de las <b>' + info.plural.toLowerCase() + '</b>: ' + info.regla + '.');
  const pista = (w.tipo === 'aguda' || w.tipo === 'grave')
    ? '💡 Es ' + info.nombre + ' y termina ' + fin + '. Vuelve a leer la regla de su columna.'
    : '💡 Las ' + info.plural.toLowerCase() + ' llevan tilde <b>siempre</b>.';
  acPreguntar('Según la regla, ¿lleva tilde?', [['Sí lleva', true], ['No lleva', false]],
    w.reglaDice, 'regla', pista, () => w.rompe ? acRompeRegla() : acPasoTildar());
}
function acRompeRegla(){
  const w = acEstado.w;
  acLimpiarPregunta();
  const texto = w.hiato
    ? 'La regla dice que no, pero aquí hay un <b>hiato acentual</b>: la vocal débil (<b>i</b> o <b>u</b>) es la que suena fuerte junto a una vocal fuerte (a, e, o). Por eso quedan en sílabas distintas, y esa vocal débil <b>siempre lleva tilde</b>, diga lo que diga la regla.'
    : 'Esta palabra es una <b>excepción</b> a la regla general: lleva tilde aunque la regla diga que no.';
  document.getElementById('ac-extra').innerHTML = '<div class="ac-jefe"><h3>🚨 ¡Rompe la regla!</h3>' + texto + '</div>';
  acCoach('🧠 Este caso hay que recordarlo aparte. ¡Es el jefe final de las tildes!');
  const b = document.getElementById('ac-btn');
  b.innerText = '¡Entendido!'; b.style.display = 'inline-block';
  b.onclick = () => { document.getElementById('ac-extra').innerHTML = ''; acPasoTildar(); };
}

/* Paso 5: tildar */
function acPasoTildar(){
  const E = acEstado, w = E.w;
  acLimpiarPregunta();
  acPasosUI('Tildar');
  if(!w.lleva){
    acCoach('✔ Según la regla, <b>«' + w.palabra + '» no lleva tilde</b>.');
    acPalabraLista();
    return;
  }
  E.paso = 'tildar'; E.fallos = 0;
  document.getElementById('ac-pregunta').innerText = '¿Sobre qué vocal va la tilde?';
  acCoach('✍️ <b>Paso 5 · Tildar.</b> La tilde va en la sílaba tónica «' + acSinTilde(w.sil[w.t]) + '». Toca la vocal que la lleva.');
  const letras = [...acSinTilde(w.sil[w.t])];
  document.getElementById('ac-opciones').innerHTML = '<div class="ac-vocales">' + letras.map((l, j) =>
    '<button class="ac-vocal' + ('aeiou'.includes(l) ? '' : ' cons') + '" onclick="acTocarVocal(' + j + ',this)">' + l + '</button>').join('') + '</div>';
}
function acTocarVocal(j, btn){
  const E = acEstado, w = E.w;
  if(E.paso !== 'tildar') return;
  if(j === w.posTilde){
    sfxCorrecto();
    if(E.fallos === 0) acPuntos(10);
    btn.innerText = w.sil[w.t][j]; btn.classList.add('correct');
    E.paso = 'esperando';
    setTimeout(acPalabraLista, 600);
    return;
  }
  sfxIncorrecto();
  E.fallos++; E.errPal++; E.err.tildar++;
  btn.classList.add('incorrect'); btn.disabled = true;
  if(!'aeiou'.includes(btn.innerText)){
    acCoach('💡 La tilde solo se escribe sobre una <b>vocal</b>.');
  } else if(E.fallos === 1){
    acCoach('💡 Cuando hay dos vocales juntas, la tilde va en la que suena más fuerte. Escúchala con 🔊.');
  }
  if(E.fallos >= 2){
    acCoach('📖 La tilde va sobre la <b>«' + w.sil[w.t][w.posTilde] + '»</b>.');
    E.paso = 'esperando';
    setTimeout(acPalabraLista, 1800);
  }
}

function acPalabraLista(){
  const E = acEstado, w = E.w;
  E.paso = 'lista';
  acLimpiarPregunta();
  acPasosUI('fin');
  document.getElementById('ac-zona').innerHTML = '<div class="ac-final">' + acPalabraFinalHTML(w) + '</div>';
  acRenderAcordeon(document.getElementById('ac-acordeon'), w, { silabas:true, tonica:true, final:true });
  const combo = document.getElementById('ac-combo');
  if(E.errPal === 0){
    E.perfectas++; E.racha++; E.maxRacha = Math.max(E.maxRacha, E.racha);
    acPuntos(20 + (E.racha >= 3 ? 10 * E.racha : 0));
    combo.innerText = E.racha >= 2 ? '🔥 ' + E.racha + ' acordeones perfectos seguidos' : '';
    if(E.racha >= 3 && typeof mostrarComboSplash === 'function') mostrarComboSplash('🔥 x' + E.racha);
    acCoach('🎉 <b>¡Acordeón perfecto!</b> «' + w.palabra + '» es ' + AC_TIPOS[w.tipo].nombre + (w.lleva ? ' y lleva tilde.' : ' y no lleva tilde.'));
  } else {
    E.racha = 0; combo.innerText = '';
    acCoach('✅ Listo: «<b>' + w.palabra + '</b>» es ' + AC_TIPOS[w.tipo].nombre + '. La próxima sin errores para sumar racha.');
  }
  const b = document.getElementById('ac-btn');
  b.innerText = E.i >= E.ronda.length ? 'Ver resultados' : 'Siguiente palabra';
  b.style.display = 'inline-block';
  b.onclick = acSiguientePalabra;
}

function acFinal(){
  const E = acEstado;
  document.getElementById('ac-fin-pts').innerText = E.puntos;
  document.getElementById('ac-fin-perf').innerText = E.perfectas + '/' + E.ronda.length;
  document.getElementById('ac-fin-racha').innerText = E.maxRacha;
  document.getElementById('ac-fin-titulo').innerText = E.perfectas >= 9 ? '¡Maestro del acordeón!' : (E.perfectas >= 6 ? '¡Muy bien!' : '¡Ronda terminada!');
  let peor = null, max = 0;
  for(const k in E.err){ if(E.err[k] > max){ max = E.err[k]; peor = k; } }
  document.getElementById('ac-fin-diag').innerText = peor ? '📌 Para reforzar: ' + AC_DIAG[peor] + '.' : '🌟 ¡Sin un solo error!';
  const sig = document.getElementById('ac-fin-sig');
  sig.style.display = E.nivel < AC_NIVELES.length - 1 ? 'inline-block' : 'none';
  acVista('ac-final');
}

/* ---------------- PIZARRÓN ---------------- */
const pz = { w:null, paso:0, palabra:'' };
const PZ_TITULOS = ['La palabra','Separamos en sílabas','Acomodamos en el acordeón','Sílaba tónica','¿Qué dice la regla?','Veredicto','¡Así se escribe!'];

function pzAbrir(){
  acVista('ac-pizarron');
  document.getElementById('pz-input').focus();
}
function pzArmar(){
  const v = document.getElementById('pz-input').value.trim().toLowerCase();
  if(!v){ showToast('✏️ Escribe una palabra'); return; }
  if(!/^[a-záéíóúüñ]+$/.test(v)){ showToast('✏️ Escribe una sola palabra, solo con letras'); return; }
  pz.palabra = v;
  const sil = acSilabear(v);
  document.getElementById('pz-sil').value = sil.join('-');
  document.getElementById('pz-silwrap').style.display = 'block';
  pzCargar(sil);
}
function pzAzar(){
  const todas = [].concat(...Object.values(DB_ACORDEON));
  const e = todas[Math.floor(Math.random() * todas.length)];
  pz.palabra = e.replace(/-/g, '');
  document.getElementById('pz-input').value = pz.palabra;
  document.getElementById('pz-sil').value = e;
  document.getElementById('pz-silwrap').style.display = 'block';
  pzCargar(e.split('-'));
}
function pzEditarSil(){
  const sil = document.getElementById('pz-sil').value.toLowerCase().split('-').map(s => s.trim()).filter(Boolean);
  if(sil.join('') !== pz.palabra){
    document.getElementById('pz-aviso').innerText = '⚠️ Las sílabas deben formar exactamente «' + pz.palabra + '».';
    return;
  }
  pzCargar(sil, true);
}
function pzCargar(sil, mantenerPaso){
  const aviso = document.getElementById('pz-aviso');
  const palabra = sil.join('');
  const avisos = [];
  if(sil.length === 1){
    aviso.innerText = '☝️ Es monosílaba: no lleva tilde, salvo la tilde diacrítica (tú, él, sí, más…). Prueba con otra palabra.';
    document.getElementById('pz-escena').style.display = 'none';
    return;
  }
  if((palabra.match(/[áéíóú]/g) || []).length > 1) avisos.push('⚠️ Tiene más de una tilde: revisa cómo la escribiste.');
  if(/[aeiouáéíóúü]{2}/.test(palabra)) avisos.push('👀 Tiene vocales juntas: confirma si es diptongo (misma sílaba) o hiato (sílabas separadas) y corrige con guiones si hace falta.');
  if(!/[áéíóú]/.test(palabra)) avisos.push('ℹ️ Sin tilde escrita, tomo la sílaba tónica según la regla. Si la palabra lleva tilde, escríbela con ella.');
  aviso.innerHTML = avisos.join('<br>');
  pz.w = acAnalizar(sil);
  if(!mantenerPaso) pz.paso = 0;
  document.getElementById('pz-escena').style.display = 'block';
  pzPintar(false);
}
function pzMover(d){
  if(!pz.w) return;
  const nuevo = Math.min(PZ_TITULOS.length - 1, Math.max(0, pz.paso + d));
  if(nuevo === pz.paso) return;
  pz.paso = nuevo;
  pzPintar(d > 0);
  if(d > 0) sfxCorrecto();
}
function pzPintar(avanzando){
  const w = pz.w, p = pz.paso, info = AC_TIPOS[w.tipo];
  const pal = document.getElementById('pz-palabra');
  const acc = document.getElementById('pz-acordeon');
  const exp = document.getElementById('pz-explica');
  document.getElementById('pz-paso').innerText = 'Paso ' + (p + 1) + ' de ' + PZ_TITULOS.length + ': ' + PZ_TITULOS[p];
  document.getElementById('pz-next').style.visibility = p === PZ_TITULOS.length - 1 ? 'hidden' : 'visible';

  if(p === 0) pal.innerText = acSinTilde(w.palabra);
  else if(p < 6) pal.innerHTML = w.sil.map(acSinTilde).join('<i>|</i>');
  else pal.innerHTML = acPalabraFinalHTML(w);

  acRenderAcordeon(acc, w, {
    silabas: p >= 2,
    animar: p === 2 && avanzando,
    tonica: p >= 3,
    final: p === 6
  });

  const fin = { vocal:'en vocal', n:'en N', s:'en S', otra:'en «' + acSinTilde(w.palabra).slice(-1) + '» (otra consonante)' }[w.termina];
  const textos = [
    '¿Lleva tilde o no? Vamos a averiguarlo con el acordeón.',
    'Tiene <b>' + w.n + ' sílabas</b>.',
    'Cada sílaba va a su columna, de derecha a izquierda. La última siempre cae en <b>Agudas</b>.',
    'La que suena más fuerte es <b>«' + acSinTilde(w.sil[w.t]) + '»</b>: quedó en la columna de las <b>' + info.plural.toLowerCase() + '</b>.',
    'Es palabra <b>' + info.nombre + '</b>' + ((w.tipo === 'aguda' || w.tipo === 'grave') ? ' y termina ' + fin : '') + '. Regla: ' + info.regla + '. Según la regla, <b>' + (w.reglaDice ? 'SÍ lleva tilde' : 'NO lleva tilde') + '</b>.',
    w.rompe
      ? '<div class="ac-jefe"><h3>🚨 ¡Rompe la regla!</h3>' + (w.hiato
          ? 'Hay un <b>hiato acentual</b>: la vocal débil (i, u) suena fuerte junto a una fuerte (a, e, o). Esa vocal débil <b>siempre</b> lleva tilde.'
          : 'Es una <b>excepción</b> a la regla general.') + '</div>'
      : (w.lleva ? '✍️ Lleva tilde en la sílaba <b>«' + w.sil[w.t] + '»</b>.' : '✔ <b>No lleva tilde.</b>'),
    'Se escribe <b>' + w.palabra + '</b>: palabra ' + info.nombre + (w.lleva ? ' con tilde.' : ' sin tilde.')
  ];
  exp.innerHTML = textos[p];
}

/* ---------------- MÁS JUEGOS: cambia el significado, dictado, diacrítica ---------------- */
const MX_MODOS = {
  cambia:     { titulo:'LA TILDE CAMBIA', total:8 },
  dictado:    { titulo:'DICTADO', total:10 },
  diacritica: { titulo:'DIACRÍTICA', total:10 }
};
const mx = { modo:'', items:[], i:0, pts:0, aciertos:0, racha:0, maxRacha:0, listo:false, item:null };

function acExplicar(w){
  const info = AC_TIPOS[w.tipo];
  const fin = { vocal:'en vocal', n:'en N', s:'en S', otra:'en otra consonante' }[w.termina];
  let t = '«<b>' + w.palabra + '</b>» es palabra <b>' + info.nombre + '</b> (sílaba tónica: «' + w.sil[w.t] + '»)';
  if(w.tipo === 'aguda' || w.tipo === 'grave') t += ' y termina ' + fin;
  t += '. Regla: ' + info.regla + '.';
  if(w.rompe) t += w.hiato ? ' 🚨 Pero tiene <b>hiato acentual</b>: rompe la regla y lleva tilde.' : ' 🚨 Es una excepción a la regla.';
  return t;
}
function mxCap(palabra, frase){ return /^[¿¡]?___/.test(frase) ? palabra.charAt(0).toUpperCase() + palabra.slice(1) : palabra; }
function mxFrase(frase, relleno){ return frase.replace('___', relleno); }
function mxEl(id){ return document.getElementById(id); }

function mxArmar(modo){
  if(modo === 'cambia'){
    return acMezclar(DB_CAMBIA).slice(0, MX_MODOS.cambia.total).map(g => {
      const k = Math.floor(Math.random() * g.formas.length);
      return { g, k, frase:g.frases[k] };
    });
  }
  if(modo === 'diacritica'){
    let todas = [];
    DB_DIACRITICA.forEach(p => p.frases.forEach(([frase, cual]) => todas.push({ p, frase, cual })));
    // máximo 2 frases del mismo par por ronda
    const cuenta = {}, ronda = [];
    acMezclar(todas).forEach(x => { cuenta[x.p.con] = (cuenta[x.p.con] || 0); if(cuenta[x.p.con] < 2 && ronda.length < MX_MODOS.diacritica.total){ cuenta[x.p.con]++; ronda.push(x); } });
    return ronda;
  }
  const todas = [].concat(...Object.values(DB_ACORDEON));
  return acMezclar(todas).slice(0, MX_MODOS.dictado.total).map(e => ({ w:acAnalizar(e.split('-')) }));
}

function mxIniciar(modo){
  Object.assign(mx, { modo, items:mxArmar(modo), i:0, pts:0, aciertos:0, racha:0, maxRacha:0 });
  mxEl('mx-titulo').innerText = MX_MODOS[modo].titulo;
  mxEl('mx-pts').innerText = '0';
  mxEl('mx-combo').innerText = '';
  acVista('ac-mas');
  iniciarMusica('estudio');
  mxSiguiente();
}
function mxLimpiar(){
  ['mx-card','mx-opc','mx-vis','mx-coach'].forEach(id => mxEl(id).innerHTML = '');
  mxEl('mx-btn').style.display = 'none';
}
function mxSiguiente(){
  if(mx.i >= mx.items.length){ mxFinal(); return; }
  mx.item = mx.items[mx.i]; mx.i++; mx.listo = false;
  mxEl('mx-prog').innerText = mx.i + ' de ' + mx.items.length;
  mxLimpiar();
  if(mx.modo === 'cambia') mxPintarCambia();
  else if(mx.modo === 'diacritica') mxPintarDiacritica();
  else mxPintarDictado();
}
function mxResultado(ok){
  mx.listo = true;
  if(ok){
    sfxCorrecto();
    mx.aciertos++; mx.racha++; mx.maxRacha = Math.max(mx.maxRacha, mx.racha);
    mx.pts += 20 + (mx.racha >= 3 ? 10 * mx.racha : 0);
    if(mx.racha >= 3 && typeof mostrarComboSplash === 'function') mostrarComboSplash('🔥 x' + mx.racha);
  } else { sfxIncorrecto(); mx.racha = 0; }
  mxEl('mx-pts').innerText = mx.pts;
  mxEl('mx-combo').innerText = mx.racha >= 2 ? '🔥 Racha x' + mx.racha : '';
  const b = mxEl('mx-btn');
  b.innerText = mx.i >= mx.items.length ? 'Ver resultados' : 'Siguiente';
  b.style.display = 'inline-block';
  b.onclick = mxSiguiente;
}
function mxOpciones(lista, alElegir){
  const cont = document.createElement('div');
  cont.className = 'ac-opciones';
  if(lista.length === 1) cont.style.gridTemplateColumns = '1fr';
  lista.forEach(([etq, val]) => {
    const b = document.createElement('button');
    b.className = 'opt'; b.innerText = etq; b.dataset.v = String(val);
    b.onclick = () => { if(mx.listo) return; alElegir(val, b, cont); };
    cont.appendChild(b);
  });
  mxEl('mx-opc').innerHTML = ''; mxEl('mx-opc').appendChild(cont);
}
function mxMarcar(cont, correcta, btn, ok){
  cont.querySelectorAll('.opt').forEach(x => { x.disabled = true; if(x.dataset.v === String(correcta)) x.classList.add(ok ? 'correct' : 'show-correct'); });
  if(!ok) btn.classList.add('incorrect');
}

/* 1) La tilde cambia el significado */
function mxPintarCambia(){
  const { g, frase } = mx.item;
  mxEl('mx-card').innerHTML = '<div class="mx-frase">' + mxFrase(frase, '<span class="mx-hueco">______</span>') + '</div>';
  mxEl('mx-coach').innerHTML = '🔀 Las tres se escriben con las mismas letras. ¿Cuál completa la frase?';
  const ops = acMezclar(g.formas.map((f, k) => [mxCap(f[0].replace(/-/g, ''), frase), k]));
  mxOpciones(ops, (val, btn, cont) => {
    const ok = val === mx.item.k;
    mxMarcar(cont, mx.item.k, btn, ok);
    const correcta = mxCap(g.formas[mx.item.k][0].replace(/-/g, ''), frase);
    mxEl('mx-card').innerHTML = '<div class="mx-frase">' + mxFrase(frase, '<b class="mx-ok">' + correcta + '</b>') + '</div>';
    let h = '<div class="mx-comp">';
    g.formas.forEach((f, k) => {
      const w = acAnalizar(f[0].split('-'));
      h += '<div class="mx-fila' + (k === mx.item.k ? ' ok' : '') + '"><div class="mx-pal">' + acPalabraFinalHTML(w) + '</div>'
         + '<div class="mx-sig">' + f[1] + ' · <i>' + AC_TIPOS[w.tipo].nombre + '</i></div>'
         + '<div class="ac-acordeon ac-mini" id="mx-acc-' + k + '"></div></div>';
    });
    mxEl('mx-vis').innerHTML = h + '</div>';
    g.formas.forEach((f, k) => acRenderAcordeon(mxEl('mx-acc-' + k), acAnalizar(f[0].split('-')), { silabas:true, tonica:true, final:true }));
    mxEl('mx-coach').innerHTML = (ok ? '🎯 ¡Exacto! ' : '❌ Aquí va «<b>' + correcta + '</b>». ')
      + 'Mira los acordeones: las letras son las mismas, pero la sílaba tónica cambia de columna… y con ella cambia el significado.';
    mxResultado(ok);
  });
}

/* 2) Dictado */
function mxDecir(lento){
  const w = mx.item && mx.item.w;
  if(!w) return;
  if(!('speechSynthesis' in window)){ showToast('🔇 Este dispositivo no tiene voz'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(w.palabra);
  u.lang = 'es-MX'; u.rate = lento ? 0.5 : 0.8;
  const v = speechSynthesis.getVoices().find(x => /^es/i.test(x.lang));
  if(v) u.voice = v;
  speechSynthesis.speak(u);
}
function mxTecla(c){
  const inp = mxEl('mx-input');
  if(!inp || inp.disabled) return;
  const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? inp.value.length;
  inp.value = inp.value.slice(0, a) + c + inp.value.slice(b);
  inp.focus(); inp.setSelectionRange(a + 1, a + 1);
}
function mxPintarDictado(){
  const sinVoz = !('speechSynthesis' in window);
  mxEl('mx-card').innerHTML =
    '<div class="pz-fila"><button class="mx-oir-grande" onclick="mxDecir(false)">🔊 Escuchar</button>'
    + '<button class="ac-oir" onclick="mxDecir(true)">🐢 Más lento</button></div>'
    + '<input type="text" id="mx-input" class="input-full mx-input" placeholder="Escribe la palabra" autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key===\'Enter\')mxRevisarDictado()">'
    + '<div class="mx-teclas">' + ['á','é','í','ó','ú','ü','ñ'].map(c => '<button onclick="mxTecla(\'' + c + '\')">' + c + '</button>').join('') + '</div>'
    + (sinVoz ? '<div class="pz-aviso">🔇 Este dispositivo no tiene voz. Pide a alguien que te dicte: <button class="ac-oir" onclick="this.outerHTML=\'<b>\'+mx.item.w.palabra+\'</b>\'">👀 Mostrar a quien dicta</button></div>' : '');
  mxEl('mx-coach').innerHTML = '🎧 Escucha la palabra y escríbela. Cuida la tilde: si la lleva, ¡ponla!';
  mxOpciones([['Revisar', 'r']], () => mxRevisarDictado());
  if(!sinVoz) setTimeout(() => mxDecir(false), 350);
}
function mxRevisarDictado(){
  if(mx.listo) return;
  const inp = mxEl('mx-input');
  const r = inp.value.trim().toLowerCase();
  if(!r){ showToast('✏️ Escribe la palabra primero'); return; }
  const w = mx.item.w;
  const ok = r === w.palabra;
  const casi = !ok && acSinTilde(r) === acSinTilde(w.palabra);
  inp.disabled = true;
  mxEl('mx-opc').innerHTML = '';
  mxEl('mx-card').innerHTML = '<div class="mx-tu">Escribiste: <b class="' + (ok ? 'mx-ok' : 'mx-mal') + '">' + r + '</b></div>'
    + '<div class="ac-final">' + acPalabraFinalHTML(w) + '</div>';
  mxEl('mx-vis').innerHTML = '<div class="ac-acordeon" id="mx-acc-d"></div>';
  acRenderAcordeon(mxEl('mx-acc-d'), w, { silabas:true, tonica:true, final:true, animar:true });
  const inicio = ok ? '🎉 ¡Perfecto! ' : (casi ? '🤏 ¡Casi! Las letras están bien, pero la tilde no. ' : '❌ Se escribe así. ');
  mxEl('mx-coach').innerHTML = inicio + acExplicar(w);
  mxResultado(ok);
}

/* 3) Tilde diacrítica */
function mxPintarDiacritica(){
  const { p, frase, cual } = mx.item;
  mxEl('mx-card').innerHTML = '<div class="mx-frase">' + mxFrase(frase, '<span class="mx-hueco">____</span>') + '</div>';
  mxEl('mx-coach').innerHTML = '✋ Se escriben igual, pero no significan lo mismo. ¿Cuál va aquí?';
  const ops = acMezclar([[mxCap(p.con, frase), 'con'], [mxCap(p.sin, frase), 'sin']]);
  mxOpciones(ops, (val, btn, cont) => {
    const ok = val === cual;
    mxMarcar(cont, cual, btn, ok);
    const correcta = mxCap(cual === 'con' ? p.con : p.sin, frase);
    mxEl('mx-card').innerHTML = '<div class="mx-frase">' + mxFrase(frase, '<b class="mx-ok">' + correcta + '</b>') + '</div>';
    mxEl('mx-vis').innerHTML = '<div class="mx-comp">'
      + '<div class="mx-fila' + (cual === 'con' ? ' ok' : '') + '"><div class="mx-pal">' + p.con + '</div><div class="mx-sig">' + p.conSig + '</div></div>'
      + '<div class="mx-fila' + (cual === 'sin' ? ' ok' : '') + '"><div class="mx-pal">' + p.sin + '</div><div class="mx-sig">' + p.sinSig + '</div></div></div>';
    const sig = cual === 'con' ? p.conSig : p.sinSig;
    mxEl('mx-coach').innerHTML = (ok ? '🎯 ¡Correcto! ' : '❌ Aquí va «<b>' + correcta + '</b>». ')
      + 'En esta frase es ' + sig + '. Esta tilde se llama <b>diacrítica</b>: sirve para distinguir palabras que se escriben igual.';
    mxResultado(ok);
  });
}

function mxFinal(){
  mxLimpiar();
  const n = mx.items.length;
  const titulo = mx.aciertos === n ? '¡Ronda perfecta!' : (mx.aciertos >= n * 0.7 ? '¡Muy bien!' : '¡Ronda terminada!');
  mxEl('mx-card').innerHTML = '<div class="ac-titulo">' + titulo + '</div><div class="ac-res">'
    + '<div><b>' + mx.pts + '</b><small>puntos</small></div>'
    + '<div><b>' + mx.aciertos + '/' + n + '</b><small>aciertos</small></div>'
    + '<div><b>' + mx.maxRacha + '</b><small>mejor racha</small></div></div>';
  mxEl('mx-opc').innerHTML = '<div class="pz-fila"><button class="btn-accion btn-guardar" onclick="mxIniciar(mx.modo)">🔁 Otra ronda</button>'
    + '<button class="btn-accion btn-volver" onclick="acSalir()">← Mi Acordeón</button></div>';
  mxEl('mx-prog').innerText = '';
}

/* ---------------- 3. MONTAJE EN LA PÁGINA ---------------- */
function acMontar(){
  const st = document.createElement('style'); st.textContent = AC_CSS; document.head.appendChild(st);
  const sec = document.createElement('div'); sec.id = 'acordeon'; sec.className = 'screen'; sec.innerHTML = AC_HTML;
  const juego = document.getElementById('juego');
  juego.parentNode.insertBefore(sec, juego);
  // Botón en el menú
  const btnDoc = document.querySelector('#menu .btn-docente');
  const btn = document.createElement('button');
  btn.className = 'btn-menu btn-acordeon'; btn.innerText = '🪗 Mi Acordeón';
  btn.onclick = acAbrir;
  btnDoc.parentNode.insertBefore(btn, btnDoc);
  acPintarNiveles();

  // mostrar() también debe ocultar la pantalla del acordeón
  const mostrarOriginal = window.mostrar;
  window.mostrar = function(id){
    sec.classList.remove('active'); sec.style.display = 'none';
    if(id === 'acordeon'){ mostrarOriginal('menu'); document.getElementById('menu').style.display = 'none'; document.getElementById('menu').classList.remove('active'); sec.style.display = 'block'; sec.classList.add('active'); }
    else mostrarOriginal(id);
  };

  /* ---- Modo RETO: 40 preguntas ---- */
  window.RETO_PREGUNTAS = 40;
  document.querySelectorAll('#btnTipoReto small').forEach(s => s.innerText = RETO_PREGUNTAS + ' preguntas, con tiempo');
  window.pregunta = function(){
    if(tipoPartida === 'reto' && indicePartida >= RETO_PREGUNTAS){ terminarReto(); return; }
    if(indicePartida > 0 && indicePartida % poolPartida.length === 0){ poolPartida = mezclar(poolActual()); }
    current = poolPartida[indicePartida % poolPartida.length];
    indicePartida++;
    document.getElementById('palabra').innerText = current.p.replace(/_.*/, '');
    document.getElementById('categoria').innerText = current.cat;
    document.getElementById('explicacion-cat').innerHTML = getExplicacionPre(current.cat);
    document.getElementById('feedback').innerText = '';
    document.getElementById('explicacion-box').innerHTML = '';
    document.getElementById('btnSiguiente').style.display = 'none';
    document.getElementById('progreso-reto').innerText = tipoPartida === 'reto' ? ('Pregunta ' + indicePartida + ' de ' + RETO_PREGUNTAS) : '';
    const box = document.getElementById('opciones');
    box.innerHTML = '';
    opcionesDe(current).forEach(o => {
      const b = document.createElement('button');
      b.className = 'opt'; b.innerText = o.trim();
      b.onclick = () => check(o.trim(), b);
      box.appendChild(b);
    });
    document.getElementById('hud-score').innerText = score;
    if(tipoPartida === 'reto'){ document.getElementById('hud-vidas').innerText = '❤'.repeat(Math.max(0, vidas)); startTimer(); }
  };
  window.terminarReto = function(){
    const total = RETO_PREGUNTAS;
    const calificacion = ((aciertosReto / total) * 10).toFixed(1);
    document.getElementById('score-final').innerText = score;
    document.getElementById('calif-final').innerText = 'Calificación: ' + calificacion + ' / 10  (' + aciertosReto + '/' + total + ')';
    document.getElementById('diagnostico-final').innerText = diagnostico();
    const nom = document.getElementById('nombre').value.trim() || 'Alumno';
    const grp = document.getElementById('grupo').value.trim() || '—';
    db.collection('sesiones').doc(codigoSesionActual).collection('resultados').add({
      nombre:nom, grupo:grp, modo:modoContenido,
      aciertos:aciertosReto, total:total, calificacion:parseFloat(calificacion),
      score:score, maxRacha:maxRacha, diagnostico:diagnostico(),
      fecha:new Date().toLocaleDateString('es-MX') + ' ' + new Date().toLocaleTimeString('es-MX')
    }).then(() => { showToast('✅ Resultado enviado a tu profe'); }).catch(() => { showToast('⚠️ No se pudo guardar. Revisa tu internet.'); });
    mostrar('final');
  };
}

if(typeof document !== 'undefined'){
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', acMontar);
  else acMontar();
}
