
import { useState } from "react";

const API_URL =
  "https://12volt.cemsbankcentral.com/api/dascbord/addcatogry";

export default function AddCategory() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // تغيير قيم الحقول
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // اختيار الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    // Preview للصورة
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = new FormData();

      data.append("name_ar", formData.name_ar);
      data.append("name_en", formData.name_en);
      if (image) {
        data.append("photo", image);
      }
      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.message || "حدث خطأ أثناء إضافة النوع تحقق ان حجم الصوره لا يتجتاوز واحد ميغا بايت"
        );
      }
      console.log("API Response:", result);
      setMessage("تمت إضافة النوع بنجاح ");
      window.dispatchEvent(new Event("categoryAdded"));
      // تنظيف الفورم
      setFormData({

        name_ar: "",
        name_en: "",
      });

      setImage(null);
      setPreview(null);

      // إغلاق الفورم بعد ثانية
      setTimeout(() => {
        setShowForm(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error(error);

      setMessage(
        error.message || "حدث خطأ أثناء الاتصال بالسيرفر"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* ================= BUTTON ================= */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-md transition duration-200 flex items-center gap-2">
        <span className="text-xl">+</span>
        اضافة نوع
      </button>
      {showForm && (
        <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 ">
          <div className=" bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Add Category
              </h2>
              <button onClick={() => setShowForm(false)} className=" text-gray-500 hover:text-red-500 text-2xl font-bold ">
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    الاسم بالعربي
                  </label>
                  <input type="text" name="name_ar" value={formData.name_ar} onChange={handleChange} required dir="rtl" placeholder="بطارية سائلة" className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>

                {/* English Name */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    English Name
                  </label>

                  <input type="text" name="name_en"
                         value={formData.name_en} 
                         onChange={handleChange} required 
                         placeholder="Liquid battery" className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 "/>
                </div>

              </div>
              {/* ================= IMAGE ================= */}
              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Product Image
                </label>

                <label
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    w-full
                    h-40
                    border-2
                    border-dashed
                    border-gray-300
                    rounded-xl
                    cursor-pointer
                    hover:border-yellow-400
                    hover:bg-yellow-50
                    transition
                  "
                >

                  {!preview ? (
                    <>
                      <div className="text-4xl mb-2">
                        📷
                      </div>
                      <p className="text-gray-500">
                        Click to choose an image
                      </p>
                      <p className="text-sm text-gray-400">
                        PNG, JPG, JPEG
                      </p>
                    </>
                  ) : (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full max-w-full object-contain rounded-lg "
                    />
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

                {/* اسم الملف */}
                {image && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {image.name}
                  </p>
                )}

              </div>

              {/* ================= MESSAGE ================= */}
              {message && (
                <div
                  className={`
                    p-3
                    rounded-xl
                    text-center
                    font-semibold
                    ${
                      message.includes("بنجاح") ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {message}
                </div>
              )}

              {/* ================= BUTTONS ================= */}
              <div className="flex justify-end gap-3 pt-3">

                <button type="button" onClick={() => setShowForm(false)} className=" px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                  اغلاق
                </button>
                <button type="submit" disabled={loading} className=" px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold transition ">
                {loading ? "انظار الاضافة..." : "اضافة نوع"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
