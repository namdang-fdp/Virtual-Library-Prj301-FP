package com.prj301.user.repositories;

import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Genre;
import com.prj301.user.models.entity.User;
import jdk.nashorn.internal.runtime.options.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface GenreRepository extends JpaRepository<Genre, UUID> {
    Optional<Genre> findByName(String name);
}
