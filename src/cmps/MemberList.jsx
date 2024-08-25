import { getRandomColor } from '../services/util.service.js'
export function MemberList({ members }) {
    if (!members) return <div>Loading...</div>
    return (
        <section className="member-list">
            <p className='header-member-list'>Members</p>
            {members.map(member => (
                <article key={member} style={{ backgroundColor: getRandomColor() }}>
                    {member[0]}
                </article>
            ))}
        </section>
    )
}
