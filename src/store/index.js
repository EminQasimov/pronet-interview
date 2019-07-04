import { createStore, combineReducers } from "redux"
import categoriesReducer from "./reducers/categories"
import productsReducer from "./reducers/products"

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer
})

const store = createStore(rootReducer)

export default store
