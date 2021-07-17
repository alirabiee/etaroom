package com.revolut.etaroom.service;

import com.fasterxml.jackson.annotation.JsonCreator;

import static java.util.Objects.hash;

public class Name {

    public final String value;

    public static Name name(String name) {
        return new Name(name);
    }

    @JsonCreator
    public Name(String value) {
        if (!value.matches("^[a-zA-Z0-9\\s+_/-]{3,}$")) {
            throw new RuntimeException("Invalid name");
        }
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Name name = (Name) o;
        return value.equals(name.value);
    }

    @Override
    public int hashCode() {
        return hash(value);
    }

    @Override
    public String toString() {
        return value;
    }
}
