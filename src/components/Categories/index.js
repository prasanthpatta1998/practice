import './index.css'

const Categories = props => {
  const {categories} = props
  const {menuCategory} = categories

  return (
    <li className="menu-element">
      <h1 className="menu-heading">{menuCategory}</h1>
    </li>
  )
}
export default Categories
