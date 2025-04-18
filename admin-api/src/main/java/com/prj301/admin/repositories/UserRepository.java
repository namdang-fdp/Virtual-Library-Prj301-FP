package com.prj301.admin.repositories;

import com.prj301.admin.models.dto.CountResponse;
import com.prj301.admin.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    public Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

    @Query("SELECT new com.prj301.admin.models.dto.CountResponse(MONTH(u.createdAt), COUNT(u)) FROM User u WHERE YEAR(u.createdAt) = YEAR(CURRENT_DATE) GROUP BY MONTH(u.createdAt)")
    public List<CountResponse> countByMonth();
}
