import { useEffect, useState } from "react";
import Card1 from "../UI/Card1";

const API_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/getprodact";

const DELETE_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/deleteproduct";

function ShowProduce() {
    const [produse, setProduce] = useState([]);
    const [loading, setLoading] = useState(true);

    // جلب المنتجات
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

    // حذف المنتج
    const handleDelete = async (id) => {
        try {
            const response = await fetch(DELETE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                }),
            });

            const result = await response.json();

            console.log("Delete:", result);

            if (result.status === true ||
                result.status === "true") {
                // إعادة جلب المنتجات من API
                await getProduce();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };
    useEffect(() => {
        getProduce();

        window.addEventListener("ProduceAdded", getProduce);

        return () => {
            window.removeEventListener("ProduceAdded", getProduce);
        };
    }, []);
    useEffect(() => {
        getProduce();
    }, []);

    if (loading) {
        return <p className="text-center text-2xl font-bold text-amber-400">
                انتظر التحميل<span className="loading-dots"></span>
            </p>;
    }

    return (
        <section className="flex gap-6 p-3  overflow-x-auto items-start">
            {produse.map((produce) => (
                <div key={produce.id} className="flex-shrink-0 w-[350px]">
                    <Card1
                        image={produce.photo}
                        text={produce.name_ar}
                        row={produce.description_ar}
                        price={produce.price}
                        onDelete={() => handleDelete(produce.id)}
                    />
                </div>
            ))}
        </section>
    );
}

export default ShowProduce;