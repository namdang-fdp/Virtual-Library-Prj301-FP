package com.prj301.admin.services;

import com.prj301.admin.models.dto.CountResponse;
import com.prj301.admin.models.dto.book.BookReportResponse;
import com.prj301.admin.models.dto.book.BookResponse;
import com.prj301.admin.models.entity.Author;
import com.prj301.admin.models.entity.Book;
import com.prj301.admin.models.entity.BookReport;
import com.prj301.admin.repositories.BookReportRepository;
import com.prj301.admin.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookReportRepository bookReportRepository;

    private BookResponse toResponse(Book book) {
        val authors = book
            .getAuthors()
            .stream()
            .map(Author::getName)
            .collect(Collectors.toList());

        return new BookResponse(
            book.getId(),
            book.getTitle(),
            authors,
            book.getCreatedAt()
        );
    }

    private BookReportResponse toResponse(BookReport report) {
        val book = report
            .getBook();
        val reportingUser = report
            .getReportingUser();

        val authors = book
            .getAuthors()
            .stream()
            .map(Author::getName)
            .collect(Collectors.toList());

        return new BookReportResponse(
            report.getId(),
            book.getId(),
            book.getTitle(),
            authors,
            book.getCreatedAt(),
            reportingUser.getUsername(),
            report.getReason()
        );
    }

    public Page<BookResponse> findAll(Pageable pageable) {
        return bookRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<BookResponse> findAll(String title, Pageable pageable) {
        return bookRepository
            .findByTitleContainingIgnoreCase(title, pageable)
            .map(this::toResponse);
    }

    public Page<BookReportResponse> findAllReport(Pageable pageable) {
        return bookReportRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<BookReportResponse> findAllReport(String title, Pageable pageable) {
        return bookReportRepository
            .findByBookTitleContainingIgnoreCase(title, pageable)
            .map(this::toResponse);
    }

    public long count() {
        return bookRepository.count();
    }

    public List<CountResponse> countByMonth() {
        return bookRepository.countByMonth();
    }

    public long countReport() {
        return bookReportRepository.count();
    }

    @Transactional
    public void delete(UUID id) {
        bookRepository.deleteById(id);
    }

    public void deleteReport(UUID id) {
        bookReportRepository.deleteById(id);
    }
}