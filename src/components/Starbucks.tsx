import React from "react";
import { Menu } from "./Menu";
import { BillItems } from "./BillItems";
import { Modal } from "./Modal";

export interface IData {
  name: string;
  img: string;
  price: number;
  quantity: number;
}

export const data: IData[] = [
  {
    name: "Cappuccino",
    img: "../src/assets/Cappuccino.png",
    price: 3.5,
    quantity: 0,
  },
  { name: "Latte", img: "../src/assets/Latte.png", price: 4, quantity: 0 },
  {
    name: "Espresso",
    img: "../src/assets/Espresso.png",
    price: 2.5,
    quantity: 0,
  },
  { name: "Mocha", img: "../src/assets/Mocha.png", price: 4.5, quantity: 0 },
  {
    name: "Americano",
    img: "../src/assets/Americano.png",
    price: 3,
    quantity: 0,
  },
];

const getInitialData = (): IData[] => {
  const saveData = localStorage.getItem("menuData");
  return saveData ? JSON.parse(saveData) : data;
};

export const Starbucks: React.FC = () => {
  const [values, setValues] = React.useState<IData[]>(getInitialData());

  const [isOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
    resetValues();
  };
  const result = () => {
    setIsOpen(true);
  };

  const resetValues = () => {
    const resetData = values.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setValues(resetData);
  };

  const totalPrice = () => {
    let total = 0;
    values.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(1);
  };

  React.useEffect(() => {
    localStorage.setItem("menuData", JSON.stringify(values));
  }, [values]);

  return (
    <section className="w-full h-fit bg-slate-200 p-8 flex flex-col items-center gap-5">
      <div className="flex justify-center items-center gap-5">
        <img src="../src/assets/logo.png" alt="" className="size-20" />
        <h1 className="font-extrabold text-4xl text-gray-800">Starbucks</h1>
      </div>
      <h4 className="font-semibold text-lg text-slate-700">
        Starbucks Online Coffee Order
      </h4>
      {/* ======================================= Menu ==================================== */}
      <Menu values={values} setValues={setValues} />
      <h2 className="font-bold text-xl text-slate-700">Bill</h2>
      {/* ===================================== Bill items ============================= */}
      <BillItems values={values} setValues={setValues} />
      <p className="font-bold text-2xl my-4 text-slate-800 text-center">
        Total: ${totalPrice()}
      </p>
      <button
        className={`w-[80vw] px-3 py-2 rounded-lg ${
          parseFloat(totalPrice()) === 0 ? "bg-orange-400" : "bg-orange-500"
        } text-white text-lg font-semibold`}
        disabled={parseFloat(totalPrice()) === 0}
        onClick={result}
      >
        Submit Order
      </button>
      {isOpen && <Modal close={closeModal} total={parseFloat(totalPrice())} />}
    </section>
  );
};
