package com.prj301.admin.models.dto.book;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class BookResponse {
    private final UUID id;
    private final String title;
    private final List<String> authors;
    private final LocalDateTime createdAt;
}