package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.BallotBox;
import com.revolut.etaroom.service.Participant;
import com.revolut.etaroom.service.Vote;

import java.util.Map;

import static com.revolut.etaroom.service.BallotBox.Mode;
import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

public class BallotBoxResponse {

    public final Map<Vote, Integer> votes;
    public final Mode mode;

    private BallotBoxResponse(Map<Participant, Vote> votes, Mode mode) {
        this.votes = votes.values().stream().collect(toMap(identity(), v -> 1, Integer::sum));
        this.mode = mode;
    }

    public static BallotBoxResponse from(BallotBox box) {
        return new BallotBoxResponse(box.getVoteMap(), box.getMode());
    }
}
