import { getRandomColor } from '../services/util.service.js'
export function MemberList({ members }) {
    if (!members) return <div>Loading...</div>
    return (
        <section className="member-list">
            <p className='header-member-list'>Members</p>
            {members.map(member => (
                <article key={member.fullname} style={{ backgroundColor: member.color }}>
                    {member.fullname[0].toUpperCase()}
                </article>
            ))}
        </section>
    )
}
