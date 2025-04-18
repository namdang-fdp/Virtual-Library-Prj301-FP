package com.prj301.user.services;

import com.prj301.user.models.entity.Author;
import com.prj301.user.repositories.AuthorRepository;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository repository;

    @Transactional
    public Author findOrCreate(String name) {
        Optional<Author> authorOpt = repository.findByName(name);
        if (authorOpt.isPresent()) {
            return authorOpt.get();
        }

        var author = new Author();
        author.setName(name);

        try {
            return repository.save(author);
        } catch (DataIntegrityViolationException ex) {
            return repository
                .findByName(name)
                .orElseThrow(() -> new RuntimeException("Unable to create or find author " + name));
        }
    }
}
