package com.revolut.etaroom.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.revolut.etaroom.service.Name;

public class JoinRoomRequest {
    public final Name name;

    @JsonCreator
    public JoinRoomRequest(@JsonProperty("name") Name name) {
        this.name = name;
    }
}
