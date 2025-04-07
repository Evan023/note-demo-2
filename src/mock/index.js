import Mock from 'mockjs'

const notes = [
  {
    id: 1,
    title: '会议记录',
    content: '今天的会议内容...',
    tagId: 2,
    isPinned: true,
    createTime: '2024-03-10T10:00:00.000Z',
    updateTime: '2024-03-10T10:00:00.000Z'
  },
  {
    id: 2,
    title: '待办事项',
    content: '1. 完成项目文档\n2. 准备周会演示',
    tagId: 3,
    isPinned: false,
    createTime: '2024-03-09T15:30:00.000Z',
    updateTime: '2024-03-09T15:30:00.000Z'
  }
]

Mock.mock('/api/notes', 'get', {
  code: 200,
  data: notes
})

Mock.mock(/\/api\/notes\/\d+/, 'put', ({ body }) => {
  const note = JSON.parse(body)
  return {
    code: 200,
    data: note
  }
}) 