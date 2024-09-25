const Categories = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li className={i === value ? 'active' : ''} onClick={() => onChangeCategory(i)} key={i}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
