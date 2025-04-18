package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.dto.book.UploadBookRequest;
import com.prj301.user.models.dto.comment.CommentRequest;
import com.prj301.user.models.dto.comment.CommentResponse;
import com.prj301.user.models.dto.rating.RatingRequest;
import com.prj301.user.models.dto.report.BookReportRequest;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Rating;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.UserRepository;
import com.prj301.user.services.BookService;
import com.prj301.user.services.CommentService;
import com.prj301.user.services.RatingService;
import com.prj301.user.services.UserService;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;
    @Autowired
    private RatingService ratingService;

    @GetMapping
    public Page<BookResponse> getBooks(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) List<String> genres,
        Pageable pageable
    ) {
        return bookService.findAll(query, genres, pageable);
    }

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> uploadBook(
        @RequestAttribute("user-id") UUID id,
        @RequestPart("coverFile") MultipartFile coverFile,
        @RequestPart("pdfFile") MultipartFile pdfFile,
        @RequestPart("uploadBookRequest")
        @Parameter(description = "Book details", content = @Content(mediaType = "application/json"))
        UploadBookRequest uploadBookRequest
    ) {
        val user = userService
            .findById(id)
            .orElseThrow(() -> new RuntimeException("invalid user id"));

        boolean isSuccess = bookService.createBook(uploadBookRequest, coverFile, pdfFile, user);
        if (!isSuccess) {
            ResponseEntity
                .badRequest()
                .build();
        }

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable UUID id) {
        BookResponse bookResponse = bookService.getBookById(id);
        return ResponseEntity.ok(bookResponse);
    }

    @GetMapping("/{id}/comment")
    public ResponseEntity<List<CommentResponse>> getCommentsByBookId(@PathVariable UUID id) {
        List<CommentResponse> comments = commentService.getCommentsById(id);
        return ResponseEntity.ok(comments);
    }

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/{id}/comment")
    public ResponseEntity<CommentResponse> postComment(
        @PathVariable UUID id,
        @RequestBody CommentRequest commentRequest,
        @RequestAttribute("user-id") UUID userId
    ) {
        User currentUser = userService
            .findById(userId)
            .orElse(null);
        CommentResponse response = commentService.addComment(id, commentRequest, currentUser);
        return ResponseEntity.ok(response);
    }

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/{id}/rating")
    public ResponseEntity<Void> postRating(
            @PathVariable UUID id,
            @RequestBody RatingRequest ratingRequest,
            @RequestAttribute("user-id") UUID userId
    ) {
        if (ratingRequest.getRating() < 1 || ratingRequest.getRating() > 5) {
            return ResponseEntity.badRequest().build();
        }

        Book book = bookService.findBookById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        User user = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean success = ratingService.rateBook(book, user, ratingRequest.getRating());
        if(!success){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        return ResponseEntity.ok().build();
    }

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/{id}/report")
    public ResponseEntity<?> report(
            @PathVariable UUID id,
            @RequestBody BookReportRequest reason,
            @RequestAttribute("user-id") UUID reportingUserId
    ){

        if (bookService.report(reason, id, reportingUserId)) {
            return ResponseEntity
                    .ok()
                    .build();
        }

        return ResponseEntity
                .badRequest()
                .body("Failed to report");
    }

    @GetMapping("/{id}/view")
    public ResponseEntity<?> view(
        @PathVariable UUID id
    ) {
        if(bookService.increaseView(id)) {
            return ResponseEntity
                .ok()
                .build();
        }

        return ResponseEntity
            .badRequest()
            .body("Failed to report");
    }
}
