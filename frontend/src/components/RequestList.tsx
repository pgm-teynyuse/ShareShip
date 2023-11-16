"use client";
import React, { useState } from 'react';

const RequestList = ({ title, data, renderItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 w-full">
      <h2
        className="text-2xl font-semibold cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </h2>
      {isOpen && (
        <div>
          {data.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestList;
