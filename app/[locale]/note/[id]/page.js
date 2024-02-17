import Note from '@/components/Note'
import {getNote} from '@/lib/redis'
import { sleep } from '@/lib/utils'

export default async function Page({ params }) {
  // 动态路由 获取笔记 id
  const noteId = params.id
  const note = await getNote(noteId)

  // 模拟网络延迟
  await sleep(2000)

  if(note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to View something!
        </span>
      </div>
    )
  }

  return <Note noteId={noteId} note={note} />
}