import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

   const submitHandler = (event) => {
     console.log(event.target.value);
     setInput(event.target.value);
     navigate(`search/${event.target.value}`);
   };


  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ call submit function here
        submitHandler(event);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [input]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="search"
          id="mySearch"
          placeholder="Search product..."
          spellCheck="true"
        />
      </form>
    </>
  );
}
