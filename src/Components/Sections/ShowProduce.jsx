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

            if (result.status === true) {
                // إعادة جلب المنتجات من API
                await getProduce();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    useEffect(() => {
        getProduce();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {produse.map((produce) => (
                <Card1
                    key={produce.id}
                    image={produce.photo}
                    text={produce.name_en}
                    row={produce.description_en}
                    price={produce.price}
                    onDelete={() => handleDelete(produce.id)}
                />
            ))}
        </section>
    );
}

export default ShowProduce;