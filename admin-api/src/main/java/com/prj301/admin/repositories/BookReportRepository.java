package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.BookReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BookReportRepository extends JpaRepository<BookReport, UUID> {
    public Page<BookReport> findByBookTitleContainingIgnoreCase(String title, Pageable pageable);
}
