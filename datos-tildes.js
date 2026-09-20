/* ==========================================================
   BANCO DE PALABRAS — MODO TILDES
   Cada entrada trae su análisis silábico ya calculado
   (p = forma mostrada sin tilde / _sufijo se recorta al mostrar,
    ok = forma correcta, d = distractores, cat = categoría,
    syl = separación silábica, nota = aclaración extra)
=========================================================== */
const DB_TILDES=[
  // AGUDAS
  {p:'cafe',ok:'café',d:['cafe','cafè'],cat:'AGUDA',syl:'ca-fé'},
  {p:'camion',ok:'camión',d:['camion','cámion'],cat:'AGUDA',syl:'ca-mión'},
  {p:'corazon',ok:'corazón',d:['corazon','córazon'],cat:'AGUDA',syl:'co-ra-zón'},
  {p:'jamas',ok:'jamás',d:['jamas','jámas'],cat:'AGUDA',syl:'ja-más'},
  {p:'sillon',ok:'sillón',d:['sillon','síllon'],cat:'AGUDA',syl:'si-llón'},
  {p:'menu',ok:'menú',d:['menu','ménu'],cat:'AGUDA',syl:'me-nú'},
  {p:'reloj_no',ok:'reloj',d:['reló','rêloj'],cat:'AGUDA',syl:'re-loj', nota:'(termina en J, no en n/s/vocal, por eso NO lleva tilde).'},
  {p:'ademas',ok:'además',d:['ademas','ádemas'],cat:'AGUDA',syl:'a-de-más'},
  {p:'salon',ok:'salón',d:['salon','sálon'],cat:'AGUDA',syl:'sa-lón'},
  {p:'jardin',ok:'jardín',d:['jardin','járdin'],cat:'AGUDA',syl:'jar-dín'},
  {p:'anis',ok:'anís',d:['anis','ánis'],cat:'AGUDA',syl:'a-nís'},
  {p:'compas_no',ok:'compás',d:['compas','cómpas'],cat:'AGUDA',syl:'com-pás'},
  // LLANAS
  {p:'arbol',ok:'árbol',d:['arbol','arbòl'],cat:'LLANA',syl:'ár-bol'},
  {p:'lapiz',ok:'lápiz',d:['lapiz','lapìz'],cat:'LLANA',syl:'lá-piz'},
  {p:'azucar',ok:'azúcar',d:['azucar','azucár'],cat:'LLANA',syl:'a-zú-car'},
  {p:'facil',ok:'fácil',d:['facil','facíl'],cat:'LLANA',syl:'fá-cil'},
  {p:'dificil',ok:'difícil',d:['dificil','dificíl'],cat:'LLANA',syl:'di-fí-cil'},
  {p:'examen_no',ok:'examen',d:['exámen','examén'],cat:'LLANA',syl:'e-xa-men', nota:'(termina en N, por eso NO lleva tilde, aunque suene parecido a "imagen").'},
  {p:'caracter',ok:'carácter',d:['caracter','caractér'],cat:'LLANA',syl:'ca-rác-ter'},
  {p:'util',ok:'útil',d:['util','utíl'],cat:'LLANA',syl:'ú-til'},
  {p:'cesped',ok:'césped',d:['cesped','cespéd'],cat:'LLANA',syl:'cés-ped'},
  {p:'album',ok:'álbum',d:['album','albúm'],cat:'LLANA',syl:'ál-bum'},
  {p:'huesped',ok:'huésped',d:['huesped','huespéd'],cat:'LLANA',syl:'hués-ped'},
  {p:'debil',ok:'débil',d:['debil','debíl'],cat:'LLANA',syl:'dé-bil'},
  // ESDRÚJULAS
  {p:'musica',ok:'música',d:['musica','musicá'],cat:'ESDRUJULA',syl:'mú-si-ca'},
  {p:'telefono',ok:'teléfono',d:['telefono','telefoné'],cat:'ESDRUJULA',syl:'te-lé-fo-no'},
  {p:'pajaro',ok:'pájaro',d:['pajaro','pajarò'],cat:'ESDRUJULA',syl:'pá-ja-ro'},
  {p:'rapido',ok:'rápido',d:['rapido','rapidó'],cat:'ESDRUJULA',syl:'rá-pi-do'},
  {p:'sabado',ok:'sábado',d:['sabado','sabadó'],cat:'ESDRUJULA',syl:'sá-ba-do'},
  {p:'gastronomico',ok:'gastronómico',d:['gastronomico','gastronomicó'],cat:'ESDRUJULA',syl:'gas-tro-nó-mi-co'},
  {p:'catalogo',ok:'catálogo',d:['catalogo','catálogó'],cat:'ESDRUJULA',syl:'ca-tá-lo-go'},
  {p:'numero',ok:'número',d:['numero','numeró'],cat:'ESDRUJULA',syl:'nú-me-ro'},
  // SOBRESDRÚJULAS
  {p:'digaselo',ok:'dígaselo',d:['digaselo','digáselo'],cat:'SOBRESDRUJULA',syl:'dí-ga-se-lo'},
  {p:'explicamelo',ok:'explícamelo',d:['explicamelo','explicámelo'],cat:'SOBRESDRUJULA',syl:'ex-plí-ca-me-lo'},
  {p:'compraselo',ok:'cómpraselo',d:['compraselo','compráselo'],cat:'SOBRESDRUJULA',syl:'cóm-pra-se-lo'},
  {p:'entregaselo',ok:'entrégaselo',d:['entregaselo','entregáselo'],cat:'SOBRESDRUJULA',syl:'en-tré-ga-se-lo'},
  // DIACRÍTICAS
  {p:'tu',ok:'tú',d:['tu'],cat:'DIACRITICA',nota:'"Tú" (pronombre: "tú cocinas") lleva tilde; "tu" (posesivo: "tu receta") no.'},
  {p:'el',ok:'él',d:['el'],cat:'DIACRITICA',nota:'"Él" (pronombre) lleva tilde; "el" (artículo) no.'},
  {p:'si',ok:'sí',d:['si'],cat:'DIACRITICA',nota:'"Sí" (afirmación) lleva tilde; "si" (condicional) no.'},
  {p:'mas',ok:'más',d:['mas'],cat:'DIACRITICA',nota:'"Más" (cantidad) lleva tilde; "mas" (equivale a "pero") no.'},
  {p:'aun',ok:'aún',d:['aun'],cat:'DIACRITICA',nota:'"Aún" (equivale a "todavía") lleva tilde; "aun" (equivale a "incluso") no.'},
  {p:'se',ok:'sé',d:['se'],cat:'DIACRITICA',nota:'"Sé" (del verbo saber o ser: "yo sé cocinar") lleva tilde; "se" (pronombre: "se cocina despacio") no.'},
  // HIATOS
  {p:'pais',ok:'país',d:['pais','páis'],cat:'HIATO',syl:'pa-ís'},
  {p:'dia',ok:'día',d:['dia','diá'],cat:'HIATO',syl:'dí-a'},
  {p:'rio',ok:'río',d:['rio','rió'],cat:'HIATO',syl:'rí-o'},
  {p:'baul',ok:'baúl',d:['baul','bául'],cat:'HIATO',syl:'ba-úl'},
  {p:'maiz',ok:'maíz',d:['maiz','máiz'],cat:'HIATO',syl:'ma-íz'},
  {p:'gastronomia',ok:'gastronomía',d:['gastronomia','gastronomiá'],cat:'HIATO',syl:'gas-tro-no-mí-a'},
  {p:'todavia',ok:'todavía',d:['todavia','todaviá'],cat:'HIATO',syl:'to-da-ví-a'},
  {p:'reia',ok:'reía',d:['reia','reiá'],cat:'HIATO',syl:'re-í-a'}
];
