# Annotation
> v1.0.4 20250326
- ToDo
- Deprecated
- Info

**Make sure that all `ToDo` are completed and all content mark as `Deprecated` are removed before the version release**

## ToDo
- Single Line
```typescript
// ToDo: (date - author) { do something }
```
```typescript
// ToDo: (20230310 - Luphia) check data format
```

- Multi-Line
```typescript
/**
 * ToDo: (date - author)
 * { do something }
 * { do another thing }
 */
```
```typescript
/**
 * ToDo: (20230310 - Luphia)
 * count down
 * remove loading status after ending
 */
```

- In JSX
```typescript
{/* ToDo: (date - author) { do something } */}
```
```typescript
{/* ToDo: (20241130 - Luphia) say aha */}
```

## Eslint Disable
If you need to temporarily disable eslint during development, you are only allowed to use `eslint-disable-next-line`, and you must add a `ToDo` comment above it.
```typescript
// Deprecated: (date - author) remove eslint-disable
// eslint-disable-next-line no-console
{ some code }
```
```typescript
// Deprecated: (20241122 - Luphia) remove eslint-disable
// eslint-disable-next-line no-console
console.log('Hi there');
```

## Deprecated
- Single Line
```typescript
// Deprecated: (date - author) { say something }
```
```typescript
// Deprecated: (20230407 - Luphia) say something
```

- Multi-Line
```typescript
// Deprecated: (date - Luphia) [start] say something
{ some code }
{ another code }
{ another code again }
// Deprecated: [end]
```
```typescript
// Deprecated: (20230407 - Luphia) [start] say something
const now = new Date().getTime();
doSomeThing(now);
// Deprecated: [end]
```

## Info
- Single Line
```typescript
// Info: (date - author) { some message }
```
```typescript
// Info: (20230327 - Luphia) some message
```

- Multi-Line
```typescript
/**
 * Info: (date - author)
 * { some message }
 * { another message }
 * { another message again }
 */
```
```typescript
/**
 * Info: (20230327 - Luphia)
 * some message
 * another message
 * another message again
 */
```

- In JSX
```typescript
{/* Info: (date - author) { some message } */}
```
```typescript
{/* Info: (20241130 - Luphia) some message */}
```
