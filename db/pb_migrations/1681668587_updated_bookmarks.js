migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j6ktei7bvojt6nf")

  collection.deleteRule = "@request.auth.id = owner.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j6ktei7bvojt6nf")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
