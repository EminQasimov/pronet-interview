export const CHANGE_PATH = "CHANGE_PATH"

export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"

export const DELETE_PRODUCT_FROM_CATEGORY = "DELETE_PRODUCT_FROM_CATEGORY"
export const ADD_PRODUCT_TO_CATEGORY = "ADD_PRODUCT_TO_CATEGORY"

export const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT"

export const DELETE_CATEGORY = "DELETE_CATEGORY"
export const DELETE_CATEGORY_PRODUCTS = "DELETE_CATEGORY_PRODUCTS"

export const SET_PRODUCT_EDIT = "SET_PRODUCT_EDIT"
export const SUBMIT_EDIT_PRODUCT = "SUBMIT_EDIT_PRODUCT"

export const EDIT_CATEGORY_NAME = "EDIT_CATEGORY_NAME"
export const CHANGE_CATEGORY_NAME = "CHANGE_CATEGORY_NAME"

export const WHERE_ADD_SUBCATEGORY = "WHERE_ADD_SUBCATEGORY"
export const ADD_SUB_CATEGORY = "ADD_SUB_CATEGORY"

export function setWhereAddSubCategory(where) {
  return {
    type: WHERE_ADD_SUBCATEGORY,
    where
  }
}

export function addSubCategory(newSubCategoryName) {
  return {
    type: ADD_SUB_CATEGORY,
    newSubCategoryName
  }
}

export function changeCategoryName(newName) {
  return {
    type: CHANGE_CATEGORY_NAME,
    newName
  }
}

export function editCategoryName(name) {
  return {
    type: EDIT_CATEGORY_NAME,
    name
  }
}

export function submitEditProduct(data) {
  return {
    type: SUBMIT_EDIT_PRODUCT,
    data
  }
}

export function setProductEdit(mode) {
  return {
    type: SET_PRODUCT_EDIT,
    mode
  }
}

export function deleteCategory(cat) {
  return {
    type: DELETE_CATEGORY,
    cat
  }
}

export function deleteCategoryProducts(products) {
  return {
    type: DELETE_CATEGORY_PRODUCTS,
    products
  }
}

export function setCurrentProduct(product) {
  return {
    type: SET_CURRENT_PRODUCT,
    product
  }
}

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

export function deleteProductFromCategory(name) {
  return {
    type: DELETE_PRODUCT_FROM_CATEGORY,
    name
  }
}

export function addProduct(name) {
  return {
    type: ADD_PRODUCT,
    name
  }
}
export function addProductToCategory(name) {
  return {
    type: ADD_PRODUCT_TO_CATEGORY,
    name
  }
}
