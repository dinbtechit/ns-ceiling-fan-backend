
# NS Ceiling Fan Backend (APIs)

**Technologies**
- NestJS (A progressive nodejs framework)
- REST API
- Server Sent Events for Event Driven Communication from client.
- Redis for cache

## Installation

```bash
$ npm install
```

## Running the app
```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

# API Details:

1. Get Fan Status
```
curl -X GET "http://localhost:3000/api/v1/fan/cord/pull/1"
```
**output**
```
{ speed: 0, direction: true }
```
2. PUT pull Cord 1 
```
curl -X PUT "http://localhost:3000/api/v1/fan/cord/pull/1"
```

3. PUT pull Cord 2
```
curl -X PUT "http://localhost:3000/api/v1/fan/cord/pull/2"
```

3.To Listen For SSE events.
```
curl -X GET "http://localhost:3000/api/v1/fan/cord/pull/sse"
```
