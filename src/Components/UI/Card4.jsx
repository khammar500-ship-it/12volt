import { useEffect, useState } from "react";

function Card4({ order }) {
    const [produse, setProduce] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(order.Confirmation === 1);

    const API_URL =
        "https://12volt.cemsbankcentral.com/api/dascbord/getprodact";

    const DELETE_URL =
        "https://12volt.cemsbankcentral.com/api/dascbord/delete_order";

    const CONFIRM_URL =
        "https://12volt.cemsbankcentral.com/api/dascbord/Confirmation_order";

    // =========================
    // جلب المنتجات
    // =========================
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

    // =========================
    // حذف الطلب
    // =========================
    const deleteOrder = async () => {
        if (!window.confirm("هل أنت متأكد من حذف هذا الطلب؟")) {
            return;
        }

        try {
            setDeleting(true);

            console.log("Delete Order ID:", order.id);

            const response = await fetch(DELETE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order_id: order.id,
                }),
            });

            const result = await response.json();

            console.log("Delete order:", result);

            if (response.ok) {
                alert("تم حذف الطلب بنجاح");

                // إعادة تحميل البيانات
                window.location.reload();
            } else {
                alert(result.message || "حدث خطأ أثناء حذف الطلب");
            }
        } catch (error) {
            console.error("Delete order error:", error);
            alert("حدث خطأ أثناء حذف الطلب");
        } finally {
            setDeleting(false);
        }
    };

    // =========================
    // تأكيد الطلب
    // =========================
    const confirmOrder = async () => {
        if (confirmed) {
            return;
        }

        try {
            setConfirming(true);

            console.log("Confirm Order ID:", order.id);

            const response = await fetch(CONFIRM_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order_id: order.id,
                }),
            });

            const result = await response.json();

            console.log("Confirmation order:", result);

            if (response.ok) {
                setConfirmed(true);
                alert("تم تأكيد الطلب بنجاح");
            } else {
                alert(result.message || "حدث خطأ أثناء تأكيد الطلب");
            }
        } catch (error) {
            console.error("Confirm order error:", error);
            alert("حدث خطأ أثناء تأكيد الطلب");
        } finally {
            setConfirming(false);
        }
    };

    // =========================
    // تحويل pro_id إلى Array
    // =========================
    let products = [];

    try {
        if (Array.isArray(order.pro_id)) {
            products = order.pro_id;
        } else if (typeof order.pro_id === "string") {
            products = JSON.parse(order.pro_id);
        }
    } catch (error) {
        console.error("Error parsing pro_id:", error);
        products = [];
    }

    return (
        <div
            dir="rtl"
            className="
                group w-[350px]
                overflow-hidden
                rounded-3xl
                bg-white
                border border-gray-100
                shadow-lg
                transition-all duration-300 ease-out
                hover:-translate-y-2
                hover:shadow-2xl
                hover:border-yellow-300
            "
        >
            {/* Header */}
            <div
                className="
                    relative
                    bg-gradient-to-l
                    from-yellow-400
                    to-yellow-300
                    px-5 py-4
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -left-6
                        -top-8
                        w-24 h-24
                        rounded-full
                        bg-white/20
                        transition-transform duration-500
                        group-hover:scale-150
                    "
                />

                <div className="relative flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-yellow-900/70 mb-1">
                            رقم الطلب #{order.id}
                        </p>

                        <h2 className="text-2xl font-extrabold text-gray-900">
                            الطلب
                        </h2>
                    </div>

                    <div
                        className="
                            bg-white/90
                            backdrop-blur-sm
                            rounded-2xl
                            px-3 py-2
                            shadow-sm
                        "
                    >
                        <span className="text-lg font-extrabold text-green-600">
                            ${order.price}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="space-y-4 text-gray-700">

                    {/* User */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            المستخدم
                        </span>

                        <span className="font-bold text-gray-800">
                            #{order.user_id}
                        </span>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Location */}
                    <div>
                        <span className="block text-sm text-gray-500 mb-1">
                            الموقع
                        </span>

                        <p className="break-words font-medium text-gray-800">
                            {order.location}
                        </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            حالة الطلب
                        </span>

                        <span
                            className={`
                                px-3 py-1
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                    confirmed
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }
                            `}
                        >
                            {confirmed
                                ? "✓ مؤكد"
                                : "⏳ قيد الانتظار"}
                        </span>
                    </div>

                    {/* Products */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-800">
                                المنتجات المطلوبة
                            </p>

                            <span className="text-xs text-gray-400">
                                {products.length} منتجات
                            </span>
                        </div>

                        <div className="space-y-2">
                            {loading ? (
                                <div className="flex items-center justify-center py-4">
                                    <p className="text-gray-400 text-sm animate-pulse">
                                        جاري تحميل المنتجات...
                                    </p>
                                </div>
                            ) : products.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center py-3">
                                    لا توجد منتجات
                                </p>
                            ) : (
                                products.map((product, index) => {
                                    const productData = produse.find(
                                        (item) =>
                                            Number(item.id) ===
                                            Number(product.id)
                                    );

                                    return (
                                        <div
                                            key={index}
                                            className="
                                                flex
                                                justify-between
                                                items-center
                                                gap-3
                                                bg-gray-50
                                                border border-gray-100
                                                rounded-xl
                                                px-3 py-2.5
                                                transition-all duration-300
                                                group-hover:border-yellow-200
                                                group-hover:bg-yellow-50/50
                                            "
                                        >
                                            <span className="font-medium text-gray-700">
                                                {productData
                                                    ? productData.name_ar
                                                    : `المنتج ${product.id} لم يعد متوفر`}
                                            </span>

                                            <span
                                                className="
                                                    min-w-[32px]
                                                    text-center
                                                    rounded-lg
                                                    bg-yellow-400
                                                    text-gray-900
                                                    px-2 py-1
                                                    text-sm
                                                    font-extrabold
                                                "
                                            >
                                                × {product.quantity}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Date */}
                    <div
                        className="
                            mt-4
                            pt-4
                            border-t border-gray-100
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <span className="text-sm text-gray-500">
                            تاريخ الطلب
                        </span>

                        <span className="text-sm font-semibold text-gray-700">
                            {order.created_at
                                ? order.created_at.slice(0, 10)
                                : "-"}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="pt-2 grid grid-cols-2 gap-3">

                        {/* Confirm */}
                        <button
                            onClick={confirmOrder}
                            disabled={confirming || confirmed}
                            className="
                                rounded-xl
                                bg-yellow-400
                                hover:bg-yellow-500
                                active:scale-95
                                py-2.5
                                font-bold
                                text-gray-900
                                shadow-sm
                                transition-all
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {confirming
                                ? "جاري التأكيد..."
                                : confirmed
                                ? "✓ تم التأكيد"
                                : "✓ تأكيد الطلب"}
                        </button>

                        {/* Delete */}
                        <button
                            onClick={deleteOrder}
                            disabled={deleting}
                            className="
                                rounded-xl
                                bg-red-500
                                hover:bg-red-600
                                active:scale-95
                                py-2.5
                                font-bold
                                text-white
                                shadow-sm
                                transition-all
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {deleting
                                ? "جاري الحذف..."
                                : "🗑 حذف الطلب"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card4;