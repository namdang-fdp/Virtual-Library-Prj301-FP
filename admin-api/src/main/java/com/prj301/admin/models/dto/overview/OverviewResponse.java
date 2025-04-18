package com.prj301.admin.models.dto.overview;

import com.prj301.admin.models.dto.CountResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class OverviewResponse {
    private final long bookCount;
    private final BookOverview mostViewedBook;
    private final List<CountResponse> bookCountByMonth;

    private final long userCount;
    private final List<CountResponse> userCountByMonth;

    private final long reportCount;
}