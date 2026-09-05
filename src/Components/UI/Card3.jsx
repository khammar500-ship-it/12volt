
function Card3({ customer }) {
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
                {/* Decoration */}
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

                    {/* Customer name */}
                    <div>
                        <p className="text-xs font-medium text-yellow-900/70 mb-1">
                            معلومات العميل
                        </p>

                        <h2 className="text-2xl font-extrabold text-gray-900">
                            {customer.name}
                        </h2>
                    </div>

                    {/* User icon */}
                    <div
                        className="
                            w-12 h-12
                            flex items-center justify-center
                            rounded-2xl
                            bg-white/90
                            backdrop-blur-sm
                            shadow-sm
                            text-xl
                        "
                    >
                        👤
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">

                <div className="space-y-4 text-gray-700">

                    {/* Phone */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            رقم الهاتف
                        </span>

                        <span className="font-bold text-gray-800">
                            {customer.number}
                        </span>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* City */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            المدينة
                        </span>

                        <span className="font-bold text-gray-800">
                            {customer.city}
                        </span>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Device */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            الجهاز
                        </span>

                        <span
                            className={`
                                px-3 py-1
                                rounded-full
                                text-sm
                                font-bold
                                ${
                                    customer.device_id
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-500"
                                }
                            `}
                        >
                            {customer.device_id
                                ? customer.device_id
                                : "غير متصل"}
                        </span>
                    </div>

                    {/* Dates */}
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">

                        {/* Created */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                تاريخ الإنشاء
                            </span>

                            <span className="text-sm font-semibold text-gray-700">
                                {customer.created_at
                                    ? customer.created_at.slice(0, 10)
                                    : "-"}
                            </span>
                        </div>

                        {/* Updated */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                تاريخ التعديل
                            </span>

                            <span className="text-sm font-semibold text-gray-700">
                                {customer.updated_at
                                    ? customer.updated_at.slice(0, 10)
                                    : "-"}
                            </span>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Card3;
