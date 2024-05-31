# Issue Format
> v1.0.0 20221028
- Title: [Bug] something happened
- Environment Description
  - Machine
  - OS version
  - Browser version
- How to reproduce
- Current Result
- Expect Result

## Sample
```markdown
- Test Environment
```
2022-11-07 10:51:19
MacBook Pro
MacOS 13.0
Chrome 13.0
```

- How To Reproduce
```
Login with admin account
access https://www.tidebit.com/analysis
click hamburger menu
click 營收管理
click 撮合成交記錄查詢
choose BTC-USDT
find the record of 11/03 
```

- Exception Description
```
The result is different with OKX API https://www.okx.com/api/v5/trade/fills
```

- Expect Result
```
The Fee of OKX must be same with OKX API https://www.okx.com/api/v5/trade/fills
For example, transaction fee of trade ID 381937828 is -0.00001134713
```

- Refference
[Fill Data of OKX](https://github.com/CAFECA-IO/TideBitEx/files/9947900/1103OKX.txt)
<img width="1381" alt="TideBitAnalysis" src="https://user-images.githubusercontent.com/270062/200221464-72c66474-42aa-471e-a33e-b6393dd90686.png">



```
