import { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  filterBy,
  addNewGameReset,
} from "../../redux/actions";

const Filter = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genresState.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleFilter =  (e) => {
    dispatch(addNewGameReset({ game:{},error:null,success:null}));
    dispatch(filterBy(e.target.value));
  };

  return(
    <select className="select_filter" onChange={handleFilter}>
      <option defaultValue>All</option>
        <option value="Api">Existed</option>
        <option value="Created">Created</option>
        {genres.map((g, id) => (
          <option key={id} value={g.name}>
            {g.name}
          </option>
        ))}
    </select>
  )
}

export default Filter;