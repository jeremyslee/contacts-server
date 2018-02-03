const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      id: 'brutus',
      name: 'Brutus Burrito',
      email: 'brutus@brutusburrito.com',
      avatarURL: config.origin + '/brutus.jpg'
    },
    {
      id: 'smudge',
      name: 'Purrfect Smudge',
      email: 'smudge@purrfectsmudge.com',
      avatarURL: config.origin + '/smudge.jpg'
    },
    {
      id: 'mickey',
      name: 'Mickey Mouse',
      email: 'mickey@disneyemail.com',
      avatarURL: config.origin + '/mickey.png'
    },
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8)
  }

  get(token).contacts.push(contact)

  return contact
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
  }

  return { contact }
}

module.exports = {
  get,
  add,
  remove
}
