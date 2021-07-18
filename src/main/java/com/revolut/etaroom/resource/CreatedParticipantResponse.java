package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.Id;
import com.revolut.etaroom.service.Name;
import com.revolut.etaroom.service.Participant;

import java.util.UUID;

public class CreatedParticipantResponse {
    public final UUID id;
    public final String name;

    private CreatedParticipantResponse(Id id, Name name) {
        this.id = id.value;
        this.name = name.value;
    }

    public static CreatedParticipantResponse from(Participant participant) {
        return new CreatedParticipantResponse(participant.id, participant.name);
    }
}
