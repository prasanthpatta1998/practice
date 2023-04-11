import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaShoppingCart} from 'react-icons/fa'
import Categories from '../Categories'
import DishDetails from '../DishDetails'
import './index.css'

const applicationState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class RestoCafe extends Component {
  state = {
    restaurantState: applicationState.initial,
    restaurantData: [],
    categoryDishesId: '11',
    categoriesList: [],
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    const {categoryDishesId} = this.state
    this.setState({restaurantState: applicationState.inProgress})
    const url = 'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data[0])
    if (response.ok === true) {
      const apiData = [
        {
          branchName: data[0].branch_name,
          restaurantName: data[0].restaurant_name,
          tableMenuList: data[0].table_menu_list.map(eachElement => ({
            menuCategory: eachElement.menu_category,
            menuCategoryId: eachElement.menu_category_id,
            menuCategoryImage: eachElement.menu_category_image,
            nexturl: eachElement.nexturl,
            categoryDishes: eachElement.category_dishes.map(eachCategory => ({
              dishId: eachCategory.dish_id,
              dishPrice: eachCategory.dish_price,
              addonCat: eachCategory.addonCat,
              dishAvailability: eachCategory.dish_Availability,
              dishType: eachCategory.dish_Type,
              dishCalories: eachCategory.dish_calories,
              dishCurrency: eachCategory.dish_currency,
              dishDescription: eachCategory.dish_description,
              dishImage: eachCategory.dish_image,
              dishName: eachCategory.dish_name,
              nexturl: eachCategory.nexturl,
            })),
          })),
        },
      ]

      const categoryData = apiData[0].tableMenuList.filter(
        eachMenu => eachMenu.menuCategoryId === categoryDishesId,
      )
      console.log(categoryData)
      this.setState({
        restaurantData: apiData,
        categoriesList: categoryData,
        restaurantState: applicationState.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="red" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {restaurantData, categoriesList} = this.state
    const {tableMenuList} = restaurantData[0]
    const {categoryDishes} = categoriesList[0]

    return (
      <>
        <nav className="nav-container">
          <h1 className="nav-heading">{restaurantData[0].restaurantName}</h1>
          <div className="orders-container">
            <h1 className="order-heading">My Orders</h1>
            <div className="cart-container">
              <FaShoppingCart className="cart-icon" />
              <span className="count">0</span>
            </div>
          </div>
        </nav>
        <ul className="menu-items">
          {tableMenuList.map(eachTab => (
            <Categories categories={eachTab} key={eachTab.menuCategoryId} />
          ))}
        </ul>
        <ul className="dish-list">
          {categoryDishes.map(eachDish => (
            <>
              <DishDetails dishDetails={eachDish} key={eachDish.dishId} />
              <hr />
            </>
          ))}
        </ul>
      </>
    )
  }

  renderState = () => {
    const {restaurantState} = this.state

    switch (restaurantState) {
      case applicationState.inProgress:
        return this.renderLoader()
      case applicationState.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderState()}</div>
  }
}

export default RestoCafe
