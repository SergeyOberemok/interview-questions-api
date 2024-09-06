import { Types } from 'mongoose';

export function makeInFilter(field: string, values: Array<string | RegExp>) {
  return { [field]: { $in: [...values] } };
}

export function makeOrFilter(filters: any[]) {
  return { $or: [...filters] };
}

export function makeEqualFilter(field: string, value: string | RegExp) {
  return { [field]: value };
}

export function makeIdFilter(id: string) {
  return { _id: new Types.ObjectId(id) };
}
