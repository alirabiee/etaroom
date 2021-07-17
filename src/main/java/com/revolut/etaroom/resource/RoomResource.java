package com.revolut.etaroom.resource;

import com.revolut.etaroom.service.RoomManager;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;
import io.micronaut.http.annotation.Post;

import javax.inject.Inject;

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
    public ParticipantResponse joinRoom(@PathVariable String roomId, @Body JoinRoomRequest request) {
        return ParticipantResponse.from(roomManager.join(id(roomId), request.name));
    }

    @Post(produces = MediaType.APPLICATION_JSON)
    public RoomResponse createRoom(@Body CreateRoomRequest request) {
        return RoomResponse.from(roomManager.createRoom(request.name, request.password));
    }
}
