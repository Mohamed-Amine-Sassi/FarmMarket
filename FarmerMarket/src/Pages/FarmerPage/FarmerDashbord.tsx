"use client";

import type React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import ItemCard from "../../Components/ItemCard";
import type { itemType } from "../BuyerPage/BuyerDashbord";

export default function FarmerDashbord() {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [categorieValue, setCategorieValue] = useState("");

  const handleDataSending = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("categorieValue", categorieValue);
    formData.append("discription", discription);
    formData.append("price", price.toString());
    if (file) {
      console.log("append done");
      formData.append("image", file);
    } else {
      console.log("No file selected");
    }
    await axios.post("http://localhost:3001/api/addItem", formData, {
      withCredentials: true,
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/getFarmersItems",
          {
            withCredentials: true,
          }
        );
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Welcome to your Dashboard
          </h1>
          <h3 className="text-xl text-green-600 font-medium">
            You can add any product you want
          </h3>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <form
            onSubmit={handleDataSending}
            className="bg-white rounded-2xl shadow-xl p-8 border border-green-100"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
              Add New Product
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Product Name:
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50/50"
                  placeholder="Enter product name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Product Description:
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50/50 min-h-[100px] resize-vertical"
                  placeholder="Describe your product..."
                  onChange={(e) => {
                    setDiscription(e.target.value);
                  }}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Categorie:
                </label>
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

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Price Per Kg:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 font-medium">
                    $
                  </span>
                  <input
                    type="text"
                    step="0,01"
                    className="w-full pl-8 pr-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50/50"
                    placeholder="0.00"
                    onChange={(e) => {
                      setPrice(Number(e.target.value));
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-green-700">
                  Product Picture:
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="w-full px-4 py-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-green-50/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files && e.target.files.length > 0
                        ? setFile(e.target.files[0])
                        : console.log("null file")
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>

        {/* Products Grid Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
            Your Products
          </h2>

          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.map((item: itemType) => (
                <div
                  key={item._id}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <ItemCard
                    id={item._id}
                    name={item.productName}
                    price={item.price}
                    productPicture={item.productPicture}
                    categorie={item.productCategorie}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <div className="text-green-200 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  No Products Yet
                </h3>
                <p className="text-green-600">
                  Start by adding your first product using the form above!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
