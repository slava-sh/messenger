// Based on gaearon/normalizr
import isObject from 'lodash/lang/isObject';
import isEqual from 'lodash/lang/isEqual';

class EntitySchema {

  constructor(key, options) {
    if (!key || typeof key !== 'string') {
      throw new Error('A string non-empty key is required');
    }
    options = options || {};
    this._idAttribute = options.idAttribute || 'id';
    this._key = key;
  }

  getKey() {
    return this._key;
  }

  getIdAttribute() {
    return this._idAttribute;
  }

  define(nestedSchema) {
    for (var prop in nestedSchema) {
      if (nestedSchema.hasOwnProperty(prop)) {
        this[prop] = nestedSchema[prop];
      }
    }
  }
}

export { EntitySchema as Schema };

class ArraySchema {

  constructor(itemSchema) {
    if (!isObject(itemSchema)) {
      throw new Error('ArraySchema requires item schema to be an object');
    }
    this._itemSchema = itemSchema;
  }

  getItemSchema() {
    return this._itemSchema;
  }
}

export function arrayOf(schema) {
  return new ArraySchema(schema);
}

class ProxySchema {

  constructor(itemKey, itemSchema) {
    if (typeof itemKey !== 'string') {
      throw new Error('ProxySchema requires item key to be a string');
    }
    if (!isObject(itemSchema)) {
      throw new Error('ProxySchema requires item schema to be an object');
    }
    this._itemKey = itemKey;
    this._itemSchema = itemSchema;
  }

  getItemKey() {
    return this._itemKey;
  }

  getItemSchema() {
    return this._itemSchema;
  }
}

export function proxy(key, schema) {
  return new ProxySchema(key, schema);
}

function visitObject(obj, schema, bag) {
  var normalized = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      normalized[prop] = visit(obj[prop], schema[prop], bag);
    }
  }
  return normalized;
}

function visitArray(obj, arraySchema, bag) {
  var itemSchema = arraySchema.getItemSchema(),
      normalized;
  normalized = obj.map(childObj => visit(childObj, itemSchema, bag));
  return normalized;
}

function visitProxy(obj, proxySchema, bag) {
  const itemKey = proxySchema.getItemKey();
  if (obj.hasOwnProperty(itemKey)) {
    const itemSchema = proxySchema.getItemSchema();
    return visit(obj[itemKey], itemSchema, bag);
  }
}

function mergeIntoEntity(entityA, entityB, entityKey) {
  for (var prop in entityB) {
    if (!entityB.hasOwnProperty(prop)) {
      continue;
    }
    if (!entityA.hasOwnProperty(prop) || isEqual(entityA[prop], entityB[prop])) {
      entityA[prop] = entityB[prop];
      continue;
    }
    console.warn(
      'When merging two ' + entityKey + ', found shallowly unequal data in their "' + prop + '" values. Using the earlier value.',
      entityA[prop], entityB[prop]
    );
  }
}

function visitEntity(entity, entitySchema, bag) {
  var entityKey = entitySchema.getKey(),
      idAttribute = entitySchema.getIdAttribute(),
      id = entity[idAttribute],
      stored,
      normalized;
  if (!bag[entityKey]) {
    bag[entityKey] = {};
  }
  if (!bag[entityKey][id]) {
    bag[entityKey][id] = {};
  }
  stored = bag[entityKey][id];
  normalized = visitObject(entity, entitySchema, bag);
  mergeIntoEntity(stored, normalized, entityKey);
  return id;
}

function visit(obj, schema, bag) {
  if (!isObject(obj) || !isObject(schema)) {
    return obj;
  }
  if (schema instanceof EntitySchema) {
    return visitEntity(obj, schema, bag);
  } else if (schema instanceof ArraySchema) {
    return visitArray(obj, schema, bag);
  } else if (schema instanceof ProxySchema) {
    return visitProxy(obj, schema, bag);
  } else {
    return visitObject(obj, schema, bag);
  }
}

export function normalize(obj, schema) {
  if (!isObject(obj) && !Array.isArray(obj)) {
    throw new Error('Normalize accepts an object or an array as its input.');
  }
  if (!isObject(schema) || Array.isArray(schema)) {
    throw new Error('Normalize accepts an object for schema.');
  }
  var bag = {},
      result = visit(obj, schema, bag);
  return {
    entities: bag,
    result: result
  };
}

export default normalize;

export const paginated = schema => proxy('data', arrayOf(schema));
