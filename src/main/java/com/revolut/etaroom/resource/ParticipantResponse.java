package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.Id;
import com.revolut.etaroom.service.Name;
import com.revolut.etaroom.service.Participant;

import java.util.UUID;

public class ParticipantResponse {
    public final UUID id;
    public final String name;

    private ParticipantResponse(Id id, Name name) {
        this.id = id.value;
        this.name = name.value;
    }

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(participant.id, participant.name);
    }
}
