package com.prj301.admin.models.dto.overview;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class BookOverview {
    private final String title;
    private final long view;
}

