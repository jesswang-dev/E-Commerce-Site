import { collection, addDoc, getFirestore } from "firebase/firestore";
import productList from "../productData";
import firebaseApp from "../service/firebaseConfig";

export default function importData() {
  const db = getFirestore(firebaseApp);

  const postData = async () => {
    console.log(productList);
    try {
      for (let i = 0; i < productList.length; i++) {
        await addDoc(collection(db, "products"), productList[i]);
      }
      console.log("success");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>AddData</h2>
      <button onClick={postData}>post</button>
    </div>
  );
}
