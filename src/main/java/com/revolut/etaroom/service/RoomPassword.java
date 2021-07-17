package com.revolut.etaroom.service;

import com.fasterxml.jackson.annotation.JsonCreator;

public class RoomPassword {

    private final String value;

    public static RoomPassword roomName(String word) {
        return new RoomPassword(word);
    }

    @JsonCreator
    public RoomPassword(String value) {
        if (value.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
