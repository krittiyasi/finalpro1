"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  Image: string;
  company: string;
  price: number;
  count: number;
}

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [selectedItem, setSelectedItem] = useState<Product[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the index being edited

  useEffect(() => {
    axios
      .get("https://nodejs.krittiyasi.repl.co/products")
      .then((response) => {
        const productsWithCount: Product[] = response.data.map((product: Product) => ({
          ...product,
          count: 0,
        }));
        setData(productsWithCount);
      });
  }, []);

  const handleSave = (index: number) => {
    const selectItem = data[index];
    setSelectedItem((prevSelectedItem) => [...prevSelectedItem, selectItem]);
  };

  const handleIncrement = (index: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], count: newData[index].count + 1 };
      return newData;
    });
  };

  const handleReduce = (index: number) => {
    setData((prevData) => {
      const newData = [...prevData];
      if (newData[index].count > 0) {
        newData[index] = { ...newData[index], count: newData[index].count - 1 };
      }
      return newData;
    });
  };

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    setEditingIndex(null); // Reset editingIndex
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleEditSelected = (index: number) => {
    setEditingIndex(index);
  };

  const handleUpdateCount = (index: number, newCount: number) => {
    const updatedSelected = [...selectedItem];
    updatedSelected[index] = { ...updatedSelected[index], count: newCount };
    setSelectedItem(updatedSelected);
  };

  const handleDeleteSelected = (index: number) => {
    const updatedSelected = [...selectedItem];
    updatedSelected.splice(index, 1);
    setSelectedItem(updatedSelected);
  };

  return (
    <>
      <Navbar />
      <div className="loghome">
        <Image src="/homee.png" width={1675} height={700} alt="homee" />
      </div>
      <div className="container">
        <h1>NEW ARRIVALS</h1>
      </div>
      <div className="App">
        <div className="row">
          {data.map((val, idx) => (
            <div key={idx} className="col">
              <h3>{val.name}</h3>
              <img src={val.Image} alt={val.name} />
              {" | "}
              <span>{val.company}</span>
              <span>{val.price}</span>
              <div>
                <button
                  className="btn btn-primary btn-sm d-inline m-2"
                  onClick={() => handleIncrement(idx)}
                >
                  +
                </button>
                <span>{val.count}</span>
                <button
                  className="btn btn-primary btn-sm d-inline m-2"
                  onClick={() => handleReduce(idx)}
                >
                  -
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave(idx)}
                >
                  เลือก
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>รายการที่เลือก</h2>
          <table>
            <thead>
              <tr>
                <th>ชื่อสินค้า</th>
                <th>จำนวน</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              {selectedItem.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  {editingIndex === index ? (
                    <td>
                      <input
                        type="number"
                        value={item.count}
                        onChange={(e) => handleUpdateCount(index, parseInt(e.target.value))}
                      />
                    </td>
                  ) : (
                    <td>{item.count}</td>
                  )}
                  <td>
                    {editingIndex === index ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setEditingIndex(null)}
                      >
                        บันทึก
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleEditSelected(index)}
                      >
                        แก้ไข
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteSelected(index)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}
