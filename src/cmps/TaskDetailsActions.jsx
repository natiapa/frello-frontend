import { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";

export function TaskDetailsActions() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <section className="actions">
            <article className="checklist" onClick={() => setIsModalOpen(isOpen => !isOpen)}>
                <div className="icon">
                    <IoMdCheckboxOutline />
                </div>
                <p>Checklist</p>
                {isModalOpen && <form action="">
                    <input type="text" placeholder="Add an item" />
                    <button className="add-checklist">Add checklist</button>
                </form>}
            </article>
        </section>
    )
}
