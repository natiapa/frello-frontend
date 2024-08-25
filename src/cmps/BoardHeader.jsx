import { CgProfile } from 'react-icons/cg'
import {getRandomColor} from '../services/util.service'

export function BoardHeader({ members, bgColor }) {
    return (
        <section className="board-header" style={{ backgroundColor: bgColor }}>
            <div className="board-header-title">Trello</div>
            <div className="board-header-actions"></div>
            <ul className="members">
                {members.map(member => (
                    <li key={member.id} className="member" style={{backgroundColor: getRandomColor()}}>
                        {member.fullname[0]}
                    </li>
                ))}
            </ul>

            {/* <div className="board-header-icon">🔍</div>
      <div className="board-header-icon">➕</div> */}
        </section>
    )
}
