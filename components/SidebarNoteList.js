import SidebarNoteItem from '@/components/SidebarNoteItem'
import { getAllNotes } from '@/lib/redis'
import { sleep } from '@/lib/utils'

export default async function NoteList() {
  // 模拟网络延迟
  await sleep(5000)
  const notes = await getAllNotes()

  const arr = Object.entries(notes)

  if(arr.length == 0) {
    return <div className="notes-empty">
      {'No notes yet'}
    </div>
  }

  return <ul className="notes-list">
    {arr.map(([noteId, note]) => {
      return <li key={noteId}>
        <SidebarNoteItem noteId={noteId} note={JSON.parse(note)} />
      </li>
    })}
  </ul>
}