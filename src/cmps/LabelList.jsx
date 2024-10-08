export function LabelList({ taskLabels, labelWidth, labelHight, labelPadding, setIsClickedLabel,showTitle }) {
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
                        padding: labelPadding
                    }}
                    onClick={() => setIsClickedLabel(isClicked => !isClicked)}>
                    {showTitle &&<span className="label-header">{label.title || ''}</span>}
                </div>
            ))}
        </div>
    )
}
