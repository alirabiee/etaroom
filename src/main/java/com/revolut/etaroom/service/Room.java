package com.revolut.etaroom.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.revolut.etaroom.service.BallotBox.Mode.CONCLUDED;
import static com.revolut.etaroom.service.BallotBox.Mode.VOTING;
import static com.revolut.etaroom.service.Id.randomId;

public class Room implements RoomObserver {
    public final Id id;
    public final Name name;
    public final Map<Id, Participant> participants = new ConcurrentHashMap<>();
    public final BallotBox ballotBox = new BallotBox(this);
    private final RoomPassword password;

    public Room(Id id, Name name, RoomPassword password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public Participant join(Name name) {
        final var participant = new Participant(randomId(), name);
        participants.put(participant.id, participant);
        return participant;
    }

    public void restart(RoomPassword password) {
        if (!this.password.equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        if (ballotBox.getMode() != CONCLUDED) {
            throw new RuntimeException("Ballot must be concluded");
        }
        participants.keySet().stream().filter(id -> !ballotBox.hasVoted(participants.get(id))).forEach(participants::remove);
        ballotBox.restart();
    }

    public void conclude(RoomPassword password) {
        if (!this.password.equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        if (ballotBox.getMode() != VOTING) {
            throw new RuntimeException("Ballot must be running");
        }
        ballotBox.conclude();
    }

    @Override
    public int countParticipants() {
        return participants.size();
    }
}
