import './input.css';

const Input = ({ searchMovie, setInput, input }) => (
  <form className="input_wrapper">
    <input
      type="text"
      className="input_search"
      placeholder="   Type to search..."
      onChange={(e) => {
        setInput(e.target.value);
        searchMovie(input);
      }}
    />
  </form>
);

export default Input;
