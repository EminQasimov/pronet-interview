import {
  CHANGE_PATH,
  ADD_PRODUCT_TO_CATEGORY,
  DELETE_PRODUCT_FROM_CATEGORY,
  SET_CURRENT_PRODUCT,
  DELETE_CATEGORY,
  SET_PRODUCT_EDIT,
  EDIT_CATEGORY_NAME,
  CHANGE_CATEGORY_NAME,
  WHERE_ADD_SUBCATEGORY,
  ADD_SUB_CATEGORY,
  ADD_CATEGORY
} from "../actions"

import produce from "immer"
import initData from "./initialData"

function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false
}

export default function(state = initData, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, {
        children: [action.categoryInputs.qrup].concat([...state.children]),
        [action.categoryInputs.qrup]: {
          children: [action.categoryInputs.altqrup]
        }
      })

    case ADD_SUB_CATEGORY:
      let name = action.newSubCategoryName

      if (has(state, name)) return state
      return produce(state, draft => {
        draft[draft.whereAddSubcategory].children.push(name)

        if (draft.children.indexOf(draft.whereAddSubcategory) >= 0) {
          draft[name] = {
            children: []
          }
        } else {
          draft[name] = {
            products: []
          }
        }
      })

    case WHERE_ADD_SUBCATEGORY:
      return produce(state, draft => {
        draft.whereAddSubcategory = action.where
        draft.activePath.unshift(action.where)
      })

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
      let arr = [...draft.activePath]

      if (draft.editCategory === arr.pop()) {
        draft.activeProduct = newName
        arr.push(newName)
        draft.activePath = arr
      }
      draft.activePath = [...draft.activePath].filter(
        el => el !== draft.editCategory
      )
      draft.activePath.unshift(newName)
      return draft

    case CHANGE_PATH:
      return produce(state, draft => {
        //change activeProduct to first Element of activeCategory
        let p = action.path
        if (has(draft[p], "products")) {
          draft.activePath = draft.activePath.filter(el => el !== p)
          draft.activePath.push(p)
          draft.activeProduct = draft[p][0]
        } else if (has(draft[p], "children")) {
          let idx = draft.activePath.indexOf(p)
          if (idx >= 0) {
            draft.activePath.splice(idx, 1)
          } else {
            draft.activePath.unshift(p)
          }
        }
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
            })
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
        draft.activePath = draft.activePath.filter(el => el !== cat)
      })

    default:
      return state
  }
}
