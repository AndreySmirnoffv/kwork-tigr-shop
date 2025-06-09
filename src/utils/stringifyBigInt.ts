export function stringifyBigInt(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(stringifyBigInt);
    } else if (typeof obj === 'object' && obj !== null) {
        const result: any = {};
        for (const key in obj) {
            const value = obj[key];
            result[key] = typeof value === 'bigint' ? value.toString() : stringifyBigInt(value);
        }
        return result;
    }
    return obj;
}

export function serializeBigInts(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInts);
  } else if (typeof obj === 'object' && obj !== null) {
    const serialized: Record<string, any> = {};
    for (const key in obj) {
      const value = obj[key];
      serialized[key] =
        typeof value === 'bigint' ? value.toString() : serializeBigInts(value);
    }
    return serialized;
  }
  return obj;
}
