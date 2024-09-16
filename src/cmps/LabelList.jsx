import { IoAddOutline } from 'react-icons/io5'

export function LabelList({ taskLabels, labelWidth, labelHight, setIsClickedLabel }) {
    if (!taskLabels) return null

    return (
        <div className="label-container">
            {taskLabels.map((label, index) => (
                <div
                    key={index}
                    className="label-square"
                    style={{
                        backgroundColor: label.color,
                        width: labelWidth,
                        height: labelHight,
                    }}
                    onClick={() => setIsClickedLabel(isClicked => !isClicked)}
                    >
                    <p className='label-header'>{label.title || ''}</p>
                </div>
            ))}
        </div>
    )
}

// export function LabelList({ taskLabels, boardLabels,labelWidth }) {
// console.log(taskLabels)
// console.log(boardLabels)
// return (
//   <div>
//     <h1>list</h1>
//   </div>
// )
//   return labels.map((label, index) => {
//     const labelItem = labelsList.find((item) => item.label === label);

//     if (labelItem) {
//       return (
//         <div
//           key={index}
//           className="label-square"
//           style={{
//             backgroundColor: labelItem.color,
//             width: labelWidth,
//           }}
//         ></div>
//       );
//     }
//   });
// }
