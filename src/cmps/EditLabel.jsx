import { useState, useEffect } from "react";

export function EditLabel({ label }) {
  const [labelToEdit, setLabelToEdit] = useState(label);

  const colors = [
    "#A4E57E",
    "#FFECB3",
    "#FFE0B2",
    "#FFCDD2",
    "#D1C4E9",
    "#81C784",
    "#FFD54F",
    "#FF7043",
    "#E57373",
    "#9575CD",
    "#4CAF50",
    "#FFB74D",
    "#FF5722",
    "#F44336",
    "#673AB7",
    "#2196F3",
    "#4DD0E1",
    "#AED581",
    "#FFC107",
    "#BDBDBD",
    "#1976D2",
    "#00ACC1",
    "#689F38",
    "#EC407A",
    "#616161",
  ];

  console.log(label);
  useEffect(() => {
    setLabelToEdit(label);
  }, [label]);

  function handelInputChange({ target }) {
    const { name, value } = target;
    setLabelToEdit((prevLabel) => ({
      ...prevLabel,
      [name]: value,
    }));
  }

function handleColorChange(color) {
    setLabelToEdit((prevLabel) => ({
        ...prevLabel,
        color: color,
      }))
}

  return (
    <>
      <h4>Edit Label</h4>
      <section className="label-edit-container">
        <div
          className="label-preview"
          style={{ backgroundColor: labelToEdit.color || "#f0f0f0" }}
        >
          {labelToEdit.title}
        </div>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={labelToEdit.title}
          onChange={handelInputChange}
        />

        <label>Select a color</label>
        <div className="color-grid">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className={`color-item ${
                labelToEdit.color === color ? "selected" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            ></div>
          ))}
        </div>

        <button className="">

        </button>
      </section>
    </>
  );
}
