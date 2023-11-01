import { useParams } from "react-router-dom"

export default function Result() {
    const { input } = useParams();
  return (
    <>
      <div>Result: {input}</div>
    </>
  );
}
