import { createMockAdapter, makeRandomString } from "../util";
import * as qs from "querystring";

const mockAdapter = createMockAdapter();

mockAdapter.onGet("https://www.acmicpc.net/").reply(
  200,
  {},
  {
    "set-cookie": [
      `OnlineJudge=${makeRandomString(26)}; path=/; \
      domain=.acmicpc.net; secure; HttpOnly`
    ]
  }
);

mockAdapter.onPost("https://www.acmicpc.net/status/ajax").reply(({ data }) => {
  const cases: { [solution_id: string]: string } = {
    "12104816": "런타임 에러",
    "12104815": "틀렸습니다",
    "12104814": "시간 초과",
    "12104813": "맞았습니다!!",
    "12104783": "컴파일 에러",
    "12104777": "출력 형식이 잘못되었습니다"
  };

  return [
    200,
    JSON.stringify({ result_name: cases[qs.parse(data).solution_id as string] })
  ];
});
