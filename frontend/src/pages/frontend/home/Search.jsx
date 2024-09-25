import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProductService from "../../../services/ProductService";
import { urlImage } from "../../../config";
import Loading from "../../../components/Loading";
import "./Search.css";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.index();
        console.log("🚀 ~ file: lookkkkkkkkkk.jsx ~ result:", result);
        setProducts(result.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredProducts);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    console.log("Selected suggestion:", suggestion);
    console.log("Selected suggestion ID:", suggestion.id);

    // Redirect to product detail page
    navigate(`/product_detail/${suggestion.id}`);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const inputProps = {
    placeholder: "Nhập nội dung tìm kiếm",
    value: searchTerm,
    onChange: (_, { newValue }) => setSearchTerm(newValue),
  };

  return (
    <div className="col-12 col-sm-9 d-none d-md-block col-md-5 py-3">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
}
