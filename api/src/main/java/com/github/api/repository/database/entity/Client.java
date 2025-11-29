package com.github.api.repository.database.entity;

import com.github.api.base.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "client")
@Getter
@Setter
public class Client extends BaseEntity {

    private String name;
    private String email;

    public Client() {
    }

    public Client(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
