package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.Name;
import com.revolut.etaroom.service.Participant;

public class ParticipantResponse {
    public final String name;

    private ParticipantResponse(Name name) {
        this.name = name.value;
    }

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(participant.name);
    }
}
