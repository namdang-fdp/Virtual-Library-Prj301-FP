package com.prj301.user.repositories;

import com.prj301.user.models.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import com.prj301.user.models.entity.Comment;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByBookOrderByCreatedAtDesc(Book book);

    long countByUser_Username(String username);
}
