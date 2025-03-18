import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product list from API or dummy data
    const fetchProducts = async () => {
      const data = [
        { id: 1, name: "Handwoven Silk Scarf", price: "50 USD", image: "/product1.jpg" },
        { id: 2, name: "Bamboo Handicraft Basket", price: "30 USD", image: "/product2.jpg" },
        { id: 3, name: "Wood Carved Elephant", price: "80 USD", image: "/product3.jpg" },
      ];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Explore Our Crafts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
