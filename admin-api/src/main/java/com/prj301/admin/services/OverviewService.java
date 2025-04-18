package com.prj301.admin.services;

import com.prj301.admin.models.dto.overview.BookOverview;
import com.prj301.admin.models.dto.overview.OverviewResponse;
import com.prj301.admin.repositories.*;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OverviewService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookReportRepository bookReportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserReportRepository userReportRepository;

    @Autowired
    private CommentReportRepository commentReportRepository;

    public OverviewResponse get() {
        val mostViewedBook = bookRepository
            .findTopByOrderByViewDesc()
            .map(book -> new BookOverview(book.getTitle(), book.getView()))
            .orElse(null);

        val reportCount = bookReportRepository.count() + userReportRepository.count();

        return new OverviewResponse(
            bookRepository.count(),
            mostViewedBook,
            bookRepository.countByMonth(),
            userRepository.count(),
            userRepository.countByMonth(),
            reportCount
        );
    }
}
