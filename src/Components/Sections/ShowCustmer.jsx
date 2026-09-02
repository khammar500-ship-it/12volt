import { useEffect, useState } from "react";
import Card3 from "../UI/Card3"

const API_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/getallcustomer";

function ShowCustomer() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const getCustomers = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.status === "true") {
                setCustomers(data.data);
                console.log(data)
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCustomers();
    }, []);
    if (loading) {
        return <p className="text-center text-2xl font-bold text-amber-400">
                انتظر التحميل<span className="loading-dots"></span>
            </p>;
    }
    return (
        <div className="flex flex-wrap gap-5 p-5">

            {customers.map((customer) => (
                <Card3
                    key={customer.id}
                    customer={customer}
                />
            ))}

        </div>
    );
}

export default ShowCustomer;
