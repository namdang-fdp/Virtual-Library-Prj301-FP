package com.prj301.user.repositories;

import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthorRepository extends JpaRepository<Author, UUID> {
    Optional<Author> findByName(String name);
}
