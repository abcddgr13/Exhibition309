import React, { useEffect, useState } from "react";
import { loadArtworks, saveArtworks } from "../lib/localStorage";
import { useLocation } from "wouter";

interface Artwork {
  id: string;
  title: string;
  artist: string;
  category: string;
  concept: string;
  imageBase64?: string;
}

const AdminDashboard: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin");
    if (!isAdmin) {
      const pass = prompt("กรุณาใส่รหัสผ่านสำหรับผู้ดูแลระบบ:");
      if (pass === "muxdir]skPADMIN111") {
        sessionStorage.setItem("isAdmin", "true");
      } else {
        alert("คุณไม่มีสิทธิ์เข้าหน้านี้");
        setLocation("/");
      }
    }
    setArtworks(loadArtworks());
  }, [setLocation]);

  const handleDelete = (index: number) => {
    if (window.confirm("คุณแน่ใจหรือว่าต้องการลบผลงานนี้?")) {
      const updated = [...artworks];
      updated.splice(index, 1);
      setArtworks(updated);
      saveArtworks(updated);
    }
  };

  const handleEdit = (index: number) => {
    const art = artworks[index];
    const newTitle = prompt("แก้ไขชื่อผลงาน:", art.title) || art.title;
    const newArtist = prompt("แก้ไขชื่อศิลปิน:", art.artist) || art.artist;
    const newCategory = prompt("แก้ไขหมวดหมู่:", art.category) || art.category;
    const newConcept = prompt("แก้ไขแนวคิด:", art.concept) || art.concept;

    const updated = [...artworks];
    updated[index] = {
      ...art,
      title: newTitle,
      artist: newArtist,
      category: newCategory,
      concept: newConcept,
    };

    setArtworks(updated);
    saveArtworks(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">แดชบอร์ดผู้ดูแล</h1>
      {artworks.length === 0 ? (
        <p className="text-gray-400">ยังไม่มีผลงาน</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {artworks.map((art, index) => (
            <div
              key={art.id}
              className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              {art.imageBase64 && (
                <img
                  src={art.imageBase64}
                  alt={art.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-white">{art.title}</h3>
              <p className="text-sm text-gray-300">
                {art.artist} ({art.category})
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
