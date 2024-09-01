export function LabelList({ labels }) {
  const labelsList = [
    { label: "Completed", color: "#4BCE97" },
    { label: "On Hold", color: "#F5CD47" },
    { label: "In Progress", color: "#FEA362" },
    { label: "Urgent", color: "#F87168" },
    { label: "Important", color: "#9F8FEF" },
    { label: "Review", color: "#579DFF" },
    { label: "Low Priority", color: "#8590A2" },
  ];

  return labels.map((label, index) => {
    const labelItem = labelsList.find((item) => item.label === label);

    if (labelItem) {
      return (
        <li
          key={index}
          className="label-square"
          style={{ backgroundColor: labelItem.color }}
        ></li>
      );
    }
  });
}
