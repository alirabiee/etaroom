package com.revolut.etaroom.service;

import java.util.ArrayList;
import java.util.Collection;

import static com.revolut.etaroom.service.Id.randomId;

public class Room {
    public final Id id;
    public final Name name;
    public final RoomPassword password;
    public final Collection<Participant> participants = new ArrayList<>();
    private RoomMode mode;

    public Room(Id id, Name name, RoomPassword password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public Participant join(Name name) {
        final var participant = new Participant(randomId(), name);
        participants.add(participant);
        return participant;
    }
}
