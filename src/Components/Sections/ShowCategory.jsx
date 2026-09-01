import { useEffect, useState } from "react";
import Card1 from "../UI/Card1";

const API_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/getcatogry";

const DELETE_URL =
    "https://12volt.cemsbankcentral.com/api/dascbord/deletecatogry";

function ShowCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // جلب التصنيفات
    const getCategories = async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            console.log("Categories API:", result);

            if (
                result.status === true ||
                result.status === "true"
            ) {
                setCategories(result.data);
            }
        } catch (error) {
            console.error(
                "Error fetching categories:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // حذف التصنيف
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

            if (
                result.status === true ||
                result.status === "true"
            ) {
                // إعادة جلب التصنيفات مباشرة
                await getCategories();
            }
        } catch (error) {
            console.error(
                "Delete error:",
                error
            );
        }
    };

    // أول تحميل للصفحة
    useEffect(() => {
        getCategories();
    }, []);
    useEffect(() => {
        getCategories();

        window.addEventListener("categoryAdded", getCategories);

        return () => {
            window.removeEventListener("categoryAdded", getCategories);
        };
    }, []);
    if (loading) {
        return (
            <p className="text-center">
                Loading...
            </p>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {categories.map((category) => (
                <Card1
                    key={category.id}
                    image={category.photo}
                    text={category.name_en}
                    onDelete={() =>
                        handleDelete(category.id)
                    }
                />
            ))}
        </section>
    );
}

export default ShowCategory;