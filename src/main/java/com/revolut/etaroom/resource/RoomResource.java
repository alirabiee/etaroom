package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.RoomManager;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;

import javax.inject.Inject;

import java.util.Optional;

import static com.revolut.etaroom.service.Id.id;

@Controller("/rooms")
public class RoomResource {

    @Inject
    private RoomManager roomManager;

    @Get(value = "/{roomId:[0-9a-f-]+}", produces = MediaType.APPLICATION_JSON)
    public RoomResponse getRoom(@PathVariable String roomId) {
        return RoomResponse.from(roomManager.get(id(roomId)));
    }

    @Post(value = "/{roomId:[0-9a-f-]+}/join", produces = MediaType.APPLICATION_JSON)
    public CreatedParticipantResponse joinRoom(@PathVariable String roomId, @Body JoinRoomRequest request) {
        return CreatedParticipantResponse.from(roomManager.join(id(roomId), request.name));
    }

    @Post(value = "/{roomId:[0-9a-f-]+}/conclude", produces = MediaType.APPLICATION_JSON)
    public RoomResponse conclude(@PathVariable String roomId, @Body AdminRequest request) {
        final var room = roomManager.get(id(roomId));
        room.conclude(request.password);
        return RoomResponse.from(room);
    }

    @Post(value = "/{roomId:[0-9a-f-]+}/restart", produces = MediaType.APPLICATION_JSON)
    public RoomResponse restart(@PathVariable String roomId, @Body AdminRequest request) {
        final var room = roomManager.get(id(roomId));
        room.restart(request.password);
        return RoomResponse.from(room);
    }

    @Post(produces = MediaType.APPLICATION_JSON)
    public RoomResponse createRoom(@Body CreateRoomRequest request) {
        return RoomResponse.from(roomManager.createRoom(request.name, request.password));
    }

    @Get(value = "/{roomId:[0-9a-f-]+}/participants/{participantId:[0-9a-f-]+}", produces = MediaType.APPLICATION_JSON)
    public ParticipantResponse getParticipant(@PathVariable String roomId, @PathVariable String participantId) {
        final var participant = Optional.ofNullable(roomManager.get(id(roomId)).participants.get(id(participantId)))
            .orElseThrow(() -> new RuntimeException("Participant not found"));
        return ParticipantResponse.from(participant);
    }

    @Post(value = "/{roomId:[0-9a-f-]+}/participants/{participantId:[0-9a-f-]+}/vote", produces = MediaType.APPLICATION_JSON)
    public RoomResponse castVote(@PathVariable String roomId, @PathVariable String participantId, @Body DaysVoteRequest request) {
        final var room = roomManager.get(id(roomId));
        room.ballotBox.cast(room.participants.get(id(participantId)), request.vote);
        return RoomResponse.from(room);
    }
}
