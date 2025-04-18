package com.prj301.user.controllers;

import com.prj301.user.models.entity.Genre;
import com.prj301.user.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/genre")
public class GenreController {
    @Autowired
    private GenreService service;

    @GetMapping("/all")
    public List<String> findAll() {
        return service.findAll();
    }
}
