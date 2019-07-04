const initaLCategories = {
  children: [
    "Məişət texnikası",
    "Avadanlıq",
    "Kompüterlər",
    "Tablets",
    "Modems",
    "SmartWatch",
    "Maşinlar",
    "Velosipedler"
  ],

  "Məişət texnikası": {
    children: ["toshiba", "hp"]
  },
  Maşinlar: {
    children: ["Toyoto", "Honda"]
  },
  Velosipedler: {
    children: ["Harley", "2teker"]
  },
  Avadanlıq: {
    children: ["samsung", "iphone"]
  },

  toshiba: {
    children: ["nitro", "satalite"]
  },
  nitro: {
    children: ["j5 cc4", "galax 5 lite"]
  },
  Kompüterlər: {
    children: ["Monitorlar", "Prosessorlar"]
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

  Prosessorlar: {
    children: ["intel", "AMD"]
  },

  Monitorlar: {
    children: ["Samsung Plazma", "LG LCD"]
  },
  "Samsung Plazma": [13, 12, 55],
  "LG LCD": [32, 16, 5],
  "47 inch monitors": [33, 12, 55],
  "64 inch monitors": [22, 16, 5],
  satalite: [11, 9, 6, 2],
  samsung: [2, 13, 6, 3],
  iphone: [7, 99, 8]
}

export default function(state = initaLCategories, action) {
  return state
}
