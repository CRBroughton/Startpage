migrate((db) => {
  const collection = new Collection({
    "id": "cc1ju8eqyywjnnr",
    "created": "2023-04-13 19:36:01.535Z",
    "updated": "2023-04-13 19:36:01.535Z",
    "name": "flags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4iqoi2pw",
        "name": "canCreateAccounts",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cc1ju8eqyywjnnr");

  return dao.deleteCollection(collection);
})
