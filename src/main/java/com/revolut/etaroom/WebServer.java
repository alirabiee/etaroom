package com.revolut.etaroom;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.PathVariable;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;

import static io.micronaut.core.io.IOUtils.readText;
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
        return readText(new BufferedReader(new InputStreamReader(requireNonNull(this.getClass().getResourceAsStream("/web/" + filename + ".js")))));
    }

    private String readIndexHtml() throws IOException, URISyntaxException {
        return readText(new BufferedReader(new InputStreamReader(requireNonNull(this.getClass().getResourceAsStream("/web/index.html")))));
    }

}
