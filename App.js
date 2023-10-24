import { useState } from "react";

const items = [
  {
    item: "dal",
    weight: "1kg",
  },
  {
    item: "jeera",
    weight: "500grams",
  },
];

export default function App() {
  const [item, setItem] = useState(items);
  const [weight, setWeight] = useState("");
  function handleAddItems(item) {
    setItem((itemsC) => [...itemsC, item]);
  }
  return (
    <div>
      <Header />
      <Form
        item={item}
        setItem={setItem}
        weight={weight}
        setWeight={setWeight}
        onAddItems={handleAddItems}
      />
      <ItemList />
      {/* <ItemList item={item} setItem={setItem} /> */}
      <Sorted />
    </div>
  );
}

function Header() {
  return <h3>Grocery Shopping List</h3>;
}

function Form({ item, setItem, weight, setWeight, onAddItems }) {
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      item,
      weight,
    };
    onAddItems(newItem);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Item Name </span>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <span>Weight </span>
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        {/* <select>
          <option>Kilograms</option>
          <option>Grams</option>
        </select> */}
        <button>Add Item</button>
      </form>
    </div>
  );
}

function ItemList() {
  return (
    <div>
      {items.map((item) => (
        <Item item={item} />
      ))}
    </div>
  );
}

function Item({ item }) {
  return (
    <div>
      <span>{item.item} : </span>
      <span>{item.weight}</span>
    </div>
  );
}

function Sorted() {
  return (
    <div>
      <select>
        <option>Packed</option>
        <option>UnPacked</option>
      </select>
      <button>Clear All</button>
    </div>
  );
}
