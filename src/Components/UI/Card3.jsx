function Card3({ customer }) {
    return (
        <div className=" group w-[350px] rounded-2xl bg-white p-5 shadow-md border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-gray-200">
            {/* Name */}
            <h2 className="     text-xl     font-bold
                    text-gray-800
                    mb-4
                    transition-colors
                    duration-300
                    group-hover:text-blue-600
                "
            >
                {customer.name}
            </h2>

            <div className="space-y-3 text-gray-700">

                {/* Number */}
                <p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">رقم الهاتف:</span>{" "}
                    {customer.number}
                </p>

                {/* City */}
                <p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">المدينة:</span>{" "}
                    {customer.city}
                </p>

                {/* Latitude */}
                {
                    /*<p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">Latitude:</span>{" "}
                    {customer.lat}
                </p>

                {/* Longitude 
                <p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">Longitude:</span>{" "}
                    {customer.long}
                </p>*/} 
                

                {/* Created */}
                <p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">تاريخ الانشاء:</span>{" "}
                    {customer.created_at.slice(0, 10)}
                </p>

                {/* Updated */}
                <p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">تاريخ التعديل:</span>{" "}
                    {customer.updated_at.slice(0, 10)}
                </p>

                {/* Device */}
                <p
                    className="
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                    "
                >
                    <span className="font-semibold">الجهاز:</span>{" "}
                    {customer.device_id ?? "Not connected"}
                </p>

            </div>
        </div>
    );
}

export default Card3;
