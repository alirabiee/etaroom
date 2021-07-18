package com.revolut.etaroom.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.revolut.etaroom.service.DaysVote;

public class DaysVoteRequest {
    public final DaysVote vote;

    @JsonCreator
    public DaysVoteRequest(@JsonProperty("vote") DaysVote vote) {
        this.vote = vote;
    }
}
