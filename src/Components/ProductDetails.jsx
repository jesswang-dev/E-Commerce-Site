import { useEffect, useState } from "react";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import firebaseApp from "../service/firebaseConfig";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const db = getFirestore(firebaseApp);
  const params = useParams();
  const { productId } = params;

  const [detail, setDetail] = useState({});
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [imageList, setImageList] = useState([]);
  

  const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      const {
        name,
        brand,
        description,
        price,
        sizes,
        availableColors,
        image,
        imageCollection,
      } = data;

      setDetail((prev) => ({
        ...prev,
        id: productId,
        name: name,
        brand: brand,
        description: description,
        price: price,
        imageUrl: image,
      }));

      setSizeList((prev) => [...prev, ...sizes]);
      setColorList((prev) => [...prev, ...availableColors]);
      setImageList((prev) => [...prev, ...imageCollection]);

    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, []);

  return (
    <>
      <div>{`ProductId${productId}`} </div>
      <ul className="gallery">
        {imageList.map((image, index) => {
          return(<li key={index}><img src={image.url}></img></li>)
        })}
      </ul>
      <div className="product">
        <img src={detail.imageUrl} alt={detail.name} />
      </div>
      <div className="details" >
        <p className="brand">{detail.brand}</p>
        <p className="name">{detail.name}</p>
        <p className="description">{detail.description}</p>

        <select className="size" placeholder="select the size">
          {sizeList.map((size, index) => {
            return (<option key={index} value={size}>{size}</option>)
          })}
        </select>

        <ul className="color">
          {colorList.map((color, index) => {
            return <li key={index}>{color}</li>;
          })}
        </ul>

        <p className="price">{detail.price}</p>
        <button>Add to Cart</button>
      </div>
    </>
  );
}
