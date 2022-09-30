import '../item/item2.css';
import MovieCard from '../item/movie-card';


const ItemsList = ({movies}) => {
 
 const list = movies.map((item) => {
  return ( <MovieCard key={item.id} item={item} />);
 })

  return ( 
    <div className="container">
      <ul className="items_list">
        {list}
      </ul>
    </div>
  );
};

export default ItemsList;
