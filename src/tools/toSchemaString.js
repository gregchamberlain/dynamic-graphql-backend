const listify = field => field.list ? `[${field.type}]` : field.type

const parseSchema = models => {
  let str = '';
  models.forEach(model => {
    str += `type ${model.name} {`;
    model.fields.forEach(field => {
      str += `${field.name}: ${listify(field)}${field.nullable ? '' : '!'},`;
    });
    str += '}';
  });
  return str;
};

module.exports = parseSchema;
