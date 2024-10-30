package com.example.book_app_backend.BookPackage;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String title;
    private String description;
    private String image;
    private String awsUrl;

    public Book() {

    }

    public Book(UUID id,
                String title,
                String description,
                String image,
                String awsUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.awsUrl = awsUrl;
    }

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAwsUrl() {
        return this.awsUrl;
    }

    public void setAwsUrl(String awsUrl) {
        this.awsUrl = awsUrl;
    }
}
