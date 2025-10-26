"use client";
import { useLocation } from "react-router-dom";
import type React from "react";

import axios from "axios";
import { useState, useMemo } from "react";
import { Trash2, Edit3, Save } from "lucide-react";

export interface itemProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  categorie: string;
  productPicture: {
    type: "Buffer";
    data: number[];
  };
  onButtonClick: (value: string) => void;
}

export default function ItemCard({
  id,
  name,
  price,
  productPicture,
  onButtonClick,
}: itemProps) {
  const imageSrc = useMemo(() => {
    const byteString = new Uint8Array(productPicture.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    );
    return `data:image/png;base64,${btoa(byteString)}`;
  }, [productPicture]);

  const [edit, setEdit] = useState(false);
  const [nameP, setNameP] = useState("");
  const [discriptionP, setDiscriptionP] = useState("");
  const [priceP, setPriceP] = useState(0);
  const [categorieValue, setCategorieValue] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/deleteItem`,
        {
          withCredentials: true,
          data: { id },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("categorieValue", categorieValue);
    formData.append("nameP", nameP);
    formData.append("discriptionP", discriptionP);
    formData.append("priceP", priceP.toString());
    if (file) {
      formData.append("image", file);
    }
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/editItem`,
      formData,
      {
        withCredentials: true,
      }
    );
    setEdit(false);
  };

  return (
    <div className="relative" onClick={() => onButtonClick(id)}>
      {edit ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Edit Product
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Only make necessary changes (You can keep unchanged fields
                empty)
              </p>

              <form onSubmit={(e) => handleEdit(e, id)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter new product name"
                    onChange={(e) => {
                      setNameP(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Description:
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                    placeholder="Enter product description"
                    onChange={(e) => {
                      setDiscriptionP(e.target.value);
                    }}
                  />
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Kg:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter price"
                    onChange={(e) => {
                      setPriceP(Number(e.target.value));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Picture:
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onChange={(e) =>
                      e.target.files && e.target.files.length > 0
                        ? setFile(e.target.files[0])
                        : console.log("null file")
                    }
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdit(false)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <a href="#" className="block">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
              {name}
            </h3>
            <p className="text-green-600 font-bold text-xl">
              ${price.toFixed(2)}
            </p>
          </div>
        </a>

        {useLocation().pathname === "/farmer-dashboard" ? (
          <div className="px-4 pb-4 flex gap-2">
            <button
              onClick={() => handleDeleteItem(id)}
              className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            <button
              onClick={() => {
                !edit ? setEdit(true) : setEdit(false);
              }}
              className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
