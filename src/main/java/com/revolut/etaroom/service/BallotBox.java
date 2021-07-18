package com.revolut.etaroom.service;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.revolut.etaroom.service.BallotBox.Mode.CONCLUDED;
import static com.revolut.etaroom.service.BallotBox.Mode.VOTING;
import static java.util.Collections.emptyMap;

public class BallotBox {
    private final RoomObserver room;

    private final Map<Participant, Vote> voteMap = new ConcurrentHashMap<>();
    private Mode mode = VOTING;

    public BallotBox(RoomObserver room) {
        this.room = room;
    }

    @JsonProperty
    public Mode getMode() {
        return mode;
    }

    @JsonProperty
    public Map<Participant, Vote> getVoteMap() {
        return mode == VOTING ? emptyMap() : voteMap;
    }

    void conclude() {
        mode = CONCLUDED;
    }

    boolean hasVoted(Participant participant) {
        return voteMap.containsKey(participant);
    }

    void restart () {
        voteMap.clear();
        mode = VOTING;
    }

    public void cast(Participant participant, Vote vote) {
        if (participant == null) {
            throw new RuntimeException("Active participant required");
        }
        if (mode != VOTING) {
            throw new RuntimeException("Voting is over");
        }

        voteMap.put(participant, vote);

        if (voteMap.size() == room.countParticipants()) {
            conclude();
        }
    }

    public enum Mode {
        VOTING,
        CONCLUDED
    }
}
