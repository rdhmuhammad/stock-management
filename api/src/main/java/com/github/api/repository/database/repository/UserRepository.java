package com.github.api.repository.database.repository;

import com.github.api.base.BaseRepository;
import com.github.api.repository.database.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {
}
