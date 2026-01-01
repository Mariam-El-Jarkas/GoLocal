// import React, { useEffect, useState } from "react";
// import CategoryCard from "../components/CategoryCard";
// import "../styles/categories.css";
// import { API_URL } from '../config/apiConfig';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch(`${API_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="categories-page">
//       {/* Centered heading */}
//       <div className="categories-title">
//         <h1>Categories</h1>
//       </div>

//       {/* Dynamic categories */}
//       <div className="categories-grid">
//         {categories.map((cat) => (
//           <CategoryCard key={cat.id} category={cat} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;
import React, { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "../styles/categories.css";
import { API_URL } from '../config/apiConfig';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        // Handle PostgreSQL result object
        if (data && data.rows && Array.isArray(data.rows)) {
          // Backend returned full PostgreSQL object
          setCategories(data.rows);
        } else if (Array.isArray(data)) {
          // Backend returned array directly
          setCategories(data);
        } else {
          console.error('Invalid data format:', data);
          setCategories([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="categories-page">
      {/* Centered heading */}
      <div className="categories-title">
        <h1>Categories</h1>
      </div>

      {/* Dynamic categories */}
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
