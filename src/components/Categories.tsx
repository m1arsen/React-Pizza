import { memo } from 'react';
import { useAppDispatch } from '../redux/store';

import { setCategoryId } from '../redux/filter/slice';

type TCategoriesProps = {
  category: number;
};

const Categories: React.FC<TCategoriesProps> = memo(({ category }) => {
  const dispatch = useAppDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            className={i === category ? 'active' : ''}
            onClick={() => dispatch(setCategoryId(i))}
            key={i}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
