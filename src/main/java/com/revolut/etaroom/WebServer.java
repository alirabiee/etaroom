package com.revolut.etaroom;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;

import static java.nio.file.Files.readString;
import static java.util.Objects.requireNonNull;

@Controller
public class WebServer {
    @Get(produces = MediaType.TEXT_HTML)
    public String index() throws URISyntaxException, IOException {
        return readIndexHtml();
    }

    @Get(value = "join/{roomId:[0-9a-f-]+}", produces = MediaType.TEXT_HTML)
    public String join(@PathVariable String roomId) throws URISyntaxException, IOException {
        return readIndexHtml();
    }

    @Get(value = "{filename:[a-z]+}.js", produces = "application/javascript")
    public String js(String filename) throws URISyntaxException, IOException {
        return readString(Path.of(requireNonNull(this.getClass().getResource("/web/" + filename + ".js")).toURI()));
    }

    private String readIndexHtml() throws IOException, URISyntaxException {
        return readString(Path.of(requireNonNull(this.getClass().getResource("/web/index.html")).toURI()));
    }
}
