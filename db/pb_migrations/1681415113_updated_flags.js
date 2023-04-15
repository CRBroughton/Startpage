migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cc1ju8eqyywjnnr")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cc1ju8eqyywjnnr")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
