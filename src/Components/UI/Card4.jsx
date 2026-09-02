 import { useEffect, useState } from "react";

function Card4({ order }) {
    const [produse, setProduce] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL =
        "https://12volt.cemsbankcentral.com/api/dascbord/getprodact";

    // جلب المنتجات
    useEffect(() => {
        const getProduce = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                console.log("Produce API:", result);

                if (result.status === true) {
                    setProduce(result.data);
                }
            } catch (error) {
                console.error("Error fetching produce:", error);
            } finally {
                setLoading(false);
            }
        };

        getProduce();
    }, []);

    // تحويل pro_id من String إلى Array
    let products = [];

    try {
        products = JSON.parse(order.pro_id);
    } catch (error) {
        console.error("Error parsing products:", error);
    }

    return (
        <div className=" group w-[350px] rounded-2xl bg-white p-5 border border-gray-100 shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-gray-200">
            {/* Price */}
            <div className="flex justify-between items-center mb-4"> 
                <h2 className=" text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600 ">
                    الطلب
                </h2>

                <span className="text-lg font-bold text-green-600">
                    ${order.price}
                </span>
            </div>

            <div className="space-y-3 text-gray-700">

                {/* User */}
                <p>
                    <span className="font-semibold">المستخدم:</span>{" "}
                    {order.user_id}
                </p>

                {/* Cart */}
                {/* <p>
                    <span className="font-semibold">Cart:</span>{" "}
                    {order.cart_id}
                </p>
                */}

                {/* Location */}
                <p className="break-words">
                    <span className="font-semibold">الموقع:</span>{" "}
                    {order.location}
                </p>

                {/* Confirmation */}
                <p>
                    <span className="font-semibold">حاله الطلب:</span>{" "}

                    <span
                        className={
                            order.Confirmation === 1
                                ? "text-green-600 font-semibold"
                                : "text-orange-500 font-semibold"
                        }
                    >
                        {order.Confirmation === 1
                            ? "Confirmed"
                            : "Pending"}
                    </span>
                </p>

                {/* Products */}
                <div>
                    <p className="font-semibold mb-1">
                        المنتجات المطلوبة:
                    </p>

                    <div className="space-y-1">

                        {loading ? (
                            <p className="text-gray-400 text-sm">
                                انظر تحميل المنتجات ...
                            </p>
                        ) : (
                            products.map((product, index) => {
// البحث عن المنتج المطابق للـ ID
                                const productData = produse.find(
                                    (item) =>
                                        Number(item.id) === Number(product.id)
                                );

                                return (
                                    <div
                                        key={index}
                                        className=" flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2 transition-all duration-300 group-hover:bg-gray-100">
                                        <span>
                                            {productData? productData.name_ar:` المنتج ${product.id} لم يعد متوفر `}
                                        </span>

                                        <span className="font-semibold">
                                            × {product.quantity}
                                        </span>
                                    </div>
                                );
                            })
                        )}

                    </div>
                </div>

                {/* Coordinates */}
                {/*<div className="flex justify-between text-sm text-gray-500 pt-2">
                    <span>
                        Lat: {order.lat}
                    </span>

                    <span>
                        Long: {order.long}
                    </span>
                </div> */}

                {/* Date */}
                <p className="text-sm text-gray-500 pt-1">
                    <span className="font-semibold">
                        تاريخ الطلب:
                    </span>{" "}
                    {order.created_at.slice(0, 10)}
                </p>

            </div>
        </div>
    );
}

export default Card4;