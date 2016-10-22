const AWS = require('aws-sdk');
const uuid = require('node-uuid');

AWS.config.update({
  region: "us-west-2",
});

const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const params = {
  TableName: 'Models',
  Item: {
    id: uuid.v4(),
    name: 'Tower',
    fields: [
      {
        name: 'Name',
        type: 'String',
        nullable: false,
        list: false
      },
      {
        name: 'address',
        type: 'String',
        nullable: false,
        list: false
      }
    ]
  }
};

const docClient = new AWS.DynamoDB.DocumentClient();
docClient.put(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});

// dynamodb.putItem(params, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });
