import styles from './NotFoundPizza.module.scss';

export const NotFoundPizza: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>По вашему запросу нет пицц, попробуйте другие параметры</p>
    </div>
  );
};
