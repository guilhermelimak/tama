## REM

This library is a wrapper of the `ws` websockets library, adding the following features:
- [x] Keep a list of users identified by an ID.
- [x] Ability to easy send an event to a specific user by it's ID.
- [ ] Rooms to group similar clients so you can broadcast events to all clients in one room.
- [ ] Listen to multiple events using wildcards in event handler name.

### Getting started
Check the examples folder for examples on how to use it.

### Development
###### Schemas
[Event schema](docs/schemas/eventSchema.md)
[Handler schema](docs/schemas/handlerSchema.md)
