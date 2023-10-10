import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

   const submitHandler = (event) => {
    //  console.log("form submitted ✅");
    //  console.log(event.target.value);
     navigate(`/search/${event.target.value}`);
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
  });

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
