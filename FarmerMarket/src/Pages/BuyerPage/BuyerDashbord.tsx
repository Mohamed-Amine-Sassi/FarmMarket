"use client";
import ItemCard from "../../Components/ItemCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart, Leaf, Search } from "lucide-react";
import OwnerInfo from "../../Components/OwnerInfo";

export interface itemType {
  _id: string;
  productName: string;
  productCategorie: string;
  price: number;
  productPicture: any;
  ownerID: string;
}

export default function BuyerDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [categorieValue, setCategorieValue] = useState("");
  const [ownerI, setOwnerI] = useState<any>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/getItem");
        setData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleClick = async (ownerID: string) => {
    try {
      const owner = await axios.get(
        `http://localhost:3001/api/ownerInfo/${ownerID}`,
        {
          withCredentials: true,
        }
      );
      setOwnerI(owner.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Buyer Dashboard
                </h1>
                <p className="text-gray-600">
                  Discover fresh produce from local farms
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-green-800">
                FarmMarket
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for fresh produce..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
              {/* <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Search
              </button> */}
              <div className="relative">
                <select
                  value={categorieValue}
                  onChange={(e) => setCategorieValue(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-700 min-w-[120px]"
                >
                  <option value="">All Categories</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="materials">Materials</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Available Products
            </h2>
            <span className="text-sm text-gray-600">
              {data.length} {data.length === 1 ? "product" : "products"}{" "}
              available
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            {data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map(
                  (item: itemType) =>
                    item.productName.toLowerCase().includes(value) &&
                    item.productCategorie.includes(categorieValue) && (
                      <ItemCard
                        categorie={item.productCategorie}
                        key={item._id}
                        id={item._id}
                        name={item.productName}
                        price={item.price}
                        productPicture={item.productPicture}
                        onButtonClick={() => handleClick(item.ownerID)}
                      />
                    )
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Products Available
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  There are currently no products available. Check back later or
                  contact local farmers to see what's in season.
                </p>
                <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Refresh Products
                </button>
              </div>
            )}
          </>
        )}
        {ownerI && (
          <OwnerInfo
            firstName={ownerI.firstName}
            lastName={ownerI.lastName}
            phoneNumber={ownerI.phoneNumber}
            email={ownerI.email}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">FarmMarket</span>
            </div>
            <p className="text-sm">
              Supporting local farmers and sustainable agriculture
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
