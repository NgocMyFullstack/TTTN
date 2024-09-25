import React, { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryService";
import { Link } from "react-router-dom";
export default function Category() {
  const [category, setCategories] = useState([]);
  const [load, setLoad] = useState(true);
  //
  useEffect(() => {
    (async () => {
      const result = await CategoryService.index();
      setCategories(result.category);
      setLoad(false);
    })();
  }, [load]);
  return (
    <div class="col-12 d-none d-md-block col-md-2 d-none d-md-block">
      <div class="dropdown list-category">
        <strong
          class="dropdown-toggle w-80"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Danh mục sản phẩm
        </strong>
        <ul class="dropdown-menu w-100">
          {category &&
            category.map((brand, index) => {
              return (
                <li>
                  <Link
                    class="dropdown-item"
                    to={`/product_category/${brand.id}`}
                  >
                    {brand.name}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
