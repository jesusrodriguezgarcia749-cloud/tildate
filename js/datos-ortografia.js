/* ==========================================================
   BANCO DE PALABRAS — MODO ORTOGRAFÍA (B/V/S/Z/C/G/J/H/LL/Y/X)
   Reglas tomadas del libro de Expresión Oral y Escrita, ITES
   René Descartes. Vocabulario general + cocina + comunicación.
=========================================================== */
const DB_ORTO=[
  // B
  {p:'estava',ok:'estaba',d:['estava','hestaba'],cat:'B'},
  {p:'devia',ok:'debía',d:['devia','deviá'],cat:'B'},
  {p:'ervir',ok:'hervir',d:['ervir','herbir'],cat:'B'},
  {p:'iblioteca',ok:'biblioteca',d:['viblioteca','bibliotéca'],cat:'B'},
  {p:'canbiaba',ok:'cambiaba',d:['canviaba','cambiava'],cat:'B'},
  {p:'saver',ok:'saber',d:['saver','zaber'],cat:'B'},
  {p:'huesped_b',ok:'huésped',d:['guesped','huespéd '],cat:'B'},
  {p:'bisnieto',ok:'bisnieto',d:['visnieto','biznieto'],cat:'B'},
  {p:'jugavamos',ok:'jugábamos',d:['jugavamos','jugabamos'],cat:'B'},
  {p:'cocinava',ok:'cocinaba',d:['cocinava','cocinaba '],cat:'B'},
  // V
  {p:'ymbierno',ok:'invierno',d:['imbierno','embierno'],cat:'V'},
  {p:'resolber',ok:'resolver',d:['resolber','rresolver'],cat:'V'},
  {p:'actiba',ok:'activa',d:['actiba','hactiva'],cat:'V'},
  {p:'probincia',ok:'provincia',d:['probincia','provinsia'],cat:'V'},
  {p:'billano',ok:'villano',d:['viano','billano '],cat:'V'},
  {p:'adverbio',ok:'adverbio',d:['adberbio','advervio'],cat:'V'},
  {p:'nuevo_v',ok:'nuevo',d:['nuebo','nuevo '],cat:'V'},
  {p:'embolver',ok:'envolver',d:['embolver','envolber'],cat:'V'},
  {p:'grabar_v',ok:'grabar',d:['grabár','gravar'],cat:'V',nota:'(cuidado: "gravar" existe, pero significa imponer un impuesto, no registrar sonido o imagen).'},
  // S
  {p:'comprencion',ok:'comprensión',d:['comprención','comprension'],cat:'S'},
  {p:'sabroso_c',ok:'sabroso',d:['savroso','zabroso'],cat:'S'},
  {p:'turizmo',ok:'turismo',d:['turizmo','turismó'],cat:'S'},
  {p:'canadience',ok:'canadiense',d:['canadienze','canadienxe'],cat:'S'},
  {p:'sabrocisimo',ok:'sabrosísimo',d:['sabrocísimo','savrosísimo'],cat:'S'},
  {p:'periodizta',ok:'periodista',d:['periodizta','periodizda'],cat:'S'},
  {p:'costarricence',ok:'costarricense',d:['costarricenze','costarrisense'],cat:'S'},
  // Z
  {p:'esperansa',ok:'esperanza',d:['esperansa','esperansza'],cat:'Z'},
  {p:'portaso',ok:'portazo',d:['portaso','portazzo'],cat:'Z'},
  {p:'lapises',ok:'lápices',d:['lapises','lápizes'],cat:'Z'},
  {p:'organisar',ok:'organizar',d:['organisar','organizhar'],cat:'Z'},
  {p:'timides',ok:'timidez',d:['timides','timidéz'],cat:'Z'},
  {p:'cabesaso',ok:'cabezazo',d:['cabesaso','cabezaso'],cat:'Z'},
  {p:'realisar',ok:'realizar',d:['realisar','realizhar'],cat:'Z'},
  // C
  {p:'informasion',ok:'información',d:['informasión','informacion'],cat:'C'},
  {p:'pasiencia',ok:'paciencia',d:['pasiencia','pacienzia'],cat:'C'},
  {p:'amorcito_no',ok:'amorcito',d:['amorsito','amorzito'],cat:'C'},
  {p:'inpotancia',ok:'importancia',d:['importansia','inportancia'],cat:'C'},
  {p:'operasion',ok:'operación',d:['operasión','operacion'],cat:'C'},
  {p:'cansioncita',ok:'cancioncita',d:['cansioncita','cancionsita'],cat:'C'},
  // G/J
  {p:'gerente_no',ok:'gerente',d:['jerente','guerente'],cat:'G'},
  {p:'jeografia',ok:'geografía',d:['geografia','jeografía'],cat:'G'},
  {p:'dirijir',ok:'dirigir',d:['dirijir','dirigír'],cat:'G'},
  {p:'jenerozo',ok:'generoso',d:['generozo','jenerozo '],cat:'G'},
  {p:'jamas_j',ok:'jamás',d:['gamás','jamáz'],cat:'J'},
  {p:'estrangero',ok:'extranjero',d:['extrangero','estranjero'],cat:'J'},
  {p:'relojeria',ok:'relojería',d:['relogería','relojeria '],cat:'J'},
  {p:'condugimos',ok:'condujimos',d:['condugimos','condusimos'],cat:'J'},
  // H
  {p:'ierba',ok:'hierba',d:['yerba_h','yerva'],cat:'H'},
  {p:'uevo',ok:'huevo',d:['uevo','güevo'],cat:'H'},
  {p:'ospital',ok:'hospital',d:['uspital','ospital '],cat:'H'},
  {p:'ago',ok:'hago',d:['ago','jago'],cat:'H'},
  {p:'arina',ok:'harina',d:['arina','jarina'],cat:'H'},
  {p:'ermano',ok:'hermano',d:['ermano','jermano'],cat:'H'},
  {p:'olgazan',ok:'holgazán',d:['olgazán','jolgazán'],cat:'H'},
  // LL / Y
  {p:'vatalla',ok:'batalla',d:['batalya','batalla '],cat:'LL'},
  {p:'sencilla_y',ok:'sencilla',d:['sencilya','sensilla'],cat:'LL'},
  {p:'cepiyo',ok:'cepillo',d:['cepiyo','cepiyo '],cat:'LL'},
  {p:'buyir',ok:'bullir',d:['buyir','buyir '],cat:'LL'},
  {p:'oy',ok:'hoy',d:['oy','olly'],cat:'Y'},
  {p:'callo_ir',ok:'cayó',d:['callo','cayo'],cat:'Y'},
  {p:'uyo',ok:'huyó',d:['uyo','uyó '],cat:'Y'},
  {p:'vaya_ir',ok:'vaya',d:['valla_ir','baya_ir'],cat:'Y',nota:'(cuidado: "valla" es una cerca y "baya" una fruta pequeña; "vaya" es del verbo ir).'},
  // X
  {p:'esportar',ok:'exportar',d:['esportar','exportár'],cat:'X'},
  {p:'estraordinario',ok:'extraordinario',d:['estraordinario','extrahordinario'],cat:'X'},
  {p:'esplicar',ok:'explicar',d:['esplicar','explicár'],cat:'X'},
  {p:'esprimir',ok:'exprimir',d:['esprimir','expremir'],cat:'X'},
  {p:'oaxaca_no',ok:'Oaxaca',d:['Oajaca','Guaxaca'],cat:'X'}
];
