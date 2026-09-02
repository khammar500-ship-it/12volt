import { useState } from "react";

function Card1({ image, text, row, price, onDelete }) {
  const [showFullText, setShowFullText] = useState(false);

  const maxLength = 100;

  const isLongText = row && row.length > maxLength;

  const displayedText =
    isLongText && !showFullText
      ? row.slice(0, maxLength) + "..."
      : row;

  return (
    <div className="w-full max-w-[370px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

      {/* الصورة */}
      <div
        className="relative w-full h-[320px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* طبقة خفيفة فوق الصورة */}
        <div className="absolute inset-0 bg-black/10" />

        {/* زر الحذف */}
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-red-500/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          title="حذف"
        >
          🗑
        </button>

        {/* اسم التصنيف */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/55 backdrop-blur-md rounded-xl px-4 py-3 shadow-md text-center">
            <h3 className="text-lg font-bold text-gray-800">
              {text}
            </h3>
          </div>
        </div>
      </div>
      {price !== null && price !== undefined && (
        <div className="px-4 py-3 font-bold text-blue-600">
          السعر: {price} $
        </div>
      )}
      {/* المعلومات الإضافية */}
      {(row || price) && (
        <div className="px-4 py-3">

          {row && (
            <div className="min-h-22 text-sm text-gray-500">
              <p >{displayedText}</p>

              {isLongText && (
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  className="mt-2 text-blue-600 font-semibold hover:text-blue-800 transition"
                >
                  {showFullText ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          )}



        </div>
      )}
    </div>
  );
}

export default Card1;