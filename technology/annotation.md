# Annotation
> v1.0.2 20241122
- ToDo
- Deprecated
- Info

**Make sure that all `ToDo` are completed and all content mark as `Deprecated` are removed before the version release**

## ToDo
- Single Line
```typescript
// ToDo: (date - author) do something 
```
```typescript
// ToDo: (20230310 - Luphia) do something 
```

- Multi-Line
```typescript
/* ToDo: (date - author)
 * do something
 * do another thing
 */
```
```typescript
/* ToDo: (20230310 - Luphia)
 * do something
 * do another thing
 */
```

### Eslint Disable
If you need to temporarily disable eslint during development, you are only allowed to use `eslint-disable-next-line`, and you must add a `ToDo` comment above it.
```typescript
// ToDo: (20241122 - Luphia) remove eslint-disable
// eslint-disable-next-line no-console
// console.log('Hi there');
```

## Deprecated
- Single Line
```typescript
// Deprecated: (date after 28 days - author) say something 
```
```typescript
// Deprecated: (20230407 - Luphia) say something 
// eslint-disable-next-line no-console
```

- Multi-Line
```typescript
// Deprecated: (date after 28 days - Luphia) [start] say something 
{ some code }
{ another code }
{ another code again }
// Deprecated: [end]
```
```typescript
// Deprecated: (20230407 - Luphia) [start] say something 
{ some code }
{ another code }
{ another code again }
// Deprecated: [end]
```

## Info
- Single Line
```typescript
// Info: (date - author) {some message}
```
```typescript
// Info: (20230327 - Luphia) {some message}
```

- Multi-Line
```typescript
/* Info: (date - author)
{ some message }
{ another message }
{ another message again }
 */
```
```typescript
/* Info: (20230327 - Luphia)
{ some message }
{ another message }
{ another message again }
 */
```
