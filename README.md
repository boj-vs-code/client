![logo](./resources/images/logo.png)

[![Build Status](https://travis-ci.org/boj-vs-code/client.svg?branch=master)](https://travis-ci.org/boj-vs-code/client)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2adae3da53304e1d84433f5e7d723e0d)](https://www.codacy.com/app/dogeonlove0326/boj-vs-code?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=moreal/boj-vs-code&amp;utm_campaign=Badge_Grade)
![vsmarketplacebadge](https://vsmarketplacebadge.apphb.com/version/bojvscode.boj-vs-code.svg)  

[백준 온라인 저지]의 문제를 vscode 환경에서 편하게 풀 수 있게끔 도와주는 vscode extension.

폴더 내에 `.boj` 파일이 있다면 확장프로그램이 활성화 됩니다!

![boj-welcome!](https://user-images.githubusercontent.com/26626194/70371570-03177580-1918-11ea-8e74-0c541f896e85.png)

[백준 온라인 저지]: https://boj.kr

## Features

### 문제 정보 보기

Command Palette: `BOJ: Show Problem Information`  
Key Binding: `ctrl+alt+i`

파일명이 **문제번호.c** 혹은 **문제번호-추가적인설명.c** 같은 형식으로 되어있는 경우에만 문제 번호를 인식할 수 있습니다! 추가적인 설명 부분은 실제로 형식이 정해져 있지는 않습니다.

(e.g. `1000.c`, `1000-a+b.c`)

![Show problem information](https://user-images.githubusercontent.com/26626194/70360470-fcf6aa00-18c1-11ea-86c3-af1d016aeef5.png)

### 자동 테스트

Command Palette: `BOJ: Run Testcases`  
Key Binding: `ctrl+alt+r`

![Choose language](https://user-images.githubusercontent.com/26626194/70360682-8b6b2b80-18c2-11ea-9bfe-9f4bf51ab965.png)

![Run and fail](https://user-images.githubusercontent.com/26626194/70360765-ca00e600-18c2-11ea-9646-2186224ffd11.png)

![Run and succcess](https://user-images.githubusercontent.com/26626194/70361266-4942e980-18c4-11ea-920c-edb183a151a6.png)

지원하는 언어
- C
- C++
- Python2
- Python3

### 자동 제출 및 결과 보기 (DEPRECATED)

Command Palette: `BOJ: Submit Source to BOJ`, `BOJ: Show Submit Tasks`.

리캡챠가 적용됨에 따라서 사용할 수 없게 되었습니다.
