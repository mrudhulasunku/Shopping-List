import { useState } from "react";

// const itemsList = [
//   {
//     item: "dal",
//     weight: "1kg",
//   },
//   {
//     item: "jeera",
//     weight: "500grams",
//   },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleClearAll() {
    setItems([]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div>
      <Header />
      <Form onAddItem={handleAddItems} />

      <ItemList items={items} onToggleItem={handleToggleItem} />

      <Sorted onClearAll={handleClearAll} items={items} />
    </div>
  );
}

function Header() {
  return <h3>Grocery Shopping List</h3>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const newItem = { name, weight, packed: false, id: Date.now() };
    onAddItem(newItem);
    setName("");
    setWeight("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <span>Item name : </span>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span>Weight : </span>
      <input
        type="text"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function ItemList({ items, onToggleItem }) {
  return (
    <div>
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onToggleItem={onToggleItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.name} : {item.weight}
      </span>
      <span></span>
    </li>
  );
}

function Sorted({ onClearAll, items }) {
  const [sortBy, setSortBy] = useState("unpacked");
  let sortedItems;
  if (sortBy === "unpacked") {
    sortedItems = items;
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div>
      <select>
        <option value="packed">Packed</option>
        <option value="unpacked">UnPacked</option>
      </select>
      <button onClick={onClearAll}>Clear All</button>
    </div>
  );
}
