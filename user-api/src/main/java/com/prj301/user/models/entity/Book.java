package com.prj301.user.models.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Documented
@Constraint(validatedBy = ValidISBNValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@interface ValidISBN {
    String message() default "Invalid ISBN";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

class ValidISBNValidator implements ConstraintValidator<ValidISBN, String> {
    @Override
    public void initialize(ValidISBN constraintAnnotation) {
    }

    @Override
    public boolean isValid(String isbn, ConstraintValidatorContext context) {
        return isbn.matches("^\\d{9}[\\dXx]$") || isbn.matches("^\\d{13}$");
    }
}

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(length = 13, unique = true, nullable = false)
    @ValidISBN
    private String isbn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User postedUser;

    @Column(nullable = false)
    private String title;

    private String coverPath;

    @ManyToMany
    private Set<Author> authors = new HashSet<>();

    @ManyToMany
    private Set<Genre> genres = new HashSet<>();

    private LocalDate publicationDate;

    private String summary;

    @Column(nullable = false)
    private String pdfPath;

    @ColumnDefault("0")
    private int view;

    @ColumnDefault("0")
    private int totalRating;

    @ColumnDefault("0")
    private int ratingCount;

    @CreationTimestamp
    private LocalDateTime createdAt;
}