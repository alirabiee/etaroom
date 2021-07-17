package com.revolut.etaroom.service;

import static java.util.Objects.hash;

public class Participant {

    public final Id id;
    public final Name name;

    public Participant(Id id, Name name) {
        this.id = id;
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Participant that = (Participant) o;
        return id.equals(that.id) && name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return hash(id, name);
    }
}
