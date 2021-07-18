package com.revolut.etaroom.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.revolut.etaroom.service.RoomPassword;

public class AdminRequest {
    public final RoomPassword password;

    @JsonCreator
    public AdminRequest(@JsonProperty("password") RoomPassword password) {
        this.password = password;
    }
}
