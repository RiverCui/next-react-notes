import Redis from 'ioredis'

const redis = new Redis()

const initialData = {
  "1702459181837": '{"title":"Customer Identity Consultant","content":"Tempore quos autem est error aut ipsam. Nemo enim incidunt fugit facilis unde ullam perferendis dolores. Repellendus sunt sit numquam.","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"Direct Configuration Assistant","content":"Sit beatae est. Blanditiis quos in. Minus dicta corporis sint. Iure totam facilis nobis est ea accusantium similique accusamus nihil.","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"Customer Assurance Analyst","content":"Mollitia blanditiis repudiandae in quia sapiente sapiente ratione. Velit rerum nihil eligendi nesciunt rem ad nesciunt suscipit. Dolores ullam voluptas dolorum facere aut voluptatum nisi magnam. Laudantium quae nesciunt doloribus aspernatur in id reprehenderit molestias.","updateTime":"2023-12-13T09:19:48.837Z"}'
}

export async function getAllNotes() {
  const data = await redis.hgetall("notes")
  if(Object.keys(data).length == 0) {
    await redis.hset("notes", initialData)
  }
  return await redis.hgetall("notes")
}

export async function addNote(data) {
  const uuid = Date.now().toString()
  await redis.hset("notes", [uuid], data)
  return uuid
}

export async function updateNote(uuid, data) {
  await redis.hset("notes", [uuid], data)
}

export async function getNote(uuid) {
  return JSON.parse(await redis.hget("notes", uuid))
}

export async function delNote(uuid) {
  return redis.hdel("notes", uuid)
}

export default redis
