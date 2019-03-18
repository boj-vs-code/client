import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { randomBytes } from "crypto";

export function createMockAdapter() {
  return new MockAdapter(axios);
}

export function makeRandomString(length: number): string {
  return randomBytes(length / 2).toString("hex");
}
