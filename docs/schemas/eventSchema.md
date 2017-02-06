### Event Schema
| path           | type   | presence | conforms                 | invalids |
|----------------|--------|----------|--------------------------|----------|
| -              | object | required |                          |          |
| id             | string | required |                          | `""`     |
| type           | string | required |                          | `""`     |
| payload        | any    | required |                          |          |
| meta           | object | required |                          |          |
| meta.recipient | string | required |                          | `""`     |
| meta.timestamp | string | required | `regex: [object Object]` | `""`     |
| meta.publisher | string | required |                          | `""`     |
