import { useEffect, useState } from "react";

import Card2 from "../UI/Card2";

const API_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/getallpodcast";

const DELETE_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/delete";

function ShowPodcast() {
    const [podcast, setPodcast] = useState([]);
    const [loading, setLoading] = useState(true);

    // جلب المنتجات
    const getPodcast = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            console.log("Podcast API:", result);

            if (result.status === "true") {
                setPodcast(result.data);
            }
        } catch (error) {
            console.error("Error fetching podcast:", error);
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
                await getPodcast();
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    useEffect(() => {
        getPodcast();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <section className=" flex flex-col border bg-white border-amber-300 m-5 rounded-2xl max-sm:overflow-x-auto max-sm:flex-row">
            {podcast.map((podcast) => (
                <Card2
                    key={podcast.id}
                    photo={podcast.photo}
                    description={podcast.description}
                    created_at={podcast.created_at.slice(0,10)}
                    
                />
            ))}
        </section>
    );
}

export default ShowPodcast;