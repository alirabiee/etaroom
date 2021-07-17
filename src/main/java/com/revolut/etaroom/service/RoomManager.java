package com.revolut.etaroom.service;

import javax.inject.Singleton;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.revolut.etaroom.service.Id.randomId;

@Singleton
public class RoomManager {

    private final Map<Id, Room> rooms = new ConcurrentHashMap<>();

    public Room createRoom(Name name, RoomPassword password) {
        final var id = randomId();
        final var room = new Room(id, name, password);
        if (rooms.containsKey(id)) {
            throw new RuntimeException("Room already exists");
        }
        rooms.put(id, room);
        return room;
    }

    public Room get(Id id) {
        if (rooms.containsKey(id)) {
            return rooms.get(id);
        }
        throw new RuntimeException("Room " + id + " not found");
    }

    public Participant join(Id roomId, Name name) {
        return get(roomId).join(name);
    }
}
