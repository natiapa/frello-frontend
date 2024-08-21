
export function LabelList({ labels }) {

    console.log(labels)
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
            console.log(labelItem)
            if (labelItem) {
                return (
                    <div key={index} style={{ color: labelItem.color }}>
                        {labelItem.label}
                    </div>
                )
            }
        })

    )
}