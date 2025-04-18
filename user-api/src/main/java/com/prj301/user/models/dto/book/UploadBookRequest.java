package com.prj301.user.models.dto.book;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Setter
@Getter
@RequiredArgsConstructor
public class UploadBookRequest {
    private String isbn;
    private String title;
    private Set<String> authors;
    private Set<String> genres;
    private LocalDate publicationDate;
    private String summary;
}
