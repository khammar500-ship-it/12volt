import { useEffect, useState } from "react";
import Card4 from "../UI/Card4";

const API_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/orderfordas";

function ShowOrder() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrders = async () => {

        try {

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            console.log("API response:", result);

            if (result.status === true) {
                setOrders(result.data);
            }

        } catch (error) {

            console.error(
                "Error fetching orders:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return (
            <p className="text-center text-2xl font-bold text-amber-400">
                انتظر التحميل<span className="loading-dots"></span>
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-5 p-5">

            {orders.map((order) => (
                <Card4
                    key={order.id}
                    order={order}
                />
            ))}

        </div>
    );
}

export default ShowOrder;
