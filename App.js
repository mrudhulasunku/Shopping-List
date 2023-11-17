import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function AddGroceryItems(item) {
    setItems((item) => [...items, item]);
  }

  function ToggleGroceryItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div>
      <GroceryHeader />
      <GroceryForm onAddGroceryItems={AddGroceryItems} />
      <GroceryList items={items} onToggleGroceryItems={ToggleGroceryItems} />
      <GrocerySort />
    </div>
  );
}

function GroceryHeader() {
  return (
    <div>
      <h1>Grocery List</h1>
    </div>
  );
}

function GroceryForm({ onAddGroceryItems }) {
  const [itemName, setItemName] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("quantity");
  function handleSubmit(e) {
    e.preventDefault();
    if (!itemName) return;
    const newItem = {
      itemName,
      weight,
      quantity,
      packed: false,
      id: performance.now(),
    };
    onAddGroceryItems(newItem);
    setItemName("");
    setWeight("");
    setQuantity("quantity");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Item: </label>
      <input
        type="text"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />

      <label>Weight : </label>
      <input
        type="text"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        <option value="quantity">Quantity</option>
        <option value="grams">Grams</option>
        <option value="kilogram">Kilo-gram</option>
      </select>
      <button>Add</button>
    </form>
  );
}

function GroceryList({ items, onToggleGroceryItems }) {
  return (
    <ul>
      {items.map((item) => (
        <GroceryItemList
          item={item}
          key={item.id}
          onToggleGroceryItems={onToggleGroceryItems}
        />
      ))}
    </ul>
  );
}

function GroceryItemList({ item, onToggleGroceryItems, key }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleGroceryItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.itemName}
        {item.weight}
        {item.quantity}
      </span>
      <button style={{ color: "red" }}>X</button>
    </li>
  );
}

function GrocerySort() {
  return (
    <div>
      <select>
        <option>Sort By</option>
        {/* Sorts according to alphabetic order */}
        <option>Sort By Input</option>
        {/* Sorts according to packed */}
        <option>Sort By Packing</option>
      </select>
    </div>
  );
}
