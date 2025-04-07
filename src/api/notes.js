import request from '@/utils/request'

export function getNotes() {
  return request({
    url: '/api/notes',
    method: 'get'
  })
}

export function updateNote(note) {
  return request({
    url: `/api/notes/${note.id}`,
    method: 'put',
    data: note
  })
} 