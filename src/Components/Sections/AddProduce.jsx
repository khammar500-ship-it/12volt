import { useEffect, useState } from "react";

const API_URL =
  "https://12volt.cemsbankcentral.com/api/dascbord/addproduct";

const CATEGORIES_API =
  "https://12volt.cemsbankcentral.com/api/dascbord/getcatogry";

export default function AddProduct() {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    catogry_id: "",
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    price: "",
  });

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ================= GET CATEGORIES =================

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);

      const response = await fetch(CATEGORIES_API, {
        method: "POST",
      });

      const result = await response.json();

      console.log("Categories API Response:", result);

      if (!response.ok) {
        throw new Error(
          result.msg_error || "Failed to fetch categories"
        );
      }

      setCategories(result.data || []);
    } catch (error) {
      console.error("Categories Error:", error);

      setMessage(
        error.message || "حدث خطأ أثناء جلب التصنيفات"
      );
    } finally {
      setCategoriesLoading(false);
    }
  };

  // ================= LOAD CATEGORIES =================

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= CHANGE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= IMAGE =================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      data.append("catogry_id", formData.catogry_id);
      data.append("name_ar", formData.name_ar);
      data.append("name_en", formData.name_en);
      data.append("description_ar", formData.description_ar);
      data.append("description_en", formData.description_en);
      data.append("price", formData.price);

      if (image) {
        data.append("photo", image);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      console.log("API Response:", result);

      if (!response.ok) {
        throw new Error(
          result.message ||
          result.msg_error ||
          "  حدث خطأ أثناء إضافة المنتج تحقق ان حجم الصوره لا يتجتاوز واحد ميغا بايت"
        );
      }

      setMessage("تمت إضافة المنتج بنجاح ✅");

      // ================= RESET FORM =================

      setFormData({
        catogry_id: "",
        name_ar: "",
        name_en: "",
        description_ar: "",
        description_en: "",
        price: "",
      });

      setImage(null);
      setPreview(null);
      window.dispatchEvent(new Event("ProduceAdded"));
      // إغلاق الفورم بعد ثانية ونصف
      setTimeout(() => {
        setShowForm(false);
        setMessage("");
      }, 1500);
      
    } catch (error) {
      console.error("Add Product Error:", error);

      setMessage(
        error.message ||
        "حدث خطأ أثناء الاتصال بالسيرفر"
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
        className=" bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-md transition duration-200 flex items-center gap-2
        "
      >
        <span className="text-xl">+</span>
        Add Product
      </button>

      {/* ================= MODAL ================= */}

      {showForm && (
        <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className=" bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6">

            {/* ================= HEADER ================= */}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-gray-800">
                Add Product
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className=" text-gray-500 hover:text-red-500 text-2xl font-bold" >
                ×
              </button>

            </div>

            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* ================= CATEGORY ================= */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Category
                </label>

                <select name="catogry_id"
                  value={formData.catogry_id}
                  onChange={handleChange} required
                  disabled={categoriesLoading}
                  className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white focus:ring-2 focus:ring-yellow-400"
                >

                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select Category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name_en}
                    </option>
                  ))}

                </select>

              </div>

              {/* ================= NAMES ================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Arabic Name */}

                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    الاسم بالعربي
                  </label>

                  <input type="text"
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange} required
                    dir="rtl"
                    placeholder="بطارية سائلة"
                    className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400 " />

                </div>

                {/* English Name */}

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    English Name
                  </label>

                  <input
                    type="text"
                    name="name_en"
                    value={formData.name_en}
                    onChange={handleChange}
                    required
                    placeholder="Liquid Battery"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      px-4
                      py-3
                      outline-none
                      focus:ring-2
                      focus:ring-yellow-400
                    "
                  />

                </div>

              </div>

              {/* ================= DESCRIPTIONS ================= */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Arabic Description */}

                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    الوصف بالعربي
                  </label>

                  <textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleChange}
                    required
                    dir="rtl"
                    rows="4"
                    placeholder="اكتب وصف المنتج..."
                    className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-yellow-400"
                  />

                </div>

                {/* English Description */}

                <div>

                  <label className="block mb-2 font-semibold text-gray-700">
                    English Description
                  </label>

                  <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Write product description..."
                    className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-yellow-400"
                  />

                </div>

              </div>

              {/* ================= PRICE ================= */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="2.1"
                  className=" w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
                />

              </div>

              {/* ================= IMAGE ================= */}

              <div>

                <label className="block mb-2 font-semibold text-gray-700">
                  Product Image
                </label>
                <label
                  className=" flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition"
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
                      className="  h-full  max-w-full  object-contain  rounded-lg"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>

                {/* File Name */}

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
                    p - 3
                    rounded-xl
                  text-center
                  font-semibold

                  ${
                      message.includes("بنجاح")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                  }`
                  }
                >
              {message}
          </div>
              )}

          {/* ================= BUTTONS ================= */}

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="  px-6  py-3  rounded-xl  border  border-gray-300  text-gray-700  hover:bg-gray-100  transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="  px-6  py-3  rounded-xl  bg-yellow-400  hover:bg-yellow-500  disabled:bg-gray-300  disabled:cursor-not-allowed  text-black  font-bold  transition"
            >
              {loading
                ? "Adding..."
                : "Add Product"}
            </button>

          </div>

        </form>
          </div>
        </div >
      )
}
    </div >
  );
}