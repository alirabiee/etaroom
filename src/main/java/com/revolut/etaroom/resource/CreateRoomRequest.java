package com.revolut.etaroom.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.revolut.etaroom.service.Name;
import com.revolut.etaroom.service.RoomPassword;

public class CreateRoomRequest {
    public final Name name;
    public final RoomPassword password;

    @JsonCreator
    public CreateRoomRequest(@JsonProperty("name") Name name,
                             @JsonProperty("password") RoomPassword password) {
        this.name = name;
        this.password = password;
    }
}
