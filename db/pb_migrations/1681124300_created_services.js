
migrate((db) => {
  const collection = new Collection({
    "id": "9vrngpkbvh12ru2",
    "created": "2023-04-10 10:58:20.374Z",
    "updated": "2023-04-10 10:58:20.374Z",
    "name": "services",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yzzckqqo",
        "name": "url",
        "type": "url",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "teu7inme",
        "name": "value",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "v9bc32ot",
        "name": "field",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": []
        }
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
  const collection = dao.findCollectionByNameOrId("9vrngpkbvh12ru2");

  return dao.deleteCollection(collection);
})
