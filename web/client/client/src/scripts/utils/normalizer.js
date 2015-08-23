// Based on gaearon/normalizr
import isObject from 'lodash/lang/isObject';
import isEqual from 'lodash/lang/isEqual';

class EntitySchema {

  constructor(key, idAttribute) {
    if (DEBUG && !(typeof key === 'string' && key)) {
      throw new Error('key should be a nonempty string');
    }
    if (DEBUG && idAttribute && typeof idAttribute !== 'string') {
      throw new Error('key should be a nonempty string');
    }
    this._idAttribute = idAttribute || 'id';
    this._key = key;
  }

  getKey() {
    return this._key;
  }

  getIdAttribute() {
    return this._idAttribute;
  }

  define(nestedSchema) {
    for (const prop of Object.keys(nestedSchema)) {
      this[prop] = nestedSchema[prop];
    }
  }
}

export { EntitySchema as Schema };

class ArraySchema {

  constructor(itemSchema) {
    if (DEBUG && !isObject(itemSchema)) {
      throw new Error('item schema should be an object');
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
    if (DEBUG && typeof itemKey !== 'string') {
      throw new Error('item key should be a string');
    }
    if (DEBUG && !isObject(itemSchema)) {
      throw new Error('item key should be an object');
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

class Normalizer {

  constructor(obj, schema) {
    if (DEBUG && !isObject(obj) && !Array.isArray(obj)) {
      throw new Error('obj should be an object or an array');
    }
    this.bag = {};
    this.result = this.visit(obj, schema);
  }

  visitObject(obj, schema) {
    const normalized = {};
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        normalized[prop] = this.visit(obj[prop], schema[prop]);
      }
    }
    return normalized;
  }

  visitArray(obj, arraySchema) {
    const itemSchema = arraySchema.getItemSchema();
    return obj.map(childObj => this.visit(childObj, itemSchema));
  }

  visitProxy(obj, proxySchema) {
    const itemKey = proxySchema.getItemKey();
    if (obj.hasOwnProperty(itemKey)) {
      const itemSchema = proxySchema.getItemSchema();
      return this.visit(obj[itemKey], itemSchema);
    }
  }

  mergeIntoEntity(entityA, entityB, entityKey) {
    for (const prop of Object.keys(entityB)) {
      if (!entityA.hasOwnProperty(prop) || isEqual(entityA[prop], entityB[prop])) {
        entityA[prop] = entityB[prop];
        continue;
      }
      if (DEBUG) {
        throw new Error(
          'When merging two ' + entityKey + ', found shallowly unequal data in their "' + prop + '" values. Using the earlier value.',
          entityA[prop], entityB[prop]
        );
      }
    }
  }

  visitEntity(entity, entitySchema) {
    const entityKey = entitySchema.getKey();
    const idAttribute = entitySchema.getIdAttribute();
    const id = String(entity[idAttribute]); // TODO: return strings on the server
    if (!this.bag[entityKey]) {
      this.bag[entityKey] = {};
    }
    if (!this.bag[entityKey][id]) {
      this.bag[entityKey][id] = {};
    }
    const stored = this.bag[entityKey][id];
    const normalized = this.visitObject(entity, entitySchema);
    this.mergeIntoEntity(stored, normalized, entityKey);
    return id;
  }

  visit(obj, schema) {
    if (!isObject(obj) || !isObject(schema)) {
      return obj;
    }
    if (schema instanceof EntitySchema) {
      return this.visitEntity(obj, schema);
    } else if (schema instanceof ArraySchema) {
      return this.visitArray(obj, schema);
    } else if (schema instanceof ProxySchema) {
      return this.visitProxy(obj, schema);
    }
    return this.visitObject(obj, schema);
  }
}

export function normalize(obj, schema) {
  const { bag, result } = new Normalizer(obj, schema);
  return {
    entities: bag,
    result,
  };
}

export default normalize;
