import { useState, useEffect } from "react";

export function EditLabel({ label }) {
  const [labelToEdit, setLabelToEdit] = useState(label);

  console.log(label);
  //   useEffect(() => {
  //     setLabelToEdit(label);
  //   }, [label]);

  //   function handleInputChange(event) {
  //     const { name, value } = event.target;
  //     setLabelToEdit((prevLabel) => ({
  //       ...prevLabel,
  //       [name]: value,
  //     }));
  //   }

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

        
      </section>
    </>
  );
}
