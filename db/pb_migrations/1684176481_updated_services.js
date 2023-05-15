migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vrngpkbvh12ru2")

  collection.createRule = "@request.auth.canCreateServices = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9vrngpkbvh12ru2")

  collection.createRule = null

  return dao.saveCollection(collection)
})
