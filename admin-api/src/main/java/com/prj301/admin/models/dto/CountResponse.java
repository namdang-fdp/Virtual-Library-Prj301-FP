package com.prj301.admin.models.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class CountResponse {
    private final int month;
    private final long count;
}
