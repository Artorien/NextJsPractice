package com.example.book_app_backend.UserPackage;

import com.example.book_app_backend.PurchasePackage.Purchase;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String email;
    private String password;
    private String dateOfCreation;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Purchase> purchases;
    private String image;
    private String token;

    public User() {

    }

    public User(UUID id,
                String email,
                String password,
                String dateOfCreation,
                List<Purchase> purchases,
                String image,
                String token) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.dateOfCreation = dateOfCreation;
        this.purchases = purchases;
        this.image = image;
        this.token = token;
    }

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDateOfCreation() {
        return this.dateOfCreation;
    }

    public void setDateOfCreation(String dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public List<Purchase> getPurchases() {
        return this.purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
