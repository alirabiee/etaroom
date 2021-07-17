package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.Id;
import com.revolut.etaroom.service.Name;
import com.revolut.etaroom.service.Participant;
import com.revolut.etaroom.service.Room;

import java.util.Collection;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

public class RoomResponse {
    public final UUID id;
    public final String name;
    public final Collection<ParticipantResponse> participants;

    private RoomResponse(Id id, Name name, Collection<Participant> participants) {
        this.id = id.value;
        this.name = name.value;
        this.participants = participants.stream().map(ParticipantResponse::from).collect(toList());
    }

    public static RoomResponse from(Room room) {
        return new RoomResponse(room.id, room.name, room.participants);
    }
}
