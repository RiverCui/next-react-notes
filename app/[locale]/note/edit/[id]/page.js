import NoteEditor from '@/components/NoteEditor'
import {getNote} from '@/lib/redis'
import { sleep } from '@/lib/utils'

export default async function EditPage({ params }) {
  const noteId = params.id
  const note = await getNote(noteId)

  // 模拟网络延迟
  await sleep(2000)

  if(note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Dynamic Edit Page!
        </span>
      </div>
    )
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}
