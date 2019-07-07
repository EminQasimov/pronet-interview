import {
  CHANGE_PATH,
  ADD_PRODUCT_TO_CATEGORY,
  DELETE_PRODUCT_FROM_CATEGORY,
  SET_CURRENT_PRODUCT,
  DELETE_CATEGORY,
  SET_PRODUCT_EDIT,
  EDIT_CATEGORY_NAME,
  CHANGE_CATEGORY_NAME
} from "../actions"

import produce from "immer"

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

const initaLCategories = {
  activePath: ["Kompüterlər", "Prosessorlar", "Fujitsu Duo Technics"],
  activeProduct: "",
  editProduct: false,
  editCategory: "",
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
      "Fujitsu A5R35-Z",
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
    children: ["Yük Maşınları", "Motosiklet"]
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
    case SET_PRODUCT_EDIT:
      return produce(state, draft => {
        draft.editProduct = action.mode
      })
    case EDIT_CATEGORY_NAME:
      return produce(state, draft => {
        draft.editCategory = action.name
      })
    case CHANGE_CATEGORY_NAME:
      let { newName } = action
      if (has(state, newName)) return state

      let draft = { ...state }

      function findParent(tree) {
        if (tree !== undefined && has(tree, "children") && tree.children) {
          tree.children.forEach((key, i) => {
            if (key === draft.editCategory) {
              tree.children.splice(i, 1, newName)
            } else {
              findParent(draft[key])
            }
          })
        }
        return
      }
      findParent(draft)

      draft[newName] = { ...draft[draft.editCategory] }
      delete draft[draft.editCategory]

      if (draft.editCategory === draft.activeProduct) {
        draft.activeProduct = newName
      }
      if (
        draft.editCategory === draft.activePath[draft.activePath.length - 1]
      ) {
        draft.activePath = [newName]
      }
      return draft

    case CHANGE_PATH:
      return produce(state, draft => {
        //change activeProduct to first Element of activeCategory
        draft.activePath = action.path
        draft.activeProduct = draft[action.path][0]
      })

    case DELETE_PRODUCT_FROM_CATEGORY:
      return produce(state, draft => {
        let active = draft.activePath[draft.activePath.length - 1]

        if (draft.activeProduct === action.name) {
          //reset if active product is deleted
          draft.activeProduct = ""
        }
        draft[active].products = draft[active].products.filter(
          name => name !== action.name
        )
      })

    case ADD_PRODUCT_TO_CATEGORY:
      return produce(state, draft => {
        let active = draft.activePath[draft.activePath.length - 1]
        draft[active].products.unshift(action.name)
      })

    case SET_CURRENT_PRODUCT:
      return produce(state, draft => {
        draft.activeProduct = action.product
      })

    case DELETE_CATEGORY:
      let cat = action.cat
      let paths = []

      return produce(state, draft => {
        function findChildren(tree) {
          if (tree !== undefined && has(tree, "children") && tree.children) {
            tree.children.forEach(key => {
              paths.push(key)
              findChildren(draft[key])
            }) //foreach
          } else {
            return
          }
        } //end loop
        findChildren(draft[cat])
        paths.forEach(key => {
          delete draft[key]
        })
        delete draft[cat]

        function findParent(tree) {
          if (tree !== undefined && has(tree, "children") && tree.children) {
            tree.children.forEach(key => {
              if (key === cat) {
                return (tree.children = tree.children.filter(el => el !== cat))
              } else {
                findParent(draft[key])
              }
            })
          }
        }
        findParent(draft)
        draft.activePath = []
        console.log(paths)
      }) //end produce

    default:
      return state
  }
}
