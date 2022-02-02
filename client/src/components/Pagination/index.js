import "./styles.css";

const Pagination = ({ cards, videogames, pagination }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(videogames / cards); i++) {
    pages.push(i); 
  }
  return (
    <div className="pagination">
      <ul className="pagination_list">
        {pages && pages.length 
        ? <li>
          <button onClick={(e) =>  pagination(e, 1)}> « </button>
          </li>
        :null }
        
        {pages && pages.map((page) => (
          <li key={page}>
            <button onClick={(e) =>  pagination(e, page)}>{page}</button>
          </li>
        ))}
        {pages && pages.length 
        ? <li>
            <button onClick={(e) =>  pagination(e, pages.length)}> » </button>
          </li>
        : null }
      </ul>
    </div>
  );
};

export default Pagination;