package com.prj301.user.repositories;

import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Rating;
import com.prj301.user.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface RatingRepository extends JpaRepository<Rating, UUID> {
    Optional<Rating> findByUserAndBook(User user, Book book);
}
