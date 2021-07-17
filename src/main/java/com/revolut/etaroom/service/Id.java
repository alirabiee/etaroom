package com.revolut.etaroom.service;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

public class Id implements Serializable {

    public final UUID value;

    public static Id randomId() {
        return new Id(UUID.randomUUID());
    }

    public static Id id(String value) {
        return new Id(UUID.fromString(value));
    }

    public Id(UUID value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value.toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Id id = (Id) o;
        return Objects.equals(value, id.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}
