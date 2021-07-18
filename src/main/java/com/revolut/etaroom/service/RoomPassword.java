package com.revolut.etaroom.service;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.Objects;

public class RoomPassword {

    private final String value;

    public static RoomPassword password(String word) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final RoomPassword that = (RoomPassword) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
