# Annotation
> v1.0.1 20230313
- ToDo
- Deprecated
- Till
- Info

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

## Till
- Single Line
```typescript
// Till: (date after 14 days - author) {some code or message}
```
```typescript
// Till: (20230327 - Luphia) {some code or message}
```

- Multi-Line
```typescript
/* Till: (date after 14 days - author)
{ some code or message }
{ another code or message }
{ another code or message again }
 */
```
```typescript
/* Till: (20230327 - Luphia)
{ some code or message }
{ another code or message }
{ another code or message again }
 */
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
