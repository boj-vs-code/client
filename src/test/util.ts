import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export function createMockAdapter() {
  return new MockAdapter(axios);
}
