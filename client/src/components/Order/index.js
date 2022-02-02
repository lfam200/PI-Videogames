import { useDispatch } from "react-redux";
import { orderBy } from "../../redux/actions";
import { useSelector } from 'react-redux';
const Order = () => {
  const dispatch = useDispatch();
  const {order, direction } = useSelector((state) => state.orderGames);
  
  const orderClick = (e) => {
    dispatch(orderBy(e.target.name));
  };

  return (
    <>
      <button name="az" className="button" onClick={orderClick}>
        { (order === ''  && direction === '')  || (order === 'az' && direction === 'ASC') 
          ? `A-Z`
          : (order === 'az' && direction === 'DESC') 
            ? `Z-A` : `A-Z`
        }
      </button>
      <button name="rating" className="button" onClick={orderClick}>
        { (order === ''  && direction === '')  || (order === 'rating' && direction === 'ASC') 
          ? `RAT ↑`
          : (order === 'rating' && direction === 'DESC') 
            ? `RAT ↓` : `RAT ↑`
        }
      </button>
    </>
  )
}

export default Order;