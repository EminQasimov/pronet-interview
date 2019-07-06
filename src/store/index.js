import { createStore, combineReducers } from "redux"
import categoriesReducer from "./reducers/categories"
import productsReducer from "./reducers/products"

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
