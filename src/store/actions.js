export const CHANGE_PATH = "CHANGE_PATH"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const DELETE_PRODUCT_FROM_CATEGORY = "DELETE_PRODUCT_FROM_CATEGORY"
export const ADD_PRODUCT_TO_CATEGORY = "ADD_PRODUCT_TO_CATEGORY"

export function changePath(path) {
  return {
    type: CHANGE_PATH,
    path
  }
}

export function deleteProduct(name) {
  return {
    type: DELETE_PRODUCT,
    name
  }
}

export function addProduct(name, path) {
  return {
    type: ADD_PRODUCT,
    name,
    path
  }
}

export function deleteProductFromCategory(name, path) {
  return {
    type: DELETE_PRODUCT_FROM_CATEGORY,
    name,
    path
  }
}

export function addProductToCategory(name) {
  return {
    type: ADD_PRODUCT_TO_CATEGORY,
    name
  }
}
