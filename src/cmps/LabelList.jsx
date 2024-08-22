
export function LabelList({ labels }) {
    const labelsList = [
        { label: 'Urgent', color: 'red' },
        { label: 'In Progress', color: 'orange' },
        { label: 'Completed', color: 'green' },
        { label: 'On Hold', color: 'yellow' },
        { label: 'Review', color: 'blue' },
        { label: 'Low Priority', color: 'gray' },
        { label: 'Important', color: 'purple' },
    ]

    return (

        labels.map((label, index) => {
            const labelItem = labelsList.find(item => item.label === label)
        
            if (labelItem) {
                return (
                    <div 
                    key={index} 
                    className="label-square" 
                    style={{ backgroundColor: labelItem.color }}
                  ></div>
                )
            }
        })

    )
}