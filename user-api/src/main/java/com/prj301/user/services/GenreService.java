package com.prj301.user.services;

import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Genre;
import com.prj301.user.repositories.AuthorRepository;
import com.prj301.user.repositories.GenreRepository;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GenreService {
    @Autowired
    private GenreRepository repository;

    public List<String> findAll() {
        return repository
            .findAll()
            .stream()
            .map(genre -> genre.getName())
            .collect(Collectors.toList());
    }

    @Transactional
    public Genre findOrCreate(String name) {
        Optional<Genre> genreOpt = repository.findByName(name);
        if (genreOpt.isPresent()) {
            return genreOpt.get();
        }

        var genre = new Genre();
        genre.setName(name);

        try {
            return repository.save(genre);
        } catch (DataIntegrityViolationException ex) {
            return repository
                .findByName(name)
                .orElseThrow(() -> new RuntimeException("Unable to create or find genre " + name));
        }
    }
}
