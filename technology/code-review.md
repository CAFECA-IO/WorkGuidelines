# Code Review
> v1.0.3 20230119

## Pull Request Document Rule
### DEVELOP
- [x] component name
- [x] class name

### CHECK LIST
- Feature summary
- [Naming convention](coding-convention/naming-convention.md) verification
- Coding style verification
- Any new libraries ?
- Any new Class / Component ?
- Any new loop ?
- Any new recursive ?
- Any high risk operation ?
- Any SQL operation ?

### UML
- [document](#)

## Sample
[PR 156](https://github.com/CAFECA-IO/TideBit-DeFi/pull/156)
```markdown
### DEVELOP
- [x] 039-TradeStatistics
- [ ] 103-MarketSection
- [ ] 038-CandlestickChart
- [x] 040-CryptoSummary
- [x] 041-CryptoNewsSection
- [x] 042-CryptoNewsItem

### CHECK LIST
- [Naming convention](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/technology/coding-convention/naming-convention.md) verification: checked
- Coding style verification: checked
- new Library: 0
- new Class / Component: 4
src/components/trade_statistics/trade_statistics.tsx
src/components/crypto_summary/crypto_summary.tsx
src/components/crypto_news_section/crypto_news_section.tsx
src/components/crypto_news_item/crypto_news_item.tsx
- new loop: 1
src/components/crypto_news_section/crypto_news_section.tsx (17)
- new recursive: 0
- high risk: 0
- new sql: 0

### UML
- [Sequence Diagram (interaction between frontend and backend)](https://github.com/CAFECA-IO/Documents/blob/main/TBD/TBDSD00001.md)
- [Component Diagram](https://github.com/CAFECA-IO/Documents/blob/main/TBD/TBDCP00001.md)
```

### RULES
1. No logic and function call in return
2. No logic and function call in function parameters
3. No SQL execution in for loop
4. No API call in for loop
