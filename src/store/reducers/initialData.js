const initData = {
  activePath: ["Kompüterlər", "Prosessorlar", "Fujitsu Duo Technics"],
  activeProduct: "",
  editProduct: false,
  editCategory: "",
  whereAddSubcategory: "",
  children: [
    "Məişət texnikası",
    "Avadanlıq",
    "Kompüterlər",
    "Tablets",
    "Modems",
    "SmartWatch",
    "Maşınlar",
    "Velosipedler"
  ],
  Kompüterlər: {
    children: ["Monitorlar", "Prosessorlar"]
  },
  Prosessorlar: {
    children: ["Fujitsu Duo Technics"]
  },
  "Məişət texnikası": {
    children: ["Metbex", "Otaq"]
  },
  Metbex: {
    children: ["utuler", "caydanlar"]
  },
  Maşınlar: {
    children: ["Yük Maşınları", "Motosiklet"]
  },
  Velosipedler: {
    children: ["Harley", "2teker"]
  },
  Avadanlıq: {
    children: ["Elektron", "Metal"]
  },
  toshiba: {
    children: ["nitro", "satalite"]
  },
  nitro: {
    children: ["j5", "L300"]
  },

  Tablets: {
    children: ["ipad", "ipod"]
  },

  Modems: {
    children: ["tp link", "3g"]
  },
  SmartWatch: {
    children: ["iwatch", "band"]
  },
  Monitorlar: {
    children: ["Samsung Plazma", "LG LCD"]
  },
  utuler: {
    products: ["red", "beko"]
  },
  caydanlar: {
    products: ["boyuk", "balaca"]
  },
  Otaq: {
    children: ["hamam", "qonaq"]
  },
  hamam: {
    products: ["el uz yuyan"]
  },
  qonaq: {
    products: ["televizor"]
  },
  "Yük Maşınları": {
    products: ["Protege", "Crown Victoria", "Sigma", "Leganza", "Envoy"]
  },
  Motosiklet: {
    products: ["Cougar", "Acclaim", "Excel", "Jetta", "Yaris"]
  },
  ipad: {
    products: ["ENAUT", "ZUVY", "FITCORE"]
  },
  ipod: {
    products: ["GUSHKOOL", "ISOLOGICA", "PARCOE"]
  },
  j5: {
    products: ["xiomi"]
  },
  L300: {
    products: ["huawai"]
  },
  "LG LCD": {
    products: ["Fujitsu A5R35-N", "Fujitsu A5R35-E"]
  },
  "Fujitsu Duo Technics": {
    parametr: [
      "name",
      "istehsalçı",
      "ölkə",
      "email",
      "Partner",
      "qiyməti",
      "əlaqə"
    ],
    products: [
      "Fujitsu A5R35-D",
      "Fujitsu 36GD9-A",
      "Fujitsu A536H-H",
      "Fujitsu A5R35-Z",
      "Fujitsu A5R35-Q",
      "Fujitsu 36GD9-F",
      "Fujitsu A536H-B",
      "Fujitsu A5R35-N",
      "Fujitsu A5R35-E"
    ]
  },
  "Samsung Plazma": {
    products: ["Fujitsu A5R35-Q"]
  },
  "47 inch monitors": {
    products: ["Fujitsu 36GD9-F"]
  },

  satalite: {
    products: ["Fujitsu A536H-H"]
  },
  samsung: {
    products: ["Fujitsu A536H-H"]
  },
  iphone: {
    products: ["Fujitsu A536H-H"]
  }
}

export default initData

const data = {
  "Məişət texnikası": {
    Metbex: {
      utuler: {
        products: [
          {
            name: "beko",
            qiymet: 25
          },
          {
            name: "sony",
            qiymet: 433
          }
        ]
      },
      caydanlar: {
        products: ["suse", "tefal"]
      }
    },
    Otaq: {
      hamam: {},
      qonaq: {}
    }
  },
  Avadanlıq: {},
  Kompüterlər: {},
  Tablets: {},
  Modems: {},
  SmartWatch: {},
  Maşınlar: {},
  Velosipedler: {}
}
