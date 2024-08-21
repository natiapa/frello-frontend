export function BoardSideBar({ board }) {
    return (
        <section className="board-side-bar">
           <ul>
            <li>
                <p>{board.title}</p>
            </li>
           </ul>
        </section>
    )
}