import React from "react";
import { IMenu } from "./Menu";

export const BillItems: React.FC<IMenu> = ({ values }) => {
  
    const prices = (index: number): number => {
    const newValues = [...values];
    const QNT = newValues[index].quantity;
    if (QNT === 0) return 0;
    const price = newValues[index].price;
    
    return QNT * price;
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center items-center mt-4 gap-4">
      {values.map((item, index) => (
        <div key={index} className="py-4 px-7 flex flex-col gap-5 rounded-lg bg-green-950">
          <div className="flex flex-col items-center">
            <img src={item.img} alt="" className="size-32" />
          </div>
          <h3 className="text-white text-lg font-semibold">{item.name}</h3>
          <p className="text-orange-300 font-semibold text-lg">
            ${prices(index).toFixed(1)}
          </p>
          <div className="flex items-center text-white">
            <p className="font-semibold">
              Qty: <span>{item.quantity}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
