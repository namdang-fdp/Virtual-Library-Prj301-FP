package com.prj301.user.models.dto.book;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class BookResponse {
    private final UUID id;
    private final String isbn;
    private final String postedUser;
    private final String title;
    private final String coverPath;
    private final List<String> authors;
    private final List<String> genres;
    private final LocalDate publicationDate;
    private final String summary;
    private final String pdfPath;
    private final int view;
    private final int totalRating;
    private final int ratingCount;
}
