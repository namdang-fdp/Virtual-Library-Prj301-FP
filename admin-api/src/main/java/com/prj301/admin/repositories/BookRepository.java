package com.prj301.admin.repositories;

import com.prj301.admin.models.dto.CountResponse;
import com.prj301.admin.models.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {
    public Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Query("SELECT new com.prj301.admin.models.dto.CountResponse(MONTH(b.createdAt), COUNT(b)) FROM Book b WHERE YEAR(b.createdAt) = YEAR(CURRENT_DATE) GROUP BY MONTH(b.createdAt)")
    public List<CountResponse> countByMonth();

    public Optional<Book> findTopByOrderByViewDesc();
}