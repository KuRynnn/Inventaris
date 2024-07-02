// components/ItemDetail.js
import React from 'react';
import Image from 'next/image';

const ItemDetail = ({ itemDetail }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex">
        <div className="w-1/3">
          <Image
            src="/images/qr.png"
            alt="Item Image"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
        <div className="w-2/3">
          {Object.entries(itemDetail).map(([key, value]) => (
            <div key={key} className="mb-2 text-black">
              <span className="font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</span>: {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;