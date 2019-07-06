import {
  CHANGE_PATH,
  ADD_PRODUCT_TO_CATEGORY,
  DELETE_PRODUCT_FROM_CATEGORY
} from "../actions"

import produce from "immer"

const initaLCategories = {
  activePath: ["Kompüterlər", "Prosessorlar", "Fujitsu Duo Technics"],

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
  Kompüterlər: {
    children: ["Monitorlar", "Prosessorlar"]
  },
  Prosessorlar: {
    children: ["Fujitsu Duo Technics"]
  },

  "Fujitsu Duo Technics": {
    products: [
      "Fujitsu A5R35-D",
      "Fujitsu 36GD9-A",
      "Fujitsu A536H-H",
      "Fujitsu A5R35-D",
      "Fujitsu A5R35-Q",
      "Fujitsu 36GD9-F",
      "Fujitsu A536H-B",
      "Fujitsu A5R35-N",
      "Fujitsu A5R35-E"
    ]
  },

  "Məişət texnikası": {
    children: ["toshiba", "hp"]
  },
  hp: {
    products: []
  },
  Maşinlar: {
    children: ["Yük Maşınları", "Motosiklet"]
  },
  "Yük Maşınları": {
    products: ["Protege", "Crown Victoria", "Sigma", "Leganza", "Envoy"]
  },
  Motosiklet: {
    products: ["Cougar", "Acclaim", "Excel", "Jetta", "Yaris"]
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
    children: ["j5", "L300"]
  },
  j5: {
    products: []
  },
  L300: {
    products: []
  },
  "64 inch monitors": {
    products: ["Fujitsu A536H-B", "Fujitsu A5R35-N", "Fujitsu A5R35-E"]
  },
  Tablets: {
    children: ["ipad", "ipod"]
  },
  ipad: {
    products: ["ENAUT", "ZUVY", "FITCORE"]
  },
  ipod: {
    products: ["GUSHKOOL", "ISOLOGICA", "PARCOE"]
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
  "LG LCD": {
    products: ["Fujitsu A5R35-N", "Fujitsu A5R35-E"]
  },
  "Samsung Plazma": {
    products: [
      "Fujitsu A5R35-Q",
      "Fujitsu 36GD9-F",
      "Fujitsu A536H-B",
      "Fujitsu A5R35-N",
      "Fujitsu A5R35-E"
    ]
  },
  "47 inch monitors": {
    products: [
      "Fujitsu 36GD9-F",
      "Fujitsu A536H-B",
      "Fujitsu A5R35-N",
      "Fujitsu A5R35-E"
    ]
  },

  satalite: {
    products: [
      "Fujitsu A536H-H",
      "Fujitsu A5R35-D",
      "Fujitsu A5R35-Q",
      "Fujitsu 36GD9-F",
      "Fujitsu A536H-B"
    ]
  },
  samsung: {
    products: [
      "Fujitsu A536H-H",
      "Fujitsu A5R35-D",
      "Fujitsu A5R35-Q",
      "Fujitsu A536H-B"
    ]
  },
  iphone: {
    products: [
      "Fujitsu A536H-H",
      "Fujitsu A5R35-Q",
      "Fujitsu A536H-B",
      "Fujitsu A536H-H",
      "Fujitsu A5R35-Q",
      "Fujitsu A536H-B",
      "Fujitsu A536H-H",
      "Fujitsu A5R35-Q",
      "Fujitsu A536H-B"
    ]
  }
}

export default function(state = initaLCategories, action) {
  switch (action.type) {
    case CHANGE_PATH:
      console.log("from CHANGE_PATH", action.path)

      return produce(state, draftState => {
        draftState.activePath = action.path
      })

    case DELETE_PRODUCT_FROM_CATEGORY:
      console.log("from DELETE_PRODUCT_FROM_CATEGORY", action.name, action.path)

      return produce(state, draftState => {
        draftState[action.path].products = draftState[
          action.path
        ].products.filter(name => name !== action.name)
      })

    case ADD_PRODUCT_TO_CATEGORY:
      console.log("from ADD_PRODUCT_TO_CATEGORY", action.name)
      return produce(state, draftState => {
        let active = draftState.activePath.pop()
        draftState[active].products.push(action.name)
      })

    default:
      return state
  }
}
