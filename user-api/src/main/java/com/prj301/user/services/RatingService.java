package com.prj301.user.services;

import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Rating;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.BookRepository;
import com.prj301.user.repositories.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;
    private final BookRepository bookRepository;

    public boolean rateBook(Book book, User user, int ratingValue) {
        try {
            Optional<Rating> optionalRating = ratingRepository.findByUserAndBook(user, book);
            if (optionalRating.isPresent()) {
               return false;
            }
            Rating rating = Rating.builder()
                    .book(book)
                    .user(user)
                    .rating(ratingValue)
                    .build();
            book.setTotalRating(book.getTotalRating() + ratingValue);
            book.setRatingCount(book.getRatingCount() + 1);

            ratingRepository.save(rating);
            bookRepository.save(book);
            return true;
        }catch(Exception e) {
            return false;
        }
    }
}
