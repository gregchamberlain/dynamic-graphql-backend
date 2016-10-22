module.exports = {
  getModels: () => new Promise((resolve, reject) => resolve(jsonSchema))
};

const jsonSchema = [
  {
    name: 'Tower',
    fields: [
      {
        name: 'id',
        type: 'ID',
        nullable: false,
        list: false
      },
      {
        name: 'name',
        type: 'String',
        nullable: false,
        list: false
      },
      {
        name: 'aps',
        type: 'AP',
        nullable: false,
        list: true
      }
    ]
  },
  {
    name: 'AP',
    fields: [
      {
        name: 'id',
        type: 'ID',
        nullable: false,
        list: false
      },
      {
        name: 'radio',
        type: 'Radio',
        nullable: false,
        list: false
      }
    ]
  },
  {
    name: 'Radio',
    fields: [
      {
        name: 'id',
        type: 'ID',
        nullable: false,
        list: false
      },
      {
        name: 'make',
        type: 'String',
        nullable: false,
        list: false
      },
      {
        name: 'model',
        type: 'String',
        nullable: false,
        list: false
      },
      {
        name: 'description',
        type: 'String',
        nullable: true,
        list: false
      }
    ]
  }
];
