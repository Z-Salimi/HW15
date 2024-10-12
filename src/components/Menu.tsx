import React from "react";
import { IData } from "./Starbucks";

export interface IMenu {
  values: IData[];
  setValues: React.Dispatch<React.SetStateAction<IData[]>>;
}

export const Menu: React.FC<IMenu> = ({ values, setValues }) => {
  const addQTN = (index: number) => {
    const newValues = [...values];
    newValues[index].quantity += 1;
    setValues(newValues);
  };
  const negQTN = (index: number) => {
    const newValues = [...values];
    if (newValues[index].quantity === 0) return;
    newValues[index].quantity -= 1;
    setValues(newValues);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center items-center mt-4 gap-4 ">
      {values.map((item, index) => (
        <div
          key={index}
          className="py-4 px-7 flex flex-col gap-5 rounded-lg bg-green-950"
        >
          <div className="flex flex-col items-center">
            <img src={item.img} alt="" className="size-32 " />
          </div>
          <h3 className="text-white text-lg font-semibold">{item.name}</h3>
          <p className="text-orange-300 font-semibold text-lg">${item.price}</p>
          <div className="flex justify-center items-center">
            <div className="flex items-center justify-between bg-white w-1/2 h-7 rounded-sm">
              <button
                onClick={() => addQTN(index)}
                className="w-1/3 h-full bg-orange-300 flex justify-center items-center"
              >
                +
              </button>
              <p className="text-sm font-semibold">{item.quantity}</p>
              <button
                onClick={() => negQTN(index)}
                className="w-1/3 h-full bg-orange-300 flex justify-center items-center"
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
